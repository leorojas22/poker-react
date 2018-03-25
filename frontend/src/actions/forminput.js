export const handleFormInput = (field) => ({
	type: 'FORM_INPUT',
	name: field.target.name,
	value: field.target.type === "checkbox" ? field.target.checked : field.target.value
});
