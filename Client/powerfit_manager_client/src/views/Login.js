import { useState, useContext,useEffect } from 'react';
import logo from '../assets/img/logo.png'
import '../styles/Login/login.css'
import { useNavigate } from 'react-router-dom'
import CustomForm from '../components/CustomForm.js'
import { CustomInput } from '../components/CustomInput';
import CustomModal from "../components/CustomModal";
import AuthContext from "../components/hooks/Authentication/AuthContext.js";

const SUCCESSFUL = 1;


export default function Login() {
    const { loginUser, userAuth } = useContext(AuthContext);
    const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
    const history = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        secret: ''
    })

    useEffect(()=>{
        if(userAuth){
            history('/inicio');
        }
    },[userAuth,history]);

    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async () => {
        loginUser(user);
    }

    const enterAction = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    }
    return (
        <div>
            <div className="form-signin">
                <CustomForm className='card-body__' onSubmit={handleSubmit}>
                    <div>
                        <img src={logo} className="responsive mb-2 login__img" alt="logo" />
                        <h2 className='mb-4'>Powerfit Manager</h2>
                    </div>
                    <CustomInput errorMsg={"*Ingrese el usuario"} onChange={handleInputChange} className='mt-2 login__input' name='userName' placeholder='Usuario' />
                    <CustomInput errorMsg={"*Ingrese la contraseña"} onChange={handleInputChange} onKeyDown={enterAction} className='mt-2 login__input' type="password" name='secret' placeholder='Contraseña' />
                    <button type="submit" className='btn btn-login mt-5'>ENTRAR</button>
                </CustomForm>
            </div>

            <CustomModal
                props={{ title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen }}
                methods={{ toggleOpenModal: () => setModalMsg(!modalMsg.isMsgOpen) }}
            >
                <p>{modalMsg.msg}</p>
            </CustomModal>

        </div>

    );
}


