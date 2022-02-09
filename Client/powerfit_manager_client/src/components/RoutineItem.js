import React, { useState } from 'react'
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";
import AddButton from "../components/AddButton";
import CancelButton from "../components/CancelButton";
import {useForm} from "react-hook-form"
import { CustomInput } from './CustomInput';
import commonDB from '../service/CommonDB';

const RoutineItem= (props) =>{
    const [isOpenEditRoutine, setIsOpenEditRoutine]=useState(false);
    const [isOpenDeleteRoutine, setIsOpenDeleteRoutine]=useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});

    const onSubmitEdit = (info) => {
        commonDB.update({header:"rutina",size:"6", object: info}).then(response=>{   
            setModalMsg(prevState =>({
              ...prevState,
              msg: response,
              isMsgOpen: true
            }));
          })
        props.onFetch();
        setIsOpenEditRoutine(false);
    }

    const onSubmitDelete = () => {
        commonDB.delete({header:"rutina", object: {id:props.Routine.ID_RUTINA}}).then(response=>{
        });
        props.onFetch();
        setIsOpenDeleteRoutine(false);
    }

    return (
        <>
           <div className="routine__item">
                <p className="routine__date">{props.Routine.FECHA}</p>
                <div className='routine__options'>
                    <InfoButton fun={props.onViewRoutine}/>
                    <EditButton fun={()=>setIsOpenEditRoutine(!isOpenEditRoutine)}/>
                    <button onClick={()=>setIsOpenDeleteRoutine(!isOpenDeleteRoutine)} className="btn btn-danger delete__btn">X</button>
                </div>
                <CustomModal 
                props={{title: 'Modificar información general de rutina', isOpen: isOpenEditRoutine}}
                methods={{toggleOpenModal: ()=>setIsOpenEditRoutine(!isOpenEditRoutine)}}
                >
                  <form noValidate onSubmit={handleSubmit(onSubmitEdit)}>
                    <div className="row">
                            <CustomInput type="hidden" register={register} name="routineId" defaultValue={props.Routine.ID_RUTINA}></CustomInput>
                            <div className="col">
                                <label>Nivel:</label>
                                <CustomInput defaultValue={props.Routine.NIVEL} register={register} name="level" placeholder='Nivel'/>
                            </div>
                            <div className="col">
                                <label>Tipo:</label>
                                <CustomInput defaultValue={props.Routine.TIPO} name="type" register={register} placeholder='Tipo'/>
                            </div>
                            <div className="col">
                                <label>Objetivo:</label>
                                <CustomInput defaultValue={props.Routine.OBJETIVO} name="objetive" register={register} placeholder='Objetivo'/>
                            </div>
                            <div className="col">
                                <label>Porcentaje:</label>
                                <CustomInput defaultValue={props.Routine.PORCENTAJE} name="percent" register={register} placeholder='Porcentaje'/>
                            </div>
                            <div className="col">
                                <label>Pausa:</label>
                                <CustomInput defaultValue={props.Routine.PAUSA} name="pause" register={register} placeholder='Pausa'/>
                            </div>
                        </div>
                        <p className='small mt-2'>(Al modificar, la fecha se verá actualizada)</p>
                        <AddButton text="Sí"/>
                        <CancelButton fun={()=>setIsOpenEditRoutine(false)}/>
                    </form>
                </CustomModal>
                <CustomModal 
                props={{title: '¿Está seguro que desea eliminar?', isOpen: isOpenDeleteRoutine}}
                methods={{toggleOpenModal: ()=>setIsOpenDeleteRoutine(!isOpenDeleteRoutine)}}
                >
                    <p>Rutina del {props.date}</p>
                    <p>Cliente: {props.client} </p> 
                    <CustomForm onSubmit={onSubmitDelete}>
                        <AddButton text="Sí"/>
                        <CancelButton fun={()=>setIsOpenDeleteRoutine(false)}/>
                    </CustomForm>
                </CustomModal>
                <CustomModal 
                props={{title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen}}
                methods={{toggleOpenModal: ()=>setModalMsg(!modalMsg.isMsgOpen)}}
                >
                <p>{modalMsg.msg}</p>
                </CustomModal>
            </div>
        </>
    );
}

export default RoutineItem;