import Login from '../views/Login.js'
import Home from '../views/Home.js'
import Exercise from '../views/Exercise.js'
import GroupMuscle from '../views/GroupMuscle'
import Sidebar from '../components/layout/Sidebar.js'
import Client from '../views/Client.js'
import Payments from '../views/Payments.js'
import Product from '../views/Product.js'
import Assistance from '../views/Assistance.js'
import Sales from '../views/Sales.js'

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

const PaymentsView = {
    element: <Sidebar><Payments/></Sidebar>,
    path: '/pagos'
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

export default [homeView,LoginView,groupMuscleView, ExerciseView, ClientView,PaymentsView,productView,assistanceView,salesView];
