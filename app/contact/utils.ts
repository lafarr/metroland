import { isValidEmail } from "@/lib/data-fetching";
import { ContactFormData, ContactFormErrors } from "../utils/types";

export function validateForm(formData: ContactFormData, setErrorsState: React.Dispatch<React.SetStateAction<ContactFormErrors>>) {
	let newErrors: ContactFormErrors = {};
	if (!formData.firstName?.trim()) {
		newErrors.firstName = "Name is required";
	}
	if (!formData.lastName?.trim()) {
		newErrors.lastName = "Name is required";
	}
	if (!formData.email?.trim()) {
		newErrors.email = "Email is required";
	}
	if (!isValidEmail(formData.email)) {
		newErrors.email = "Email is invalid";
	}
	if (!formData.subject) {
		newErrors.subject = "Subject is required";
	}
	if (formData.subject === 'other' && !formData.otherSubject?.trim()) {
		newErrors.otherSubject = "Please specify the subject";
	}
	if (!formData.message?.trim()) {
		newErrors.message = "Message is required";
	}
	setErrorsState(newErrors);
	return Object.keys(newErrors).length === 0;
}

export function handleSubmit(e: React.FormEvent): void {
	// TODO: Make this actually send an email	
	e.preventDefault();
}

export function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	validEmailState: boolean,
	setValidEmail: React.Dispatch<React.SetStateAction<boolean>>,
	setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>,
	errors: ContactFormErrors,
	setErrors: React.Dispatch<React.SetStateAction<ContactFormErrors>>) {


	const { name, value } = e.target;
	if (name === 'email' && !validEmailState)
		if (isValidEmail(value))
			setValidEmail(true);
	setFormData((prevState: ContactFormData) => ({
		...prevState,
		[name]: value
	}));
	if (errors[name as keyof typeof errors]) {
		setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
	}
};
