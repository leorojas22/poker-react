import React, { Component, Fragment } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

import SignUpPage from './containers/SignUpPage'
import LoginPage from './containers/LoginPage'
import DashboardPage from './containers/DashboardPage'


import Header from './components/Header';
import MainContainer from './components/MainContainer';


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false
		}




	}

	
	setLoginStatus(status) {
		this.setState({
			isLoggedIn: status
		})
	}

	render() {
		return (
			<Fragment>
				<Header />
				<MainContainer>
					<Switch>
						<Route path="/signup" exact component={SignUpPage} />
						<PrivateRoute path="/dashboard" isLoggedIn={this.state.isLoggedIn} exact={true} component={DashboardPage} />
						<Route path="/login" exact component={LoginPage} />
					</Switch>
				</MainContainer>
			</Fragment>
		);
	}
}

export default App;
