import axios from 'axios';
import _ from 'underscore';

export default function(dispatch) {
	return {
		apiUrl: 'http://138.197.8.69/',
		setPush: function(pushMethod) {
			window.push = pushMethod;
		}, //	method to redirect on notification (it receives a string to redirect)
		get: function(path, sending, success, failure, headers) {
			const auxHeaders = headers ? headers : {};
			for(const key in auxHeaders) { if (auxHeaders.hasOwnProperty(key)) { axios.defaults.headers.common[key] = auxHeaders[key]; } }
			console.log('GET', this.apiUrl + path);
			dispatch(sending());
			const url = path.indexOf('http') != -1 ? path : this.apiUrl + path;
			axios.get(url)
				.then(response => { console.log(path, response); dispatch(success(response.data.data ? response.data.data : response.data)); })
				.catch(error => { console.log(path, error); dispatch(failure(error)); });
		},
		post: function(path, sending, success, failure, data, headers) {
			const auxHeaders = headers ? headers : {};
			for(const key in auxHeaders) { if (auxHeaders.hasOwnProperty(key)) { axios.defaults.headers.common[key] = auxHeaders[key]; } }
			console.log('POST', this.apiUrl + path, data);
			dispatch(sending(data));
			const url = path.indexOf('http') != -1 ? path : this.apiUrl + path;
			axios.post(url, data)
				.then(response => { console.log(path, response); dispatch(success(response.data.data)); })
				.catch(error => { console.log(path, error); dispatch(failure(error)); });
		},
		put: function(path, sending, success, failure, data, headers) {
			const auxHeaders = headers ? headers : {};
			for(const key in auxHeaders) { if (auxHeaders.hasOwnProperty(key)) { axios.defaults.headers.common[key] = auxHeaders[key]; } }
			console.log('PATCH', this.apiUrl + path, data);
			dispatch(sending());
			const url = path.indexOf('http') != -1 ? path : this.apiUrl + path;
			axios.put(url, data)
				.then(response => { console.log(path, response);	dispatch(success(response.data.data)); })
				.catch(error => { console.log(path, error);	 dispatch(failure(error)); });
		},
		delete: function(path, sending, success, failure, data, headers) {
			const auxHeaders = headers ? headers : {};
			for(const key in auxHeaders) { if (auxHeaders.hasOwnProperty(key)) { axios.defaults.headers.common[key] = auxHeaders[key]; } }
			console.log('DELETE', this.apiUrl + path);
			dispatch(sending());
			const url = path.indexOf('http') != -1 ? path : this.apiUrl + path;
			axios.delete(url, data)
				.then(response => { console.log(path, response); dispatch(success(response.data.data)); })
				.catch(error => { console.log(path, error); dispatch(failure(error)); });
		},
		toast: function(msg) {
			if (window.plugins) {
				window.plugins.toast.show(msg, 'long', 'bottom');
			}else{ console.log(msg); }
		},
		alert: function( title, message ) {
			if(!navigator || !navigator.notification || !navigator.notification.alert) { alert(message); }
			//                           message, callback, title, buttonName
			navigator.notification.alert(message, null,     title, 'Aceptar' );
		},
		merge: function() {
			return _.extend({}, ...arguments);
		}
	};
}
