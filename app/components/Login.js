import React from 'react';

const Login = () =>
    <div>
        <h2>Conectarse</h2>

        <span>Usuario</span><br />
        <input type="text" placeholder="Usuario" /><br />
        <span>Contraseña</span><br />
        <input type="password" placeholder="Contraseña" /><br />
        <input style={{marginTop: '15px'}} className="btn btn-primary" type="submit" value="Conectarse" />
    </div>;


export default Login;
