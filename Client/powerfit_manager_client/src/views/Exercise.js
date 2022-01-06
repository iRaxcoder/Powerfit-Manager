import React, { useEffect, useState, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import {CustomInput} from "../components/CustomInput";
import exercise from './../service/Exercise';
import muscle from './../service/MuscleGroup';
import CancelButton from "../components/CancelButton";

const SUCCESS= 1;
const TIP = 0;
const ERROR = -1;

export default function Ejercicio(){

  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [ExercisesList, setExercisesList] = useState(null);
  const [MuscleGroupList, setMuscleGroupList] = useState(null);
  const dataRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});

  dataRef.current=ExercisesList;
    
  const columns = React.useMemo(
      () => [
        {
          Header: '#',
          accessor: 'ID_EJERCICIO', // accessor is the "key" in the data
          },
          {
            Header: 'Ejercicio',
            accessor: 'NOMBRE_EJERCICIO',
          },
          {
            Header: 'Grupo muscular',
            accessor: 'NOMBRE_MUSCULAR',
          },
        ],
      []
    )

  const fetchExercises = () => {
      exercise.getAll().then(response=>{
      setExercisesList(response)
    })
  }

  const fetchMuscleGroups = () => {
    muscle.getAll().then(response=>{
      setMuscleGroupList(response)
    })
  }
  
  useEffect(()=>{
    fetchExercises();
    fetchMuscleGroups();
  },[setExercisesList]);

  if(!ExercisesList) return "No se encuentran ejercicios";
    
    const handleInsert = (e) => {
      exercise.insert(e).then(response=>{   
          if(response.msg===SUCCESS){
            setModalMsg(prevState =>({
              ...prevState,
              msg: "agregado con éxito",
              isMsgOpen: true
            }));
            fetchExercises();
          }
      })
      setIsOpenInsert(false);
      
    }

    const HandleEdit = (e) => {
      const exercise = JSON.parse(e.target.dataset.row);
    }

    const HandleDelete = () => {
       
    }

    return (
        <div>
            <h1 className="text-left">Control de ejercicios</h1>
            <hr/>
            <div className="container text-left">   
                <AddButton onClick={()=>setIsOpenInsert(!isOpenInsert)} />
                <Table
                columns={columns}
                data={ExercisesList}
                aux={dataRef.current}
                funEdit={HandleEdit}
                funDelete={HandleDelete}
                />
            </div>
            <CustomModal
             props={
               {
                 title: 'Insertar ejercicio',
                 isOpen: isOpenInsert
               }
             }
             methods={
               {
                toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)
               }
             }
            >
            <CustomForm onSubmit={handleInsert}>
              <CustomInput errorMsg="Inserte nombre del ejercicio" className='form-control mt-2' name='exercise' placeholder='Nombre ejercicio'></CustomInput>
              <CustomInput errorMsg="Seleccione grupo muscular"  className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
              <AddButton/>
              <CancelButton fun={()=>setIsOpenInsert(false)}/>
            </CustomForm>
          </CustomModal>
          <CustomModal
             props={
               {
                 title: 'Mensaje del sistema',
                 isOpen: modalMsg.isMsgOpen
               }
             }
             methods={
               {
                toggleOpenModal: ()=>setModalMsg(!modalMsg.isMsgOpen)
               }
             }
            >
            <p>{modalMsg.msg}</p>
          </CustomModal>
        </div>
    );
}