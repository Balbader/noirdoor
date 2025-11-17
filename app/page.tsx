'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import Header from '@/components/navigation/Header';
import Hero from '@/components/home/Hero';
import {
	ArrowRight,
	ChevronDown,
	Search,
	Zap,
	Rocket,
	Users,
	Lightbulb,
	Palette,
	Code,
	TrendingUp,
	Sparkles,
	Target,
	CheckCircle2,
} from 'lucide-react';

export default function Home() {
	const networkRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		let ctx: gsap.Context | null = null;

		const initAnimations = async () => {
			let scrollTriggerLoaded = false;
			if (typeof window !== 'undefined') {
				try {
					const { ScrollTrigger: ST } = await import(
						'gsap/ScrollTrigger'
					);
					gsap.registerPlugin(ST);
					scrollTriggerLoaded = true;
				} catch (error) {
					console.warn('ScrollTrigger could not be loaded:', error);
				}
			}

			ctx = gsap.context(() => {
				// Animate network nodes
				if (networkRef.current) {
					const nodes =
						networkRef.current.querySelectorAll('.network-node');
					nodes.forEach((node, i) => {
						gsap.from(node, {
							opacity: 0,
							scale: 0,
							duration: 0.8,
							delay: i * 0.1,
							ease: 'back.out(1.7)',
						});
					});
				}

				if (scrollTriggerLoaded) {
					sectionRefs.current.forEach((section) => {
						if (section) {
							gsap.from(section, {
								opacity: 0,
								y: 80,
								duration: 1,
								ease: 'power3.out',
								scrollTrigger: {
									trigger: section,
									start: 'top 80%',
									toggleActions: 'play none none reverse',
								},
							});
						}
					});

					// Animate colored cards on scroll
					const colorCards = document.querySelectorAll(
						'[class*="color-card-"]',
					);
					colorCards.forEach((card, i) => {
						gsap.fromTo(
							card,
							{
								opacity: 0,
								y: 30,
							},
							{
								opacity: 1,
								y: 0,
								duration: 0.8,
								delay: i * 0.1,
								ease: 'power2.out',
								scrollTrigger: {
									trigger: card as Element,
									start: 'top 85%',
									toggleActions: 'play none none reverse',
								},
							},
						);
					});
				}
			});
		};

		initAnimations();

		return () => {
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	const addToRefs = (el: HTMLDivElement | null) => {
		if (el && !sectionRefs.current.includes(el)) {
			sectionRefs.current.push(el);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white overflow-hidden">
			<Header />
			<Hero />

			{/* What We Do Section */}
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
							We don&apos;t just advise, we co-create. NoirDoor
							blends design, engineering, and strategy into a
							single force that transforms bold ideas into real
							companies.
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
								'rgba(234, 179, 8, 0.06)', // yellow
								'rgba(251, 146, 60, 0.04)', // orange
								'rgba(168, 85, 247, 0.04)', // purple
								'rgba(234, 179, 8, 0.05)', // yellow
							];
							const colorOverlay =
								colorOverlays[index % colorOverlays.length];
							return (
								<div
									key={index}
									className={`p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm color-card-${index}`}
								>
									<div
										className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
										style={{
											backgroundColor: colorOverlay,
										}}
									/>
									<div className="relative z-10">
										<item.icon className="w-7 h-7 text-white/50 group-hover:text-yellow-400 transition-all duration-300 mb-5" />
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
							If it requires courage, creativity, and sharp
							execution — that&apos;s our arena.
						</p>
					</div>
				</div>
			</section>

			{/* Our Philosophy Section */}
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
							NoirDoor exists for founders who&apos;d rather stand
							out than fit in.
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
							If the world doesn&apos;t get your idea yet,
							perfect. Let&apos;s build it.
						</p>
					</div>
				</div>
			</section>

			{/* What We Build Together Section */}
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

			{/* Who We Build With Section */}
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
								className="flex items-start gap-4 p-7 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-yellow-500/20 hover:bg-white/[0.025] hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300 backdrop-blur-sm"
							>
								<CheckCircle2 className="w-5 h-5 text-white/40 group-hover:text-yellow-400 flex-shrink-0 mt-1 transition-colors duration-300" />
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

			{/* The NoirDoor Advantage Section */}
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

			{/* Portfolio Teaser Section */}
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
								description:
									'AI talent marketplace for 42 Network',
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
								className="group p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-500 backdrop-blur-sm"
							>
								<h3 className="text-3xl font-semibold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-[-0.02em]">
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

			{/* CTA Section */}
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

			{/* Footer */}
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
		</div>
	);
}
