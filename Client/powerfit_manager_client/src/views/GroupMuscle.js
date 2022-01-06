import React, { useState, useEffect, useRef } from "react";
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
  const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
  const dataRef = useRef();
  dataRef.current = data;
  const [element, setElement] = useState([
    {
      ID_MUSCULAR: '',
      NOMBRE_GRUPO_MUSCULAR: ''
    }
  ])

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

  const fetchData = () => {
    muscle.getAll().then(response => {
      setData(response)
    })
  }

  useEffect(() => {
    fetchData();
  }, [setData]);
  if (!data) return "No se encuentran datos";


  const toggleModalInsert = () => {
    setIsOpenInsert(!isOpenInsert);

  }

  const toggleModalEdit = (e) => {
    const groupMuscle = JSON.parse(e.target.dataset.row);
    setElement({
      ID_MUSCULAR: groupMuscle.ID_MUSCULAR,
      NOMBRE_GRUPO_MUSCULAR: groupMuscle.NOMBRE_GRUPO_MUSCULAR
    });
    setIsOpenEdit(!isOpenEdit);


  }

  const toggleModalDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  }

  const handleChange = (e) => {
    setElement({ NOMBRE_GRUPO_MUSCULAR: e.muscule_group_name })
  };

  const handleInsert = (e) => {
    muscle.insert(e.muscule_group).then(response => {
      setModalMsg(prevState =>({
        ...prevState,
        msg: response,
        isMsgOpen: true
      }));
      fetchData();
    });
    toggleModalInsert();
  }

  const HandleEdit = (e) => {
    muscle.update(e.muscule_group_id, e.muscule_group_name).then(response => {
      setModalMsg(prevState =>({
        ...prevState,
        msg: response,
        isMsgOpen: true
      }));
      fetchData();
    });
    setIsOpenEdit(!isOpenEdit);

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
          text="Insertar"
        />
        <Table
          columns={columns}
          data={data}
          aux={dataRef.current}
          funEdit={(e) => toggleModalEdit(e)}
          funDelete={toggleModalDelete}
        />
      </div>

      <CustomModal
        props={{ title: 'Insertar grupo muscular', isOpen: isOpenInsert }}
        methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
      >
        <CustomForm onSubmit={handleInsert}>
          <CustomInput errorMsg="Seleccione grupo muscular" className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton text="Insertar" type="submit" />
          <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
        </CustomForm>

      </CustomModal>


      <CustomModal
        props={{ title: 'Actualizar grupo muscular', isOpen: isOpenEdit }}
        methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
      >
        <CustomForm onSubmit={HandleEdit}>
          <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' value={element.ID_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
          <CustomInput className='form-control mt-2' name='muscule_group_name' onChange={handleChange} value={element.NOMBRE_GRUPO_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton text="Guardar cambios" type="submit" />
          <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
        </CustomForm>

      </CustomModal>

      <CustomModal
        props={{ title: '¿Desea eliminar?', isOpen: isOpenDelete }}
        methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenDelete) }}
      >
        <CustomForm onSubmit={HandleDelete}>
          <CustomInput className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton text="Si" type="submit" />
          <CancelButton />
        </CustomForm>

      </CustomModal>

      <CustomModal
        props={{ title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen }}
        methods={{ toggleOpenModal: () => setModalMsg(!modalMsg.isMsgOpen) }}
      >
        <p>{modalMsg.msg}</p>
      </CustomModal>

    </div>


  );
}
