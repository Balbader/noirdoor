'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white border-b border-gray-200 transition-all duration-500">
			<div className="container mx-auto max-w-6xl px-6 lg:px-12">
				<div className="flex items-center justify-between h-20">
					<div className="flex items-center gap-3">
						<div className="relative w-9 h-9 flex items-center justify-center bg-white backdrop-blur-sm rounded-lg p-1.5 overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gray-300">
							<Image
								src="/opened-door-aperture.png"
								alt="NoirDoor Logo"
								width={56}
								height={56}
								className="object-contain scale-150"
							/>
						</div>
						<span className="text-lg font-medium tracking-[-0.01em] text-black">
							NoirDoor
						</span>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-8">
						<a
							href="#"
							className="text-sm font-normal text-gray-600 hover:text-black transition-all duration-300 relative group"
						>
							Home
							<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
						</a>
						<a
							href="#what-we-do"
							className="text-sm font-normal text-gray-600 hover:text-black transition-all duration-300 relative group"
						>
							What We Do
							<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
						</a>
						<a
							href="#portfolio"
							className="text-sm font-normal text-gray-600 hover:text-black transition-all duration-300 relative group"
						>
							Portfolio
							<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
						</a>
						<a
							href="#philosophy"
							className="text-sm font-normal text-gray-600 hover:text-black transition-all duration-300 relative group"
						>
							Philosophy
							<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
						</a>
						<a
							href="#contact"
							className="text-sm font-normal text-gray-600 hover:text-black transition-all duration-300 relative group"
						>
							Contact
							<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
						</a>
					</div>

					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							className="hidden sm:flex border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700 hover:text-black text-sm font-normal px-6 py-2.5 h-auto rounded-full transition-all duration-300 backdrop-blur-sm"
						>
							Get Started
						</Button>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="lg:hidden text-gray-600 hover:text-black transition-all duration-300 p-2 rounded-lg hover:bg-gray-100"
						>
							{mobileMenuOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
