import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
	render() {
		return (
			<div className="bg-img-green page">
				<img className="logo" src="app/img/iso-blanco2.svg" ></img>
				{this.props.languages[this.props.language].about.text}
			</div>
		);
	}
}

About.propTypes = {
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		language: state.language, languages: state.languages,
	};
};

const mapDispatchToProps = () => {
	return { };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About);
