import Link from "next/link"
import NavLinks from "./navlinks";

export default function NavBar() {
	return (
		<nav className="h-24 w-[100vw] bg-black text-white box-border m-0 p-0">
			<div className="h-full w-full flex justify-between items-center m-0">
				<Link href="/" className={`m-0 font-anton text-[21px] font-normal tracking-[0em] leading-[1.2em] ml-[7vw]`}>
					METROLAND NOW
				</Link>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<button data-collapse-toggle="navbar-default" type="button" className="absolute right-5 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white-500 rounded-lg md:hidden hover:bg-white-100 focus:outline-none focus:ring-2 focus:ring-white-200 dark:text-white-400 dark:hover:bg-white-700 dark:focus:ring-white-600" aria-controls="navbar-default" aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
						</svg>
					</button>
				</div>
				<NavLinks />
			</div>
		</nav>
	);
};

