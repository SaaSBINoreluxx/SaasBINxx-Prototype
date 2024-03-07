import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MainPage() {
    const [result, SetResult] = useState("")
    return (
        <div className="container">
            <div className="left-split">
                <div className="top-left">
                    <img src="/consultar.png" className='category-icon' alt="operador" />
                    <p>Soy operador en campo</p>
                    <Link to='/FOpform' className='Route-link'>
                        <button className='standard-button'>Ingresar datos</button>
                    </Link>
                </div>
                <div className="bottom-left">
                    <img src="/operador.png" className='category-icon' alt="almacenero" />
                    <p>Soy operador de almacén</p>
                    <Link to='/WOpform' className='Route-link'>
                        <button className='standard-button'>Ingresar datos</button>
                    </Link>
                </div>
            </div>
            <div className="right-split">
                <img src="/gerente-de-proyecto.png" className='category-icon' alt="adm" />
                <p>Soy Administrador</p>
                <Link to='/AdmDash' className='Route-link'>
                    <button className='standard-button'>Gestionar</button>
                </Link>
            </div>
        </div>
    );
}

export default MainPage;