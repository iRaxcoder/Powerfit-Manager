import React from 'react'

const AddButton= (props) =>{
    return (
        <button 
        className="btn btn-insert mb-2 mt-2"
        onClick={props.onClick}
        >
        {props.text}</button>
    );
}

export default AddButton;