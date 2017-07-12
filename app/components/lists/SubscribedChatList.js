import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import R from 'ramda';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Favorites';
import * as actions from '../../actions';
import fU from '../../Utils.js';
//	import languages from '../../translate.js';

class SubscribedChatList extends Component {
	componentDidMount() {
		this.props.getEvents();
		//	this.props.initU().get('user/chats/subscribed.json', actions.noAction, actions.setFavorites, actions.noAction, {Authorization: this.props.user.token});
	}
	render() {
		return (
			<div id="list">
				<h2>{this.props.languages[this.props.language].lista.chats_suscritos}</h2>
				<FilterableList items={this.props.favorites} item={Evento} path="chats" />
			</div>
		);
	}
}
//	<FilterableList items={this.props.subscribedChats} item={Evento} path="chats" />

SubscribedChatList.propTypes = {
	subscribedChats: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
	favorites: PropTypes.array,
	getEvents: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
		language: state.language, languages: state.languages,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); },
		getEvents() {
			const props = this;
			const key = 'Authorization';
			if(props.user && props.user.token) {
				axios.defaults.headers.common[key] = props.user.token;
			}
			axios.get('http://138.197.8.69/user/chats/subscribed.json').then( r => {
				const gets = [];
				r.data.data.forEach(chat => {
					axios.defaults.headers.common[key] = props.user.token;
					gets.push(axios.get('http://138.197.8.69/chats/' + chat.id + '/subscribe.json'));
				});
				Promise.all(gets).then(res => {
					console.log(res);
					let chats = R.map(chat => chat.data, res);
					chats = R.map(chat => {
						return R.merge(chat, { favorite: true });
					}, chats);
					dispatch(actions.setFavorites(chats));
				});
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubscribedChatList);
