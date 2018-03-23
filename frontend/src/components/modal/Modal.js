import React, { Fragment } from 'react';

import ModalHeader from './ModalHeader';

const Modal = (props) => {
	return (
		<Fragment>
			<div onClick={props.handleBackdropClick} className={"modal fade "+(props.visible == 2 ? "show" : "")} style={props.visible ? { display: "block" } : {}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<ModalHeader title={props.title} handleClose={props.handleClose} />
						{props.children}
					</div>
				</div>
			</div>
			{props.visible ? (<div className={"modal-backdrop fade "+(props.visible == 2 ? "show" : "")} onClick={props.handleClose} />) : "" }
		</Fragment>
	);
}

export default Modal;
