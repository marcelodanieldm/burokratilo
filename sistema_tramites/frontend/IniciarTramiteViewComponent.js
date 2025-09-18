import React from 'react';

function IniciarTramiteView() {
  return (
    <div>
      <h2>Iniciar Trámite</h2>
      <form>
        <label>Tipo:</label>
        <input id="tipo" type="text" />
        <br />
        <label>Comentarios:</label>
        <input id="comentarios" type="text" />
        <br />
        <label>Archivo:</label>
        <input id="archivo" type="file" />
        <br />
        <button type="button" onClick={() => window.enviarTramite && window.enviarTramite()}>Enviar</button>
      </form>
    </div>
  );
}

export default IniciarTramiteView;
