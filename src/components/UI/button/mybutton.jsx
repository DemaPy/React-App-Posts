import React from "react";
import classes from './MyButton.module.css'


const MyButton = ({children, ...props}) => {
    return (
        <div className={classes.myDivBtn}>
            <button {...props} className={classes.myBtn}>
                {children}
            </button>
        </div>
    )
}

export default MyButton