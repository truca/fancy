import React from 'react';

const Register = () =>
    <div>
        <h2>Registro</h2>

        <span>Usuario</span><br />
        <input type="text" placeholder="Usuario" /><br />
        <span>Contraseña</span><br />
        <input type="password" placeholder="Contraseña" /><br />
        <span>Repita Contraseña</span><br />
        <input type="password" placeholder="Repita Contraseña" /><br />
        <input style={{marginTop: '15px'}} type="submit" className="btn btn-primary" value="Registrarse" />
    </div>;


export default Register;
