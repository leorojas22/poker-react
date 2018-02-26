import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loginChecked: loginChecked, isLoggedIn: isLoggedIn, ...rest }) => {
	console.log(rest);
	return (
		<Route
		{...rest}
		render={props =>
			isLoggedIn ? (
			<Component {...props}>{console.log(props)}</Component>
			) : (
			<Redirect
				to="/login"
			/>
			)
		}
		/>
	);
};

export default PrivateRoute;
