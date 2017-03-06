import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';
//	import languages from '../../translate.js';

class MineChatList extends Component {
	componentDidMount() {
		this.props.initU().get('user/chats/mine.json', actions.noAction, actions.setMine, actions.noAction, {Authorization: this.props.user.token});
		this.props.initU().get('user/chats/subscribed.json', actions.noAction, actions.setFavorites, actions.noAction, {Authorization: this.props.user.token});
	}
	render() {
		return (
			<div id="list">
				<h2>{this.props.languages[this.props.language].lista.chats_mios}</h2>
				<FilterableList items={this.props.mine} item={Evento} path="chats" />
			</div>
		);
	}
}
//	<FilterableList items={this.props.subscribedChats} item={Evento} path="chats" />

MineChatList.propTypes = {
	subscribedChats: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
	mine: PropTypes.array,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		mine: state.mine,
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
)(MineChatList);
