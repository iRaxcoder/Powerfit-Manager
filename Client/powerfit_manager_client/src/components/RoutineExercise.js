import React from 'react'
import InfoButton from "../components/InfoButton";

const RoutineExercise= (props) =>{
    return (
        <div className="exercise">
            <p className="exercise__name">{props.ExerciseName}</p>
            <div className='exercise__options'>
                <InfoButton/>
                <button className="btn btn-danger delete__btn">X</button>
            </div>
        </div>
    );
}

export default RoutineExercise;