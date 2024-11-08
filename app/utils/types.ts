export interface ContactFormErrors {
	firstName?: string,
	lastName?: string,
	subject?: string,
	otherSubject?: string,
	email?: string,
	message?: string
}

export interface ContactFormData {
	firstName?: string,
	lastName?: string,
	subject?: string,
	otherSubject?: string,
	email?: string,
	message?: string
}

export interface PickupLocation {
	Title: string,
	Type: string,
	Area: string|null,
	Address: string
}
