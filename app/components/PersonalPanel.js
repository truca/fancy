import React from 'react';
import { Link } from 'react-router';

const PersonalPanel = () =>
	<div id="panel">
		<h2>Profile</h2>

		<div id="links">
			<div><Link to="/chatsPersonales">Chats Personales</Link></div>
			<div><Link to="/chatsPropios">Administrar Chats</Link></div>
			<div><Link to="/create/chats">Crear Chats</Link></div>
			<div><Link to="/perfil">Perfil</Link></div>
		</div>
	</div>;


export default PersonalPanel;
