import React, { useState, useEffect } from "react";

// Components
import { KanbanColumn } from "./KanbanColumn/KanbanColumn";
import { Spinner } from "../Spinner/Spinner";

export const Kanban = () => {
    // Page Prefetch State
    const [prefetch, setPrefetch] = useState(false);

    // Column States
    const [ideaList, setIdeaList] = useState([]);
    const [nextList, setNextList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch an idea 
    const generateActivity = () => {
        try {
            fetch("https://www.boredapi.com/api/activity")
                .then(res => res.json())
                .then(data => setIdeaList([...ideaList, data]));
            setLoading(false);
        } catch (error) {
            console.error("Couldn't fetch data");
        } finally {
            console.log(loading);
        }
    }

    // Fetch Items from Localstorage
    useEffect(() => {
        console.log("Fetched from localStorage");

        // Clean up Effect
        return () => {
            setPrefetch(true);
        }
    }, [prefetch])

    return (
        <div className="container">
            <div className="d-flex py-4">
                <button
                    onClick={() => { generateActivity() }}
                    className="btn btn-dark font-monospace fs-6"
                >Generate Idea {loading && <Spinner/>}
                </button>
            </div>

            <div className="row">
                <KanbanColumn title="Ideas" emoji={"💡"} data={ideaList} stateHandler={setIdeaList}/>
                <KanbanColumn title="Next" emoji={"🔥"} data={nextList} stateHandler={setNextList}/>
                <KanbanColumn title="Done" emoji={"🎉"} data={doneList} stateHandler={setDoneList}/>
            </div>
        </div>
    );
}