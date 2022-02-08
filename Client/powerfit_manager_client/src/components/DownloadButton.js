import React from 'react'

const DownloadButton= (props) =>{
    return (
        <button 
        className={"btn btn-edit far fa-arrow-alt-circle-down ml-4 mb-2 mt-2 "+props.flex}
        onClick={props.onClick}
        >
        {props.text}</button>
    );
}

export default DownloadButton;