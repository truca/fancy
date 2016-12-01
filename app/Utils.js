import axios from 'axios';
import _ from 'underscore';

export default function(dispatch) {
	return {
		apiUrl: 'http://138.197.8.69/',
		get: function(path, sending, success, failure) {
			console.log('GET', this.apiUrl + path);
			dispatch(sending());
			axios.get(this.apiUrl + path)
				.then(response => { console.log(path, response); dispatch(success(response.data)); })
				.catch(error => { console.log(path, error); dispatch(failure(error)); });
		},
		post: function(path, sending, success, failure, data) {
			console.log('POST', this.apiUrl + path, data);
			dispatch(sending(data));
			axios.post(this.apiUrl + path, data)
				.then(response => { console.log(path, response); dispatch(success(response.data.data)); })
				.catch(error => { console.log(path, error); dispatch(error); });
		},
		patch: function(path, sending, success, failure, data) {
			console.log('PATCH', this.apiUrl + path, data);
			//	dispatch(sending())
			axios.patch(this.apiUrl + path, data)
				.then(response => { console.log(path, response); /*	dispatch(success(response.data.data));*/ })
				.catch(error => { console.log(path, error); /*	dispatch(error);*/ });
		},
		delete: function(path, sending, success, failure, data) {
			console.log('DELETE', this.apiUrl + path);
			dispatch(sending());
			axios.delete(this.apiUrl + path, data)
				.then(response => { console.log(path, response); dispatch(success(response.data.data)); })
				.catch(error => { console.log(path, error); dispatch(error); });
		},
		toast: function(msg) {
			if (window.plugins) {
				window.plugins.toast.show(msg, 'long', 'bottom');
			}else{ console.log(msg); }
		},
		merge: function() {
			return _.extend({}, ...arguments);
		}
	};
}
