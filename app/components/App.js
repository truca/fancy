import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const App = ({ children }) =>
    <div>
        <h1>Mapea Chile</h1>

        <footer>
          <Link to="/conexion">Conectarse</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/lista">Lista</Link>
          <Link to="/acerca">Acerca</Link>
        </footer>
        { children }
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
