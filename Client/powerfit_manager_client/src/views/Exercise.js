import React, { useState } from "react";
import Modal from 'react-modal'
import '../styles/common.css'
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

export default function Ejercicio(){
    return (
        <div>
            <h1 className="text-left">Control de ejercicios</h1>
            <hr/>
            <div className="container text-left">   
                <AddButton/>
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
                        <EditButton/>
                        <DeleteButton/>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>
                        <EditButton/>
                        <DeleteButton/>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>
                        <EditButton/>
                        <DeleteButton/>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}