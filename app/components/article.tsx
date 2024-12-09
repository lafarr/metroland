import { getArticle, getInterviews, getPreviews, getReviews } from "@/lib/data-fetching";
import Link from "next/link";
import ContentRenderer from "@/app/components/content-renderer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import NavBar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";

// TODO: Add proper type for props
export default async function Article({ params, type }: { params: any, type: string }) {
	function cleanDate(date: string) {
		const dirtyDate: string = date.split('T')[0];
		let [year, month, day]: (string | number)[] = dirtyDate.split('-');
		month = new Date(parseInt(year), parseInt(month) - 1).toLocaleString("default", { month: "long" }).substring(0, 3);
		if (day.length === 2 && day.at(0) === "0") {
			day = day.substring(1);
		}
		return `${month} ${day}`;
	}

	function getTags(tags: string) {
		return tags.split(/,\s*/);
	}

	function getTagParams(tag: string) {
		return new URLSearchParams({ filterBy: "tag", value: tag });
	}

	const documentId = (await params).slug;
	const review = await getArticle(documentId);
	const date = cleanDate(review.publishedAt);
	const author = review.Author;
	const category = review.Category.toLowerCase();
	const title = review.Title;
	const featuredImageUrl = review.FeaturedImage.url;
	const featuredQuote = review.FeaturedQuote;
	const tags = getTags(review.Tags) ?? [];
	const content = review.Content;
	const authorFilterParams = new URLSearchParams({ filterBy: "author", value: author });
	const categoryFilterParams = new URLSearchParams({ filterBy: "category", value: category });
	const dateFilterParams = new URLSearchParams({ filterBy: "date", value: review.publishedAt.split('T')[0] });

	const styles = `body { background: white; }`;

	let articles = null;
	let nextArticle = null;
	let prevArticle = null;
	if (type === 'preview') {
		console.log('getting previews')
		articles = await getPreviews()
	} else if (type === 'review') {
		console.log('getting reviews')
		articles = await getReviews()
	} else if (type === 'interview') {
		console.log('getting interviews')
		articles = await getInterviews()
	} else {
		return null;
	}

	let idx = -1;
	articles.forEach((ele: any, curr_idx: number) => {
		if (ele.documentId === documentId) {
			idx = curr_idx;
		}
	});
	nextArticle = articles[idx + 1];
	prevArticle = articles[idx - 1];
	console.log(idx, nextArticle);

	return (
		<>
			<NavBar />
			<div className="min-w-screen min-h-screen">
				<style>{styles}</style>
				<Breadcrumbs />
				<div className="[&>img]:object-cover [&>img]:w-full grid grid-cols-1 m-auto w-[90%] lg:w-1/2 gap-8 py-16 text-black">
					<div className="flex text-sm flex-wrap">
						<div>
							<Link className="hover:opacity-80" href={`/articles?${categoryFilterParams}`}>{category}</Link>
						</div>
						<div>
							<span className="mx-2">&#8226;</span>
							<Link className="hover:opacity-80" href={`/articles?${dateFilterParams}`}>{date}</Link>
						</div>
						<div>
							<span className="mx-2">&#8226;</span>
							<span>Written by&nbsp;</span>
							<Link className="hover:opacity-80" href={`/articles?${authorFilterParams}`}>{author}</Link>
						</div>
					</div>
					<h1 className="uppercase font-anton text-5xl">{category}: {review.Title}</h1>
					<img className="object-cover w-full" src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_PATH}${review.FeaturedImage[0].url.slice(1)}`} />
					<hr className="border-t-black"></hr>
					<h1 className="text-2xl uppercase font-anton">"{review.FeaturedQuote}"</h1>
					<ContentRenderer content={content} />
					<hr className="border-t-black"></hr>
					<div className="flex text-sm flex-wrap">
						{tags.map((tag, index) => {
							if (index === 0) {
								return <Link href={`/articles?${getTagParams(tag)}`}>{tag}</Link>
							} else {
								return <Link href={`/articles?${getTagParams(tag)}`}>&nbsp;&#8226;&nbsp;{tag}</Link>
							}
						})}
					</div>
				</div>
				{nextArticle && prevArticle &&
					<div className="uppercase font-anton text-3xl mb-8 flex w-screen justify-between">
						<div className="flex flex-row ml-8">
							<ChevronLeft className="w-10 h-10" />
							<Link className="text-nowrap" href={`/${type}s/${prevArticle.documentId}`}>{type}: {prevArticle.Title}</Link>
						</div>
						<div className="flex flex-row mr-8">
							<Link className="text-nowrap" href={`/${type}s/${nextArticle.documentId}`}>{type}: {nextArticle.Title}</Link>
							<ChevronRight className="w-10 h-10" />
						</div>
					</div>}

				{!prevArticle && nextArticle &&
					<div className="uppercase font-anton text-3xl mb-8 flex w-screen justify-end">
						<div className="flex flex-row mr-8">
							<Link className="text-nowrap" href={`/${type}s/${nextArticle.documentId}`}>{type}: {nextArticle.Title}</Link>
							<ChevronRight className="w-10 h-10" />
						</div>
					</div>}
				{!nextArticle && prevArticle &&
					<div className="uppercase font-anton text-3xl mb-8 flex w-screen justify-start">
						<div className="flex flex-row ml-8">
							<ChevronLeft className="w-10 h-10" />
							<Link className="text-nowrap" href={`/${type}s/${prevArticle.documentId}`}>{type}: {prevArticle.Title}</Link>
						</div>
					</div>}
			</div>
			<Footer />
		</>
	)
}


