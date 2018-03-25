import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import { toggleModal } from '../../actions/modal';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

class Modal extends Component {

	constructor(props) {
		super(props);

		this.handleBackdropClick 	= this.handleBackdropClick.bind(this);
		this.handleClose 			= this.handleClose.bind(this);
	}

	handleBackdropClick(e) {
		let target = e.target;
		let classList = [... target.classList];
		if(classList.indexOf("modal") === -1) {
			return false;
		}

		this.handleClose();
	}

	handleClose() {
		this.props.toggleModal(false, this.props.name);
	}

	render() {
		let props = this.props;

		return props.visible ? (
			<Fragment>
				<div onClick={this.handleBackdropClick} className={"modal fade "+(props.visible == 2 ? "show" : "")} style={props.visible ? { display: "block" } : {}}>
					<div className="modal-dialog">
						<div className="modal-content">
							<ModalHeader title={props.title} handleClose={this.handleClose} />
							<form onSubmit={typeof props.onSubmit ? props.onSubmit : ""}>
								{props.children}
							</form>
						</div>
					</div>
				</div>
				{props.visible ? (<div className={"modal-backdrop fade "+(props.visible == 2 ? "show" : "")} onClick={this.handleClose} />) : "" }
			</Fragment>
		) : "";
	}
}

const mapDispatchToProps = (dispatch) => ({
	toggleModal: (status, modalName) => dispatch(toggleModal(status, modalName))
});


export default connect(null, mapDispatchToProps)(Modal);
