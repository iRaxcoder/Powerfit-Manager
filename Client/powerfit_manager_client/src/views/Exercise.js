import React, { useState } from "react";
import Modal from 'react-modal'
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";

export default function Ejercicio(){
    
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

    const HandleEdit = () => {
        
    }

    const HandleDelete = () => {
       
    }

    return (
        <div>
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