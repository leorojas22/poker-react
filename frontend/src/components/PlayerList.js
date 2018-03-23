import React, { Fragment } from 'react';

import numeral from 'numeral';

const PlayerList = (props) => {
	return (
		<Fragment>
			{
				props.players.length > 0 ? 
				(
					<div className="d-flex flex-row-reverse">
						<a tabIndex="1" className="btn btn-primary" onClick={props.openPlayerModal}>Add a Player</a>
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
								<tr key={index}>
									<td>{index+1}</td>
									<td>{player.name}</td>
									<td>{numeral(player.chip_count).format("0,0")}</td>
									<td className="text-right">
										<button className="btn btn-sm btn-primary mr-md" type="button"><i className="fa fa-edit" /></button>
										<button className="btn btn-sm btn-danger" type="button"><i className="fa fa-times" /></button>
									</td>
								</tr>
							)
						})
						: 
						(<tr><td colSpan="3" className="text-center">No players yet! <a tabIndex="1" onClick={props.openPlayerModal}>Add a Player</a></td></tr>)}
				</tbody>
			</table>
		</Fragment>
	);
}

export default PlayerList;
