'use client';

interface NoirDoorAdvantageProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function NoirDoorAdvantage({
	addToRefs,
}: NoirDoorAdvantageProps) {
	return (
		<section
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.03em] text-white">
						Why founders choose us
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
					{[
						'Creative rebellion baked into process',
						'Senior-level product & design execution',
						'AI-powered tools for speed and clarity',
						'Hands-on partnership, not passive advice',
						'Unapologetically original branding',
						'A builder&apos;s mindset from day one',
					].map((item, index) => (
						<div
							key={index}
							className="p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-500 backdrop-blur-sm"
						>
							<p className="text-lg text-white/70 font-light leading-[1.7] tracking-[-0.01em]">
								{item}
							</p>
						</div>
					))}
				</div>

				<div className="text-center">
					<p className="text-2xl md:text-3xl text-white/50 font-light leading-[1.6] tracking-[-0.01em]">
						We don&apos;t just open doors, we build new ones.
					</p>
				</div>
			</div>
		</section>
	);
}
