import { useState } from 'react';
import logo from '../assets/img/logo.png'
import '../styles/Login/login.css'
import { useNavigate} from 'react-router-dom'
import auth from '../service/Authentication.js'
import CustomForm from '../components/CustomForm.js'
import { CustomInput } from '../components/CustomInput';

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
    const handleSubmit = async ()=>{
        //
        const ApiResponse= await auth.logIn(user);
        if (ApiResponse===SUCCESSFUL){
            history('/inicio');
        }else{
            alert(ApiResponse);
        }
    }
    return (
            <div className="form-signin">
                        <CustomForm onSubmit={handleSubmit} className='card-body__'>
                            <div>
                                <img src={logo} className="responsive mb-2 login__img" alt="logo" />
                                <h2 className='mb-4'>Powerfit Manager</h2>
                            </div>
                                <CustomInput errorMsg={"*Ingrese el usuario"} onChange={handleInputChange} className='mt-2 login__input' name='userName' placeholder='Usuario'/>
                                <CustomInput errorMsg={"*Ingrese la contraseña"} onChange={handleInputChange} className='mt-2 login__input' type="password" name='secret' placeholder='Contraseña'/>
                            <button className='btn btn-login mt-5'>ENTRAR</button>
                        </CustomForm>
            </div>
    );
}


