import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class ChatForm extends Component {
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
	}
	createChat() {
		//	POST a /chat con attribs { category_id, name, address, image }
	}
	render() {
		return (
			<div>
				<div>
					<input type="text" placeholder="NOMBRE"/>
				</div>
				<div>
					<input type="text" placeholder="DIRECCIÓN"/>
				</div>
				<div>
					<h5 style={{display: 'block'}}>Categoría</h5>
					<select>
						<option>Elija categoría</option>
						{this.props.categories.map((category) => { return (<option key={category.id} value={category.id}>{category.name}</option>); })}
					</select>
				</div>
				<div>
					<h5 style={{display: 'block'}}>Descripción</h5>
					<textarea rows="4" cols="50"> </textarea>
				</div>
				<button onClick={this.createChat} >Enviar</button>
			</div>
		);
	}
}

ChatForm.propTypes = {
	categories: PropTypes.array,
	initU: PropTypes.func
};
/*	ChatForm.defaultProps = {
	categories: []
};*/

const mapStateToProps = (state) => {
	return {
		categories: state.categories
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
