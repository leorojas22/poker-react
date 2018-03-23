export const handleFormInputReducer = (fieldName, defaultValue = "") => {
	return (state = defaultValue, action) => {
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
