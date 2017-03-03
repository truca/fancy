import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fU from '../../Utils.js';
import Datetime from 'react-datetime';
import moment from 'moment';
import ToggleButton from 'react-toggle-button';
import momentTimezone from 'moment-timezone';

class ChatForm extends Component {
	constructor(props) {
		super(props);
		this.state = { date: moment(), active: true };
	}
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		this.setState({ active: this.props.item.active });
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.item.active != this.props.item.active) {
			this.setState({ active: nextProps.item.active });
		}
	}
	buttonAction() {
		if( this.refs.category.value && this.refs.name.value && this.refs.address.value && this.refs.description.value) {
			const data = {
				chat: {
					category_id: this.refs.category.value,
					name: this.refs.name.value,
					occurrence: this.state.date.format(),
					address: this.refs.address.value,
					description: this.refs.description.value,
					active: this.state.active
				}
			};

			this.props.buttonAction(data);
		}else{
			this.props.initU().alert(this.props.languages[this.props.language].alert.titulo_error_crear_evento,
				this.props.languages[this.props.language].alert.mensaje_error_crear_evento);
		}
	}
	setChat() {
		this.props.initU().get('chats/' + this.props.item.id, actions.noAction, actions.updateChat, actions.noAction, {Authorization: this.props.user.token});
	}
	changeDate(date) {
		this.setState({ date });
	}
	render() {
		return (
			<div>
				<div className="profilePic" key={this.props.item ? 'img' + this.props.item.id : 'img'}>
					<img id="portrait" src={ this.props.item.image ? 'http://138.197.8.69' + this.props.item.image : 'http://138.197.8.69/assets/default-chat.jpg' } ></img>
					<div id="changeImage">
						<button onClick={ typeof capturePhotoEvent !== 'undefined' ? capturePhotoEvent.bind(this, this.props.item, this.props.user, this.setChat.bind(this), this.props.languages[this.props.language].imagen.exito, this.props.languages[this.props.language].imagen.error, pictureSource.CAMERA) : () => {}}>
							<i className="fa fa-camera" aria-hidden="true"></i>
						</button>
						<button onClick={ typeof capturePhotoEvent !== 'undefined' ? capturePhotoEvent.bind(this, this.props.item, this.props.user, this.setChat.bind(this), this.props.languages[this.props.language].imagen.exito, this.props.languages[this.props.language].imagen.error, pictureSource.PHOTOLIBRARY) : () => {}}>
							<i className="fa fa-th" aria-hidden="true"></i>
						</button>
					</div>
				</div>
				<div style={{margin: '10px 0'}}>
					<h5 style={{display: 'inline-block'}}>{this.props.languages[this.props.language].actualizar_chat.chat_activo}</h5>
					<span style={{float: 'right'}}>
						<ToggleButton
							value={this.state.active}
							onToggle={(value) => { this.setState({ active: !value }); }}
						/>
					</span>
				</div>
				<div key={this.props.item ? 'name' + this.props.item.id : 'name'}>
					<input ref="name" type="text" placeholder={this.props.languages[this.props.language].crear_chat.nombre}
						defaultValue={ this.props.item.name } />
				</div>
				<div key={this.props.item ? 'address' + this.props.item.id : 'address'}>
					<input ref="address" type="text" placeholder={this.props.languages[this.props.language].crear_chat.direccion}
						defaultValue={ this.props.item.address } />
				</div>
				<div key={this.props.item ? 'date' + this.props.item.id : 'date'}>
					<h5 style={{display: 'block'}}>{this.props.languages[this.props.language].crear_chat.fecha_hora_del_evento}</h5>
					<Datetime onChange={this.changeDate.bind(this)} defaultValue={this.props.item ? momentTimezone(this.props.item.occurrence).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm') : null } ref="date" />
				</div>
				<div key={this.props.item ? 'category' + this.props.item.id : 'category'}>
					<h5 style={{display: 'block'}}>{this.props.languages[this.props.language].crear_chat.categoria}</h5>
					<select ref="category" defaultValue={ this.props.item.category && this.props.item.category.id } >
						<option>{this.props.languages[this.props.language].crear_chat.categoria}</option>
						{this.props.categories.map((category) => { return (<option key={category.id} value={category.id}>{category.name}</option>); })}
					</select>
				</div>
				<div key={this.props.item ? 'description' + this.props.item.id : 'description'}>
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
