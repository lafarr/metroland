import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { PickupLocation } from "../utils/types"

export function StewartsPickupLocation({ locations }: { locations: PickupLocation[] }) {
	function getCounties(locations: PickupLocation[]) {
		const counties: string[] = [];
		locations.forEach((ele: any) => {
			if (!counties.includes(ele.Area)) {
				counties.push(ele.Area);
			}
		});
		counties.sort();
		return counties;
	}

	return (
		<>
			{getCounties(locations).map((county: any) => {
				return (
					<Accordion type="single" collapsible >
						<AccordionItem value="item-1">
							<AccordionTrigger className="font-anton uppercase text-2xl">{county}</AccordionTrigger>
							<AccordionContent>
								{locations.filter((ele: any) => ele.Area === county).map((ele: any) => {
									return (
										<h1>{ele.Address}</h1>
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
