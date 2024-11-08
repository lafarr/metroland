import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/navbar/navbar";
import Link from "next/link";
import Moving from "@/app/components/moving";
import { getMostRecentArticles } from "@/lib/data-fetching";
import HeroCarousel from "@/app/components/hero-carousel/hero-carousel";
import SocialMediaPosts from "./components/social-media-posts";

export default async function Home() {
	const heroes = await getMostRecentArticles();

	return (
		<>
			<NavBar />
			<div className="overflow-hidden">
				<div className="w-screen min-h-[calc(90vh-6rem)] bg-no-repeat bg-center bg-cover bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/orange_home.jpg')]">
					<div className="w-[80vw] align-center flex flex-col ml-[7vw] min-h-[calc(90vh-6rem)] md:min-h-[calc(70vh-6rem)]">
						<h1 className="uppercase mt-28 text-4xl md:text-5xl font-anton tracking-[0em] leading-[1.2em] break-words box-border text-white text-left md:w-[30vw] sm:w-[40vw]">
							The capital region’s newest and best source for everything that’s happening in arts & entertainment
						</h1>
						<div>
							<Link href="/music-calendar" className="block w-fit text-white font-antonio leading-[1.2em] font-thin hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-105 border rounded-full pt-4 pb-4 pr-12 pl-12 mt-[4vh]">
								WHAT'S HAPPENING!
							</Link>
						</div>
					</div>
					<Moving />
				</div>
				<div>
					<HeroCarousel heroes={heroes} />
				</div>
				<div className="min-w-screen bg-white">
					<div className="pt-8 grid grid-cols-1 grid-rows-1 md:grid-cols-2 w-[90%] md:w-2/3 m-auto gap-8 md:pt-24">
						<div className="max-w-4xl">
							<h1 className="text-5xl text-neutral-800 text-center md:text-left font-anton tracking-[0em] leading-[1.2em]">MORE ABOUT METROLAND NOW</h1>
							<p className="text-sm text-black">
								<span className="italic">Metroland Now</span> is a reimagining of our favorite old publication, <span className="italic">Metroland! </span>
								We're focused on elevating the arts and entertainment scene in the
								Capital Region with a concentration a comprehensive events calendar
								and previews, reviews and interviews of local creatives and their current
								endeavors. The plan is to start small and grow slow, listening to the
								community along the way to make sure we're giving it what it needs
								most! Stay tuned for ways you can be involved in this resurrection!
							</p>
							<img
								src="/dude_mic.jpg"
								alt="Performance under spotlights"
								className="mt-8 md:pt-0 md:pb-8 w-[100%] md:mt-32 object-cover"
							/>
						</div>
						<img
							src="/girl_mic.jpg"
							alt="Performance under spotlights"
							className="w-[100%] md:max-w-[65%] max-h-[95%] md:max-h-[65%] md:ml-32 object-cover"
						/>
					</div>
				</div>
				<SocialMediaPosts />
			</div>
			<Footer />
		</>
	);
}
