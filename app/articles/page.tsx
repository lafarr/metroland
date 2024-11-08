'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { cleanDate } from "./utils";

export default function Articles() {
	const css = `body { background-color: white; }`;
	const params = useSearchParams();
	const filterBy = params.get("filterBy");
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const queryParams: URLSearchParams = new URLSearchParams({ filterBy: filterBy ?? "", value: params.get("value") ?? "" });
		fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/articles?${queryParams}`)
			.then(async (response) => {
				const data = await response.json();
				setArticles(data.articles);
			})
			.catch((err) => console.log(err));
	}, []);

	function generateTagsHtml(commaSeparatedTags: string) {
		const tags = commaSeparatedTags.split(/,\s*/);
		const numTags = tags.length;
		return tags.map((tag, index) => {
			const encodedParams = new URLSearchParams({ filterBy: "tag", value: tag }).toString();
			if (index < numTags - 1)
				return <Link key={Math.random()} className="hover:opacity-80 cursor-pointer text-xs" href={`/articles?${encodedParams}`}>{tag}, </Link>
			else
				return <Link key={Math.random()} className="hover:opacity-80 cursor-pointer text-xs" href={`/articles?${encodedParams}`}>{tag}</Link>
		});
	}

	return (
		<>
			<NavBar />
			<div className="mt-4 mx-auto grid grid-cols-1 md:grid-cols-3 w-[70vw] gap-4 min-h-screen text-black">
				<style>{css}</style>
				{articles && articles.map((article: any) => (
					<div key={Math.random()} className="[&>*]:hyphens-auto [&>*]break-all">
						<Link href={`/${article.Category.toLowerCase()}s/${article.documentId}`}>
							<img className="cursor-pointer w-full h-72 object-cover" src={`http://localhost:1337${article.FeaturedImage.url}`} />
						</Link>
						<div className="mt-2">
							{generateTagsHtml(article.Tags)}
							<span className="text-xs"> | </span>
							<span className="text-xs">{cleanDate(article.publishedAt)}</span>
						</div>
						<Link className="hover:opacity-80 block w-full font-anton uppercase text-3xl mt-2" href={`/${article.Category.toLowerCase()}s/${article.documentId}`}>{article.Category}: {article.Title}</Link>
						<Link className="text-xs mt-2 cursor-pointer hover:opacity-80" href={`/${article.Category.toLowerCase()}s/${article.documentId}`}>Read more</Link>
					</div>
				)
				)}
			</div>
			<Footer />
		</>
	)
}
