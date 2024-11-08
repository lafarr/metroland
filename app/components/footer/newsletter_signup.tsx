"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/data-fetching";

export default function NewsletterSignup() {
	const [email, setEmail] = useState<string>("");

	return (
		<form className="w-full flex flex-wrap md:flex-col gap-4 md:gap-0" action={/* saveNewsletterRecipient */ () => { }} onSubmit={() => setEmail('')}>
			<input value={email} onChange={(event) => setEmail(event.target.value)} className={"text-black px-4 w-full py-2 md:mt-0 focus:outline-none"} name="email" type="text" placeholder="Email Address" />
			{isValidEmail(email) &&
				<button type='submit' className='m-auto md:self-center md:m-0 md:ml-2 md:mt-4 rounded-3xl w-3/4 md:w-1/2 py-3 bg-gray-300 text-black hover:scale-[1.1] hover:bg-neutral-500 transition'>Sign up</button>
			}
			{!isValidEmail(email) &&
				<button type='submit' disabled className='opacity-20 m-auto md:self-center md:m-0 md:ml-2 md:mt-4 rounded-3xl w-3/4 md:w-1/2 py-3 bg-gray-300 text-black'>Sign up</button>
			}
		</form>
	)
}
