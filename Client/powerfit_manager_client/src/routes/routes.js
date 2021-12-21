import Login from '../views/Login.js'
import Home from '../views/Home.js'
import Sidebar from '../components/layout/Sidebar.js'

const clientView ={
    element: <Login/>,
    path: '/'
}

const homeView ={
    element: <Home/>,
    path: '/inicio'
}

const menu={
    element: <Sidebar/>,
    path: '/menu'
}

export default [clientView,homeView, menu];
