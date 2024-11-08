import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { PickupLocation } from "../utils/types"

export function PartnerPickupLocation({ locations }: { locations: PickupLocation[] }) {
	console.log('props.locations =', locations);
	function getTowns(locations: PickupLocation[]) {
		const towns: string[] = [];
		locations.forEach((ele: any) => {
			if (!towns.includes(ele.Area)) {
				towns.push(ele.Area);
			}
		});
		towns.sort();
		return towns;
	}

	return (
		<>
			{getTowns(locations).map((town: any) => {
				return (
					<Accordion type="single" collapsible >
						<AccordionItem value="item-1">
							<AccordionTrigger className="font-anton uppercase text-2xl">{town}</AccordionTrigger>
							<AccordionContent>
								{locations.filter((ele: any) => ele.Area === town).map((ele: any) => {
									return (
										<h1><span className="font-bold uppercase">{ele.Title}</span> at {ele.Address}</h1>
									)
								})}
							</AccordionContent>
						</AccordionItem>
					</Accordion >
				)
			})
			}
		</>
	)
}
