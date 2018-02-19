import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn: isLoggedIn, ...rest }) => (
	<Route
	  {...rest}
	  render={props =>
		isLoggedIn ? (
		  <Component {...props} />
		) : (
		  <Redirect
			to={{
				pathname: "/login"
			}}
		  />
		)
	  }
	/>
  );

export default PrivateRoute;
