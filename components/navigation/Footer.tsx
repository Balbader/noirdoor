'use client';

import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="py-24 px-6 lg:px-12 border-t border-white/[0.06] bg-black/50 backdrop-blur-sm">
			<div className="container mx-auto max-w-6xl">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
					<div>
						<div className="flex items-center gap-3 mb-6">
							<div className="relative w-9 h-9 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-1.5 overflow-hidden border border-white/[0.08]">
								<Image
									src="/opened-door-aperture.png"
									alt="NoirDoor Logo"
									width={56}
									height={56}
									className="object-contain scale-150"
								/>
							</div>
							<span className="text-lg font-medium text-white tracking-[-0.01em]">
								NoirDoor
							</span>
						</div>
						<p className="text-white/45 text-sm font-light leading-[1.7] tracking-[-0.01em]">
							NoirDoor — Home for the Bold.
							<br />A startup studio for founders who refuse
							ordinary.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<a
							href="#"
							className="text-white/50 hover:text-yellow-400 transition-colors duration-300 text-sm font-light tracking-[-0.01em]"
						>
							Support
						</a>
						<a
							href="#"
							className="text-white/50 hover:text-yellow-400 transition-colors duration-300 text-sm font-light tracking-[-0.01em]"
						>
							Contact
						</a>
					</div>
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-yellow-500/10 hover:border-yellow-500/30 border border-white/[0.08] flex items-center justify-center transition-all duration-300"
						>
							<span className="text-white/50 hover:text-yellow-400 text-sm transition-colors duration-300">
								X
							</span>
						</a>
						<a
							href="#"
							className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-yellow-500/10 hover:border-yellow-500/30 border border-white/[0.08] flex items-center justify-center transition-all duration-300"
						>
							<span className="text-white/50 hover:text-yellow-400 text-sm transition-colors duration-300">
								in
							</span>
						</a>
					</div>
				</div>
				<div className="pt-8 border-t border-white/[0.06]">
					<p className="text-white/35 text-xs font-light text-center tracking-[-0.01em]">
						© {new Date().getFullYear()} NoirDoor. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
