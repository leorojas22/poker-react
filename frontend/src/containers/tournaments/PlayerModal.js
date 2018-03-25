import React, { Component, Fragment } from 'react';

import FormGroup from '../../components/FormGroup';
import InputField from '../../components/InputField';
import Modal from '../../components/modal/Modal';
import ModalBody from '../../components/modal/ModalBody';
import ModalFooter from '../../components/modal/ModalFooter';
import Checkbox from '../../components/Checkbox';

import { connect } from 'react-redux';

import { savePlayer, togglePlayerModal } from '../../actions/tournamentPlayer';


class PlayerModal extends Component {

	constructor(props) {
		super(props);

		this.backdropModalClick 	= this.backdropModalClick.bind(this);
		this.closePlayerModal 		= this.closePlayerModal.bind(this);
		this.handleSavePlayerClick 	= this.handleSavePlayerClick.bind(this);

		this.tournamentID = props.tournamentID;
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

		let player = {
			name		: this.props.playerName,
			tournament	: this.tournamentID
		}

		if(this.props.modalType == "Edit") {
			player.id 			= this.props.selectedPlayer.id;
			player.chip_count 	= this.props.chipCount;
			player.finished		= this.props.playerFinished;
		}

		this.props.savePlayer(player);
	}

	render() { 
		return (
			<Modal title={this.props.modalType+" Player"} visible={this.props.playerModalOpen} handleBackdropClick={this.backdropModalClick} handleClose={this.closePlayerModal}>
				<form onSubmit={this.handleSavePlayerClick}>
					<ModalBody>
						{
							this.props.errors.length > 0 ?
							(
								<div className="alert alert-danger">
									{
										this.props.errors.map((error, index) => (
											<p key={index}>{error}</p>
										))
									}
								</div>
							)
							:
							""
						}
						<FormGroup>
							<InputField placeholder="Player Name" name="player_name" value={this.props.playerName} />
						</FormGroup>
						{
							this.props.modalType == "Edit" ?
							(
								<Fragment>
									<FormGroup>
										<InputField type="tel" placeholder="Chip Count" name="chip_count" value={this.props.chipCount} />
									</FormGroup>
									<FormGroup>
										<Checkbox label="Finished" checked={this.props.playerFinished ? true : false} name="player_finished" id="player_finished" >
										{
											this.props.playerFinished && parseInt(this.props.chipCount) > 0 ? 
											(
												<span className="form-text text-warning small">
													Player's chip count will be set to 0
												</span>
											)
											:
											""
										}
										</Checkbox>
									</FormGroup>
								</Fragment>
							)
							:
							""
						}
					</ModalBody>
					<ModalFooter>
						<button type="submit" className="btn btn-success" disabled={this.props.savingPlayer ? true: false}>{ this.props.savingPlayer ? (<i className="fa fa-spinner fa-spin" />) : "Save"}</button>
					</ModalFooter>
				</form>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playerModalOpen		: state.tournaments.playerModalOpen,
		playerName			: state.tournamentPlayers.playerName,
		savingPlayer		: state.tournamentPlayers.isSaving,
		modalType			: state.tournamentPlayers.playerModalType,
		errors				: state.tournamentPlayers.errors,
		chipCount			: state.tournamentPlayers.chipCount,
		playerFinished		: state.tournamentPlayers.playerFinished,
		selectedPlayer		: state.tournamentPlayers.selectedPlayer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		savePlayer				: (player) => dispatch(savePlayer(player)),
		togglePlayerModal		: (status) => dispatch(togglePlayerModal(status))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModal);
