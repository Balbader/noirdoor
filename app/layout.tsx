import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'NoirDoor - Home for the Bold',
	description:
		'We build the companies others are too afraid to start. A startup studio for founders who refuse to blend in. We turn unconventional ideas into powerful, market-ready ventures — fast.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
			>
				{children}
			</body>
		</html>
	);
}
