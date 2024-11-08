"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const HeroCarousel = (props: any) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	function nextSlide() {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % props.heroes.length);
	}

	function prevSlide() {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + props.heroes.length) % props.heroes.length);
	};

	return (
		<div className="relative w-full h-[90vh] overflow-hidden">
			{props.heroes.map((hero: any, index: any) => (
				<div
					key={index}
					className={`absolute w-full h-full transition-transform duration-500 ease-in-out`}
					style={{
						transform: `translateX(${(index - currentIndex) * 100}%)`,
					}}
				>
					<div className="relative w-full h-full">
						<img
							src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_PATH}${hero.FeaturedImage.url}`}
							alt=''
							className="w-full h-full object-cover"
						/>
						<div className="absolute bg-black opacity-40 inset-0 h-full w-full"></div>
						<div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
							<h1 className="text-3xl md:text-5xl mb-2 md:mb-4 text-center uppercase font-anton">{hero.Category}: {hero.Title}</h1>
							<p className="text-lg md:text-xl mb-4 md:mb-8 text-center">{hero.subtitle}</p>
							<Link href={`/${hero.Category.toLowerCase()}s/${hero.documentId}`} className="uppercase bg-black rounded-3xl px-16 py-3 hover:scale-[1.1] hover:bg-white hover:text-black transition">Read more</Link>
						</div>
					</div>
				</div>
			))}
			<div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 p-4 md:hidden">
				<button
					onClick={prevSlide}
					className="bg-black p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
					aria-label="Previous slide"
				>
					<ChevronLeft color="white" size={24} />
				</button>
				<button
					onClick={nextSlide}
					className="bg-black p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
					aria-label="Next slide"
				>
					<ChevronRight color="white" size={24} />
				</button>
			</div>
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-10 hidden md:block"
				aria-label="Previous slide"
			>
				<ChevronLeft color="white" size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-10 hidden md:block"
				aria-label="Next slide"
			>
				<ChevronRight color="white" size={24} />
			</button>
		</div>
	);
};

export default HeroCarousel;
