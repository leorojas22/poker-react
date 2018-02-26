import React from 'react';

import FormGroup from '../components/FormGroup';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { handleFormInput } from '../actions/forminput';

import { userLogin } from '../actions/user';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit 	= this.handleSubmit.bind(this);
		console.log(props);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("TESTING");
		this.props.handleSubmit(this.props.email, this.props.password);
	}

	render() {
		
		var errorDiv = this.props.errors.length > 0 ? (
			<div className="alert alert-danger">
				{this.props.errors.map((value, index) => {
					return (<p key={index}>{value}</p>);
				})}
			</div>
		) : "";

		return (
			<form className="logged-out-form" onSubmit={this.handleSubmit}>
				<h1>Returning User</h1>
				{errorDiv}
				<FormGroup>
					<input type="text" className="form-control" name="email" placeholder="Email Address" value={this.props.email} onChange={this.props.handleInput} />
				</FormGroup>
				<FormGroup>
					<input type="password" className="form-control" name="password" placeholder="Password" value={this.props.password} onChange={this.props.handleInput} />
				</FormGroup>
				<FormGroup>
					<button className="btn btn-primary btn-block" type="submit">Log In</button>
				</FormGroup>
				<FormGroup className="text-center">
					Don't have an account? <Link to="/signup">Sign Up!</Link>
				</FormGroup>
				<FormGroup className="text-center">
					<Link to="/forgot-password">Forgot Password?</Link>
				</FormGroup>
			</form>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		email		: state.loginPage.email,
		password	: state.loginPage.password,
		errors		: state.loginPage.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleInput: (field) => dispatch(handleFormInput(field)),
		handleSubmit: (email, password) => dispatch(userLogin(email, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
