'use client';

import { Sparkles, Zap, Lightbulb, Palette, Code } from 'lucide-react';

interface PhilosophyProps {
	addToRefs: (el: HTMLDivElement | null) => void;
}

export default function Philosophy({ addToRefs }: PhilosophyProps) {
	return (
		<section
			id="philosophy"
			ref={addToRefs}
			className="py-36 md:py-48 px-6 lg:px-12 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-28">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-10 tracking-[-0.03em] text-white">
						Boldness is a skill. We practice it daily.
					</h2>
					<p className="text-2xl md:text-3xl text-white/55 max-w-3xl mx-auto leading-[1.6] mb-6 font-light tracking-[-0.01em]">
						Most people build what&apos;s safe.
					</p>
					<p className="text-2xl md:text-3xl text-white/55 max-w-3xl mx-auto leading-[1.6] mb-12 font-light tracking-[-0.01em]">
						We build what&apos;s inevitable.
					</p>
					<p className="text-xl text-white/45 max-w-2xl mx-auto font-light leading-[1.7] tracking-[-0.01em]">
						NoirDoor exists for founders who&apos;d rather stand out
						than fit in.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
					{[
						{
							title: 'Originality over imitation',
							icon: Sparkles,
						},
						{
							title: 'Speed with intention',
							icon: Zap,
						},
						{
							title: 'Creative discomfort as a growth engine',
							icon: Lightbulb,
						},
						{
							title: 'Design that hits harder',
							icon: Palette,
						},
						{
							title: 'Technology as an amplifier, not a crutch',
							icon: Code,
						},
					].map((item, index) => (
						<div
							key={index}
							className="group p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-500 backdrop-blur-sm"
						>
							<item.icon className="w-7 h-7 text-white/50 group-hover:text-yellow-400 transition-all duration-300 mb-5" />
							<p className="text-lg text-white/75 font-light leading-[1.6] tracking-[-0.01em]">
								{item.title}
							</p>
						</div>
					))}
				</div>

				<div className="text-center">
					<p className="text-2xl md:text-3xl text-white/50 font-light leading-[1.6] tracking-[-0.01em]">
						If the world doesn&apos;t get your idea yet, perfect.
						Let&apos;s build it.
					</p>
				</div>
			</div>
		</section>
	);
}
