import React from 'react';

const FormGroup = (props) => {
	return (
		<div className={"form-group "+(typeof props.className === 'undefined' ? "" : props.className)}>
			{props.children}
		</div>
	)
}

export default FormGroup;
