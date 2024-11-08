import { ReactNode } from "react";

export function cleanDate(date: string) {
	let [year, month, day] = date.split('T')[0].split('-');
	year = year.substring(2);

	if (month.length === 2 && month.at(0) === '0') {
		month = month.at(1) ?? "";
	}

	if (day.length === 2 && day.at(0) === '0') {
		day = day.at(1) ?? "";
	}

	return `${month}/${day}/${year}`;
}
