import Login from '../views/Login.js'
import Home from '../views/Home.js'
import Exercise from '../views/Exercise.js'
import GroupMuscle from '../views/GroupMuscle'

const homeView = {
    element: <Home/>,
    path: '/inicio'
}
const LoginView = {
    element: <Login/>,
    path: '/'
}
const groupMuscleView = {
    element: <GroupMuscle/>,
    path: '/grupos-musculares'
}
const ExerciseView = {
    element: <Exercise/>,
    path: '/ejercicios'
}

export default [homeView,LoginView,groupMuscleView, ExerciseView];
