import React from 'react'

const AddButton= (props) =>{
    return (
        <button 
        className="btn btn-insert mb-2 mt-2"
        onClick={props.onClick}
        >
        Insertar</button>
    );
}

export default AddButton;