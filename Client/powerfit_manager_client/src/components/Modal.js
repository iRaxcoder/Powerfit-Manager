import React, {useState} from 'react';
import './../styles/Modal/Modal.css'
import Modal from 'react-modal'

export default function CustomModal (props){
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={setIsOpen(!isOpen)}
        className="modal_"
        overlayClassName="overlay_"
        closeTimeoutMS={500}
      >
        <div className="modal-title">props.title</div>

        <div className='modal-body'>
            
        </div>
      </Modal>
    );
}