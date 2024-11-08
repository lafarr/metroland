'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
	const router = useRouter();
	return (
		<div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white p-8">
			<div className="w-full max-w-4xl mx-auto text-center">
				{/* Custom 404 Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="mb-12"
				>
					<svg className="w-40 h-40 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
						<motion.path
							d="M20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100Z"
							stroke="url(#grad1)"
							strokeWidth="8"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 2, ease: "easeInOut" }}
						/>
						<motion.path
							d="M65 80L95 110M95 80L65 110M105 80L135 110M135 80L105 110"
							stroke="url(#grad2)"
							strokeWidth="8"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
						/>
						<defs>
							<linearGradient id="grad1" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
								<stop stopColor="#60A5FA" />
								<stop offset="1" stopColor="#3B82F6" />
							</linearGradient>
							<linearGradient id="grad2" x1="65" y1="80" x2="135" y2="110" gradientUnits="userSpaceOnUse">
								<stop stopColor="#F472B6" />
								<stop offset="1" stopColor="#EC4899" />
							</linearGradient>
						</defs>
					</svg>
				</motion.div>

				{/* Main content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
				>
					<h1 className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
						404
					</h1>
					<h2 className="text-3xl font-bold mb-6 text-gray-300">Page Not Found</h2>
					<p className="text-xl mb-12 max-w-2xl mx-auto text-gray-400 leading-relaxed">
						We're sorry, but the page you're looking for cannot be found. It might have been moved, deleted, or perhaps never existed.
					</p>
				</motion.div>

				{/* Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
					className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
				>
					<motion.button
						onClick={() => router.push('/')}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-700 transition duration-300"
					>
						<ChevronLeft className="w-5 h-5" />
						<span>Go Home</span>
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:bg-gray-600 transition duration-300"
						onClick={() => router.refresh()}
					>
						<RefreshCw className="w-5 h-5" />
						<span>Refresh Page</span>
					</motion.button>
				</motion.div>
			</div>

			{/* Footer */}
			<motion.footer
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 1.2 }}
				className="mt-16 text-gray-500 text-sm"
			>
				© 2024 Metroland Now. All rights reserved.
			</motion.footer>
		</div>
	);
};

export default NotFoundPage;

