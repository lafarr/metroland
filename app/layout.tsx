import { Suspense } from 'react';
import './globals.css'
import { Antonio, Anton } from 'next/font/google'
import Loading from '@/app/loading';

const antonio = Antonio({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-antonio',
	weight: ['100', '200', '300', '400', '500', '600', '700']
});

const anton = Anton({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-anton',
	weight: ['400']
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${antonio.variable} ${anton.variable}`}>
			<body className="overflow-x-hidden">
				<Suspense fallback={<Loading />}>
					{children}
				</Suspense>
			</body>
		</html>
	);
}
