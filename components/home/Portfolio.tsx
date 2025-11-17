'use client';

interface PortfolioProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function Portfolio({ addToRefs }: PortfolioProps) {
	return (
		<section
			id="portfolio"
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.03em] text-white">
						Born at NoirDoor
					</h2>
					<p className="text-xl md:text-2xl text-white/55 max-w-2xl mx-auto font-light leading-[1.7] tracking-[-0.01em]">
						A curated selection of ventures forged inside the
						studio.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[
						{
							name: 'After-42',
							description: 'AI talent marketplace for 42 Network',
						},
						{
							name: 'SheepLoop',
							description: 'AI growth coach for creators',
						},
						{
							name: 'More coming soon',
							description: 'The next bold venture',
						},
					].map((item, index) => (
						<div
							key={index}
							className="group p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-500 backdrop-blur-sm"
						>
							<h3 className="text-3xl font-semibold mb-3 text-white group-hover:text-white transition-colors duration-300 tracking-[-0.02em]">
								{item.name}
							</h3>
							<p className="text-lg text-white/55 leading-[1.7] font-light tracking-[-0.01em]">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
