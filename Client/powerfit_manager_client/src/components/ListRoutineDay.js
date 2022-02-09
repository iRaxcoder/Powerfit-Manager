import React, { useState } from 'react'
import CustomModal from "../components/CustomModal";
import InfoButton from "./InfoButton";

const RoutineItem= (props) =>{
    const [isOpenDetails, setIsOpenDetails]=useState(false);
    return (
        <>
         <div onClick={()=>setIsOpenDetails(!isOpenDetails)} className="routine__list_exercise">
                <p className="list__day_exercise">{props.ExerciseName}</p>
                <CustomModal 
                props={{title: 'Indicaciones para '+props.ExerciseName, isOpen: isOpenDetails}}
                methods={{toggleOpenModal: ()=>setIsOpenDetails(!isOpenDetails)}}
                >
                <p>{props.Details}</p>
                </CustomModal>
           </div>
        </>
    );
}

export default RoutineItem;