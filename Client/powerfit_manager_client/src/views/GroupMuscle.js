import React, { useState, useEffect, useRef } from "react";
import '../styles/GroupMuscle/groupMuscle.css'
import Modal from 'react-modal'
import muscle from '../service/MuscleGroup.js'
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput, SingleCustomInput} from "../components/CustomInput";
import CancelButton from "../components/CancelButton"
import commonDB from "../service/CommonDB";
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
    commonDB.getAll({ header: "grupo_muscular" }).then(response => {
      setData(response)
    })
  }

  useEffect(() => {
    fetchData();
  }, []);
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

  const toggleModalDelete = (e) => {
    const groupMuscle = JSON.parse(e.target.dataset.row);
    setElement({
      ID_MUSCULAR: groupMuscle.ID_MUSCULAR,
      NOMBRE_GRUPO_MUSCULAR: groupMuscle.NOMBRE_GRUPO_MUSCULAR
    });
    setIsOpenDelete(!isOpenDelete);
  }

  const handleChange = (e) => {
    setElement({ NOMBRE_GRUPO_MUSCULAR: e.muscule_group_name })
  };

  const handleInsert = (e) => {
    console.log(e);
    commonDB.insert({ header: "grupo_muscular", size: "1", object: e }).then(response => {
      setModalMsg(prevState => ({
        ...prevState,
        msg: response,
        isMsgOpen: true
      }));
      fetchData();
    });
    toggleModalInsert();
  }

  const HandleEdit = (e) => {
    commonDB.update({ header: "grupo_muscular", size: "2", object: e }).then(response => {
      setModalMsg(prevState => ({
        ...prevState,
        msg: response,
        isMsgOpen: true
      }));
      fetchData();
    });
    setIsOpenEdit(!isOpenEdit);

  }

  const HandleDelete = (e) => {
    commonDB.delete({ header: "grupo_muscular", object: { id: e.muscule_group_id } }).then(response => {
      setModalMsg(prevState => ({
        ...prevState,
        msg: response,
        isMsgOpen: true
      }));
      fetchData();
    });
    setIsOpenDelete(!isOpenDelete);

  }
  const handleSearch = (e) => {
    console.log(e.target.value);
    if(e.target.value===undefined || e.target.value ===""){
      fetchData();
    }else{
      commonDB.getSearch({header: "grupo_muscular",find:e.target.value}).then(response=>{
        setData(response);
      })
    }
  }
  return (

    <div>
      <h1 className="text-left">Control Grupo Muscular</h1>
      <hr />
      <div className="container text-left">
        <div className="container-insert-search__">
          <AddButton text="Insertar" onClick={() => setIsOpenInsert(true)} />
          <SingleCustomInput onChange={handleSearch} errorMsg="Nombre grupoo muscular" placeholder="Buscar" name="input" className="form-control" />
        </div>
        <Table
          columns={columns}
          data={data}
          aux={dataRef.current}
          funEdit={(e) => toggleModalEdit(e)}
          funDelete={(e) => toggleModalDelete(e)}
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
          <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' value={element.ID_MUSCULAR} placeholder='Id grupo muscular'></CustomInput>
          <CustomInput className='form-control mt-2' name='muscule_group_name' onChange={handleChange} value={element.NOMBRE_GRUPO_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton text="Guardar cambios" type="submit" />
          <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
        </CustomForm>

      </CustomModal>

      <CustomModal
        props={{ title: '¿Desea eliminar?', isOpen: isOpenDelete }}
        methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
      >
        <CustomForm onSubmit={HandleDelete}>
          <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' value={element.ID_MUSCULAR} placeholder='ID grupo muscular'></CustomInput>
          <CustomInput className='form-control mt-2' name='muscule_group' value={element.NOMBRE_GRUPO_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
          <AddButton text="Si" type="submit" />
          <CancelButton fun={() => setIsOpenDelete(!isOpenDelete)} />
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
