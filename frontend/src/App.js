import React, { Component, Fragment } from 'react';

import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

import Header from './components/Header';
import SignUpPage from './containers/SignUpPage'
import DashboardPage from './containers/DashboardPage'
import MainContainer from './components/MainContainer';


class App extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<MainContainer>
					
					<Route path="/signup" exact component={SignUpPage} />
					<Route path="/login" exact component={SignUpPage} />
					<PrivateRoute path="/dashboard" exact={true} component={DashboardPage} />
				</MainContainer>
			</Fragment>
		);
	}
}

export default App;
