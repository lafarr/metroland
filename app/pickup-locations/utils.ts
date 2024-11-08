import { getPickupLocations } from "@/lib/data-fetching";

export async function getSortedTownsWithPickups() {
	const locations = await getPickupLocations();	
	const townLocations = locations.filter((ele: any) => ele.Type === 'Partner');
	townLocations.sort((a: any, b: any) => {
		return a < b ? -1 : (a > b ? 1 : 0);
	});
	return townLocations;
}

export async function getStewartsPickups() {
	const locations = await getPickupLocations();	
	const townLocations = locations.filter((ele: any) => ele.Type === 'Stewart\'s');
	return townLocations;
}
