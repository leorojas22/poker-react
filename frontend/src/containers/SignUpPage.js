import React, { Fragment } from 'react';

import FormGroup from '../components/FormGroup';

import { ajaxHelper } from '../helpers/ajax';

import User from '../helpers/User';

class SignUpPage extends React.Component {
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

	render() {

		var errorDiv = this.state.errors.length > 0 ? (
			<div className="alert alert-danger">
				{this.state.errors.map((value, index) => {
					return (<p>{value}</p>);
				})}
			</div>
		) : "";

		return (
			<Fragment>
				<form className="logged-out-form">
					<h1>New User</h1>
					{errorDiv}
					<FormGroup>
						<input type="text" className="form-control" name="email" placeholder="Email Address" onChange={this.handleInput} />
					</FormGroup>
					<FormGroup>
						<input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInput} />
					</FormGroup>
					<FormGroup>
						<input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleInput} />
					</FormGroup>
					<FormGroup>
						<button className="btn btn-primary btn-block" type="button" onClick={this.handleSubmit}>Sign Up</button>
					</FormGroup>
					<FormGroup className="text-center">
						Already have an account? <a href="/">Log In!</a>
					</FormGroup>
				</form>
			</Fragment>			
		);
	}
}

export default SignUpPage;