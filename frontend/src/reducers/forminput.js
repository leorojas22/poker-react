export const handleFormInputReducer = (fieldName) => {
	return (state = "", action) => {
		switch(action.type) {
			case 'FORM_INPUT':
				if(action.name == fieldName) {
					return action.value;
				}
			default:
				return state;
		}
	}
}
