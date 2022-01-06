import React, { useState } from 'react'

const useModalMsg= (props) =>{
    const [onToggleMsg, setOnToggleMsg]= useState(false);
    const 
    return (
        <Modal
         isOpen={onToggleMsg}
         onRequestClose={()=>setOnToggleMsg(!onToggleMsg)}
         className="modal_"
         overlayClassName="overlay_"
         closeTimeoutMS={500}
      >
        <h3 className="modal-header text-left">{title}</h3>
        <div className='modal-body'>
        {Children.map(children, child => {
              return child.props.name
                ? createElement(child.type, {
                  ...{
                    ...child.props,
                    //register: methods.register,
                    key: child.props.name
                  }
                })
                : child;
            })}
        </div>
      </Modal>
    );
}

export default AddButton;