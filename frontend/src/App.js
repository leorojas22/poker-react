import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoggedOutRoute from './components/LoggedOutRoute';

import './App.css';

import SignUpPage from './containers/SignUpPage'
import LoginPage from './containers/LoginPage'
import DashboardPage from './containers/DashboardPage'


import Header from './components/Header';
import MainContainer from './components/MainContainer';

import { connect } from 'react-redux';
import { checkLoggedIn } from './actions/user';

class App extends Component {

	componentWillMount() {
		this.props.checkLoggedIn();
	}

	render() {
		return (
			<Fragment>
				<Header />
				<MainContainer>
					{
						this.props.loginChecked ? (
							<Fragment>
								<LoggedOutRoute path="/signup" loginChecked={this.props.loginChecked} isLoggedIn={this.props.user} exact component={SignUpPage} />
								<PrivateRoute path="/dashboard" loginChecked={this.props.loginChecked} isLoggedIn={this.props.user} exact={true} component={DashboardPage} />
								<LoggedOutRoute path="/login" loginChecked={this.props.loginChecked} isLoggedIn={this.props.user} exact component={LoginPage} />
							</Fragment>
						)
						:
						(
							<p className="text-center">Loading...</p>
						)
					}
				</MainContainer>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		user: state.user,
		loginChecked: state.loginChecked
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkLoggedIn: () => dispatch(checkLoggedIn()) 
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
