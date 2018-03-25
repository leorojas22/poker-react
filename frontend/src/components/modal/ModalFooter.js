import React from 'react';

const ModalFooter = (props) => {
	console.log(props);
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
}

export default ModalFooter;
