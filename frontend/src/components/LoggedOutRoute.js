import React, { Fragment } from 'react';

import { Route, Redirect } from 'react-router-dom';

const LoggedOutRoute = ({ component: Component, loginChecked: loginChecked, isLoggedIn: isLoggedIn, ...rest }) => {
	
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
						pathname: "/dashboard"
					}}
				/>
			)
		}
		/>
	);

};

export default LoggedOutRoute;
