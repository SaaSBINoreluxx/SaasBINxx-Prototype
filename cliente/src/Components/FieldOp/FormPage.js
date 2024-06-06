import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import './FormPage.css';

function FormPage() {
    const electronicEquipment = ['Multímetro', 'Osciloscopio', 'Destornillador eléctrico', 'Vatímero', 'Monitor 7"'];
    const tools = ['Juego de destornilladores', 'Juego de Llaves', 'Juego de dados', 'Juego de alicates','Prensa neumática'];
    const materials = ['Terminales', 'Aislante termoretráctil', 'Paños', 'Cable'];

    const [activities, setActivities] = useState([{ id: Date.now(), description: '', ordinal: 1 }]); // Estado para manejar dinámicamente las actividades
    const [requireSpareParts, setRequireSpareParts] = useState(false); // Estado para manejar si se requieren repuestos
    const [spareParts, setSpareParts] = useState([{ id: Date.now(), description: '', ordinal: 1 }]); // Estado para manejar dinámicamente los repuestos


    const addActivity = () => {
        setActivities((prevActivities) => [
            ...prevActivities,
            { id: Date.now(), description: '', ordinal: prevActivities.length + 1 },
        ]);
    }

    const removeActivity = (id, removedOrdinal) => {
        setActivities((prevActivities) =>
            prevActivities
                .filter((activity) => activity.id !== id)
                .map((activity) =>
                    activity.ordinal > removedOrdinal
                        ? { ...activity, ordinal: activity.ordinal - 1 }
                        : activity
                )
        );
    };

    const addSparePart = () => {
        setSpareParts((preSpareParts) => [
            ...preSpareParts,
            { id: Date.now(), description: '', ordinal: preSpareParts.length + 1 },
        ]);
    }

    const removeSparePart = (id, removedOrdinal) => {
        setSpareParts((preSpareParts) =>
            preSpareParts
                .filter((sparePart) => sparePart.id !== id)
                .map((sparePart) =>
                    sparePart.ordinal > removedOrdinal
                        ? { ...sparePart, ordinal: sparePart.ordinal - 1 }
                        : sparePart
                )
        );
    }


    // Función para obtener la hora actual en formato HH:MM
    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(' ')[0].substring(0, 5);
    };

    console.log(activities)

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Datos de operador</h2>
                <form>
                    <input className='field-element' type="text" placeholder="Nombre" />
                    <input className='field-element' type="text" placeholder="Apellido" />
                    <input className='field-element' type="text" placeholder="ID" />
                    <textarea className='field-element' placeholder="Mensaje"></textarea>
                    <button className='standard-button' type="submit">Enviar</button>
                </form>
            </div>
            <div className="inventory-container">
                <h2>Lista de Equipos e Insumos: INGRESO</h2>
                <form>
                    <fieldset className='fieldset'>
                        <legend>Equipos electrónicos</legend>
                        {electronicEquipment.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`electronic-${index}`} name={item} />
                                <label htmlFor={`electronic-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className='fieldset'>
                        <legend>Herramientas</legend>
                        {tools.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`tool-${index}`} name={item} />
                                <label htmlFor={`tool-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className='fieldset'>
                        <legend>Materiales</legend>
                        {materials.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`material-${index}`} name={item} />
                                <label htmlFor={`material-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <textarea className='field-element' placeholder="Observaciones"></textarea>
                    <button className='standard-button' type="submit">Enviar lista</button>
                </form>
            </div>
            <div className="form-container">
                <h2>Orden de Trabajo de Mantenimiento</h2>
                <form>
                    <fieldset className="fieldset">
                        <fieldset className="sub-fieldset-container">
                            <div className='sub-fielset'>
                                <label htmlFor="horaInicio">Hora y fecha:</label>
                                <input type="date" placeholder="Fecha" />
                                <input type="text" id="horaInicio" placeholder="Hora de inicio de procedimiento" />
                            </div>
                            <button className='standard-button' type="button" onClick={(e) => { e.preventDefault(); e.target.previousElementSibling.value = getCurrentTime(); }}>Obtener hora</button>
                        </fieldset>

                        <legend>Datos de servicio</legend>
                        <div>
                            <label htmlFor="Entidad">Entidad:</label>
                            <input type="text" id="Entidad" placeholder="Entidad que recibe el servicio" />
                        </div>
                        <div>
                            <label htmlFor="Area">Area:</label>
                            <input type="text" id="Area" placeholder="Área" />
                        </div>
                        <div>
                            <label htmlFor="Ubicacion">Ubicación:</label>
                            <input type="text" id="Ubicacion" placeholder="Ubicación" />
                        </div>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend>Datos del equipo</legend>
                        <div>
                            <label htmlFor="denominacionEQ">Descripción:</label>
                            <input type="text" id="denominacionEQ" placeholder="Denominación del equipo" />
                        </div>
                        <div>
                            <label htmlFor="Marca">Marca:</label>
                            <input type="text" id="Marca" placeholder="Marca" />
                        </div>
                        <div>
                            <label htmlFor="Modelo">Modelo:</label>
                            <input type="text" id="Modelo" placeholder="Modelo" />
                        </div>
                        <div>
                            <label htmlFor="Serie">Serie:</label>
                            <input type="text" id="Serie" placeholder="Serie" />
                        </div>
                        <div>
                            <label htmlFor="CodPat">Código patrimonial:</label>
                            <input type="text" id="CodPat" placeholder="Código patrimonial" />
                        </div>
                        <div>
                            <label htmlFor="EstadoIni">Estado Inicial:</label>
                            <select title='Estado Inicial' id="EstadoIni" placeholder="Estado inicial">
                                <option value="Operativo">Operativo</option>
                                <option value="Inoperativo">Inoperativo</option>
                                <option value="Parcialmente operativo">Parcialmente operativo</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend>Datos del procedimiento</legend>
                        <div className='dynamic-field-container'>
                            {activities.map((activity) => (
                                <div key={activity.id} className="dynamic-field">
                                    <label htmlFor={'Actividad' + activity.id}> Actividad {activity.ordinal}: </label>
                                    <input
                                        id={'Actividad' + activity.id}
                                        type="text"
                                        placeholder="Descripción de la actividad ejecutada"
                                        value={activity.description}
                                        onChange={(e) => {
                                            const newActivities = [...activities];
                                            const index = activities.findIndex(a => a.id === activity.id);
                                            newActivities[index] = { ...activity, description: e.target.value };
                                            setActivities(newActivities);
                                        }}
                                    />
                                    <button
                                        title="deleteIcon"
                                        className="action-button"
                                        onClick={() => removeActivity(activity.id, activity.ordinal)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addActivity}>Agregar actividad</button>
                        </div>

                        <label htmlFor="RepReq">Requirió Repuestos:</label>
                        <select title='ReqRep' id='RepReq' onChange={(e) => setRequireSpareParts(e.target.value === 'sí')}>
                            <option value="no">No</option>
                            <option value="sí">Sí</option>
                        </select>

                        <div className='dynamic-field-container' >
                            {requireSpareParts && spareParts.map((sparePart) => (
                                <div key={sparePart.id} className='dynamic-field'>
                                    <label htmlFor={'Repuesto' + sparePart.id} >Respuesto {sparePart.ordinal}</label>
                                    <input
                                        id={'Repuesto' + sparePart.id}
                                        type='text'
                                        placeholder='Descripción del repuesto'
                                        value={sparePart.description}
                                        onChange={(e) => {
                                            const newSpareParts = [...spareParts];
                                            const index = spareParts.findIndex(a => a.id === sparePart.id);
                                            newSpareParts[index] = { ...sparePart, description: e.target.value };
                                            setSpareParts(newSpareParts);
                                        }}
                                    />
                                    <button
                                        title="deleteIcon"
                                        className="action-button"
                                        onClick={() => removeSparePart(sparePart.id, sparePart.ordinal)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            ))}

                            {requireSpareParts && <button type="button" onClick={addSparePart}>Agregar Respuesto</button>}


                        </div>

                        <div className='sub-fieldset-container'>
                            <div className='sub-fieldset'>
                                <label htmlFor='HoraFin' >Hora de finalización: </label>
                                <input id='HoraFin' type="text" placeholder="Hora de finalización de procedimiento" readOnly />
                            </div>

                            <button
                                className='standard-button'
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.target.previousElementSibling.value = getCurrentTime();
                                }}
                            >Obtener hora</button>
                        </div>




                        <textarea placeholder="Observaciones"></textarea>
                    </fieldset>

                    <button className='standard-button' type="submit">Enviar Orden de Trabajo</button>
                </form>
            </div>

            <div className="inventory-container">
                <h2>Lista de Equipos e Insumos SALIDA</h2>
                <form>
                    <fieldset className='fieldset'>
                        <legend>Equipos electrónicos</legend>
                        {electronicEquipment.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`electronic-${index}`} name={item} />
                                <label htmlFor={`electronic-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className='fieldset'>
                        <legend>Herramientas</legend>
                        {tools.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`tool-${index}`} name={item} />
                                <label htmlFor={`tool-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className='fieldset'>
                        <legend>Materiales</legend>
                        {materials.map((item, index) => (
                            <div key={index} className='field-element'>
                                <input type="checkbox" id={`material-${index}`} name={item} />
                                <label htmlFor={`material-${index}`}>{item}</label>
                            </div>
                        ))}
                    </fieldset>
                    <textarea className='field-element' placeholder="Observaciones"></textarea>
                    <button className='standard-button' type="submit">Enviar lista</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;