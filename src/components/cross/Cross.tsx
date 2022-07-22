import React from 'react'
import classes from './cross.module.css'
const Cross = ({onHover, onHoverLeave}: any) => {
    return (
        <>
             <a href="#" onMouseLeave={onHoverLeave} onMouseEnter={onHover} className={classes.close} tabIndex={0} role="button">close</a>
        </>
    )
}

export default Cross