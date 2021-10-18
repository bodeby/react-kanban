import React from 'react'

// Components
import { Emoji } from '../../Emoji/Emoji';

export const KanbanEmpty = () => {
    return (
        <li className="list-group-item my-1 border-0 rounded text-center">
            <div className="fs-2">
                <Emoji symbol={"🔦"} />
            </div>
            <small className="d-block">Nothing here yet..</small>
        </li>
    )
}
