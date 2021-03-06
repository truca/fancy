import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Favorites';
import * as actions from '../../actions';
import fU from '../../Utils.js';
//	import languages from '../../translate.js';

class SubscribedChatList extends Component {
	componentDidMount() {
		this.props.initU().get('user/chats/subscribed.json', actions.noAction, actions.setFavorites, actions.noAction, {Authorization: this.props.user.token});
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
		initU: () => { return fU(dispatch); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubscribedChatList);
