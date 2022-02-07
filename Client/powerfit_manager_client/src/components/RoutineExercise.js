import React, { useState } from 'react'
import InfoButton from "../components/InfoButton";
import CustomModal from "../components/CustomModal";

const RoutineExercise= ({exercise,onDelete}) =>{
    const [isOpenShowDetails, setIsOpenShowDetails]=useState(false);
    return (
        <div className="exercise">
            <input type="hidden" value={exercise.exerciseId}></input>
            <p className="exercise__name">{exercise.exerciseName}</p>
            <div className='exercise__options'>
                <InfoButton fun={()=>setIsOpenShowDetails(!isOpenShowDetails)}/>
                <button onClick={onDelete} className="btn btn-danger delete__btn">X</button>
            </div>
            <CustomModal 
              props={{title: 'Detalles del ejercicio', isOpen: isOpenShowDetails}}
              methods={{toggleOpenModal: ()=>setIsOpenShowDetails(!isOpenShowDetails)}}
              >
              <p>{exercise.details}</p>
            </CustomModal>
        </div>
    );
}

export default RoutineExercise;