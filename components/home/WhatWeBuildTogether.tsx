'use client';

import { Lightbulb, Palette, Code, TrendingUp, Users } from 'lucide-react';

interface WhatWeBuildTogetherProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function WhatWeBuildTogether({
	addToRefs,
}: WhatWeBuildTogetherProps) {
	return (
		<section
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.03em] text-white">
						From spark to launch, everything under one roof.
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[
						{
							title: 'Venture Ideation',
							description:
								'Sharp, structured ideation sessions to uncover unfair advantages.',
							icon: Lightbulb,
						},
						{
							title: 'Brand & Creative Direction',
							description:
								'A visual and verbal identity that makes noise — and makes sense.',
							icon: Palette,
						},
						{
							title: 'Product Design & Development',
							description:
								'From MVPs to full platforms, crafted with precision.',
							icon: Code,
						},
						{
							title: 'Go-To-Market + Growth Systems',
							description:
								'AI-powered strategy to validate, acquire, and scale fast.',
							icon: TrendingUp,
						},
						{
							title: 'Studio Support + Advisory',
							description:
								'You focus on building. We handle the rest.',
							icon: Users,
						},
					].map((item, index) => (
						<div
							key={index}
							className="group p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-500 backdrop-blur-sm"
						>
							<div className="flex items-start gap-5">
								<item.icon className="w-7 h-7 text-white/50 group-hover:text-yellow-400 transition-all duration-300 flex-shrink-0 mt-1" />
								<div>
									<h3 className="text-2xl font-semibold mb-3 text-white tracking-[-0.02em]">
										{item.title}
									</h3>
									<p className="text-lg text-white/55 leading-[1.7] font-light tracking-[-0.01em]">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
