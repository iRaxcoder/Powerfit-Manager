import { useState } from 'react';
import logo from '../assets/img/logo.png'
import '../styles/Login/login.css'
import { useNavigate} from 'react-router-dom'

export default function Login() {

    const history=useNavigate();

    const [user,setUser] = useState({
        userName:'',
        secret:''
    })

    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        })
    }

    const showMenu = () =>{
        document.getElementById('navbar').style.display="block";
     }

    const handleSubmit = (event)=>{
        event.preventDefault();
        //
        showMenu();
        history("/inicio")
    }
    return (
            <div className="form-signin">
                <div className='col col-md-4 mt-4'>
                    <div className='card'>
                        <form method='post' onSubmit={handleSubmit} className='card-body'>
                            <div>
                                <img src={logo} className="responsive mb-5 login__img" alt="logo" />
                                <h2>Ingresar</h2>
                            </div>
                            <div>
                                <input onChange={handleInputChange} className='form-control mt-2' name='userName' placeholder='Usuario'></input>
                                <input onChange={handleInputChange} className='form-control mt-2' type="password" name='secret' placeholder='Contraseña'></input>
                            </div>
                            <button type='submit' className='btn mt-2'>Iniciar Sección</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}


