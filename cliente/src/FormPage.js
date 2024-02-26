import React from 'react';
import './FormPage.css'; 

function FormPage() {
    const electronicEquipment = ['Multímetro', 'Osciloscopio', 'Destornillador eléctrico', 'Manómetro digital', 'Manómetro analógico', 'Pulmón artificial', 'Monitor 7"', 'Aspiradora de mano'];
    const tools = ['Destornillador estrella', 'Llave universal 11', 'Llave universal 13', 'Llave universal ajustable'];
    const materials = ['Manguera corrugada', 'Sensores de oxígeno', 'Precintos', 'Teflón', 'Tornillos', 'Paño absorbente', 'Paño de microfibra', 'Alcohol isopropílico', 'Silicona líquida'];

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Ingrese sus datos</h2>
                <form>
                    <input className='field-element' type="text" placeholder="Nombre" />
                    <input className='field-element' type="text" placeholder="Apellido" />
                    <input className='field-element' type="email" placeholder="Correo electrónico" />
                    <input className='field-element' type="tel" placeholder="Teléfono" />
                    <textarea className='field-element'  placeholder="Mensaje"></textarea>
                    <button type="submit">Enviar</button>
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
                    <button type="submit">Enviar lista</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;