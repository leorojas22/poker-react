import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import numeral from 'numeral';
import Tournament from '../../models/Tournament'

// Components
import TournamentInfo from '../../components/TournamentInfo';
import PlayerList from '../../components/PlayerList';

import PlayerModal from './PlayerModal';


// Actions
import { loadFullTournament } from '../../actions/tournament';
import { handleFormInput } from '../../actions/forminput';
import { setPlayerModalType, loadPlayers, togglePlayerModal } from '../../actions/tournamentPlayer';


class ViewTournamentPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.openAddPlayerModal 		= this.openAddPlayerModal.bind(this);
		this.tournamentID = this.props.match.params.tournamentID;
	}

	componentDidMount() {
		let tournamentID = this.tournamentID;
		console.log(this.tournamentID);
		this.props.loadFullTournament(this.tournamentID);
		this.props.loadPlayers(this.tournamentID)
	}

	openAddPlayerModal() {
		document.body.classList.add("modal-open");
		var props = this.props;
		
		this.props.handleFormInput({
			target: {
				name: "player_name",
				value: ""
			}
		});
		
		this.props.setPlayerModalType("Add");
		props.togglePlayerModal(true);
	}

	render() {
		if(this.props.tournament) {

			return (
				<Fragment>
					<div className="row manage-tournament">
						<div className="col-3">
							<h3>Tournament Info</h3>
							<TournamentInfo name="Name" value={this.props.tournament.name} />
							<TournamentInfo name="Buy In" value={numeral(this.props.tournament.buyin).format("$0,0.00")} />
							<TournamentInfo name="Starting Chips" value={numeral(this.props.tournament.starting_chips).format("0,0")} />
							<TournamentInfo name="Total Entrants" value={numeral(this.props.players.length).format("0,0")} />
							<TournamentInfo name="Prize Pool" value={numeral(this.props.players.length*this.props.tournament.buyin).format("$0,0.00")} />
						</div>
						<div className="col-9">
							<h3></h3>
							<PlayerList isLoading={this.playerListLoading} openAddPlayerModal={this.openAddPlayerModal} players={Array.isArray(this.props.players) ? this.props.players : []} />
						</div>
					</div>
					<div className="row">
						<div className="col-9 offset-3 text-center">
							<Link to="/">Return to Tournament List</Link>
						</div>
					</div>
					<PlayerModal tournamentID={this.tournamentID} />
				</Fragment>
			);
		}
		else {
			return (
				<div className="text-center">
					Loading...
				</div>
			);
		}
	}

}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		tournament			: state.tournaments.selectedTournament,
		playerModalOpen		: state.tournaments.playerModalOpen,
		playerName			: state.tournaments.playerName,
		players				: state.tournamentPlayers.players,
		playerListLoading	: state.tournamentPlayers.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadFullTournament		: (tournamentID) => dispatch(loadFullTournament(tournamentID)),
		togglePlayerModal		: (status) => dispatch(togglePlayerModal(status)),
		handleFormInput	: (field) => dispatch(handleFormInput(field)),
		loadPlayers				: (tournamentID) => dispatch(loadPlayers(tournamentID)),
		setPlayerModalType		: (type) => dispatch(setPlayerModalType(type))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTournamentPage);
