import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoggedOutRoute from './components/LoggedOutRoute';

import './App.css';

import SignUpPage from './containers/SignUpPage'
import LoginPage from './containers/LoginPage'

import TournamentListPage from './containers/tournaments/TournamentListPage'
import CreateTournamentPage from './containers/tournaments/CreateTournamentPage'
import ViewTournamentPage from './containers/tournaments/ViewTournamentPage'

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
							<Switch>
								<LoggedOutRoute path="/signup" loginChecked={this.props.loginChecked} isLoggedIn={this.props.user} exact component={SignUpPage} />
								<LoggedOutRoute path="/login" loginChecked={this.props.loginChecked} isLoggedIn={this.props.user} exact component={LoginPage} />
								<PrivateRoute 
									path="/" 
									loginChecked={this.props.loginChecked} 
									isLoggedIn={this.props.user} 
									exact={true} 
									component={TournamentListPage} 
								/>
								<PrivateRoute 
									path="/tournament/create" 
									loginChecked={this.props.loginChecked} 
									isLoggedIn={this.props.user} 
									exact={true} 
									component={CreateTournamentPage} 
								/>
								<PrivateRoute 
									path="/tournament/:tournamentID" 
									loginChecked={this.props.loginChecked} 
									isLoggedIn={this.props.user} 
									exact={true} 
									component={ViewTournamentPage} 
								/>
								
							</Switch>
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
