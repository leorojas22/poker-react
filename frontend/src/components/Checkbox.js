import React from 'react';

import { connect } from 'react-redux';
import { handleFormInput } from '../actions/forminput';

const Checkbox = (props) => (
	<div className="custom-control custom-checkbox">
		<input type="checkbox" name={props.name} className="custom-control-input" id={props.id} onChange={props.handleFormInput} checked={props.checked ? true : false} />
		<label className="custom-control-label" htmlFor={props.id}>{props.label}</label>
		{props.children}
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	handleFormInput: (field) => dispatch(handleFormInput(field))
});

export default connect(null, mapDispatchToProps)(Checkbox);
