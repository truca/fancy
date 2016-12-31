import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import R from 'ramda';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class OwnChatList extends Component {
	componentDidMount() {
		if(this.props.own.length == 0 ) {
			this.props.initU().get('chats.json', actions.noAction, actions.setOwn, actions.noAction);
		}
	}
	createChat() {
		this.props.history.push('/create/chats');
	}
	render() {
		return (
			<div id="list">
				<h2>Chats Propios</h2>
				<button onClick={this.createChat.bind(this)}>Crear Chat</button>
				<FilterableList items={this.props.own} item={Evento} path="chats/config" />
			</div>
		);
	}
}

OwnChatList.propTypes = {
	own: PropTypes.array,
	initU: PropTypes.func,
	history: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		own: state.own
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU() { return fU(dispatch); },
		getEvents() {
			const props = this;
			const key = 'Authorization';
			axios.defaults.headers.common[key] = props.user.token;
			axios.get('http://138.197.8.69/chats.json').then( r => {
				const gets = [];
				r.data.forEach(chat => {
					axios.defaults.headers.common[key] = props.user.token;
					gets.push(axios.get('http://138.197.8.69/chats/' + chat.id + '/subscribe.json'));
				});
				Promise.all(gets).then(res => {
					let chats = r.data;
					const favorites = R.map(fav => fav.data, res);
					//	console.log('RES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', chats, favorites);
					chats = R.map(chat => {
						const favorite = R.find(fav => parseInt(fav.chat_id, 10) == chat.id, favorites);
						let chatAux = {};
						if( typeof favorite !== 'undefined' ) {
							chatAux = R.merge(chat, { favorite: favorite.subscribed });
						}else {
							chatAux = R.merge(chat, { favorite: false });
						}
						return chatAux;
					}, chats);
					dispatch(actions.setEvents(chats));
					//	console.log('PROC>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', chats);
				});
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnChatList);
