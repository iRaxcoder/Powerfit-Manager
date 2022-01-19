import React, {Children, createElement} from 'react';
import './../styles/Modal/Modal.css'
import Modal from 'react-modal'

Modal.setAppElement("#root");

export default function CustomModal ({props, children, methods}){
    const {title, isOpen} = props;
    const {toggleOpenModal} = methods;
    return (
        <Modal
         isOpen={isOpen}
         onRequestClose={toggleOpenModal}
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