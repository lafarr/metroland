'use client';

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Breadcrumbs(props) {
	const pathname = usePathname();
	const isArticle = /\/(?:(previews)|(reviews)|(interviews))\/\w+\/?/.test(pathname);
	let crumbsArr = null;
	if (isArticle) {
		const tmp = pathname.split('/')[1];
		crumbsArr = ['Home', `${tmp.at(0).toUpperCase()}${tmp.substring(1)}`, 'Article']
	}
	const nameToPath = {
		previews: '/previews',
		interviews: '/interviews',
		reviews: '/reviews',
		'/': '/'
	}

	function generateBreadcrumbs() {
		const relevantPart = pathname.split('/')[1];
		if (relevantPart === 'previews' || relevantPart === 'interviews' || relevantPart === 'reviews') {
			return (
				<>
					{!isArticle &&
						['Home', `${relevantPart.at(0).toUpperCase()}${relevantPart.substring(1)}`].map((page, idx) => {
							if (idx === 0)
								return <div className="flex" key={Math.random()}><Link className="hover:opacity-80" href="/">{page}</Link><ChevronRight /></div>
							else
								return <div className="flex" key={Math.random()}><h3>{page}</h3></div>
						})}

					{isArticle &&
						crumbsArr.map((page, idx) => {
							if (idx === 0)
								return <div className="flex" key={Math.random()}><Link className="hover:opacity-80" href={`/`}>{page}</Link><ChevronRight /></div>
							else if (idx === 1)
								return <div className="flex" key={Math.random()}><Link className="hover:opacity-80" href={`${nameToPath[page.toLowerCase()]}`}>{page}</Link><ChevronRight /></div>
							else
								return <div className="flex" key={Math.random()}><h3>{page}</h3></div>
						})}
				</>
			)
		}
	}

	return (
		<div className="hidden ml-2 mt-2 md:flex items-center text-black">
			{generateBreadcrumbs()}
		</div>
	)
}

