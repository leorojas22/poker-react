import React, { Fragment, Component } from 'react';

import numeral from 'numeral';

import { connect } from 'react-redux';
import { handleFormInput } from '../actions/forminput';
import { togglePlayerModal, setPlayerModalType, selectPlayer } from '../actions/tournamentPlayer';

class PlayerList extends Component {

	constructor(props) {
		super(props);

		this.openEditPlayerModal = this.openEditPlayerModal.bind(this);
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

	render() {
		let props = this.props;
		return (
			<Fragment>
				{
					props.players.length > 0 ? 
					(
						<div className="d-flex flex-row-reverse">
							<a tabIndex="1" className="btn btn-primary" onClick={props.openAddPlayerModal}>Add a Player</a>
						</div>
					)
					: ""
				}
				
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
								return (
									<tr key={index} className={player.finished ? "text-muted font-italic text-linethrough" : ""}>
										<td>{index+1}</td>
										<td>{player.name}</td>
										<td>{numeral(player.chip_count).format("0,0")}</td>
										<td className="text-right">
											<button className="btn btn-sm btn-primary mr-md" type="button" onClick={this.openEditPlayerModal.bind(this, index)}><i className="fa fa-edit" /></button>
											<button className="btn btn-sm btn-danger" type="button"><i className="fa fa-times" /></button>
										</td>
									</tr>
								)
							})
							: 
							(<tr><td colSpan="4" className="text-center">No players yet! <a tabIndex="1" onClick={props.openAddPlayerModal}>Add a Player</a></td></tr>)}
					</tbody>
				</table>
			</Fragment>
		);
	}
}

const matchDispatchToProps = (dispatch) => ({
	handleFormInput		: (field) => dispatch(handleFormInput(field)),
	togglePlayerModal	: (status) => dispatch(togglePlayerModal(status)),
	setPlayerModalType	: (type) => dispatch(setPlayerModalType(type)),
	selectPlayer		: (player) => dispatch(selectPlayer(player))
})

export default connect(null, matchDispatchToProps)(PlayerList);
