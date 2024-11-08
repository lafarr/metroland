"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { isValidEmail } from '@/lib/data-fetching';
import Footer from '../components/footer/footer';
import NavBar from '../components/navbar/navbar';
import { ContactFormData, ContactFormErrors } from "@/app/utils/types";
import { handleSubmit, handleChange } from './utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

const ContactForm = () => {
	const [formData, setFormData] = useState<ContactFormData>({
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		otherSubject: '',
		message: ''
	});
	const [errors, setErrors] = useState<ContactFormErrors>({});
	const [isSubmitted, _] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [onClient, setOnClient] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [href, setHref] = useState<string>('');

	useEffect(() => { setOnClient(true); }, [])

	return (
		<>
			<NavBar />
			<div className="flex flex-col w-screen items-center justify-center bg-neutral-950 md:bg-[#18191a]">
				<div className="p-8 m-0 h-full w-full flex items-center justify-center">
					<div className="m-0 mt-20 relative md:static h-full w-full md:w-1/3 md:h-fit bg-neutral-950 md:rounded-lg shadow-lg p-8 md:p-16 md:mt-0">
						{!isSubmitted ? (
							<>
								<h2 className="text-3xl font-bold mb-6 text-neutral-300 text-center">Contact Us</h2>
								{/* TODO: Use a server action here */}
								<form onSubmit={(e: React.FormEvent) => handleSubmit(e)} className="space-y-6" noValidate>
									<div>
										<div className="flex gap-4">
											<div className="flex flex-col w-1/2">
												<label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
												<input
													type="text"
													id="firstName"
													name="firstName"
													value={formData.firstName}
													onChange={(e) => handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors)}
													className="w-full px-3 py-2 bg-neutral-800 rounded-md text-neutral-300 outline-none border-none"
												/>
											</div>
											<div className="flex flex-col w-1/2">
												<label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
												<input
													type="text"
													id="lastName"
													name="lastName"
													value={formData.lastName}
													onChange={(e) => handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors)}
													className="w-full px-3 py-2 bg-neutral-800 rounded-md text-neutral-300 outline-none border-none"
												/>
											</div>
										</div>
										{errors.firstName && (
											<p className="mt-1 text-sm text-red-500 flex items-center">
												<FontAwesomeIcon icon={faExclamationCircle} className="mr-1" /> {errors.firstName}
											</p>
										)}
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={(e) => handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors)}
											onBlur={() => setValidEmail(isValidEmail(formData.email))}
											className={`lowercase w-full px-3 py-2 bg-neutral-800 text-neutral-300 rounded-md outline-none ${validEmail ? 'border-none' : 'border-2 border-red-500'}`}
										/>
										{!validEmail && <h3 className="text-red-500">Invalid email address</h3>}
										{errors.email && (
											<p className="mt-1 text-sm text-red-500 flex items-center">
												<FontAwesomeIcon icon={faExclamationCircle} className="mr-1" /> {errors.email}
											</p>
										)}
									</div>
									<div>
										<label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
										<select
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={(e) => {
												handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors);
												setSelectedCategory(e.target.value);
												const val: string = e.target.value;
												switch (val) {
													case 'press':
														setHref('https://docs.google.com/forms/d/11dpKOimmu2WycU9pIteHY9r_2SPO0CM_Tdw3aX0WjAs/viewform?edit_requested=true');
														break;
													case 'contribute':
														setHref('https://docs.google.com/forms/d/e/1FAIpQLSd_nBnCh65h9iZfquLoOwdCWO0ajurgVKuh4zD0zlljzG_KLg/viewform');
														break;
													case 'add-to-calendar':
														setHref('https://docs.google.com/forms/d/e/1FAIpQLSdeVx24oUXg1Z2ig50gbXY86dY3oQRjZjKlLDEgWSbFBKTavA/viewform?usp=sf_link');
														break;
													case 'copies':
														setHref('https://docs.google.com/forms/d/e/1FAIpQLSfeAelAOmHiSNGNybT6O06JmVkpdV2HOF3B5OPiml4XTRb93w/viewform');
												}
											}
											}
											className="w-full px-3 py-2 bg-neutral-800 text-neutral-300 rounded-md outline-none border-none"
										>
											<option value="">Select a subject</option>
											<option value="general">General Info</option>
											<option value="feedback">Feedback</option>
											<option value="advertising">Advertising</option>
											<option value="contribute">Contribute</option>
											<option value="add-to-calendar">Add to Calendar</option>
											<option value="advertising">Submit Visual Art</option>
											<option value="press">Press Releases</option>
											<option value="copies">Want copies of Metroland in Your Business</option>
											<option value="other">Other</option>
										</select>
										{errors.subject && (
											<p className="mt-1 text-sm text-red-500 flex items-center">
												<FontAwesomeIcon icon={faExclamationCircle} className="mr-1" /> {errors.subject}
											</p>
										)}
									</div>
									{formData.subject === 'other' && (
										<div>
											<label htmlFor="otherSubject" className="block text-sm font-medium text-gray-300 mb-1">Specify Subject</label>
											<input
												type="text"
												id="otherSubject"
												name="otherSubject"
												value={formData.otherSubject}
												onChange={(e) => handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors)}
												className="w-full px-3 py-2 bg-neutral-800 text-neutral-300 rounded-md outline-none border-none"
											/>
											{errors.otherSubject && (
												<p className="mt-1 text-sm text-red-500 flex items-center">
													<FontAwesomeIcon icon={faExclamationCircle} className="mr-1" /> {errors.otherSubject}
												</p>
											)}
										</div>
									)}
									{selectedCategory && (selectedCategory === 'general' || selectedCategory === 'feedback' || selectedCategory === 'other') && <div>
										<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
										<textarea
											id="message"
											name="message"
											style={{ resize: 'none' }}
											value={formData.message}
											onChange={(e) => handleChange(e, validEmail, setValidEmail, setFormData, errors, setErrors)}
											rows={4}
											className="w-full px-3 py-2 bg-neutral-800 text-neutral-300 rounded-md outline-none border-none"
										/>
										{errors.message && (
											<p className="mt-1 text-sm text-red-500 flex items-center">
												<FontAwesomeIcon icon={faExclamationCircle} className="mr-1" /> {errors.message}
											</p>
										)}
									</div>}
									{(selectedCategory !== 'general' && selectedCategory !== 'feedback' && selectedCategory !== 'other') ?
										<a
											className="w-full bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
											href={href}
											target="_blank"
										>
											Fill out form
										</a>
										:
										<Dialog>
											<DialogTrigger asChild>
												<button
													type="submit"
													className="w-full bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
													onClick={() => {
													}}
												>
													<FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send Message
												</button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>Edit profile</DialogTitle>
													<DialogDescription>
														Make changes to your profile here. Click save when you're done.
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>}
								</form>
							</>
						) : (
							<div className="text-center">
								<div className="flex justify-center mb-6">
									{onClient && <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500" />}
								</div>
								<h3 className="text-2xl font-bold mb-4 text-white">Message Received</h3>
								<p className="text-gray-300">Thank you for your message. We'll be in contact shortly.</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ContactForm;
