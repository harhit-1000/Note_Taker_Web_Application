import React from 'react'

export const Alert = (props) => {
    return (
        <div className={`alert alert-${props.type} alert-dismissible fade show`}>
             <strong>{props.message}</strong>
        </div>
    )
}