import React, { useEffect, useState, useReducer } from 'react'
import Logo from '../../assets/img/logo.png'
import '../../styles/Menu/Sidebar.css'
import {Link} from 'react-router-dom'

export default function Sidebar (){
    const [state, setState]=useState(false);
    const toggle =()=>{
        setState(!state);
        if(state){
            const toggle= document.getElementById('nav-toggle')
            const navbar=document.getElementById('navbar')
            const image= document.getElementById('power_logo');
            if(toggle && navbar){
                toggle.addEventListener('click', ()=>{
                    navbar.classList.toggle('show')
                    toggle.classList.toggle('rotate')
                    image.classList.toggle('show_max_size');
                })
            }
        }
    }
    const changeActualLinkColor=(link)=>{
             const actual_link=document.getElementById(link);
             const linkColor= document.querySelectorAll('.nav__link');
             linkColor.forEach(L=>L.classList.remove('active'))  
             if(actual_link!=null){
                 actual_link.classList.add('active');
                }
    }
    const changeDisplayMenu =() =>{
        document.getElementById('navbar').style.display="none"
    }
    return (
        <div className='l-navbar' id='navbar'>
            <nav class="nav">
                <div>
                    <a className='nav__logo'>
                        <img src={Logo} width='34px' height='34px' id='power_logo' className='nav__logo-icon icon'></img>
                        <span className='nav__logo-text'></span>
                    </a>
                    <div onClick={toggle} className='nav__toggle' id='nav-toggle'>
                        <i class='bx bxs-chevron-right'></i>
                    </div>
                    <ul className='nav__list'>
                        <Link to='/inicio' id='1' onClick={()=>changeActualLinkColor('1')} className='nav__link'>
                            <i className='bx bx-grid-alt nav__icon'></i>
                            <span className='nav__text'>Inicio</span>
                        </Link>
                        <Link to="/asistencia"  id='2' onClick={()=> changeActualLinkColor('2')} href='#' className='nav__link '>
                            <i className='bx bxs-hand nav__icon'></i>
                            <span className='nav__text'>Asistencia</span>
                        </Link>
                        <Link to="/clientes" id='3' onClick={()=> changeActualLinkColor('3')} href='#' className='nav__link '>
                            <i className='bx bxs-group nav__icon' ></i>
                            <span className='nav__text'>Clientes</span>
                        </Link>
                        < Link to="/medidas" id='4' onClick={ ()=>changeActualLinkColor('4')} href='#' className='nav__link '>
                            <i className='bx bxs-notepad nav__icon'></i>
                            <span className='nav__text'>Medidas</span>
                        </Link>
                        <Link to="/pagos" id='5' onClick={()=> changeActualLinkColor('5')} href='#' className='nav__link '>
                            <i className='bx bx-dollar-circle nav__icon'></i>
                            <span className='nav__text'>Pagos</span>
                        </Link>
                        <Link to="/rutinas" id='6' onClick={ ()=> changeActualLinkColor('6')} href='#' className='nav__link '>
                            <i className='bx bx-dumbbell nav__icon' ></i>
                            <span className='nav__text'>Rutinas</span>
                        </Link>
                        <Link to="/ejercicios" id='7' onClick={()=> changeActualLinkColor('7')} href='#' className='nav__link '>
                            <i className='bx bx-run nav__icon' ></i>
                            <span className='nav__text'>Ejercicios</span>
                        </Link>
                        < Link to="/grupos-musculares" id='8' onClick={()=>changeActualLinkColor('8')} href='#' className='nav__link '>
                            <i class="fa fa-object-group nav__icon" aria-hidden="true"></i>
                            <span className='nav__text'>Grupos musculares</span>
                        </Link>
                    </ul>
                </div>
                <Link onClick={changeDisplayMenu} to="/" className='nav__link'>
                    <i class='bx bx-log-out nav__icon'></i>
                    <span className='nav__text'>Salir</span>    
                </Link>
            </nav>
        </div>
    );
}