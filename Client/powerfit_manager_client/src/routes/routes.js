import Login from '../views/Login.js'
import Home from '../views/Home.js'
import Exercise from '../views/Exercise.js'
import GroupMuscle from '../views/GroupMuscle'
import Sidebar from '../components/layout/Sidebar.js'

const homeView = {
    element: <Sidebar><Home/></Sidebar>,
    path: '/inicio'
}
const LoginView = {
    element: <Login/>,
    path: '/'
}
const groupMuscleView = {
    element: <Sidebar><GroupMuscle/></Sidebar>,
    path: '/grupos-musculares'
}
const ExerciseView = {
    element: <Sidebar><Exercise/></Sidebar>,
    path: '/ejercicios'
}

export default [homeView,LoginView,groupMuscleView, ExerciseView];
