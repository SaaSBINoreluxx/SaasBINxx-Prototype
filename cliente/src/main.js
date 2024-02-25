import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';



function MainPage() {
    const [result, SetResult] = useState("")
    return (
        <div className="container">
            <div className="left-split">
                <div className="top-left">
                    <p>Soy operador en campo</p>
                    <Link to='/form'>
                        <button>Ingresar datos</button>
                    </Link>
                </div>
                <div className="bottom-left">
                    <p>Soy operador de almacén</p>
                    <button>Ingresar datos</button>
                </div>
            </div>
            <div className="right-split">
                <p>Soy Administrador</p>
                <button onClick={async () => {
                    const res = await fetch('https://saasbinxx-prototype.onrender.com/users');
                    const data = await res.json();
                    console.log(data);
                    SetResult(data)
                }}>Gestionar</button>
            </div>
        </div>
    );
}

export default MainPage;