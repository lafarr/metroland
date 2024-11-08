"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();

	return <div className="md:space-x-4 md:font-['Epilogue',sans-serif] md:font-normal md:tracking-[0em] md:leading-[1.2em] md:mr-52 hidden md:block">
		<Link href="/previews" className={`hover:text-gray-300 leading-[1.5em] text-[15px] font-thin uppercase ${pathname === '/previews' ? ' underline underline-offset-4' : ''}`}>
			Previews
		</Link>
		<Link href="/reviews" className={`hover:text-gray-300 leading-[1.5em] text-[15px] font-thin uppercase ${pathname === '/reviews' ? ' underline underline-offset-4' : ''}`}>
			Reviews
		</Link>
		<Link href="/interviews" className={`hover:text-gray-300 leading-[1.5em] text-[15px] font-thin uppercase ${pathname === '/interviews' ? ' underline underline-offset-4' : ''}`}>
			Interviews
		</Link>
		<Link href="/pickup-locations" className={`hover:text-gray-300 leading-[1.5em] uppercase text-[15px]${pathname === '/pickup-locations' ? ' underline underline-offset-4' : ''}`}>
		Pickup Locations
		</Link>
		<Link href="/contact" className={`hover:text-gray-300 leading-[1.5em] uppercase text-[15px]${pathname === '/contact' ? ' underline underline-offset-4' : ''}`}>
			Contact
		</Link>
	</div>
}
