import React, { useState, useEffect } from "react";
import '../styles/GroupMuscle/groupMuscle.css'
import Modal from 'react-modal'
import muscle from '../service/MuscleGroup.js'
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";

Modal.setAppElement("#root");

export default function GrupoMuscular() {
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [data, setData] = useState(null);


  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'ID_MUSCULAR', // accessor is the "key" in the data
      },
      {
        Header: 'Musculo',
        accessor: 'NOMBRE_GRUPO_MUSCULAR',
      }
    ],
    []
  )

  useEffect(() => {
    muscle.getAll().then((response) => {
          setData(response);
    });
  }, []);
  if (!data) return null;

  function toggleModalInsert() {
    setIsOpenInsert(!isOpenInsert);
  }

  function toggleModalEdit() {
    setIsOpenEdit(!isOpenEdit);
  }

  function toggleModalDelete() {
    setIsOpenDelete(!isOpenDelete);
  }

  const HandleEdit = () => {
        
  }

  const HandleDelete = () => {
     
  }

  return (

    <div>
      <h3 className="mt-4 text-left pl-6">Control Grupo Muscular</h3>
      <hr />
      <div className="container text-left">
        <AddButton />
         <Table
          columns={columns}
          data={data}
          funEdit={HandleEdit}
          funDelete={HandleDelete}
        />
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


  );
}
