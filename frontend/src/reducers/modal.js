export const toggleModal = (modalName) => {
	return (state = false, action) => {
		switch(action.type) {
			case 'MODAL_TOGGLE':
				if(modalName == action.modalName) {
					return action.status;
				}
			default:
				return state;
		}
	}
}
