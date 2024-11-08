import Link from "next/link";
import NewsletterSignup from "./newsletter_signup";

function Footer() {
	return (
		<div className="relative bottom-0 w-[100vw] bg-black p-16 text-sm">
			<footer className="text-gray-300 w-full flex justify-center mt-14 gap-8 md:text-nowrap flex-wrap">
				<div className="md:mr-24">
					<h1 className="text-4xl font-anton text-nowrap">METROLAND NOW</h1>
				</div>
				<div>
					<h3 className="mb-2 font-bold">Explore </h3>
					<Link className="text-sm underline underline-offset-4 " href="/contact">Contact</Link>
				</div>
				<div>
					<h3 className="font-bold">Follow Us</h3>
					<a className="underline underline-offset-4 mt-2 mb-2 block text-sm" target="_blank" href="https://www.facebook.com/metrolandnow">Facebook</a>
					<a className="underline block text-sm underline-offset-4 " target="_blank" href="https://instagram.com/metrolandnow">Instagram</a>
				</div>
				{/* TODO: Add some error handling here to check if they have already signed up for the newsletter. Also add a nice popup when they sign up for the newsletter */}
				<div className="flex w-[100vw] justify-center flex-col md:w-fit">
					<h3 className="text-center mb-4 text-wrap">Sign up with your email address to receive news and updates.</h3>
					<NewsletterSignup />
				</div>
			</footer>
		</div>
	)
}

export default Footer;
