import React from 'react'

const InfoButton= (props) =>{
    return (
        <btn
        className="btn btn-edit fas fa-eye"
        onClick={props.fun}
        data-row={props.rowObject}
        >
        </btn>
    );
}

export default InfoButton;