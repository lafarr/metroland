import Article from "@/app/components/article";

export default function Review({ params }: { params: any }) {
	return (
		<Article params={params} type='review' />
	)
}
