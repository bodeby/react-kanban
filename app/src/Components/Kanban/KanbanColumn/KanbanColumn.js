import React from 'react'

// Components
import { KanbanItem } from './KanbanItem/KanbanItem';
import { KanbanEmpty } from './KanbanEmpty/KanbanEmpty';
import { Emoji } from '../Emoji/Emoji';

export const KanbanColumn = (props) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();

        const item_key = e.dataTransfer.getData('item_key');
        const item_from = e.dataTransfer.getData('item_from');
        
        props.onChange(item_key, item_from, props.title);
    }

    return (
        <div className="col px-1 py-0 rounded">
            <div className="card rounded bg-light border-0" >
                <div className="card-body p-2">
                    <div className="d-flex ps-1 py-2 align-middle">
                        <Emoji symbol={props.emoji} />
                        <h5 className="font-monospace ms-2 text-dark fs-5">{props.title}</h5>
                    </div>

                    <ul className="list-group list-group-flush"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {props.data.length ?
                            <>
                                {props.data.map((item) => {
                                    return (
                                        <KanbanItem from={props.title} data={item} key={item.key} />
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
