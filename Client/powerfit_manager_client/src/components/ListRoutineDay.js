const RoutineItem= (props) =>{
    return (
        <>
         <div className="routine__list_exercise">
                <p className="list__day_exercise">{props.ExerciseName} 
                <span className='text-dark'> || </span>
                <span className='small'> {props.Details}</span>
                </p>
           </div>
        </>
    );
}

export default RoutineItem;