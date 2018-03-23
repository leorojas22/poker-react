import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import numeral from 'numeral';
import Tournament from '../../models/Tournament'

// Components
import TournamentInfo from '../../components/TournamentInfo';
import PlayerList from '../../components/PlayerList';
import FormGroup from '../../components/FormGroup';
import Modal from '../../components/modal/Modal';
import ModalBody from '../../components/modal/ModalBody';
import ModalFooter from '../../components/modal/ModalFooter';

// Actions
import { loadFullTournament } from '../../actions/tournament';
import { handleFormInput } from '../../actions/forminput';
import { savePlayer, loadPlayers, togglePlayerModal } from '../../actions/tournamentPlayer';


class ViewTournamentPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.openPlayerModal 		= this.openPlayerModal.bind(this);
		this.closePlayerModal 		= this.closePlayerModal.bind(this);
		this.backdropModalClick 	= this.backdropModalClick.bind(this);
		this.handleSavePlayerClick 	= this.handleSavePlayerClick.bind(this);

		this.tournamentID = this.props.match.params.tournamentID;
	}

	componentDidMount() {
		let tournamentID = this.tournamentID;
		console.log(this.tournamentID);
		this.props.loadFullTournament(this.tournamentID);
		this.props.loadPlayers(this.tournamentID)
	}

	openPlayerModal() {
		document.body.classList.add("modal-open");
		var props = this.props;
		
		this.props.handlePlayerNameChange({
			target: {
				name: "player_name",
				value: ""
			}
		});
		
		props.togglePlayerModal(true);
	}

	backdropModalClick(e) {
		let target = e.target;
		let classList = [... target.classList];
		if(classList.indexOf("modal") === -1) {
			return false;
		}

		this.closePlayerModal(e);
	}

	closePlayerModal(e) {
		document.body.classList.remove("modal-open");
		var props = this.props;
		props.togglePlayerModal(false);
	}

	handleSavePlayerClick(e) {
		e.preventDefault();
		this.props.savePlayer({
			name		: this.props.playerName,
			tournament	: this.tournamentID
		});
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
							
						</div>
						<div className="col-9">
							<h3></h3>
							<PlayerList isLoading={this.playerListLoading} openPlayerModal={this.openPlayerModal} players={Array.isArray(this.props.players) ? this.props.players : []} />
						</div>
					</div>
					<Modal title="Add Player" visible={this.props.playerModalOpen} handleBackdropClick={this.backdropModalClick} handleClose={this.closePlayerModal}>
						<form onSubmit={this.handleSavePlayerClick}>
							<ModalBody>
									<FormGroup>
										<input type="text" className="form-control" placeholder="Player Name" name="player_name" value={this.props.playerName} onChange={this.props.handlePlayerNameChange} />
									</FormGroup>
								
							</ModalBody>
							<ModalFooter>
								<button type="submit" className="btn btn-success" disabled={this.props.savingPlayer ? true: false}>{ this.props.savingPlayer ? (<i className="fa fa-spinner fa-spin" />) : "Save"}</button>
							</ModalFooter>
						</form>
					</Modal>
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
	return {
		tournament			: state.tournaments.selectedTournament,
		playerModalOpen		: state.tournaments.playerModalOpen,
		playerName			: state.tournaments.playerName,
		players				: state.tournamentPlayers.players,
		playerListLoading	: state.tournamentPlayers.isLoading,
		savingPlayer		: state.tournamentPlayers.isSaving
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadFullTournament		: (tournamentID) => dispatch(loadFullTournament(tournamentID)),
		togglePlayerModal		: (status) => dispatch(togglePlayerModal(status)),
		handlePlayerNameChange	: (field) => dispatch(handleFormInput(field)),
		savePlayer				: (player) => dispatch(savePlayer(player)),
		loadPlayers				: (tournamentID) => dispatch(loadPlayers(tournamentID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTournamentPage);
