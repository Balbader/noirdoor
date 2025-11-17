'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function CTA({ addToRefs }: CTAProps) {
	return (
		<section
			id="contact"
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative"
		>
			<div className="container mx-auto max-w-4xl text-center">
				<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-10 tracking-[-0.03em] text-white">
					Ready to Build Something Bold?
				</h2>
				<p className="text-2xl md:text-3xl text-white/55 mb-5 max-w-2xl mx-auto leading-[1.6] font-light tracking-[-0.01em]">
					The world doesn&apos;t need another safe idea.
				</p>
				<p className="text-xl md:text-2xl text-white/45 mb-20 max-w-2xl mx-auto leading-[1.7] font-light tracking-[-0.01em]">
					It needs yours, crafted relentlessly.
				</p>
				<div className="flex flex-col sm:flex-row gap-5 justify-center">
					<Button
						size="lg"
						className="bg-white text-black hover:bg-yellow-400 hover:text-black text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-white/10 hover:shadow-yellow-400/20"
					>
						Start Your Build
						<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-white/15 hover:bg-yellow-500/10 hover:border-yellow-500/30 text-white/90 hover:text-yellow-400 text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
					>
						Talk to the Studio
					</Button>
				</div>
			</div>
		</section>
	);
}
