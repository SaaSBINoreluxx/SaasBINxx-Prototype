import React from 'react';

function FormPage() {
  return (
    <div className="form-container">
      <h2>Ingrese sus datos</h2>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="tel" placeholder="Teléfono" />
        <textarea placeholder="Mensaje"></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormPage;