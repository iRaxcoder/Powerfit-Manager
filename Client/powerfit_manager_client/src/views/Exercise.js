import React, { useEffect, useState } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import {CustomInput} from "../components/CustomInput";
import exercise from './../service/Exercise';
import CancelButton from "../components/CancelButton"

const SUCCESS= 1;

export default function Ejercicio(){

  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [data, setData] = useState(null);
    
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
    useEffect(()=>{
      const fetchExercises = () => {
          exercise.getAll().then(response=>{
          setData(response)
        })
      }
      fetchExercises();
    },[data]);
    if(!data) return "No se encuentran ejercicios";
    
    const handleInsert = (e) => {
      exercise.insert(e).then(response=>{   
          if(response.msg===SUCCESS){
            alert("Agregado con éxito")
          }
      })
      setIsOpenInsert(false);
    }

    const HandleEdit = () => {
      
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
                data={data}
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
        </div>
    );
}