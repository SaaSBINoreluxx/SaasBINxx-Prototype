import React, { useState } from 'react';
import './WarehouseOperator.css'
import { BsDeviceSsdFill } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { TfiRulerPencil } from "react-icons/tfi";

function WarehouseOperator() {
    const [selectedItems, setSelectedItems] = useState({ card1: [], card2: [], card3: [] });
    const [itemQuantities, setItemQuantities] = useState({ card1: {}, card2: {}, card3: {} });
    const [visiblePopup, setVisiblePopup] = useState(null); // Cambio aquí para controlar cuál popup está visible

    const cardInfo = [
        { id: 'card1', text: 'Equipos', icon: BsDeviceSsdFill },
        { id: 'card2', text: 'Herramientas', icon: FaTools },
        { id: 'card3', text: 'Materiales', icon: TfiRulerPencil }
    ];

    const items = [
        Array.from({ length: 20 }, (_, i) => `Item 1-${i + 1}`),
        Array.from({ length: 20 }, (_, i) => `Item 2-${i + 1}`),
        Array.from({ length: 20 }, (_, i) => `Item 3-${i + 1}`)]

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
    };


    return (
        <div className='container' >

            <div className='warehouse-forms-container'>
            <div className='form-container' >
                <h1>Registro de asignación</h1>

                <form id='assetsOut' >
                    <input className='field-element' type="text" placeholder="Nombre" />
                    <input className='field-element' type="text" placeholder="Apellido" />
                    <input className='field-element' type="text" placeholder="ID" />
                    <textarea className='field-element' placeholder="Mensaje"></textarea>


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
                <button className='standard-button' type="button">verificar devolución</button>
            </div>

            <div className='form-container' >
                <h1>Registro de ingreso</h1>

                <form id='assetsOut' >

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

            </div>
            </div>

            

        </div>
    );
}

export default WarehouseOperator;