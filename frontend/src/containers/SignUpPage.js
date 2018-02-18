import React, { Fragment } from 'react';

import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import FormGroup from '../components/FormGroup';


class SignUpPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			confirmPassword: ""
		}

		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		var target = e.target;
		console.log(target.name);

		var newState = {};
		newState[target.name] = target.value;

		this.setState(newState);
	}

	handleSubmit(e) {

	}

	render() {
		return (
			<Fragment>
				<Header />
				<MainContainer>
					<form className="logged-out-form">
						<h1>New User</h1>
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
							<button className="btn btn-primary btn-block" type="button">Sign Up</button>
						</FormGroup>
						<FormGroup className="text-center">
							Already have an account? <a href="/">Log In!</a>
						</FormGroup>
					</form>
				</MainContainer>
			</Fragment>			
		);
	}
}

export default SignUpPage;