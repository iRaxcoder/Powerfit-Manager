import Login from '../views/Login.js'
import Home from '../views/Home.js'
import GrupoMuscular from '../views/GrupoMuscular'
import Exercise from '../views/Exercise.js'
const homeView = {
    element: <Home/>,
    path: '/inicio'
}
const LoginView = {
    element: <Login/>,
    path: '/'
}
const grupoMuscularView = {
    element: <GrupoMuscular/>,
    path: '/grupos-musculares'
}
const ExerciseView = {
    element: <Exercise/>,
    path: '/ejercicios'
}

export default [homeView,LoginView,grupoMuscularView, ExerciseView];
