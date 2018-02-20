import React from 'react';

import FormGroup from '../components/FormGroup';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errors: []
		};

		this.handleInput 	= this.handleInput.bind(this);
		this.handleSubmit 	= this.handleSubmit.bind(this);
	}

	handleInput(e) {
		var target = e.target;
		var newState = {};
		newState[target.name] = target.value;
		this.setState(newState);
	}

	handleSubmit(e) {

	}

	render() {
		var errorDiv = "";

		return (
			<form className="logged-out-form">
				<h1>Returning User</h1>
				{errorDiv}
				<FormGroup>
					<input type="text" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInput} />
				</FormGroup>
				<FormGroup>
					<input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
				</FormGroup>
				<FormGroup>
					<button className="btn btn-primary btn-block" type="button" onClick={this.handleSubmit}>Log In</button>
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

export default LoginPage;
