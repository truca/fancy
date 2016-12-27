import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class ChatForm extends Component {
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
	}
	render() {
		return (
			<div>
				<div>
					<h5 style={{display: 'block'}}>Nombre</h5>
					<input type="text" />
				</div>
				<div>
					<h5 style={{display: 'block'}}>Dirección</h5>
					<input type="text" />
				</div>
				<div>
					<h5 style={{display: 'block'}}>Activo por</h5>
					<select>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>10</option>
						<option>Infinito</option>
					</select>
					<select>
						<option>Horas</option>
						<option>Días</option>
						<option>Semanas</option>
						<option>Días</option>
					</select>
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
				<button className="btn btn-primary">Enviar</button>
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
