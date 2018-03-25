import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Modal from '../modal/Modal';
import ModalBody from '../modal/ModalBody';
import ModalFooter from '../modal/ModalFooter';

import { savePlayer } from '../../actions/tournamentPlayer';
import { toggleModal } from '../../actions/modal';

class ConfirmDeletePlayerModal extends Component {

	constructor(props) {
		super(props);

		this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	closeConfirmDeleteModal() {
		this.props.toggleConfirmDelete(false);
	}

	handleSubmit(e) {
		e.preventDefault();

		let player = {
			id: this.props.selectedPlayer.id,
			tournament: this.props.selectedPlayer.tournament,
			deleted: true
		}

		this.props.savePlayer(player);
	}

	render() {
		return (
			<Modal 
				name="confirmDeletePlayerModal" 
				title="Confirm Delete" 
				visible={this.props.confirmDeleteModalOpen}
				onSubmit={this.handleSubmit}
			>
				<ModalBody>
					<p className="text-center">
						Are you sure you want to delete the player: <strong>{this.props.selectedPlayer.name}</strong>?
					</p>
				</ModalBody>
				<ModalFooter>
					<button type="button" className="btn btn-light" onClick={this.closeConfirmDeleteModal} disabled={this.props.isDeleting}>Cancel</button>
					<button type="submit" className="btn btn-danger" disabled={this.props.isDeleting}>
						{this.props.isDeleting ? (<Fragment><i className="fa fa-spinner fa-spin mr-md" /> Deleting...</Fragment>) : "Confirm"}
					</button>
				</ModalFooter>
			</Modal>
		);
	}
	
}

const mapStateToProps = (state) => ({
	confirmDeleteModalOpen	: state.tournamentPlayers.confirmDeleteModal,
	selectedPlayer			: state.tournamentPlayers.selectedPlayer,
	errors					: state.tournamentPlayers.errors,
	isDeleting				: state.tournamentPlayers.isSaving
});

const mapDispatchToProps = (dispatch) => ({
	toggleConfirmDelete	: (status) => dispatch(toggleModal(status, "confirmDeletePlayerModal")),
	savePlayer			: (player) => dispatch(savePlayer(player))
})


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeletePlayerModal);
