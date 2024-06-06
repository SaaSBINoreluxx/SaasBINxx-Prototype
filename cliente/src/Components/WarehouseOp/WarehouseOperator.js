import React, { useState } from 'react';
import './WarehouseOperator.css'
import { BsDeviceSsdFill } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { TfiRulerPencil } from "react-icons/tfi";

function WarehouseOperator() {
    const [selectedItems, setSelectedItems] = useState({ card1: [], card2: [], card3: [] });
    const [itemQuantities, setItemQuantities] = useState({ card1: {}, card2: {}, card3: {} });
    const [visiblePopup, setVisiblePopup] = useState(null); // Cambio aquí para controlar cuál popup está visible
    const [returnPopupVisible, setReturnPopupVisible] = useState(false);
    const [operatorDetails, setOperatorDetails] = useState({
        nombre: '',
        apellido: '',
        id: '',
        mensaje: ''  // Asumiendo que tienes un campo para un mensaje o comentario
    });

    const cardInfo = [
        { id: 'card1', text: 'Equipos', icon: BsDeviceSsdFill },
        { id: 'card2', text: 'Herramientas', icon: FaTools },
        { id: 'card3', text: 'Materiales', icon: TfiRulerPencil }
    ];

    const items = [
        Array.from({ length: 20 }, (_, i) => `Item 1-${i + 1}`),
        Array.from({ length: 20 }, (_, i) => `Item 2-${i + 1}`),
        Array.from({ length: 20 }, (_, i) => `Item 3-${i + 1}`)];

    const returnItems = {
        equipos: Array.from({ length: 5 }, (_, i) => ({ id: `equipo-${i + 1}`, name: `Equipo ${i + 1}`, quantity: Math.floor(Math.random() * 10) + 1 })),
        herramientas: Array.from({ length: 5 }, (_, i) => ({ id: `herramienta-${i + 1}`, name: `Herramienta ${i + 1}`, quantity: Math.floor(Math.random() * 10) + 1 })),
        materiales: Array.from({ length: 5 }, (_, i) => ({ id: `material-${i + 1}`, name: `Material ${i + 1}`, quantity: Math.floor(Math.random() * 10) + 1 })),
    };


    const toggleReturnPopup = () => {
        setReturnPopupVisible(!returnPopupVisible);

    };

    const handleSelectItem = (card, item) => {
        const updatedSelection = selectedItems[card].includes(item)
            ? selectedItems[card].filter(i => i !== item)
            : [...selectedItems[card], item];
        setSelectedItems({ ...selectedItems, [card]: updatedSelection });

        // Inicializa la cantidad para el nuevo ítem si no existe.
        if (!selectedItems[card].includes(item) && !itemQuantities[card][item]) {
            const updatedQuantities = { ...itemQuantities[card], [item]: 1 };
            setItemQuantities({ ...itemQuantities, [card]: updatedQuantities });
        }
    };

    const handleQuantityChange = (card, item, quantity) => {
        const updatedQuantities = { ...itemQuantities[card], [item]: quantity };
        setItemQuantities({ ...itemQuantities, [card]: updatedQuantities });
    };

    const handleTogglePopup = (card) => {
        setVisiblePopup(visiblePopup === card ? null : card); // Cambio aquí para mostrar u ocultar el popup
        console.log(selectedItems);
        console.log(itemQuantities);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Aquí construyes el objeto con los datos que quieres enviar
        const dataToSend = {
            //selectedItems,
            operatorDetails,
            itemQuantities,

            // Añade cualquier otro dato que necesites enviar
        };

        // Aquí envías los datos al backend
        try {
            const response = await fetch('http://localhost:5000/api/warehouse/register-items-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            const responseData = await response.json();
            console.log('Datos enviados correctamente:', responseData);
            // Manejo adicional según sea necesario
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Manejo adicional de errores
        }
    };


    return (
        <div className='container' >

            <div className='warehouse-forms-container'>
                <div className='form-container' >
                    <h1>Registro de asignación</h1>

                    <form id='assetsOut' >
                        <input
                            className="field-element"
                            type="text"
                            placeholder="Nombre"
                            value={operatorDetails.nombre}
                            onChange={(e) => setOperatorDetails(prev => ({ ...prev, nombre: e.target.value }))}
                        />
                        <input
                            className="field-element"
                            type="text"
                            placeholder="Apellido"
                            value={operatorDetails.apellido}
                            onChange={(e) => setOperatorDetails(prev => ({ ...prev, apellido: e.target.value }))}
                        />
                        <input
                            className="field-element"
                            type="text"
                            placeholder="ID"
                            value={operatorDetails.id}
                            onChange={(e) => setOperatorDetails(prev => ({ ...prev, id: e.target.value }))}
                        />
                        <textarea
                            className="field-element"
                            type="text"
                            placeholder="Observaciones"
                            value={operatorDetails.mensaje}
                            onChange={(e) => setOperatorDetails(prev => ({ ...prev, mensaje: e.target.value }))}
                        />


                        <div className='cards-container' >
                            {visiblePopup && <div className="overlay" onClick={() => setVisiblePopup(null)}></div>}
                            {cardInfo.map(({ id, text, icon: Icon }) => (
                                <div className='card' key={id}>
                                    <button type='button' className='card-btn' onClick={() => handleTogglePopup(id)}>
                                        <Icon className='card-btn-icon' /> {text}
                                    </button>
                                    {visiblePopup === id && (
                                        <div className="popup">
                                            <div className="popup-content">
                                                {items[parseInt(id.substring(4)) - 1].map((item) => (
                                                    <div key={item} className="checkbox-item">
                                                        <input
                                                            type="checkbox"
                                                            id={`${id}-${item}`}
                                                            checked={selectedItems[id].includes(item)}
                                                            onChange={() => handleSelectItem(id, item)}
                                                        />
                                                        <label htmlFor={`${id}-${item}`}>{item}</label>
                                                        {selectedItems[id].includes(item) && (
                                                            <input
                                                                type="number"
                                                                className="quantity-input"
                                                                value={itemQuantities[id][item]}
                                                                onChange={(e) => handleQuantityChange(id, item, parseInt(e.target.value))}
                                                                min="1"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="popup-ok-button" onClick={() => handleTogglePopup(id)}>OK</button>
                                        </div>
                                    )}
                                    <ul>
                                        {selectedItems[id].map((item, idx) => (
                                            <li key={idx}>{'(' + (itemQuantities[id][item] || 1) + ') '}{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>


                        <button className='standard-button' type="submit">Registrar Salida</button>
                    </form>
                    <button className='standard-button' type="button" onClick={toggleReturnPopup} >verificar devolución</button>


                    {returnPopupVisible && (
                        <>
                            <div className="overlay" onClick={toggleReturnPopup}></div>
                            <div className="popup">
                                <div className="popup-content">
                                    <input className='field-element' type="text" placeholder="ID" />
                                    {Object.entries(returnItems).map(([category, items]) => (
                                        <fieldset key={category} className='fieldset'>

                                            <legend>{category.charAt(0).toUpperCase() + category.slice(1)}</legend>
                                            {items.map(item => (
                                                <div key={item.id} className="checkbox-item">
                                                    <input type="checkbox" id={item.id} name={item.name} />
                                                    <label htmlFor={item.id}>{`${item.name} - Cantidad: ${item.quantity}`}</label>
                                                </div>
                                            ))}
                                        </fieldset>
                                    ))}
                                </div>
                                <button className="popup-ok-button" onClick={toggleReturnPopup}>Cerrar</button>
                            </div>
                        </>

                    )}

                </div>

                <div className='form-container' >
                    <h1>Registro de ingreso</h1>

                    <form id='assetsOut' >

                        <div className='cards-container' >
                            {visiblePopup && <div className="overlay" onClick={() => setVisiblePopup(null)}></div>}
                            {cardInfo.map(({ id, text, icon: Icon }) => (
                                <div className='card-inReg' key={id}>
                                    <button type='button' className='card-btn-inReg' onClick={() => handleTogglePopup(id)}>
                                        <Icon className='card-btn-icon-inReg' /> {text}
                                    </button>
                                    {visiblePopup === id && (
                                        <div className="popup">
                                            <div className="popup-content">
                                                {items[parseInt(id.substring(4)) - 1].map((item) => (
                                                    <div key={item} className="checkbox-item">
                                                        <input
                                                            type="checkbox"
                                                            id={`${id}-${item}`}
                                                            checked={selectedItems[id].includes(item)}
                                                            onChange={() => handleSelectItem(id, item)}
                                                        />
                                                        <label htmlFor={`${id}-${item}`}>{item}</label>
                                                        {selectedItems[id].includes(item) && (
                                                            <input
                                                                type="number"
                                                                className="quantity-input"
                                                                value={itemQuantities[id][item]}
                                                                onChange={(e) => handleQuantityChange(id, item, parseInt(e.target.value))}
                                                                min="1"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="popup-ok-button" onClick={() => handleTogglePopup(id)}>OK</button>
                                        </div>
                                    )}
                                    <ul>
                                        {selectedItems[id].map((item, idx) => (
                                            <li key={idx}>{'(' + (itemQuantities[id][item] || 1) + ') '}{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>


                        <button className='standard-button' type="submit" onClick={handleSubmit} >Registrar Salida</button>
                    </form>

                </div>
            </div>



        </div>
    );
}

export default WarehouseOperator;