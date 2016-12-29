import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class SubscribedChatList extends Component {
	componentDidMount() {
		this.props.initU().get('user/chats/subscribed.json', actions.noAction, actions.setFavorites, actions.noAction, {Authorization: this.props.user.token});
	}
	render() {
		return (
			<div id="list">
				<h2>Chats Favoritos</h2>
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
	favorites: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
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
