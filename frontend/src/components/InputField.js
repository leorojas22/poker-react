import React from 'react';

import { connect } from 'react-redux';

import { handleFormInput } from '../actions/forminput';

const InputField = (props) => (
	<input tabIndex={typeof props.tabIndex !== 'undefined' ? props.tabIndex : ""} autoFocus={typeof props.autoFocus !== 'undefined' ? props.autoFocus : false} type={typeof props.type === 'undefined' ? "text" : props.type} className="form-control" name={props.name} value={props.value} onChange={props.handleFormInput} placeholder={props.placeholder} />
);



const mapDispatchToProps = (dispatch) => {
	return {
		handleFormInput: (field) => dispatch(handleFormInput(field))
	}
}

export default connect(() => ({}) , mapDispatchToProps)(InputField);
