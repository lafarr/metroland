import { NextRequest, NextResponse } from "next/server";

// TODO: Properly type all of these

async function filterByTag(tagName: string | null): Promise<NextResponse> {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		return NextResponse.json({ error: await response.text() }, { status: 500 });
	}
	const { data } = await response.json();
	let articles = data;
	articles = articles.filter((article: any) => {
		const tags = article.Tags?.split(/,\s*/);
		return tags ? tags.includes(tagName) : false;
	});
	return NextResponse.json({ articles: articles }, { status: 200 });
}

async function filterByAuthor(authorName: string | null): Promise<NextResponse> {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		return NextResponse.json({ error: await response.text() }, { status: 500 });
	}
	const { data: articles } = await response.json();
	const filtered = articles.filter((article: any) => article.Author === authorName);
	return NextResponse.json({ articles: filtered }, { status: 200 });
}

async function filterByCategory(categoryName: string | null): Promise<NextResponse> {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		return NextResponse.json({ error: await response.text() }, { status: 500 });
	}
	const { data: localArticles } = await response.json();
	return NextResponse.json({ articles: localArticles.filter((article: any) => article.Category.toLowerCase() === categoryName) });
}

async function filterByDate(date: string | null) {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		return NextResponse.json({ error: await response.text() }, { status: 500 });
	}
	const { data: articles } = await response.json();
	return NextResponse.json({ articles: articles.filter((article: any) => article.publishedAt.includes(date)) }, { status: 200 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
	const params = req.nextUrl.searchParams;
	const filterBy = params.get("filterBy");
	const value = params.get("value");

	if (filterBy === "tag") {
		return filterByTag(value);
	} else if (filterBy === "author") {
		return filterByAuthor(value);
	} else if (filterBy === "category") {
		return filterByCategory(value);
	} else if (filterBy === "date") {
		return filterByDate(value);
	}
	return NextResponse.json({ error: `filterBy: '${filterBy}' not recognized` }, { status: 400 });
}
