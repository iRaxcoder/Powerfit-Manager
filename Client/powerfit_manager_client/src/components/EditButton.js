import React from 'react'

const EditButton= (props) =>{
    return (
        <btn
        className="btn btn-edit"
        onClick={props.fun}
        data-row= {props.data}
        >
        <i class="fas fa-edit"></i>
        </btn>
    );
}

export default EditButton;