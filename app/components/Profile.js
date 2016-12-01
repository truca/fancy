import React from 'react';

const Profile = () =>
	<div>
		<h2>Perfil</h2>
		<div>
			Notificaciones <input type="checkbox" />
		</div>
		<div>
			<span style={{display: 'block'}}>Nombre</span>
			<input type="text" />
		</div>
		<div>
			<span style={{display: 'block'}}>Año nacimiento</span>
			<input type="text" />
		</div>
	</div>;


export default Profile;
