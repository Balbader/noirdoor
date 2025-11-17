'use client';

import {
	Target,
	Rocket,
	Palette,
	TrendingUp,
	Users,
	Sparkles,
} from 'lucide-react';

interface WhatWeDoProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function WhatWeDo({ addToRefs }: WhatWeDoProps) {
	return (
		<section
			id="what-we-do"
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-8 tracking-[-0.03em] text-white">
						A new kind of startup studio.
					</h2>
					<p className="text-xl md:text-2xl text-white/55 max-w-3xl mx-auto leading-[1.7] font-light tracking-[-0.01em]">
						We don&apos;t just advise, we co-create. NoirDoor blends
						design, engineering, and strategy into a single force
						that transforms bold ideas into real companies.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
					{[
						{
							title: 'Validate ideas with precision',
							icon: Target,
						},
						{
							title: 'Build high-quality products at speed',
							icon: Rocket,
						},
						{
							title: 'Craft brand identities with a distinct edge',
							icon: Palette,
						},
						{
							title: 'Create traction through AI-powered growth',
							icon: TrendingUp,
						},
						{
							title: 'Secure the right partners, talent, and funding',
							icon: Users,
						},
						{
							title: 'Launch with confidence and creative clarity',
							icon: Sparkles,
						},
					].map((item, index) => {
						const colorOverlays = [
							'rgba(99, 102, 241, 0.04)', // indigo
							'rgba(236, 72, 153, 0.04)', // pink
							'rgba(59, 130, 246, 0.04)', // blue
							'rgba(251, 146, 60, 0.04)', // orange
							'rgba(168, 85, 247, 0.04)', // purple
							'rgba(139, 92, 246, 0.04)', // purple
						];
						const colorOverlay =
							colorOverlays[index % colorOverlays.length];
						return (
							<div
								key={index}
								className={`p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm color-card-${index}`}
							>
								<div
									className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
									style={{
										backgroundColor: colorOverlay,
									}}
								/>
								<div className="relative z-10">
									<item.icon className="w-7 h-7 text-white/50 group-hover:text-white transition-all duration-300 mb-5" />
									<p className="text-lg text-white/75 leading-[1.6] font-light tracking-[-0.01em]">
										{item.title}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				<div className="text-center">
					<p className="text-2xl text-white/45 font-light leading-[1.6] tracking-[-0.01em]">
						If it requires courage, creativity, and sharp execution
						— that&apos;s our arena.
					</p>
				</div>
			</div>
		</section>
	);
}
