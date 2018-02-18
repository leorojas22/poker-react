import React from 'react';

const MainContainer = (props) => {
	return (
		<div className="container main-container">
			{props.children}
		</div>
	);
}

export default MainContainer;
