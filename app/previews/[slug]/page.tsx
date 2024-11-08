import Article from "@/app/components/article";

export default function Preview({ params }: { params: any }) {
	return (
		<Article params={params} type='preview' />
	)
}
