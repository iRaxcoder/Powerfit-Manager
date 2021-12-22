import React, { useState } from "react";
import '../styles/GroupMuscle/groupMuscle.css'
import Modal from 'react-modal'


const data = [
  { id: 1, musculo: "Abdomen" },
  { id: 2, musculo: "Pierna" },

];

Modal.setAppElement("#root");

export default function GrupoMuscular() {
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function toggleModalInsert() {
    setIsOpenInsert(!isOpenInsert);
  }

  function toggleModalEdit() {
    setIsOpenEdit(!isOpenEdit);
  }

  function toggleModalDelete() {
    setIsOpenDelete(!isOpenDelete);
  }

  return (

    <div>
      <h3 className="mt-4 text-left pl-6">Control Grupo Muscular</h3>
      <hr />
      <div className="GrupoMuscular">
        <div className='col col-md-4 table-responsive table__'>
          <button className="btn button__" onClick={toggleModalInsert}>Insertar</button>
          <table className="table table-striped table-dark mt-2 ">
            <thead>
              <tr>
                <th>#</th>
                <th>Musculo</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {data.map((dato) => (
                <tr key={dato.id}>
                   <td>{dato.id}</td>
                  <td>{dato.musculo}</td>
                  <td>
                    <btn className="btn btn-edit"><i class="fas fa-edit"></i></btn>
                    <btn className="btn btn-delete ml-2"><i class="fas fa-trash-alt"></i></btn>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <Modal
          isOpen={isOpenInsert}
          onRequestClose={toggleModalInsert}
          className="modal_"
          overlayClassName="overlay_"
          closeTimeoutMS={500}
        >
          <div className="text-center">Insertar Grupo Muscular</div>

          <input className='form-control mt-2' name='groupMuscle' placeholder='Nombre grupo muscular'></input>

          <button className='mt-2 ml-3 button__' onClick={toggleModalInsert}>Insertar</button>
          <button className='mt-2 ml-3 button__' onClick={toggleModalInsert}>Cancelar</button>
        </Modal>

        <Modal
          isOpen={isOpenEdit}
          onRequestClose={toggleModalEdit}
          className="modal_"
          overlayClassName="overlay_"
          closeTimeoutMS={500}
        >
          <div className="text-center">Actualizar Grupo Muscular</div>

          <input className='form-control mt-2' name='groupMuscle' placeholder='Nombre grupo muscular'></input>

          <button className='mt-2 ml-3 button__' onClick={toggleModalInsert}>Actualizar</button>
          <button className='mt-2 ml-3 button__' onClick={toggleModalEdit}>Cancelar</button>
        </Modal>

        <Modal
          isOpen={isOpenDelete}
          onRequestClose={toggleModalDelete}
          className="modal_"
          overlayClassName="overlay_"
          closeTimeoutMS={500}
        >
          <div className="text-center">¿Desea eliminar?</div>

          <button className='mt-2 ml-3 button__' onClick={toggleModalDelete}>Aceptar</button>
          <button className='mt-2 ml-3 button__' onClick={toggleModalDelete}>Cancelar</button>
        </Modal>
      </div>
    </div>

  );
}
