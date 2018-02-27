import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loginChecked: loginChecked, isLoggedIn: isLoggedIn, ...rest }) => {

	if(loginChecked) {
		return (
			<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
				<Component {...props}>{console.log(props)}</Component>
				) : (
				<Redirect
					to="/login"
				>{console.log("REDIRECTED!")}</Redirect>
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

export default PrivateRoute;
