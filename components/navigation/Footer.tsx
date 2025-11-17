'use client';

import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="py-24 px-6 lg:px-12 border-t border-gray-200 bg-white backdrop-blur-sm">
			<div className="container mx-auto max-w-6xl">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
					<div>
						<div className="flex items-center gap-3 mb-6">
							<div className="relative w-9 h-9 flex items-center justify-center bg-white backdrop-blur-sm rounded-lg p-1.5 overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gray-300">
								<Image
									src="/opened-door-aperture.png"
									alt="NoirDoor Logo"
									width={56}
									height={56}
									className="object-contain scale-150"
								/>
							</div>
							<span className="text-lg font-medium text-black tracking-[-0.01em]">
								NoirDoor
							</span>
						</div>
						<p className="text-gray-600 text-sm font-light leading-[1.7] tracking-[-0.01em]">
							NoirDoor — Home for the Bold.
							<br />A startup studio for founders who refuse
							ordinary.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<a
							href="#"
							className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-light tracking-[-0.01em]"
						>
							Support
						</a>
						<a
							href="#"
							className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-light tracking-[-0.01em]"
						>
							Contact
						</a>
					</div>
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 hover:border-gray-300 border border-gray-200 flex items-center justify-center transition-all duration-300"
						>
							<span className="text-gray-600 hover:text-black text-sm transition-colors duration-300">
								X
							</span>
						</a>
						<a
							href="#"
							className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 hover:border-gray-300 border border-gray-200 flex items-center justify-center transition-all duration-300"
						>
							<span className="text-gray-600 hover:text-black text-sm transition-colors duration-300">
								in
							</span>
						</a>
					</div>
				</div>
				<div className="pt-8 border-t border-gray-200">
					<p className="text-gray-500 text-xs font-light text-center tracking-[-0.01em]">
						© {new Date().getFullYear()} NoirDoor. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
