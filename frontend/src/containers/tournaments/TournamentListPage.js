import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { loadTournamentList } from '../../actions/tournament';
import { Link } from 'react-router-dom';

class TournamentListPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadTournamentList();
	}

	render() {
		return (
			<Fragment>
				<h1 className="page-title">Your Tournaments</h1>
				<div className="table-responsive">
					<table className="table table-dark table-striped table-hover table-sm table-bordered">
						<thead>
							<tr>
								<th>Name</th>
								<th>Buy In</th>
								<th>Status</th>
								<th>Created</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
							!this.props.isLoading ?
							
							
								this.props.tournaments.length > 0 ?
								(
									<tr>
										<td colSpan="5" className="text-center">Loaded.</td>
									</tr>
								)
								:
								(
									<tr>
										<td colSpan="5" className="text-center">You haven't made any tournaments yet! <Link to="/tournaments/create">Create One!</Link></td>
									</tr>
								)
							
							
							:
							(
								<tr>
									<td colSpan="5" className="text-center">Loading...</td>
								</tr>
							)
							}
						</tbody>
					</table>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.tournaments.listLoading,
		tournaments: state.tournaments.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadTournamentList: () => dispatch(loadTournamentList())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentListPage);
