
const lang = [{
	id: 2,
	code: 'en',
	name: 'English',
	data: {
		chat: {
			escribe_un_mensaje: 'Write a message ..'
		},
		lista: {
			chats_propios: 'Own Chats',
			chats_personales: 'Personal Chats',
			chats_suscritos: 'Favorite Chats',
			crear_chat: 'Create Chat',
			eventos: 'Events',
			filtrar: 'Filter',
			todas_las_categorias: 'All the Categories'
		},
		mapa: {
			cargando: 'Loading...',
			todas_las_categorias: 'All the Categories'
		},
		menu: {
			mapa: 'Map',
			lista: 'List',
			chats_suscritos: 'Subscribed Chats',
			chats_personales: 'Personal Chats',
			panel_personal: 'Personal Panel',
			desconectarse: 'Logout',
			acerca: 'About',
			conexion: 'Log in',
			registro: 'Sign up',
			lenguaje: 'Language'
		},
		perfil: {
			perfil: 'Profile',
			notificaciones: 'NOTIFICATIONS',
			nombre: 'NAME',
			edad: 'AGE',
			genero: 'GENDER',
			lenguaje: 'LANGUAGE',
			pais: 'COUNTRY',
			avatar: 'AVATAR',
			enviar_cambios: 'Send Changes'
		},
		panel_personal: {
			chats_personales: 'Personal Chats',
			perfil: 'Profile',
			administrar_chats: 'Manage Chats',
			crear_chats: 'Create Chat'
		},
		crear_chat: {
			crear_chat: 'Create Chat',
			nombre: 'NAME',
			direccion: 'ADDRESS, CITY, COUNTRY',
			categoria: 'CATEGORY',
			descripcion: 'Description',
			enviar: 'Create'
		},
		perfil_de_usuario: {
			perfil_de_usuario: 'User Profile',
			nombre: 'Name',
			edad: 'Age',
			pais: 'Country',
			genero: 'Gender',
			chatear: 'Chat'
		},
		ingreso: {
			email: 'E-MAIL',
			clave: 'PASSWORD',
			ingresar: 'LOGIN',
			registro: 'Register'
		},
		registro: {
			email: 'E-MAIL',
			clave: 'PASSWORD',
			confirmar_clave: 'PASSWORD CONFIRMATION',
			registrarse: 'REGISTER',
			ingreso: 'Login'
		},
		about: {
			text: 'We\'re a Start Up that wants to make their projects grow'
		},
		actualizar_chat: {
			actualizar_chat: 'Update Chat',
			enviar: 'Send Changes'
		},
	}
}];

const languages = {};
lang.forEach(language => {
	languages[language.name.toLowerCase()] = language.data;
});

module.exports = languages;
