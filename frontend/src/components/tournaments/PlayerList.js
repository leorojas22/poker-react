import React, { Fragment, Component } from 'react';

import numeral from 'numeral';

import { connect } from 'react-redux';
import { handleFormInput } from '../../actions/forminput';
import { setPlayerModalType, selectPlayer } from '../../actions/tournamentPlayer';
import { toggleModal } from '../../actions/modal';

import Tournament from '../../models/Tournament';

import ConfirmDeletePlayerModal from './ConfirmDeletePlayerModal';


class PlayerList extends Component {

	constructor(props) {
		super(props);

		this.openEditPlayerModal 		= this.openEditPlayerModal.bind(this);
		this.openConfirmDeleteModal 	= this.openConfirmDeleteModal.bind(this);
	}

	openEditPlayerModal(playerIndex) {
		let player = this.props.players[playerIndex];
		let props = this.props;

		let defaultValues = [
			{
				name: "player_name",
				value: player.name
			},
			{
				name: "chip_count",
				value: player.chip_count
			},
			{
				name: "player_finished",
				value: player.finished ? true : false
			}
		];

		defaultValues.map((value, index) => {
			props.handleFormInput({
				target: value
			})
		});

		this.props.selectPlayer(player);
		this.props.setPlayerModalType("Edit");
		this.props.togglePlayerModal(true);
	}

	openConfirmDeleteModal(playerIndex) {
		let player = this.props.players[playerIndex];

		this.props.selectPlayer(player);
		this.props.toggleConfirmDeletePlayerModal(true);
	}

	

	render() {
		let props = this.props;
		return (
			<Fragment>
				<h3>Player List</h3>
				{
					props.isLoading ? (<p className="text-center"><i className="fa fa-spinner fa-spin mr-md" /> Loading...</p>) : ""
				}
				<table className={"table table-dark table-striped table-hover table-sm"+(props.isLoading ? " dimmed" : "")}>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Chip Count</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							props.players.length > 0 
							? 
							props.players.map((player, index) => {

								let payoutLine = index === (props.playersToPay-1) ? " payout-line" : "";

								return (
									<tr key={index} className={(player.finished ? "text-muted font-italic text-linethrough" : "")+payoutLine}>
										<td>{index+1}</td>
										<td>{player.name}</td>
										<td>{numeral(player.chip_count).format("0,0")}</td>
										<td className="text-right">
											<button className="btn btn-sm btn-primary mr-md" type="button" onClick={this.openEditPlayerModal.bind(this, index)}><i className="fa fa-edit" /></button>
											<button className="btn btn-sm btn-danger" type="button" onClick={this.openConfirmDeleteModal.bind(this, index)}><i className="fa fa-times" /></button>
										</td>
									</tr>
								)
							})
							: 
							(<tr><td colSpan="4" className="text-center">No players yet! <a tabIndex="1" onClick={props.openAddPlayerModal}>Add a Player</a></td></tr>)}
					</tbody>
				</table>
				<ConfirmDeletePlayerModal />
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	confirmDeleteModalOpen	: state.tournamentPlayers.confirmDeleteModal,
	selectedPlayer			: state.tournamentPlayers.selectedPlayer
});

const matchDispatchToProps = (dispatch) => ({
	handleFormInput					: (field) => dispatch(handleFormInput(field)),
	togglePlayerModal				: (status) => dispatch(toggleModal(status, "playerModal")),
	setPlayerModalType				: (type) => dispatch(setPlayerModalType(type)),
	selectPlayer					: (player) => dispatch(selectPlayer(player)),
	toggleConfirmDeletePlayerModal 	: (status) => dispatch(toggleModal(status, "confirmDeletePlayerModal"))
})

export default connect(mapStateToProps, matchDispatchToProps)(PlayerList);
