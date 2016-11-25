import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FilterableTable from './containers/FilterableTable';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Mapa from './containers/Map';
import ItemView from './components/ItemView';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
		<Route path="/conexion" component={Login} />
		<Route path="/registro" component={Register} />
		<Route path="/mapa" component={Mapa} />
		<Route path="/lista" component={FilterableTable} />
		<Route path="/evento" component={ItemView} />
		<Route path="/acerca" component={About} />
	</Route>
);
