import React, { useState, useEffect } from "react";
import '../styles/GroupMuscle/groupMuscle.css'
import Modal from 'react-modal'
import muscle from '../service/MuscleGroup.js'
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput } from "../components/CustomInput";
import CancelButton from "../components/CancelButton"

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
    const fetchData = () => {
      muscle.getAll().then(response => {
        setData(response)
      })
    }
    fetchData();
  }, []);
  if (!data) return "No se encuentran datos";


  const toggleModalInsert = () => {
    setIsOpenInsert(!isOpenInsert);

  }

  const toggleModalEdit = () => {
    setIsOpenEdit(!isOpenEdit);

  }

  const toggleModalDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  }


  const handleSubmit = (e) => {
    muscle.insert(e.muscule_group);
    muscle.getAll().then(response => {
      setData(response)
    })
    toggleModalInsert();
  }

  const HandleEdit = (e) => {


  }

  const HandleDelete = () => {

  }

  return (

    <div>
      <h1 className="text-left">Control Grupo Muscular</h1>
      <hr />
      <div className="container text-left">
        <AddButton
          onClick={() => setIsOpenInsert(!isOpenInsert)}
        />
        <Table
          columns={columns}
          data={data}
          funEdit={toggleModalEdit}
          funDelete={toggleModalDelete}
        />
      </div>

      <CustomModal
        props={
          {
            title: 'Insertar grupo muscular',
            isOpen: isOpenInsert
          }
        }
        methods={
          {
            toggleOpenModal: () => setIsOpenInsert(!isOpenInsert)
          }
        }
      >
        <CustomForm onSubmit={handleSubmit}>
          <CustomInput errorMsg="Seleccione grupo muscular" className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton type="submit" />
          <CancelButton/>
        </CustomForm>

      </CustomModal>


      <CustomModal
        props={
          {
            title: 'Actualizar grupo muscular',
            isOpen: isOpenEdit
          }
        }
        methods={
          {
            toggleOpenModal: () => setIsOpenEdit(!isOpenEdit)
          }
        }
      >
        <CustomForm onSubmit={handleSubmit}>
          <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' placeholder='Nombre grupo muscular'></CustomInput>
          <CustomInput className='form-control mt-2' name='muscule_group_name' placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton type="submit" />
          <CancelButton/>
        </CustomForm>

      </CustomModal>

      <CustomModal
        props={
          {
            title: '¿Desea eliminar?',
            isOpen: isOpenDelete
          }
        }
        methods={
          {
            toggleOpenModal: () => setIsOpenEdit(!isOpenDelete)
          }
        }
      >
        <CustomForm onSubmit={handleSubmit}>
          <CustomInput className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton type="submit" />
          <CancelButton/>
        </CustomForm>

      </CustomModal>

    </div>


  );
}
