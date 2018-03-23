import React, { Fragment } from 'react';

import { Route, Redirect } from 'react-router-dom';

const LoggedOutRoute = ({ component: Component, loginChecked: loginChecked, isLoggedIn: isLoggedIn, ...rest }) => {
	
	if(loginChecked) {
		return (
			<Route
			{...rest}
			render={props =>
				!isLoggedIn ? (
					<Component {...props}></Component>
				) 
				: 
				(
					
					<Redirect
						to={{
							pathname: "/"
						}}
					/>
				)
			}
			/>
		);
	}
	else {
		return (
			<div className="text-center">Loading...</div>
		);
	}

};

export default LoggedOutRoute;
