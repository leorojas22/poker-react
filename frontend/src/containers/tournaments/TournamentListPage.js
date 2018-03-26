import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { loadTournamentList } from '../../actions/tournament';
import { Link } from 'react-router-dom';

import moment from 'moment';
import numeral from 'numeral';

class TournamentListPage extends React.Component {

	componentWillMount() {
		this.props.loadTournamentList();
	}

	render() {
		console.log(this.props.tournamentSelectedError);
		return (
			<Fragment>
				<h1 className="page-title">Your Tournaments</h1>
				{
					this.props.errors ? 
					(
						<div className="row mb-lg">
							<div className="col-12">
								<div className="alert alert-danger">
									{
										Array.isArray(this.props.errors) ?
										this.props.errors.map((value, index) => (
											<p key={index}>{value}</p>
										))
										:
										this.props.errors
									}
								</div>
							</div>
						</div>
					)
					:
					""
				}
				<div className="row mb-lg">
					<div className="col-12 text-right">
						<Link to="/tournament/create" className="btn btn-success">Create Tournament</Link>
					</div>
				</div>
				<div className="table-responsive">
					<table className="table table-dark table-striped table-hover table-sm">
						<thead>
							<tr>
								<th>Name</th>
								<th>Starting Chips</th>
								<th>Buy In</th>
								<th>Status</th>
								<th>Created</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
							!this.props.isLoading ?
							
							
								this.props.tournaments.length > 0 ?
								
									
									this.props.tournaments.map((tournament, index) => {

										let tournamentStatus = tournament.started ? (tournament.completed ? "Completed" : (tournament.paused ? "Paused" : "Started")) : "Not Started";
										

										return (
											<tr key={index}>
												<td>{tournament.name}</td>
												<td>{numeral(tournament.starting_chips).format("0,0")}</td>
												<td>{numeral(tournament.buyin).format("$0,0.00")}</td>
												<td>{tournamentStatus}</td>
												<td>{moment(tournament.created).format("M/DD/YYYY h:mm:ss A")}</td>
												<td className="text-center">
													<Link className="btn btn-primary btn-sm" to={"/tournament/"+tournament.id}>
														View
													</Link>
												</td>
											</tr>
										);
									})
									
									
								
								:
								(
									<tr>
										<td colSpan="5" className="text-center">You haven't made any tournaments yet! <Link to="/tournament/create">Create One!</Link></td>
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
	console.log(state);
	return {
		isLoading: state.tournaments.listLoading,
		tournaments: state.tournaments.list,
		errors: state.tournaments.tournamentSelectedError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadTournamentList: () => dispatch(loadTournamentList())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentListPage);
