import React from 'react'

const DeleteButton= (props) =>{
    return (
        <btn 
        className="btn btn-delete ml-2"
        onClick={props.fun}
        >
        <i class="fas fa-trash-alt"></i>
        </btn>
    );
}

export default DeleteButton;