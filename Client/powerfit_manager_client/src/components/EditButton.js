import React from 'react'

const EditButton= (props) =>{
    return (
        <btn
        className="btn btn-edit"
        onClick={props.fun}
        >
        <i class="fas fa-edit"></i>
        </btn>
    );
}

export default EditButton;