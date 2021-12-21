import logo from '../assets/logo.png'
import '../styles/Login/login.css'

export default function Login() {
    return (
        

            <div className="form-signin">
                <div className='col col-md-4 mt-4'>
                    <div className='card'>
                        <form className='card-body'>
                            <div>
                                <img src={logo} className="responsive mb-5" alt="logo" />
                                <h2>Ingresar</h2>
                            </div>
                            <div>
                                <input className='form-control mt-2' name='usuario' placeholder='Usuario'></input>
                                <input className='form-control mt-2' type="password" name='contrasenna' placeholder='Contraseña'></input>
                            </div>
                            <button className='btn mt-2'>Iniciar Sección</button>
                        </form>
                    </div>
                </div>
            </div>
      
    );
}


