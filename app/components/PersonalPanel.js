import React from 'react';
import { Link } from 'react-router';

const PersonalPanel = () =>
	<div>
		<h4>Profile</h4>
		<ul>
			<li><Link to="/chatsPersonales">Chats Personales</Link></li>
			<li><Link to="/chatsPropios">Administrar Chats</Link></li>
			<li><Link to="/create/chats">Crear Chats</Link></li>
			<li><Link to="/perfil">Perfil</Link></li>
		</ul>
	</div>;


export default PersonalPanel;
