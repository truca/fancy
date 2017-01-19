import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Mapa from './containers/Map';
import CreateChat from './components/CreateChat';
import UpdateChat from './components/UpdateChat';
import PersonalPanel from './components/PersonalPanel';
import Profile from './components/Profile';
import EventList from './components/lists/EventList';
import OwnChatList from './components/lists/OwnChatList';
import PersonalChatList from './components/lists/PersonalChatList';
import SubscribedChatList from './components/lists/SubscribedChatList';
import ChatElement from './components/elements/ChatElement';
import ResetPassword from './components/ResetPassword';


export default (
	<Route>
		<Route path="/" component={App}>
			<IndexRoute component={Mapa} />
			<Route path="/conexion" component={Login} />
			<Route path="/registro" component={Register} />
			<Route path="/mapa" component={Mapa} />
			<Route path="/lista" component={EventList} />
			<Route path="/panelPersonal" component={PersonalPanel} />
			<Route path="/perfil" component={Profile} />
			<Route path="/chatsPropios" component={OwnChatList} />
			<Route path="/chatsPersonales" component={PersonalChatList} />
			<Route path="/chatsSuscritos" component={SubscribedChatList} />
			<Route path="/chats/:id" component={ChatElement} />
			<Route path="/create/chats" component={CreateChat} />
			<Route path="/profile/:id" component={UserProfile} />
			<Route path="/create/chats" component={CreateChat} />
			<Route path="/update/chats/:id" component={UpdateChat} />
			<Route path="/acerca" component={About} />
			<Route path="/reset" component={ResetPassword} />
		</Route>
	</Route>
);
