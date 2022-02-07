import React from 'react'

const RoutineDay= ({children,DayName}) =>{
    return (
        <>
            <div className="routine__day">
                <h5 className="day__name">{DayName}</h5>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}

export default RoutineDay;