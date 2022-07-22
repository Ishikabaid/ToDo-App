import React from 'react'
import classes from './footer.module.css'
const Footer = ({ count,onClick, onClear}: any) => {
    const { footer, btn, filters, countCss } = classes;
    return (
        <footer className={footer}>
            <span className={countCss}> {count} item left</span>
            <ul className={filters}>
                <li>
                    <button style={{cursor: 'pointer'}} onClick={() => onClick("all")}>All</button>
                </li>
                <li>
                    <button style={{cursor: 'pointer'}} onClick={() => onClick("active")}>Active</button>
                </li>
                <li>
                    <button style={{cursor: 'pointer'}} onClick={() => onClick("completed")}>
                        Completed
                    </button>
                </li>
            </ul>
            <button onClick={onClear} className={btn}>Clear Completed</button>
        </footer>
    )
}

export default Footer