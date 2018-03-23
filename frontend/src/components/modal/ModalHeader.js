import React from 'react';

const ModalHeader = (props) => {
	return (
		<div className="modal-header">
			{
				props.title ? 
				(
					<h5 className="modal-title">
						{props.title}
					</h5>	
				)
				:
				""
			}
			<button className="close" type="button" data-dismiss="modal" aria-label="Close" onClick={props.handleClose}>
				<span aria-hidden="true">&times;</span>
			</button>

		</div>
	);
}

export default ModalHeader;
