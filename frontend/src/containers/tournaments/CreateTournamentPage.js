import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

class CreateTournamentPage extends React.Component {
	render() {
		return (
			<Fragment>
				<h1 className="page-title">Create a Tournament</h1>
				<form class="logged-in-form">
					<div className="form-group">
						<input type="text" className="form-control" name="tournament_name" placeholder="Tournament Name" />
					</div>
					<div className="form-group">
						<input type="tel" className="form-control" name="starting_chips" placeholder="Starting Chips" />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" name="buy_in" placeholder="Buy In" />
					</div>
					<div className="form-group text-center">
						<button className="btn btn-primary" type="submit">Save</button>
					</div>
					<div className="form-group text-center">
						<Link to="/tournaments">Return to Tournament List</Link>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default CreateTournamentPage;
