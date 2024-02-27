import React, { useState } from 'react';
import './FormPage.css';

function FormPage() {
    const electronicEquipment = ['Multímetro', 'Osciloscopio', 'Destornillador eléctrico', 'Manómetro digital', 'Manómetro analógico', 'Pulmón artificial', 'Monitor 7"', 'Aspiradora de mano'];
    const tools = ['Destornillador estrella', 'Llave universal 11', 'Llave universal 13', 'Llave universal ajustable'];
    const materials = ['Manguera corrugada', 'Sensores de oxígeno', 'Precintos', 'Teflón', 'Tornillos', 'Paño absorbente', 'Paño de microfibra', 'Alcohol isopropílico', 'Silicona líquida'];

    const [activities, setActivities] = useState(['']); // Estado para manejar dinámicamente las actividades
    const [requireSpareParts, setRequireSpareParts] = useState(false); // Estado para manejar si se requieren repuestos
    const [spareParts, setSpareParts] = useState(['']); // Estado para manejar dinámicamente los repuestos

    const addActivity = () => setActivities([...activities, '']);
    const removeActivity = (index) => setActivities(activities.filter((_, idx) => idx !== index));
    const addSparePart = () => setSpareParts([...spareParts, '']);
    const removeSparePart = (index) => setSpareParts(spareParts.filter((_, idx) => idx !== index));

    // Función para obtener la hora actual en formato HH:MM
    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(' ')[0].substring(0, 5);
    };

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
                <h2>Lista de Equipos e Insumos</h2>
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
                        <fieldset className="sub-fieldset">
                            <label for="username">Hora y fecha:</label>
                            <input type="date" placeholder="Fecha" />
                            <input type="text" id="horaInicio" placeholder="Hora de inicio de procedimiento" />
                            <button className='standard-button' type="button" onClick={(e) => { e.preventDefault(); e.target.previousElementSibling.value = getCurrentTime(); }}>Obtener hora</button>
                        </fieldset>

                        <legend>Datos de servicio</legend>
                        <div>
                            <label for="Entidad">Entidad:</label>
                            <input type="text" name="Entidad" placeholder="Entidad que recibe el servicio" />
                        </div>
                        <div>
                            <label for="Area">Area:</label>
                            <input type="text" name="Area" placeholder="Área" />
                        </div>
                        <div>
                            <label for="Ubicacion">Ubicación:</label>
                            <input type="text" name="Ubicacion" placeholder="Ubicación" />
                        </div>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend>Datos del equipo</legend>
                        <div>
                            <label for="denominacionEQ">Descripción:</label>
                            <input type="text" name="denominacionEQ" placeholder="Denominación del equipo" />
                        </div>
                        <div>
                            <label for="Marca">Marca:</label>
                            <input type="text" name="Marca" placeholder="Marca" />
                        </div>
                        <div>
                            <label for="Modelo">Modelo:</label>
                            <input type="text" name="Modelo" placeholder="Modelo" />
                        </div>
                        <div>
                            <label for="Serie">Serie:</label>
                            <input type="text" name="Serie" placeholder="Serie" />
                        </div>
                        <div>
                            <label for="CodPat">Código patrimonial:</label>
                            <input type="text" name="CodPat" placeholder="Código patrimonial" />
                        </div>
                        <div>
                            <label for="EstadoIni">Estado Inicial:</label>
                            <select name="EstadoIni" placeholder="Estado inicial">
                                <option value="Operativo">Operativo</option>
                                <option value="Inoperativo">Inoperativo</option>
                                <option value="Parcialmente operativo">Parcialmente operativo</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend>Datos del procedimiento</legend>
                        <div className='dynamic-field-container'>
                            {activities.map((activity, index) => (
                                <div key={index} className="dynamic-field">
                                    <label for="Actividad"> Actividad {index + 1}:  </label>
                                    <input name="Actividad" type="text" placeholder="Descripción de la actividad ejecutada" value={activity} onChange={(e) => {
                                        const newActivities = [...activities];
                                        newActivities[index] = e.target.value;
                                        setActivities(newActivities);
                                    }} />
                                    <button className="action-button" onClick={() => removeActivity(index)}>Eliminar</button>
                                </div>
                            ))}
                            <button type="button" onClick={addActivity}>Agregar actividad</button>
                        </div>

                        <label for="RepReq">Requirió Repuestos:</label>

                        <select name='RepReq' onChange={(e) => setRequireSpareParts(e.target.value === 'sí')}>
                            <option value="no">No</option>
                            <option value="sí">Sí</option>
                        </select>

                        {requireSpareParts && spareParts.map((part, index) => (
                            <div key={index} className="dynamic-field">
                                <input type="text" placeholder="Detalle de repuestos" value={part} onChange={(e) => {
                                    const newSpareParts = [...spareParts];
                                    newSpareParts[index] = e.target.value;
                                    setSpareParts(newSpareParts);
                                }} />
                                <button type="button" onClick={() => removeSparePart(index)}>Eliminar</button>
                            </div>
                        ))}
                        {requireSpareParts && <button type="button" onClick={addSparePart}>Agregar repuesto</button>}

                        <input type="text" placeholder="Hora de finalización de procedimiento" readOnly />
                        <button className='standard-button' type="button" onClick={(e) => { e.preventDefault(); e.target.previousElementSibling.value = getCurrentTime(); }}>Obtener hora</button>
                        <textarea placeholder="Observaciones"></textarea>
                    </fieldset>

                    <button className='standard-button' type="submit">Enviar Orden de Trabajo</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;