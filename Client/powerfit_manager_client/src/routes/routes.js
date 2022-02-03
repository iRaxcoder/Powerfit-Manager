import Login from '../views/Login.js'
import Home from '../views/Home.js'
import Exercise from '../views/Exercise.js'
import GroupMuscle from '../views/GroupMuscle'
import Sidebar from '../components/layout/Sidebar.js'
import Client from '../views/Client.js'
import Membership from '../views/Membership.js'
import Product from '../views/Product.js'
import Assistance from '../views/Assistance.js'
import Sales from '../views/Sales.js'
import Measures from '../views/Measures.js'
import Routine from '../views/Routine.js'


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
const ClientView = {
    element: <Sidebar><Client/></Sidebar>,
    path: '/clientes'
}

const membershipView = {
    element: <Sidebar><Membership/></Sidebar>,
    path: '/membresia'
}

const productView = {
    element: <Sidebar><Product/></Sidebar>,
    path: '/inventario'
}

const assistanceView = {
    element: <Sidebar><Assistance/></Sidebar>,
    path: '/asistencia'
}

const salesView = {
    element: <Sidebar><Sales/></Sidebar>,
    path: '/ventas'
}

const measuresView = {
    element: <Sidebar><Measures/></Sidebar>,
    path: '/medidas'
}

const routineView = {
    element: <Sidebar><Routine/></Sidebar>,
    path: '/rutinas'
}

export default [homeView,LoginView,groupMuscleView, ExerciseView, ClientView,membershipView,productView,assistanceView,salesView,measuresView,routineView];
