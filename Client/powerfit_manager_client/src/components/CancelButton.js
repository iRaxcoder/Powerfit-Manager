import React from 'react'

const CancelButton= (props) =>{
    return (
        <btn 
        className="btn btn-cancel ml-2"
        onClick={props.fun}
        >
        Cancelar
        </btn>
    );
}

export default CancelButton;