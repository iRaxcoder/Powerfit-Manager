import React, { useState } from 'react'
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";
import AddButton from "../components/AddButton";
import CancelButton from "../components/CancelButton";

const RoutineItem= (props) =>{
    const [isOpenEditRoutine, setIsOpenEditRoutine]=useState(false);
    const [isOpenDeleteRoutine, setIsOpenDeleteRoutine]=useState(false);
    return (
        <>
           <div className="routine__item">
                <p className="routine__date">{props.date}</p>
                <div className='routine__options'>
                    <InfoButton fun={props.onViewRoutine}/>
                    <EditButton/>
                    <button onClick={()=>console.log("prueba")} className="btn btn-danger delete__btn">X</button>
                </div>
                <CustomModal 
                props={{title: 'Modificar información general de rutina', isOpen: isOpenEditRoutine}}
                methods={{toggleOpenModal: ()=>setIsOpenEditRoutine(!isOpenEditRoutine)}}
                >
                </CustomModal>
                <CustomModal 
                props={{title: '¿Está seguro que desea eliminar?', isOpen: isOpenDeleteRoutine}}
                methods={{toggleOpenModal: ()=>setIsOpenDeleteRoutine(!isOpenDeleteRoutine)}}
                >
                    <CustomForm onSubmit={props.onDelete}>
                        <AddButton text="Sí"/>
                        <CancelButton fun={()=>setIsOpenDeleteRoutine(false)}/>
                    </CustomForm>
                </CustomModal>
            </div>
        </>
    );
}

export default RoutineItem;