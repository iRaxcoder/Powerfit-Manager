import Login from '../views/Login.js'
import Home from '../views/Home.js'
import GrupoMuscular from '../views/GrupoMuscular.js'

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
    path: '//grupos-musculares'
}

export default [homeView,LoginView,grupoMuscularView];
