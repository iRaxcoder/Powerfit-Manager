import React, { useEffect, useState, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import {CustomInput, CustomSelect} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";

export default function Ejercicio(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [exerciseEdited, setExerciseEdited] = useState({id:0, exercise:"default", muscleGroup:"dafault"});
  const [exercisesList, setExercisesList] = useState(null);
  const [muscleGroupList, setMuscleGroupList] = useState(null);
  const exercisesListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  exercisesListRef.current=exercisesList;
    
  const columns = React.useMemo(
      () => [
        {
          Header: '#',
          accessor: 'ID_EJERCICIO',
          },
          {
            Header: 'Ejercicio',
            accessor: 'NOMBRE_EJERCICIO',
          },
          {
            Header: 'Grupo muscular',
            accessor: 'NOMBRE_GRUPO_MUSCULAR',
          },
        ],
      []
    )

  const fetchExercises = () => {
      commonDB.getAll({header:"ejercicio"}).then(response=>{
      setExercisesList(response)
    })
  }

  const fetchMuscleGroups = () => {
    commonDB.getAll({header:"grupo_muscular"}).then(response=>{
      setMuscleGroupList(response)
    })
  }
  
  useEffect(()=>{
    fetchExercises();
    fetchMuscleGroups();
  },[setExercisesList]);

  if(!exercisesList) return "No se encuentran ejercicios";
    
    const handleInsert = (e) => {
      commonDB.insert({header:"ejercicio",size:"2", object: e}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
        fetchExercises();
      })
      setIsOpenInsert(false);
    }

    const HandleOpenEdit = (e) => {
      const exercise = JSON.parse(e.target.dataset.row);
      setExerciseEdited({id:exercise.ID_EJERCICIO,exercise:exercise.NOMBRE_EJERCICIO, muscleGroup: exercise.NOMBRE_GRUPO_MUSCULAR})
      setIsOpenEdit(true);
    }

    const HandleEdit = () => {
        commonDB.update({header:"ejercicio",size:"3", object: exerciseEdited}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
          fetchExercises();
        })
      setIsOpenEdit(false);
    }

    const HandleOpenDelete = (e) => {
      const exercise = JSON.parse(e.target.dataset.row);
      setExerciseEdited({id:exercise.ID_EJERCICIO,exercise:exercise.NOMBRE_EJERCICIO})
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"ejercicio",size:"1", object: {id:exerciseEdited.id}}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchExercises();
      })
    setIsOpenDelete(false);
    }

    return (
        <div>
            <h1 className="text-left">Control de ejercicios</h1>
            <hr/>
            <div className="container text-left">   
                <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                <Table
                  columns={columns}
                  data={exercisesList}
                  aux={exercisesListRef.current}
                  funEdit={HandleOpenEdit}
                  funDelete={HandleOpenDelete}
                />
            </div>
            <CustomModal
              props={{title: 'Insertar ejercicio', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
              <CustomForm onSubmit={handleInsert}>
                <CustomInput errorMsg="Inserte nombre del ejercicio" className='form-control mt-2' name='exercise_insert' placeholder='Nombre ejercicio'></CustomInput>
                <CustomSelect focus="NOMBRE_GRUPO_MUSCULAR" errorMsg="Seleccione un grupo muscular"  className='form-control mt-2' name='muscule_group_insert' placeholder='Nombre grupo muscular' options={muscleGroupList}></CustomSelect>
                <AddButton text="Insertar"/>
                <CancelButton fun={()=>setIsOpenInsert(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: 'Modificar ejercicio', isOpen: isOpenEdit}}
              methods={{toggleOpenModal: ()=>setIsOpenEdit(!isOpenEdit)}}
                >
              <CustomForm onSubmit={HandleEdit}>
                <CustomInput type="hidden" value={exerciseEdited.id} className='form-control mt-2' name='exerciseId'/>
                <CustomInput name='exerciseEdit' onChange={(e)=>setExerciseEdited(prevState =>({...prevState,exercise:e.target.value}))} value={exerciseEdited.exercise} errorMsg="Escriba el nombre del ejercicio" className='form-control mt-2' placeholder='Nombre ejercicio'/>
                <CustomSelect value={exerciseEdited.muscleGroup} onChange={(e)=>setExerciseEdited(prevState =>({...prevState,muscleGroup:e.target.value}))} focus="NOMBRE_GRUPO_MUSCULAR" errorMsg="Seleccione un grupo muscular"  className='form-control mt-2' name='muscleGroupSelect' placeholder='Nombre grupo muscular' options={muscleGroupList}/>
                <AddButton type="submit" text="Guardar cambios"/>
                <CancelButton fun={()=>setIsOpenEdit(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar '"+ exerciseEdited.exercise+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={exerciseEdited.id} className='form-control mt-2' name='exerciseId'/>
                <AddButton text="Sí, estoy seguro"/>
                <CancelButton fun={()=>setIsOpenDelete(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal 
              props={{title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen}}
              methods={{toggleOpenModal: ()=>setModalMsg(!modalMsg.isMsgOpen)}}
              >
              <p>{modalMsg.msg}</p>
            </CustomModal>
        </div>
    );
}