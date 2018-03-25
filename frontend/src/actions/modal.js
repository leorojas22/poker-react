const setModalState = (status, modalName) => ({
	type: 'MODAL_TOGGLE',
	status,
	modalName
});


export const toggleModal = (status, modalName) => {
	return (dispatch) => {
		dispatch(setModalState(1, modalName));

		// Opening modal: 2
		// Closing modal: 0
		let nextStatus = (status) ? 2 : 0;
		
		if(!status) {
			document.body.classList.remove("modal-open");
		}
		else {
			document.body.classList.add("modal-open");
		}

		window.setTimeout(() => {
			dispatch(setModalState(nextStatus, modalName));
		}, 100);

	}
} 
