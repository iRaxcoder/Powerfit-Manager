import React from 'react'

const RoutineDay= ({children,DayName,className="routine__day"}) =>{
    return (
        <>
            <div className={className}>
                <h5 className="day__name">{DayName}</h5>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}

export default RoutineDay;