import React from 'react'

const DeleteButton= (props) =>{
    return (
        <btn 
        className="btn btn-delete ml-2 fas fa-trash-alt"
        onClick={props.fun}
        data-row={props.rowObject}
        >
        {props.text}
        </btn>
    );
}

export default DeleteButton;