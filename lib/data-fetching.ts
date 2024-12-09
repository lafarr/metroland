export function isValidEmail(email: string | undefined): boolean {
	return !!email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
}

export async function getMostRecentArticles() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		// TODO: Add proper error handling here
	} else {
		const data = (await response.json()).data;
		// TODO: Properly type these
		return data.sort((a: any, b: any) => {
			const aPublished = new Date(a.publishedAt);
			const bPublished = new Date(b.publishedAt);

			if (aPublished > bPublished) return -1;
			else if (aPublished < bPublished) return 1;
			return 0;
		});
	}
}

// TODO: Properly type this
function sortArticles(articles: any[]) {
	articles?.sort(function(a, b) {
		const aDate = new Date(a.publishedAt);
		const bDate = new Date(b.publishedAt);

		return aDate > bDate ? -1 : (bDate > aDate ? 1 : 0);
	})
}


export async function getPreviews() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*&filters[Category][$eq]=Preview`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	if (!response.ok) {
		// TODO: Add proper error handling
	}

	const articles = (await response.json()).data;
	sortArticles(articles);
	return articles;
}

export async function getReviews() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*&filters[Category][$eq]=Review`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	// TODO: Add error handling
	if (!response.ok) { }

	const articles = (await response.json()).data;
	sortArticles(articles);
	return articles;
}

export async function getInterviews() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?populate=*&filters[Category][$eq]=Interview`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	// TODO: Add error handling
	if (!response.ok) { }

	const articles = (await response.json()).data;
	sortArticles(articles);
	return articles;
}

export async function getArticle(documentId: string) {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/articles?filters[documentId][$eq]=${documentId}&populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	// TODO: Add error handling
	if (!response.ok) { }

	return (await response.json()).data[0];
}

export async function getPickupLocations() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/pickup-locations?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	// TODO: Add error handling
	if (!response.ok) { }

	return (await response.json()).data;
}

export async function getMostRecentSocialMediaPosts() {
	const response = await fetch(`${process.env.STRAPI_BASE_PATH}/social-media-posts?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
		}
	});
	// TODO: Add error handling
	if (!response.ok) { }

	const posts = (await response.json()).data || [];
	posts.sort((a: any, b: any) => {
		const aDate = new Date(a.publishedAt);
		const bDate = new Date(b.publishedAt);

		return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
	});

	console.log(posts.slice(0, 3));
	return posts.slice(0, 3);
}
