export const handleFormInput = (field) => {
	return {
		type: 'FORM_INPUT',
		name: field.target.name,
		value: field.target.value
	}
}

