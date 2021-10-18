import React from 'react'

// CSS
import './Spinner.css';

// Icons
import { IconContext } from "react-icons/lib";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Spinner = () => {
    return (
        <IconContext.Provider value={{ className: "icon-spin" }}>
            <AiOutlineLoading3Quarters />
        </IconContext.Provider>
    )
}
