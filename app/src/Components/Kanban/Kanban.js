import React, { useState, useEffect } from "react";

// Components
import { KanbanColumn } from "./KanbanColumn/KanbanColumn";
import { Spinner } from "../Spinner/Spinner";

export const Kanban = () => {

    // Column States
    const [ideaList, setIdeaList] = useState([]);
    const [nextList, setNextList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Page Prefetch State
    const [prefetch, setPrefetch] = useState(false);

    // Fetch Items from Localstorage
    useEffect(() => {
        // Clean up Effect
        return () => {
            setPrefetch(true);
        }
    }, [prefetch])

    // Fetch an idea from API endpoint
    const generateActivity = () => {
        try {
            fetch("https://www.boredapi.com/api/activity")
                .then(res => res.json())
                .then(data => setIdeaList([...ideaList, data]))
                .then(setLoading(false));
        } catch (error) {
            setLoading(false);
            console.error("Couldn't fetch data");
        }
    }

    // Move Idea to different column
    const moveKanbanItem = (item_key, from, dest) => {
        const itemMoved = {
            "key": item_key,
            "from": from,
            "dest": dest
        }
        console.table(itemMoved);

        // Check function
        const extractfromState = (key, state) => {
            let searched = state.filter(obj => obj.key === key);

            if (searched.length !== 0) {
                return searched[0];
            }
            return false;
        }

        // Remove item from state
        const updateFromState = (item_key, from) => {
            if (from === "Ideas") {
                setIdeaList(ideaList.filter(obj => obj.key !== item_key));
            } else if (from === "Next") {
                setNextList(nextList.filter(obj => obj.key !== item_key));
            } else if (from === "Done") {
                setDoneList(doneList.filter(obj => obj.key !== item_key));
            } else {
                return false;
            }
        }

        // Add item to destination state
        const updateDestState = (item_key, from, dest) => {
            if (from === "Ideas") {
                let item = extractfromState(item_key, ideaList);
                if (dest === "Next") {
                    setNextList([...nextList, item]);
                    updateFromState(item_key, from);
                } else if (dest === "Done") {
                    setDoneList([...doneList, item]);
                    updateFromState(item_key, from);
                }
            } else if (from === "Next") {
                let item = extractfromState(item_key, nextList);
                if (dest === "Ideas") {
                    setNextList([...ideaList, item]);
                    updateFromState(item_key, from);
                } else if (dest === "Done") {
                    setDoneList([...doneList, item]);
                    updateFromState(item_key, from);
                }
            } else if (from === "Done") {
                let item = extractfromState(item_key, doneList);
                if (dest === "Ideas") {
                    setNextList([...ideaList, item]);
                    updateFromState(item_key, from);
                } else if (dest === "Next") {
                    setDoneList([...nextList, item]);
                    updateFromState(item_key, from);
                }
            } else {
                return false;
            }
        }

        updateDestState(item_key,from,dest);
    }

    return (
        <div className="container">
            <div className="d-flex py-4">
                <button
                    onClick={() => { setLoading(true); generateActivity() }}
                    className="btn btn-dark font-monospace fs-6"
                    disabled={loading ? true : false}
                >Generate Idea {loading && <Spinner />}
                </button>
            </div>

            <div className="row">
                <KanbanColumn title="Ideas" emoji={"💡"} data={ideaList} onChange={moveKanbanItem} />
                <KanbanColumn title="Next" emoji={"🔥"} data={nextList} onChange={moveKanbanItem} />
                <KanbanColumn title="Done" emoji={"🎉"} data={doneList} onChange={moveKanbanItem} />
            </div>
        </div>
    );
}