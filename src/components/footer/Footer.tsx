import React, { useState } from 'react'
import classes from './footer.module.css'
const Footer = ({ count, onClick, onClear }: any) => {
    const [isSelected, setIsSelected] = useState<string>("all")
    const { footer, btn, filters, border, countCss } = classes;
    return (
        <footer className={footer}>
            <span className={countCss}> {count} item left</span>
            <ul className={filters}>
                <li>
                    <button style={{ cursor: 'pointer' }} className={`${isSelected === "all" ? border : ""}`} onClick={() => {
                        setIsSelected("all");
                        onClick("all")
                    }}>All</button>
                </li>
                <li>
                    <button style={{ cursor: 'pointer' }} className={`${isSelected === "active" ? border : ""}`} onClick={() => {
                        setIsSelected("active");
                        onClick("active")
                    }}>Active</button>
                </li>
                <li>
                    <button style={{ cursor: 'pointer' }} className={`${isSelected === "completed" ? border : ""}`} onClick={() => {
                        setIsSelected("completed");
                        onClick("completed")
                    }}>
                        Completed
                    </button>
                </li>
            </ul>
            <button onClick={onClear} className={btn}>Clear Completed</button>
        </footer>
    )
}

export default Footer