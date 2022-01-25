import React from 'react'

const InfoButton= (props) =>{
    return (
        <btn
        className="btn btn-edit ml-2 fas fa-eye"
        onClick={props.fun}
        data-row={props.rowObject}
        >
        </btn>
    );
}

export default InfoButton;