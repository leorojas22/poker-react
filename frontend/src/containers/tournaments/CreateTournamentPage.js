import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { handleFormInput } from '../../actions/forminput';
import { saveTournament, tournamentCreated, loadFullTournament, selectTournamentErrors } from '../../actions/tournament';
import FormGroup from '../../components/FormGroup';
import InputField from '../../components/InputField';

class CreateTournamentPage extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.tournamentID = this.props.match.params.tournamentID;
	}

	componentWillUnmount() {
		this.props.setTournamentCreated(false);
		this.props.selectTournamentErrors(false);
	}

	componentWillMount() {
		this.props.setTournamentCreated(false);
		this.props.selectTournamentErrors(false);

		let loadedTournament = false;

		if(this.tournamentID !== 'undefined' && this.props.selectedTournament.id != this.tournamentID) {

			// Editing and have a different tournament loaded
			loadedTournament = this.props.loadFullTournament(this.tournamentID);
		}
		else if(this.tournamentID) {
			loadedTournament = Promise.resolve();
		}

		if(loadedTournament !== false) {
			loadedTournament.then(() => {
				// Populate form
				let formValues = [
					{
						name: "tournament_name",
						value: this.props.selectedTournament.name
					},
					{
						name: "starting_chips",
						value: this.props.selectedTournament.starting_chips
					},
					{
						name: "buy_in",
						value: this.props.selectedTournament.buyin
					},
					{
						name: "blind_level_time",
						value: this.props.selectedTournament.blind_level_time
					},
					{
						name: "payout_type",
						value: this.props.selectedTournament.payout_type
					},
					{
						name: "payout_amount",
						value: this.props.selectedTournament.payout_type_amount
					}
				];

				formValues.map((field, index) => {
					this.props.handleInput({
						target: field
					});
				});

			})
			.catch(err => {
				console.log(err);
			})
		}


	}

	handleSubmit(e) {
		e.preventDefault();
		
		let tournament = {
			name				: this.props.tournamentName,
			starting_chips		: this.props.startingChips,
			buyin				: this.props.buyIn,
			blind_level_time	: this.props.blindLevelLength,
			payout_type			: this.props.payoutType,
			payout_type_amount	: this.props.payoutAmount
		}

		if(typeof this.tournamentID !== 'undefined') {
			tournament.id = this.tournamentID;
		}

		this.props.saveTournament(tournament).then(tournament => {
			this.props.setTournamentCreated(true);
		})
		.catch(err => {
			console.log(err);
		});
	}

	render() {

		if(this.props.tournamentCreated) {
			return (
				<Redirect to={"/tournament/"+this.props.selectedTournament.id} />
			);
		}
		else if(this.props.tournamentSelectedError) {
			return (
				<Redirect to="/" />
			);
		}
		else {
			return (
				<Fragment>
					<h1 className="page-title">{typeof this.tournamentID === 'undefined' ? "Create a" : "Edit"} Tournament</h1>
					<form className="logged-in-form" onSubmit={this.handleSubmit} >
						{this.props.errors.length > 0 ? (<div className="alert alert-danger">{this.props.errors.map((error, index) => (
							<p key={index}>{error}</p>
						))}</div>) : ""}
						<FormGroup>
							<InputField name="tournament_name" placeholder="Tournament Name" value={this.props.tournamentName} />
						</FormGroup>
						<FormGroup>
							<InputField type="tel" name="starting_chips" placeholder="Starting Chips" value={this.props.startingChips} />
						</FormGroup>
						<FormGroup>
							<InputField name="buy_in" placeholder="Buy In" value={this.props.buyIn} />
						</FormGroup>
						<FormGroup>
							<InputField name="blind_level_time" placeholder="Blind Level Length (in minutes)" value={this.props.blindLevelLength} />
						</FormGroup>
						<FormGroup>
							<select className="form-control" name="payout_type" value={this.props.payoutType} onChange={this.props.handleInput} >
								<option value="1">Payout Percentage of Players</option>
								<option value="2">Payout Fixed Amount of Players</option>
							</select>
						</FormGroup>
						<FormGroup>
							<label>Pay Top</label>
							<div className="input-group">
								<InputField type="tel" name="payout_amount" placeholder="" value={this.props.payoutAmount} />
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
							<Link to={typeof this.tournamentID !== 'undefined' ? "/tournament/"+this.tournamentID : "/"}>
								Return to Tournament {typeof this.tournamentID !== 'undefined' ? "Profile" : "List"}
							</Link>
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
		tournamentCreated	: state.tournamentForm.tournamentCreated,
		tournamentIsLoading : state.tournaments.tournamentIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleInput				: (field) => dispatch(handleFormInput(field)),
		saveTournament			: (obj) => dispatch(saveTournament(obj)),
		setTournamentCreated	: (status) => dispatch(tournamentCreated(status)),
		loadFullTournament		: (tournamentID) => dispatch(loadFullTournament(tournamentID)),
		selectTournamentErrors	: (errs) => dispatch(selectTournamentErrors(errs))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTournamentPage);
