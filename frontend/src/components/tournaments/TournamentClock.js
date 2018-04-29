import React, { Fragment } from 'react';

const formatClock = (timeElapsed, blindMinutes) => {
	let blindSeconds 			= blindMinutes*60;
	let blindLevel 				= determineBlindLevel(timeElapsed, blindMinutes);
	let levelTimeElapsed 		= (timeElapsed) - ((blindLevel-1)*blindSeconds);


	let levelMinutesElapsed 	= Math.floor(levelTimeElapsed/60);
	let levelMinutesRemaining 	= blindMinutes - levelMinutesElapsed;
	let levelSecondsRemaining 	= 59 - (levelTimeElapsed - (levelMinutesElapsed*60));



	return levelMinutesRemaining + ":" + (""+levelSecondsRemaining).padStart(2, "0");
}

const determineBlindLevel = (timeElapsed, blindLevelTime) => {
	let timeElapsedMinutes = Math.floor(timeElapsed/60);
	return Math.ceil(timeElapsedMinutes/blindLevelTime);
}


const TournamentClock = (props) => {
	return props.timeElapsed ? (
		<div className="tournament-clock row">
			<div className="col-6 time-remaining">
				<h4><small>Time Remaining:</small></h4>
				<h2>
					{ formatClock(props.timeElapsed, props.blindLevelTime) }
				</h2>
			</div>
			<div className="col-6 blind-level">
				<h4><small>Blind Level:</small></h4>
				<h2>
					{ determineBlindLevel(props.timeElapsed, props.blindLevelTime) }
				</h2>
			</div>
		</div>
	) : ("");
}

export default TournamentClock;