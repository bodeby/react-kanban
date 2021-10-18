import React from 'react'

// Components
import { KanbanItem } from './KanbanItem/KanbanItem';
import { KanbanEmpty } from './KanbanEmpty/KanbanEmpty';
import { Emoji } from '../Emoji/Emoji';

export const KanbanColumn = (props) => {

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log(`hovering: ${props.title}`);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        console.log(`Dropped on ${props.title}`);

        const card_id = e.dataTransfer.getData('item_id');
        console.log(card_id);

        
        //const card = document.getElementById(card_id);
        //e.target.appendChild(card);
    }

    return (
        <div className="col px-1 py-0">
            <div className="card border-0">
                <div className="card-body bg-light p-2">
                    <div className="d-flex ps-1 py-2 align-middle">
                        <Emoji symbol={props.emoji} />
                        <h5 className="font-monospace ms-2 fs-5">{props.title}</h5>
                    </div>
                    <ul className="list-group list-group-flush"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {props.data.length > 0 ?
                            <>
                                {props.data.map((item) => {
                                    return (
                                        <KanbanItem data={item} key={item.key} />
                                    )
                                })}
                            </> :
                            <KanbanEmpty />
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}
