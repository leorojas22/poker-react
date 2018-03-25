import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { handleFormInput } from '../../actions/forminput';
import { createTournament, tournamentCreated } from '../../actions/tournament';
import FormGroup from '../../components/FormGroup';

class CreateTournamentPage extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.setTournamentCreated(false);
	}

	handleSubmit(e) {
		e.preventDefault();
		
		var tournament = {
			name				: this.props.tournamentName,
			starting_chips		: this.props.startingChips,
			buyin				: this.props.buyIn,
			blind_level_time	: this.props.blindLevelLength,
			payout_type			: this.props.payoutType,
			payout_type_amount	: this.props.payoutAmount
		}

		this.props.createTournament(tournament).then(tournament => {
			this.props.setTournamentCreated(true);
		});
	}

	render() {

		if(this.props.tournamentCreated) {
			return (
				<Redirect to={"/tournament/"+this.props.selectedTournament.id} />
			);
		}
		else {
			return (
				<Fragment>
					<h1 className="page-title">Create a Tournament</h1>
					<form className="logged-in-form" onSubmit={this.handleSubmit} >
						{this.props.errors.length > 0 ? (<div className="alert alert-danger">{this.props.errors.map((error, index) => (
							<p key={index}>{error}</p>
						))}</div>) : ""}
						<FormGroup>
							<input type="text" className="form-control" name="tournament_name" placeholder="Tournament Name" value={this.props.tournamentName} onChange={this.props.handleTournamentNameInput} />
						</FormGroup>
						<FormGroup>
							<input type="tel" className="form-control" name="starting_chips" placeholder="Starting Chips" value={this.props.startingChips} onChange={this.props.handleStartingChipsInput} />
						</FormGroup>
						<FormGroup>
							<input type="text" className="form-control" name="buy_in" placeholder="Buy In" value={this.props.buyIn} onChange={this.props.handleBuyInInput} />
						</FormGroup>
						<FormGroup>
							<input type="text" className="form-control" name="blind_level_time" placeholder="Blind Level Length (in minutes)" value={this.props.blindLevelLength} onChange={this.props.handleBlindLeveLengthInput} />
						</FormGroup>
						<FormGroup>
							<select className="form-control" name="payout_type" value={this.props.payoutType} onChange={this.props.handlePayoutTypeInput} >
								<option value="1">Payout Percentage of Players</option>
								<option value="2">Payout Fixed Amount of Players</option>
							</select>
						</FormGroup>
						<FormGroup>
							<label>Pay Top</label>
							<div className="input-group">
								<input type="tel" className="form-control" name="payout_amount" placeholder="" value={this.props.payoutAmount} onChange={this.props.handlePayoutAmountInput} />
								<div className="input-group-append">
									<span className="input-group-text">percentage of players</span>
								</div>	
							</div>
						</FormGroup>
						<FormGroup className="text-center">
							<button className="btn btn-success btn-lg" type="submit" disabled={this.props.isSaving ? "disabled" : ""}>
								{ this.props.isSaving ? (<Fragment><i className='fa fa-spinner fa-spin'></i> Saving...</Fragment>) : "Save"}
							</button>
						</FormGroup>
						<FormGroup className="text-center">
							<Link to="/">Return to Tournament List</Link>
						</FormGroup>
					</form>
				</Fragment>
			);
		}	
	}
}

const mapStateToProps = (state) => {
	return {
		tournamentName		: state.tournamentForm.name,
		startingChips		: state.tournamentForm.startingChips,
		buyIn				: state.tournamentForm.buyIn,
		blindLevelLength	: state.tournamentForm.blindLevelTime,
		payoutType			: state.tournamentForm.payoutType,
		payoutAmount		: state.tournamentForm.payoutAmount,
		errors				: state.tournamentForm.errors,
		isSaving			: state.tournamentForm.isSaving,
		selectedTournament	: state.tournaments.selectedTournament,
		tournamentCreated	: state.tournamentForm.tournamentCreated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleTournamentNameInput	: (field) => dispatch(handleFormInput(field)),
		handleStartingChipsInput	: (field) => dispatch(handleFormInput(field)),
		handleBuyInInput			: (field) => dispatch(handleFormInput(field)),
		handleBlindLeveLengthInput	: (field) => dispatch(handleFormInput(field)),
		handlePayoutTypeInput		: (field) => dispatch(handleFormInput(field)),
		handlePayoutAmountInput		: (field) => dispatch(handleFormInput(field)),
		createTournament			: (obj) => dispatch(createTournament(obj)),
		setTournamentCreated		: (status) => dispatch(tournamentCreated(status))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTournamentPage);
