import Article from "@/app/components/article";

export default function Interview({ params }: Readonly<{ params: any }>) {
	return (
		<Article params={params} type='interview' />
	)
}
