import React from 'react';

const TournamentInfo = (props) => {
	return (
		<div className="tournament-info">
			<label>{props.name}:</label>
			{props.value}
		</div>
	);
}

export default TournamentInfo;
