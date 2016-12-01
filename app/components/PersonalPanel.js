import React from 'react';
import { Link } from 'react-router';

const PersonalPanel = () =>
	<div>
		<h4>Profile</h4>
		<ul>
			<li><Link to="/chatsPropios">Chats Propios</Link></li>
			<li><Link to="/perfil">Perfil</Link></li>
		</ul>
	</div>;


export default PersonalPanel;
