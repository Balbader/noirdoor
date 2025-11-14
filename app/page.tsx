'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	ChevronDown,
	Search,
	Menu,
	X,
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const networkRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<HTMLDivElement[]>([]);
	const backgroundAnimationRef = useRef<HTMLDivElement>(null);

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
				const tl = gsap.timeline();

				if (titleRef.current) {
					tl.from(titleRef.current, {
						opacity: 0,
						y: 100,
						duration: 1.2,
						ease: 'power4.out',
					});
				}

				if (subtitleRef.current) {
					tl.from(
						subtitleRef.current,
						{
							opacity: 0,
							y: 50,
							duration: 1,
							ease: 'power3.out',
						},
						'-=0.8',
					);
				}

				if (ctaRef.current) {
					tl.from(
						ctaRef.current,
						{
							opacity: 0,
							y: 30,
							duration: 0.8,
							ease: 'power2.out',
						},
						'-=0.6',
					);
				}

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

				// Abstract background animation
				if (backgroundAnimationRef.current) {
					const orbs =
						backgroundAnimationRef.current.querySelectorAll(
							'.animated-orb',
						);
					const lines =
						backgroundAnimationRef.current.querySelectorAll(
							'.animated-line',
						);

					// Animate floating orbs
					orbs.forEach((orb, i) => {
						const duration = 15 + i * 3;
						const delay = i * 0.5;

						gsap.to(orb, {
							x: `+=${100 + i * 50}`,
							y: `+=${80 + i * 40}`,
							rotation: 360,
							duration: duration,
							repeat: -1,
							yoyo: true,
							ease: 'sine.inOut',
							delay: delay,
						});

						gsap.to(orb, {
							scale: 1.2,
							opacity: 0.6,
							duration: 4 + i,
							repeat: -1,
							yoyo: true,
							ease: 'sine.inOut',
							delay: delay,
						});
					});

					// Animate flowing lines
					lines.forEach((line, i) => {
						const duration = 8 + i * 2;
						const delay = i * 0.3;

						gsap.to(line, {
							x: `+=${200 + i * 100}`,
							y: `+=${150 + i * 75}`,
							rotation: 45 + i * 15,
							duration: duration,
							repeat: -1,
							yoyo: true,
							ease: 'power1.inOut',
							delay: delay,
						});

						gsap.to(line, {
							opacity: 0.3,
							scale: 1.1,
							duration: 3 + i,
							repeat: -1,
							yoyo: true,
							ease: 'sine.inOut',
							delay: delay,
						});
					});

					// Animate grid overlay
					const gridOverlay =
						backgroundAnimationRef.current.querySelector(
							'.animated-grid',
						);
					if (gridOverlay) {
						gsap.to(gridOverlay, {
							backgroundPosition: '120px 120px',
							duration: 20,
							repeat: -1,
							ease: 'none',
						});
					}

					// Animate grid points
					const gridPoints =
						backgroundAnimationRef.current.querySelectorAll(
							'.grid-point',
						);
					gridPoints.forEach((point, i) => {
						gsap.to(point, {
							opacity: 0.4,
							scale: 1.5,
							duration: 2 + (i % 3),
							repeat: -1,
							yoyo: true,
							ease: 'sine.inOut',
							delay: i * 0.1,
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

					if (heroRef.current) {
						gsap.to(heroRef.current, {
							y: -100,
							scrollTrigger: {
								trigger: heroRef.current,
								start: 'top top',
								end: 'bottom top',
								scrub: 1,
							},
						});
					}

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
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/[0.08]">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center gap-3">
							<div className="relative w-8 h-8 flex items-center justify-center bg-white rounded p-1.5 overflow-hidden">
								<Image
									src="/opened-door-aperture.png"
									alt="NoirDoor Logo"
									width={56}
									height={56}
									className="object-contain scale-150"
								/>
							</div>
							<span className="text-lg font-medium tracking-tight text-white">
								NoirDoor
							</span>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center gap-10">
							<a
								href="#"
								className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-300"
							>
								Home
							</a>
							<a
								href="#what-we-do"
								className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-300"
							>
								What We Do
							</a>
							<a
								href="#portfolio"
								className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-300"
							>
								Portfolio
							</a>
							<a
								href="#philosophy"
								className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-300"
							>
								Philosophy
							</a>
							<a
								href="#contact"
								className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-300"
							>
								Contact
							</a>
						</div>

						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								className="hidden sm:flex border-white/20 hover:bg-white/10 hover:border-white/30 text-white text-sm font-normal px-6 py-2 h-auto transition-all duration-300"
							>
								Get Started
							</Button>
							<button
								onClick={() =>
									setMobileMenuOpen(!mobileMenuOpen)
								}
								className="lg:hidden text-white/60 hover:text-white transition-colors"
							>
								{mobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				ref={heroRef}
				className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
			>
				{/* Subtle Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />

				{/* Abstract Animated Background */}
				<div
					ref={backgroundAnimationRef}
					className="absolute inset-0 overflow-hidden pointer-events-none"
				>
					{/* Floating Gradient Orbs */}
					<div className="animated-orb absolute top-[20%] left-[10%] w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
					<div className="animated-orb absolute top-[60%] right-[15%] w-80 h-80 bg-white/[0.025] rounded-full blur-3xl" />
					<div className="animated-orb absolute bottom-[20%] left-[30%] w-72 h-72 bg-white/[0.02] rounded-full blur-3xl" />
					<div className="animated-orb absolute top-[40%] right-[40%] w-64 h-64 bg-white/[0.015] rounded-full blur-3xl" />

					{/* Flowing Abstract Lines */}
					<svg
						className="animated-line absolute top-[15%] left-[5%] w-[600px] h-[2px] opacity-20"
						viewBox="0 0 600 2"
						preserveAspectRatio="none"
					>
						<path
							d="M0,1 Q150,0 300,1 T600,1"
							stroke="rgba(255,255,255,0.3)"
							strokeWidth="2"
							fill="none"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
					<svg
						className="animated-line absolute bottom-[25%] right-[10%] w-[500px] h-[2px] opacity-15"
						viewBox="0 0 500 2"
						preserveAspectRatio="none"
					>
						<path
							d="M0,1 Q125,0 250,1 T500,1"
							stroke="rgba(255,255,255,0.25)"
							strokeWidth="2"
							fill="none"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
					<svg
						className="animated-line absolute top-[50%] left-[20%] w-[400px] h-[2px] opacity-10 rotate-45"
						viewBox="0 0 400 2"
						preserveAspectRatio="none"
					>
						<path
							d="M0,1 Q100,0 200,1 T400,1"
							stroke="rgba(255,255,255,0.2)"
							strokeWidth="2"
							fill="none"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>

					{/* Grid Pattern */}
					<div
						className="absolute inset-0 opacity-[0.08]"
						style={{
							backgroundImage: `
                linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
              `,
							backgroundSize: '60px 60px',
						}}
					/>

					{/* Animated Grid Overlay */}
					<div
						className="animated-grid absolute inset-0 opacity-[0.04]"
						style={{
							backgroundImage: `
                linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
							backgroundSize: '120px 120px',
						}}
					/>

					{/* Grid Intersection Points */}
					<div className="absolute inset-0">
						{[...Array(20)].map((_, i) => {
							const x = (i % 5) * 25;
							const y = Math.floor(i / 5) * 20;
							return (
								<div
									key={i}
									className="grid-point absolute w-1 h-1 bg-white/20 rounded-full"
									style={{
										left: `${x}%`,
										top: `${y}%`,
									}}
								/>
							);
						})}
					</div>
				</div>

				<div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
					<h1
						ref={titleRef}
						className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold mb-8 leading-[1.05] tracking-[-0.02em] max-w-6xl mx-auto"
					>
						<span className="block text-white">
							We Build the Companies
						</span>
						<span className="block mt-3 text-white/90">
							Others Are Too Afraid to Start.
						</span>
					</h1>

					<p
						ref={subtitleRef}
						className="text-xl sm:text-2xl md:text-3xl text-white/50 max-w-3xl mx-auto mb-16 leading-relaxed font-light"
					>
						NoirDoor is a startup studio for founders who refuse to
						blend in. We turn unconventional ideas into powerful,
						market-ready ventures, fast.
					</p>

					<div
						ref={ctaRef}
						className="flex flex-col sm:flex-row gap-4 justify-center items-center"
					>
						<Button
							size="lg"
							className="bg-white text-black hover:bg-white/90 text-lg px-8 py-3.5 h-auto font-normal rounded-full transition-all duration-300 hover:scale-105"
						>
							Start Building
							<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white/20 hover:bg-white/5 hover:border-white/30 text-white text-lg px-8 py-3.5 h-auto font-normal rounded-full transition-all duration-300"
						>
							Pitch Your Idea
						</Button>
					</div>
				</div>
			</section>

			{/* What We Do Section */}
			<section
				id="what-we-do"
				ref={addToRefs}
				className="py-32 md:py-40 px-6 lg:px-12 relative"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.02em] text-white">
							A new kind of startup studio.
						</h2>
						<p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed font-light">
							We don&apos;t just advise — we co-create. NoirDoor
							blends design, engineering, and strategy into a
							single force that transforms bold ideas into real
							companies.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
								'rgba(99, 102, 241, 0.05)', // indigo
								'rgba(236, 72, 153, 0.05)', // pink
								'rgba(34, 197, 94, 0.05)', // green
								'rgba(251, 146, 60, 0.05)', // orange
								'rgba(168, 85, 247, 0.05)', // purple
								'rgba(59, 130, 246, 0.05)', // blue
							];
							const colorOverlay =
								colorOverlays[index % colorOverlays.length];
							return (
								<div
									key={index}
									className={`p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 group relative overflow-hidden color-card-${index}`}
								>
									<div
										className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
										style={{
											backgroundColor: colorOverlay,
										}}
									/>
									<div className="relative z-10">
										<item.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-300 mb-6" />
										<p className="text-lg text-white/80 leading-relaxed font-light">
											{item.title}
										</p>
									</div>
								</div>
							);
						})}
					</div>

					<div className="text-center">
						<p className="text-2xl text-white/40 font-light">
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
				className="py-32 md:py-40 px-6 lg:px-12 relative bg-[#0a0a0a]"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-8 tracking-[-0.02em] text-white">
							Boldness is a skill. We practice it daily.
						</h2>
						<p className="text-2xl md:text-3xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-6 font-light">
							Most people build what&apos;s safe.
						</p>
						<p className="text-2xl md:text-3xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
							We build what&apos;s inevitable.
						</p>
						<p className="text-xl text-white/40 max-w-2xl mx-auto font-light">
							NoirDoor exists for founders who&apos;d rather stand
							out than fit in.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
								className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
							>
								<item.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-300 mb-6" />
								<p className="text-lg text-white/80 font-light leading-relaxed">
									{item.title}
								</p>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-2xl md:text-3xl text-white/50 font-light">
							If the world doesn&apos;t get your idea yet —
							perfect. Let&apos;s build it.
						</p>
					</div>
				</div>
			</section>

			{/* What We Build Together Section */}
			<section
				ref={addToRefs}
				className="py-32 md:py-40 px-6 lg:px-12 relative"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.02em] text-white">
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
								className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
							>
								<div className="flex items-start gap-4">
									<item.icon className="w-7 h-7 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" />
									<div>
										<h3 className="text-2xl font-semibold mb-3 text-white tracking-tight">
											{item.title}
										</h3>
										<p className="text-lg text-white/50 leading-relaxed font-light">
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
				className="py-32 md:py-40 px-6 lg:px-12 relative bg-[#0a0a0a]"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.02em] text-white">
							Founders who think in neon, not grayscale.
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
						{[
							'Solo founders with gritty ambition',
							'Creators turning audiences into companies',
							'Early-stage innovators ready to move fast',
							'Businesses pushing into bold new territory',
						].map((item, index) => (
							<div
								key={index}
								className="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08]"
							>
								<CheckCircle2 className="w-5 h-5 text-white/40 flex-shrink-0 mt-1" />
								<p className="text-lg text-white/70 font-light leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-2xl md:text-3xl text-white/50 font-light">
							If your idea feels &quot;too much,&quot; &quot;too
							different,&quot; or &quot;too risky&quot; —
							you&apos;re exactly who we want.
						</p>
					</div>
				</div>
			</section>

			{/* The NoirDoor Advantage Section */}
			<section
				ref={addToRefs}
				className="py-32 md:py-40 px-6 lg:px-12 relative"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.02em] text-white">
							Why founders choose us
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
								className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
							>
								<p className="text-lg text-white/70 font-light leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-2xl md:text-3xl text-white/50 font-light">
							We don&apos;t just open doors — we build new ones.
						</p>
					</div>
				</div>
			</section>

			{/* Portfolio Teaser Section */}
			<section
				id="portfolio"
				ref={addToRefs}
				className="py-32 md:py-40 px-6 lg:px-12 relative bg-[#0a0a0a]"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-24">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-[-0.02em] text-white">
							Born at NoirDoor
						</h2>
						<p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light">
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
								className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
							>
								<h3 className="text-3xl font-semibold mb-3 text-white tracking-tight">
									{item.name}
								</h3>
								<p className="text-lg text-white/50 leading-relaxed font-light">
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
				className="py-32 md:py-40 px-6 lg:px-12 relative"
			>
				<div className="container mx-auto max-w-4xl text-center">
					<h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-8 tracking-[-0.02em] text-white">
						Ready to Build Something Bold?
					</h2>
					<p className="text-2xl md:text-3xl text-white/50 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
						The world doesn&apos;t need another safe idea.
					</p>
					<p className="text-xl md:text-2xl text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
						It needs yours — crafted relentlessly.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							className="bg-white text-black hover:bg-white/90 text-lg px-8 py-3.5 h-auto font-normal rounded-full transition-all duration-300 hover:scale-105"
						>
							Start Your Build
							<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white/20 hover:bg-white/5 hover:border-white/30 text-white text-lg px-8 py-3.5 h-auto font-normal rounded-full transition-all duration-300"
						>
							Talk to the Studio
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-20 px-6 lg:px-12 border-t border-white/[0.08]">
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
						<div>
							<div className="flex items-center gap-3 mb-6">
								<div className="relative w-8 h-8 flex items-center justify-center bg-white rounded p-1.5 overflow-hidden">
									<Image
										src="/opened-door-aperture.png"
										alt="NoirDoor Logo"
										width={56}
										height={56}
										className="object-contain scale-150"
									/>
								</div>
								<span className="text-lg font-medium text-white">
									NoirDoor
								</span>
							</div>
							<p className="text-white/40 text-sm font-light leading-relaxed">
								NoirDoor — Home for the Bold.
								<br />A startup studio for founders who refuse
								ordinary.
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<a
								href="#"
								className="text-white/50 hover:text-white transition-colors duration-300 text-sm font-light"
							>
								Support
							</a>
							<a
								href="#"
								className="text-white/50 hover:text-white transition-colors duration-300 text-sm font-light"
							>
								Contact
							</a>
						</div>
						<div className="flex items-center gap-4">
							<a
								href="#"
								className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all duration-300"
							>
								<span className="text-white/50 text-sm">X</span>
							</a>
							<a
								href="#"
								className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all duration-300"
							>
								<span className="text-white/50 text-sm">
									in
								</span>
							</a>
						</div>
					</div>
					<div className="pt-8 border-t border-white/[0.08]">
						<p className="text-white/30 text-xs font-light text-center">
							© {new Date().getFullYear()} NoirDoor. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
