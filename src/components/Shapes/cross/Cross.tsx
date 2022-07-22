import React from 'react'
import classes from './cross.module.css'
const Cross = ({onClick}: any) => {
    return (
        <>
             <a href="``" onClick={onClick} className={classes.close} tabIndex={0} role="button">close</a>
        </>
    )
}

export default Cross