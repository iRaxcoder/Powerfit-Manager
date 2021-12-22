import React, { useState } from "react";
import Modal from 'react-modal'
import '../styles/common.css'


export default function Ejercicio(){
    return (
        <div>
            <h1 className="text-left">Control de ejercicios</h1>
            <hr/>
            <div className="container text-left">   
                <button className="btn btn-insert mb-2">Insertar</button>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ejercicio</th>
                        <th scope="col">Grupo muscular</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                        <btn className="btn btn-edit"><i class="fas fa-edit"></i></btn>
                        <btn className="btn btn-delete ml-2"><i class="fas fa-trash-alt"></i></btn>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>
                        <btn className="btn btn-edit"><i class="fas fa-edit"></i></btn>
                        <btn className="btn btn-delete ml-2"><i class="fas fa-trash-alt"></i></btn>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>
                        <btn className="btn btn-edit"><i class="fas fa-edit"></i></btn>
                        <btn className="btn btn-delete ml-2"><i class="fas fa-trash-alt"></i></btn>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}