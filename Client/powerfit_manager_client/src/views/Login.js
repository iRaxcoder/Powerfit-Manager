import { useState } from 'react';
import logo from '../assets/img/logo.png'
import '../styles/Login/login.css'
import { useNavigate} from 'react-router-dom'
import auth from '../service/Authentication.js'

const SUCCESSFUL = 1;


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
    const handleSubmit = async (event)=>{
        event.preventDefault();
        //
        const ApiResponse= await auth.logIn(user);
        if (ApiResponse===SUCCESSFUL){
            history('/inicio');
        }else{
            alert(ApiResponse);
        }
    }
    return (
        <div className='form-body'>
            <div className="form-signin">
                <div className='col col-md-5 mt-4'>
                    <div className='card'>
                        <form method='post' onSubmit={handleSubmit} className='card-body'>
                            <div>
                                <img src={logo} className="responsive mb-2 login__img" alt="logo" />
                                <h2 className='mb-4'>Ingresar</h2>
                            </div>
                            <div>
                                <div className='form__input'></div>
                                <input onChange={handleInputChange} className=' form-control mt-2 login__input' name='userName' placeholder='Usuario'></input>
                                <input onChange={handleInputChange} className='form-control mt-2 login__input' type="password" name='secret' placeholder='Contraseña'></input>
                            </div>
                            <button type='submit' className='btn mt-2'>INICIAR SESIÓN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


