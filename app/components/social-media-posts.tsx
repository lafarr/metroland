import { getMostRecentSocialMediaPosts } from "@/lib/data-fetching"
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Play } from "lucide-react";
import Link from "next/link";

export default async function SocialMediaPosts() {
	const posts = await getMostRecentSocialMediaPosts();

	return (
		<div className="bg-[hsla(0,0%,10.98%,1)] md:min-h-[75vh] py-16">
			<h1 className="font-anton md:pt-32 mb-8 md:mb-4 text-neutral-200 text-2xl md:text-4xl text-center">FOLLOW US ON SOCIALS</h1>
			<div className="w-[80%] grid grid-cols-2 md:grid-cols-3 gap-1 m-auto">
				{posts.map((ele: any) => {
					return (
						<a href={ele.Link} className="w-full">
							<img className="object-cover w-full h-full opacity-50" src={`${process.env.NEXT_PUBLIC_CMS_PATH}/${ele.Thumbnail[0].url.slice(1)}`} alt="" />
							{ele.Type === 'Video' && <FontAwesomeIcon className="h-8 w-8 relative bottom-[calc(50%+1rem)] left-[calc(50%-1rem)] text-neutral-200" icon={faPlay} />}
						</a>
					)
				})}
			</div>
			<p className="w-[80%] m-auto font-anton mt-8 text-neutral-200 text-2xl md:text-4xl text-center uppercase">
				<span className="italic">Metroland Now</span> a <span className="font-bold">tax-deductible</span> way to support your community. As a 501(c)(3) Community Arts Non-profit Charity,
				we rely on the presence and generosity of our community and thank you for your support! Click<Link className="underline underline-offset-8" href="/donate"> here </Link>
				to make a donation!
			</p>
			<p className="w-[80%] m-auto font-anton mt-8 text-neutral-200 text-2xl md:text-4xl text-center uppercase">
				want a copy at your place? message us<Link className="underline underline-offset-8" href="/contact"> here </Link>
			</p>
		</div>
	)
}

