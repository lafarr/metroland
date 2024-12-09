import { getPreviews, getInterviews, getReviews } from "@/lib/data-fetching";
import Link from 'next/link';
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/navbar/navbar";
import { Breadcrumbs } from './breadcrumbs';

export default async function ArticleGrid(props: { type?: string, articles?: any[] }) {
	let articles = null;
	if (!props.articles) {
		if (props.type === 'preview') {
			articles = await getPreviews();
		} else if (props.type === 'interview') {
			articles = await getInterviews();
		} else {
			articles = await getReviews();
		}
	}

	function cleanDate(date: string) {
		let [year, month, day] = date.split('T')[0].split('-');
		year = year.substring(2);

		if (month.length === 2 && month.at(0) === '0') {
			month = month.at(1) ?? "";
		}

		if (day.length === 2 && day.at(0) === '0') {
			day = day.at(1) ?? "";
		}

		return `${month}/${day}/${year}`;
	}

	function generateTagsHtml(commaSeparatedTags: string) {
		const tags = commaSeparatedTags.split(/,\s*/);
		const numTags = tags.length;
		return tags.map((tag: string, index: number) => {
			const encodedParams = new URLSearchParams({ filterBy: "tag", value: tag }).toString();
			if (index < numTags - 1)
				return <Link key={index} className="hover:opacity-80 cursor-pointer text-xs" href={`/articles?${encodedParams}`}>{tag},&nbsp;</Link>
			else
				return <Link key={index} className="hover:opacity-80 cursor-pointer text-xs" href={`/articles?${encodedParams}`}>{tag}</Link>
		});
	}

	const styles = `body { background: white; }`;

	return (
		<>
			<NavBar />
			<Breadcrumbs />
			<div className="min-h-screen mt-4 mx-auto grid grid-cols-1 md:grid-cols-3 w-[70vw] gap-4">
				<style>{styles}</style>
				{articles && articles.map((article: any) => (
					<div className="">
						<Link href={`/${props.type}s/${article.documentId}`}>
							<img className="cursor-pointer w-full h-72 object-cover" src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_PATH}${article.FeaturedImage[0].url.slice(1)}`} />
						</Link>
						<div className="text-neutral-600 mt-2">
							{generateTagsHtml(article.Tags)}
							<span className="text-xs"> | </span>
							<span className="text-xs">{cleanDate(article.publishedAt)}</span>
						</div>
						<Link className="hover:opacity-80 text-black block w-full font-anton uppercase text-3xl mt-2" href={`/${props.type}s/${article.documentId}`}>{article.Category}: {article.Title}</Link>
						<Link className="text-black text-xs mt-2 cursor-pointer hover:opacity-80" href={`/${props.type}s/${article.documentId}`}>Read more</Link>
					</div>
				)
				)}
			</div>
			<Footer />
		</>
	)
}

