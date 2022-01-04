import React, { useState } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import {CustomInput} from "../components/CustomInput";

export default function Ejercicio(){

  const [isOpenInsert, setIsOpenInsert] = useState(false);
    
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
    
    const data = React.useMemo(
        () => [
          {
            ID_EJERCICIO: 'Hello',
            NOMBRE_EJERCICIO: 'World',
            NOMBRE_MUSCULAR: 'you want',
          },
          {
            ID_EJERCICIO: 'Hello',
            NOMBRE_EJERCICIO: 'World',
            NOMBRE_MUSCULAR: 'you want',
          },
          {
            ID_EJERCICIO: 'Hello',
            NOMBRE_EJERCICIO: 'World',
            NOMBRE_MUSCULAR: 'you want',
          },
        ],
        []
    )

    const handleSubmit = (e) => {
      console.log(e.exercise);
    }

    const HandleEdit = () => {
      setIsOpenInsert(true);
    }

    const HandleDelete = () => {
       
    }

    return (
        <div>
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
            <CustomForm onSubmit={handleSubmit}>
              <CustomInput className='form-control mt-2' name='exercise' placeholder='Nombre ejercicio'></CustomInput>
              <CustomInput className='form-control mt-2' name='muscule_group' placeholder='Nombre grupo muscular'></CustomInput>
              <button type="submit" className='mt-2 btn button__'>Insertar</button>
              <button className='mt-2  btn button__' >Cancelar</button>
            </CustomForm>
            
          </CustomModal>
            
            <h1 className="text-left">Control de ejercicios</h1>
            <hr/>
            <div className="container text-left">   
                <AddButton/>
                <Table
                columns={columns}
                data={data}
                funEdit={HandleEdit}
                funDelete={HandleDelete}
                />
            </div>
        </div>
    );
}