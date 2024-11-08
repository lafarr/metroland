'use client';

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// TODO: Properly type this
export default function ContentRenderer({ content }: { content: any }) {
	return <BlocksRenderer
		content={content}
		blocks={{
			image: ({ image }) => {
				return (
					<img
						src={image.url}
						alt={image.alternativeText || ""}
						className="w-full object-fit"
					/>
				);
			},
		}}
	/>
}

