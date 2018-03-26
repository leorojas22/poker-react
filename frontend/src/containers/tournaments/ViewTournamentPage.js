import React, { Fragment } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import numeral from 'numeral';
import Tournament from '../../models/Tournament'

// Components
import TournamentInfo from '../../components/tournaments/TournamentInfo';
import PlayerList from '../../components/tournaments/PlayerList';
import PlayerModal from '../../components/tournaments/PlayerModal';


// Actions
import { loadFullTournament, selectedTournament } from '../../actions/tournament';
import { handleFormInput } from '../../actions/forminput';
import { setPlayerModalType, loadPlayers, togglePlayerModal } from '../../actions/tournamentPlayer';

import { toggleModal } from '../../actions/modal';

class ViewTournamentPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.openAddPlayerModal 		= this.openAddPlayerModal.bind(this);
		this.tournamentID = this.props.match.params.tournamentID;
	}

	componentWillMount() {
		//this.props.selectedTournament(false);
	}

	componentDidMount() {
		let tournamentID = this.tournamentID;
		console.log(this.tournamentID);
		if(!this.props.tournament || (this.props.tournament.id !== this.tournamentID)) {
			this.props.selectedTournament(false);
			this.props.loadFullTournament(this.tournamentID);
			this.props.loadPlayers(this.tournamentID)
		}
	}

	openAddPlayerModal() {
		var props = this.props;
		
		this.props.handleFormInput({
			target: {
				name: "player_name",
				value: ""
			}
		});
		
		this.props.setPlayerModalType("Add");
		props.togglePlayerModal(true, "playerModal");
	}

	render() {
		if(this.props.tournament && !this.props.tournamentSelectedError) {
		
			let playersToPay = this.props.tournament.payout_type == Tournament.PAYOUT_TYPE_PERCENTAGE ? Math.ceil(this.props.players.length * (this.props.tournament.payout_type_amount/100)) : this.props.tournament.payout_type_amount;
		
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
							<TournamentInfo name="Pays Top" value={numeral(playersToPay).format("0,0")+" players"} />
							<p className="text-center mt-lg">
								<Link to={"/tournament/"+this.tournamentID+"/edit"} className="btn btn-primary btn-sm"><i className="fa fa-pencil mr-md" />Edit Info</Link>
							</p>
						</div>
						<div className="col-9">
							<h3></h3>
							<PlayerList 
								isLoading={this.playerListLoading} 
								openAddPlayerModal={this.openAddPlayerModal} 
								players={Array.isArray(this.props.players) ? this.props.players : []} 
								playersToPay={playersToPay}
							/>
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
		else if(this.props.tournamentSelectedError) {
			return (
				<Redirect to="/" />
			)
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
		playerListLoading	: state.tournamentPlayers.isLoading,
		tournamentSelectedError: state.tournaments.tournamentSelectedError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadFullTournament		: (tournamentID) => dispatch(loadFullTournament(tournamentID)),
		togglePlayerModal		: (status, modalName) => dispatch(toggleModal(status, modalName)),
		handleFormInput			: (field) => dispatch(handleFormInput(field)),
		loadPlayers				: (tournamentID) => dispatch(loadPlayers(tournamentID)),
		setPlayerModalType		: (type) => dispatch(setPlayerModalType(type)),
		selectedTournament		: (tournament) => dispatch(selectedTournament(tournament))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTournamentPage);
