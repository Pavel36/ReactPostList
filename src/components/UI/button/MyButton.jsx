import React from 'react'
import {myBtn} from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={myBtn}>
            {children}
        </button>
    )
}

export default MyButton
