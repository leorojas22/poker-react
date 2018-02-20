import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import FormGroup from '../components/FormGroup';

import { ajaxHelper } from '../helpers/ajax';

import User from '../helpers/User';

import { connect } from 'react-redux';
import { userSignUp, userSignUpHandleInput, userSignUpEmail, userSignUpPassword, userSignUpConfirmPassword } from '../actions/user';

class SignUpPage extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.userSignUp({
			email			: this.props.email,
			password		: this.props.password,
			confirmPassword	: this.props.confirmPassword
		});
	}

	/*
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			errors: []
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		var target = e.target;
		console.log(target.name);

		var newState = {};
		newState[target.name] = target.value;

		this.setState(newState);
	}

	handleSubmit(e) {
		var self = this;

		this.setState({
			errors: []
		});

		User.create({
			email			: self.state.email,
			password		: self.state.password,
			confirmPassword	: self.state.confirmPassword
		})
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			this.setState({
				errors: err
			});
		});
		
	}
	*/

	render() {

		var errorDiv = this.props.errors.length > 0 ? (
			<div className="alert alert-danger">
				{this.props.errors.map((value, index) => {
					return (<p key={index}>{value}</p>);
				})}
			</div>
		) : "";

		return (
			<Fragment>
				<form className="logged-out-form" onSubmit={this.handleSubmit}>
					<h1>New User</h1>
					{errorDiv}
					<FormGroup>
						<input type="text" className="form-control" name="email" placeholder="Email Address" value={this.props.email} onChange={this.props.userEnterEmail} />
					</FormGroup>
					<FormGroup>
						<input type="password" className="form-control" name="password" placeholder="Password" value={this.props.password} onChange={this.props.userEnterPassword} />
					</FormGroup>
					<FormGroup>
						<input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.props.confirmPassword} onChange={this.props.userEnterConfirmPassword} />
					</FormGroup>
					<FormGroup>
						<button className="btn btn-primary btn-block" type="submit">Sign Up</button>
					</FormGroup>
					<FormGroup className="text-center">
						Already have an account? <Link to="/login">Log In!</Link>
					</FormGroup>
				</form>
			</Fragment>			
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		email			: state.signUpPage.email,
		password		: state.signUpPage.password,
		confirmPassword	: state.signUpPage.confirmPassword,
		errors			: state.signUpPage.errors,
		processing		: state.signUpPage.processing
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userEnterEmail: (field) => dispatch(userSignUpHandleInput(field)),
		userEnterPassword: (field) => dispatch(userSignUpHandleInput(field)),
		userEnterConfirmPassword: (field) => dispatch(userSignUpHandleInput(field)),
		userSignUp: (obj) => dispatch(userSignUp(obj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);