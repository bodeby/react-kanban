import React, { useState } from 'react'
import './KanbanItem.css';

// icons
import { GoArrowBoth } from 'react-icons/go';

export const KanbanItem = (item) => {

    const [dragged, setDragged] = useState(false);


    // Handle onDrag event
    const handleDrag = (e) => {
        console.log("Dragging");
        console.log(dragged);

        // Data transfer
        e.dataTransfer.setData('item_id', e.target.key);
    }

    // Handle onDrag event
    const handleDragStart = (e) => {
        e.preventDefault();

        // Change State
        setDragged(prevDragged => !prevDragged);

        // Data transfer
        e.dataTransfer.setData('item_id', e.target.id);
    }

    // Handle when item is being dragged
    const handleDragEnd = (e) => {

        // Change State
        setDragged(prevDragged => !prevDragged);
    }

    return (
        <li
            className={dragged ?
                "list-group-item my-1 border-0 rounded kanban-item card-dragged" :
                "list-group-item my-1 border-0 rounded kanban-item"
            }
            id={item.data.key}
            onDrag={handleDrag}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable={true}>
            <p className="lead mb-2 fs-6">{item.data.activity}</p>
            <div className="d-flex justify-content-between align-items-center">
                <small>{item.data.type}</small>
                <GoArrowBoth />
            </div>
        </li>
    )
}
