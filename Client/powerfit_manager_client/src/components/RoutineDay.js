import React from 'react'
import InfoButton from "../components/InfoButton";

const RoutineDay= ({children,DayName,ExerciseName}) =>{
    return (
        <>
            <div className="routine__day">
                <h5 className="day__name">{DayName}</h5>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
                    <div className="exercise">
                        <p className="exercise__name">{ExerciseName}</p>
                        <div className='exercise__options'>
                            <InfoButton/>
                            <button className="btn btn-danger delete__btn">X</button>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default RoutineDay;