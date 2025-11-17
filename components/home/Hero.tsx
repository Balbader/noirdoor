'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
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
							scale: 1.15,
							opacity: 0.5,
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
							opacity: 0.25,
							scale: 1.08,
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
							opacity: 0.3,
							scale: 1.4,
							duration: 2 + (i % 3),
							repeat: -1,
							yoyo: true,
							ease: 'sine.inOut',
							delay: i * 0.1,
						});
					});
				}

				if (scrollTriggerLoaded && heroRef.current) {
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
			});
		};

		initAnimations();

		return () => {
			if (ctx) {
				ctx.revert();
			}
		};
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white"
		>
			{/* Subtle Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/95 to-gray-100" />

			{/* Abstract Animated Background */}
			<div
				ref={backgroundAnimationRef}
				className="absolute inset-0 overflow-hidden pointer-events-none"
			>
				{/* Floating Gradient Orbs */}
				<div className="animated-orb absolute top-[20%] left-[10%] w-96 h-96 bg-gray-200/40 rounded-full blur-3xl" />
				<div className="animated-orb absolute top-[60%] right-[15%] w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl" />
				<div className="animated-orb absolute bottom-[20%] left-[30%] w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
				<div className="animated-orb absolute top-[40%] right-[40%] w-64 h-64 bg-yellow-300/25 rounded-full blur-3xl" />
				<div className="animated-orb absolute top-[70%] left-[50%] w-56 h-56 bg-gray-100/35 rounded-full blur-3xl" />

				{/* Flowing Abstract Lines */}
				<svg
					className="animated-line absolute top-[15%] left-[5%] w-[600px] h-[2px] opacity-30"
					viewBox="0 0 600 2"
					preserveAspectRatio="none"
				>
					<path
						d="M0,1 Q150,0 300,1 T600,1"
						stroke="rgba(234, 179, 8, 0.3)"
						strokeWidth="1.5"
						fill="none"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
				<svg
					className="animated-line absolute bottom-[25%] right-[10%] w-[500px] h-[2px] opacity-20"
					viewBox="0 0 500 2"
					preserveAspectRatio="none"
				>
					<path
						d="M0,1 Q125,0 250,1 T500,1"
						stroke="rgba(107, 114, 128, 0.2)"
						strokeWidth="1.5"
						fill="none"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
				<svg
					className="animated-line absolute top-[50%] left-[20%] w-[400px] h-[2px] opacity-15 rotate-45"
					viewBox="0 0 400 2"
					preserveAspectRatio="none"
				>
					<path
						d="M0,1 Q100,0 200,1 T400,1"
						stroke="rgba(156, 163, 175, 0.15)"
						strokeWidth="1.5"
						fill="none"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
				<svg
					className="animated-line absolute top-[30%] right-[25%] w-[350px] h-[2px] opacity-12 -rotate-12"
					viewBox="0 0 350 2"
					preserveAspectRatio="none"
				>
					<path
						d="M0,1 Q87,0 175,1 T350,1"
						stroke="rgba(234, 179, 8, 0.2)"
						strokeWidth="1.5"
						fill="none"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>

				{/* Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage: `
                linear-gradient(rgba(156, 163, 175, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 163, 175, 0.15) 1px, transparent 1px)
              `,
						backgroundSize: '60px 60px',
					}}
				/>

				{/* Animated Grid Overlay */}
				<div
					className="animated-grid absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `
                linear-gradient(rgba(107, 114, 128, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(107, 114, 128, 0.2) 1px, transparent 1px)
              `,
						backgroundSize: '120px 120px',
					}}
				/>

				{/* Grid Intersection Points */}
				<div className="absolute inset-0">
					{[...Array(20)].map((_, i) => {
						const x = (i % 5) * 25;
						const y = Math.floor(i / 5) * 20;
						const isYellow = i % 4 === 0;
						return (
							<div
								key={i}
								className={`grid-point absolute w-1 h-1 rounded-full ${
									isYellow
										? 'bg-yellow-400/25'
										: 'bg-gray-400/20'
								}`}
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
					className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold mb-10 leading-[1.02] tracking-[-0.03em] max-w-6xl mx-auto"
				>
					<span className="block text-black">
						We Build the Companies
					</span>
					<span className="block mt-4 text-gray-900">
						Others Are Too Afraid to Start.
					</span>
				</h1>

				{/* <p
					ref={subtitleRef}
					className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto mb-20 leading-[1.6] font-light tracking-[-0.01em]"
				>
					NoirDoor is a startup studio for founders who refuse to
					blend in. We turn unconventional ideas into powerful,
					market-ready ventures, fast.
				</p>

				<div
					ref={ctaRef}
					className="flex flex-col sm:flex-row gap-5 justify-center items-center"
				>
					<Button
						size="lg"
						className="bg-black text-white hover:bg-yellow-400 hover:text-black text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/10 hover:shadow-yellow-400/20"
					>
						Start Building
						<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-gray-300 hover:bg-yellow-500/10 hover:border-yellow-500/30 text-gray-700 hover:text-yellow-600 text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
					>
						Pitch Your Idea
					</Button>
				</div> */}
			</div>
		</section>
	);
}
