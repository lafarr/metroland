import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/navbar";
import { PartnerPickupLocation } from "../components/partner-pickup-location";
import { StewartsPickupLocation } from "../components/stewarts-pickup-location";
import { getSortedTownsWithPickups, getStewartsPickups } from "./utils"

export default async function PickupLocations() {
	const townPickupLocations = await getSortedTownsWithPickups();
	const stewartsPickupLocations = await getStewartsPickups();
	return (
		<>
			<NavBar />
			<div className="min-h-screen">
				<div className="md:grid hidden grid-cols-2 w-[90vw] gap-4 m-auto mt-16">
					<h1 className="font-anton uppercase text-5xl">Partners</h1>
					<h1 className="font-anton uppercase text-5xl">Stewart's</h1>
					<div>
						<PartnerPickupLocation locations={townPickupLocations} />
					</div>
					<div>
						<StewartsPickupLocation locations={stewartsPickupLocations} />
					</div>
				</div>
				<div className="grid md:hidden grid-cols-1 w-[90vw] gap-4 m-auto mt-16">
					<h1 className="font-anton uppercase text-5xl">Partners</h1>
					<div>
						<PartnerPickupLocation locations={townPickupLocations} />
					</div>
					<h1 className="mt-16 font-anton uppercase text-5xl">Stewart's</h1>
					<div>
						<StewartsPickupLocation locations={stewartsPickupLocations} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
