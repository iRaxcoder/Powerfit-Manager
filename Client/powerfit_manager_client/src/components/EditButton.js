import React from 'react'

const EditButton= (props) =>{
    return (
        <btn
        className="btn btn-edit fas fa-edit"
        onClick={props.fun}
        data-row={props.rowObject}
        >
        </btn>
    );
}

export default EditButton;