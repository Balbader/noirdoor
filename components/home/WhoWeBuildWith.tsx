'use client';

import { CheckCircle2 } from 'lucide-react';

interface WhoWeBuildWithProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function WhoWeBuildWith({ addToRefs }: WhoWeBuildWithProps) {
	return (
		<section
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.03em] text-white">
						Founders who think in neon, not grayscale.
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
					{[
						'Solo founders with gritty ambition',
						'Creators turning audiences into companies',
						'Early-stage innovators ready to move fast',
						'Businesses pushing into bold new territory',
					].map((item, index) => (
						<div
							key={index}
							className="flex items-start gap-4 p-7 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.025] hover:shadow-lg hover:shadow-white/5 transition-all duration-300 backdrop-blur-sm"
						>
							<CheckCircle2 className="w-5 h-5 text-white/40 group-hover:text-white flex-shrink-0 mt-1 transition-colors duration-300" />
							<p className="text-lg text-white/70 font-light leading-[1.7] tracking-[-0.01em]">
								{item}
							</p>
						</div>
					))}
				</div>

				<div className="text-center">
					<p className="text-2xl md:text-3xl text-white/50 font-light leading-[1.6] tracking-[-0.01em]">
						If your idea feels &quot;too much,&quot; &quot;too
						different,&quot; or &quot;too risky&quot;,
						<br />
						you&apos;re exactly who we want.
					</p>
				</div>
			</div>
		</section>
	);
}
