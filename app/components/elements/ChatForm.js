import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fU from '../../Utils.js';
//	import languages from '../../translate.js';

class ChatForm extends Component {
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
	}
	buttonAction() {
		const data = {
			chat: {
				category_id: this.refs.category.value,
				name: this.refs.name.value,
				address: this.refs.address.value,
				description: this.refs.description.value
			}
		};

		this.props.buttonAction(data);
		//	this.props.initU().post('chats', actions.noAction, actions.noAction, actions.noAction, data, {Authorization: this.props.user.token} );
		//	POST a /chat con attribs { category_id, name, address, image, description }
	}
	render() {
		return (
			<div>
				<div>
					<input ref="name" type="text" placeholder={this.props.languages[this.props.language].crear_chat.nombre}
						defaultValue={ this.props.item.name } />
				</div>
				<div>
					<input ref="address" type="text" placeholder={this.props.languages[this.props.language].crear_chat.direccion}
						defaultValue={ this.props.item.address } />
				</div>
				<div>
					<h5 style={{display: 'block'}}>{this.props.languages[this.props.language].crear_chat.categoria}</h5>
					<select ref="category" defaultValue={ this.props.item.category && this.props.item.category.id } >
						<option>{this.props.languages[this.props.language].crear_chat.categoria}</option>
						{this.props.categories.map((category) => { return (<option key={category.id} value={category.id}>{category.name}</option>); })}
					</select>
				</div>
				<div>
					<h5 style={{display: 'block'}}>{this.props.languages[this.props.language].crear_chat.descripcion}</h5>
					<textarea ref="description" rows="4" cols="50" defaultValue={ this.props.item.description }></textarea>
				</div>
				<button onClick={this.buttonAction.bind(this)} >{this.props.buttonText}</button>
			</div>
		);
	}
}

ChatForm.propTypes = {
	categories: PropTypes.array,
	initU: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
	user: PropTypes.object,
	item: PropTypes.object,
	buttonAction: PropTypes.func,
	buttonText: PropTypes.string,
};
/*	ChatForm.defaultProps = {
	categories: []
};*/

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
		language: state.language, languages: state.languages,
		user: state.user,
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
)(ChatForm);
