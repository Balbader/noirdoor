'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Star {
	x: number;
	y: number;
	size: number;
	opacity: number;
	brightness: number;
}

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const smoothedMousePosRef = useRef({ x: 0, y: 0 });
	const targetMousePosRef = useRef({ x: 0, y: 0 });
	const starsRef = useRef<Star[]>([]);
	const animationFrameRef = useRef<number | undefined>(undefined);

	// Initialize constellation
	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Generate stars
		const numStars = 150;
		const stars: Star[] = [];
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.3,
				brightness: Math.random(),
			});
		}
		starsRef.current = stars;

		// Draw constellation
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Smoothly interpolate mouse position (slow interaction)
			const smoothingFactor = 0.05; // Lower = slower (0.05 = very slow)
			smoothedMousePosRef.current.x +=
				(targetMousePosRef.current.x - smoothedMousePosRef.current.x) *
				smoothingFactor;
			smoothedMousePosRef.current.y +=
				(targetMousePosRef.current.y - smoothedMousePosRef.current.y) *
				smoothingFactor;

			const smoothedMouse = smoothedMousePosRef.current;

			// Update star twinkling
			stars.forEach((star) => {
				star.brightness += 0.02;
				star.opacity = 0.3 + Math.sin(star.brightness) * 0.3;
			});

			// Draw stars first
			stars.forEach((star) => {
				// Calculate distance from smoothed mouse position
				const dx = star.x - smoothedMouse.x;
				const dy = star.y - smoothedMouse.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				// Increased interaction distance for slower, more gradual effect
				const mouseInfluence = Math.max(0, 1 - distance / 600);

				// Enhanced brightness near mouse (reduced for slower effect)
				const finalOpacity = Math.min(
					1,
					star.opacity + mouseInfluence * 0.25,
				);
				const finalSize = star.size + mouseInfluence * 0.8;

				// Draw star glow
				const gradient = ctx.createRadialGradient(
					star.x,
					star.y,
					0,
					star.x,
					star.y,
					finalSize * 3,
				);
				gradient.addColorStop(
					0,
					`rgba(107, 114, 128, ${finalOpacity})`,
				);
				gradient.addColorStop(
					0.5,
					`rgba(107, 114, 128, ${finalOpacity * 0.3})`,
				);
				gradient.addColorStop(1, 'rgba(107, 114, 128, 0)');

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(star.x, star.y, finalSize * 3, 0, Math.PI * 2);
				ctx.fill();

				// Draw star core
				ctx.fillStyle = `rgba(156, 163, 175, ${finalOpacity})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, finalSize, 0, Math.PI * 2);
				ctx.fill();
			});

			// Draw connections between nearby stars with mouse interaction
			const maxDistance = 200;
			stars.forEach((star1, i) => {
				stars.slice(i + 1).forEach((star2) => {
					const dx = star1.x - star2.x;
					const dy = star1.y - star2.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < maxDistance) {
						// Check if smoothed mouse is near the line
						const lineLength = distance;
						const t = Math.max(
							0,
							Math.min(
								1,
								((smoothedMouse.x - star1.x) * dx +
									(smoothedMouse.y - star1.y) * dy) /
									(lineLength * lineLength),
							),
						);
						const closestX = star1.x + t * dx;
						const closestY = star1.y + t * dy;
						const distToMouse = Math.sqrt(
							Math.pow(smoothedMouse.x - closestX, 2) +
								Math.pow(smoothedMouse.y - closestY, 2),
						);
						// Increased distance for slower, more gradual effect
						const mouseInfluence = Math.max(
							0,
							1 - distToMouse / 400,
						);

						const opacity =
							(1 - distance / maxDistance) * 0.15 +
							mouseInfluence * 0.12;
						ctx.strokeStyle = `rgba(107, 114, 128, ${opacity})`;
						ctx.lineWidth = 0.5 + mouseInfluence * 0.5;
						ctx.beginPath();
						ctx.moveTo(star1.x, star1.y);
						ctx.lineTo(star2.x, star2.y);
						ctx.stroke();
					}
				});
			});

			animationFrameRef.current = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [mousePos]);

	// Mouse tracking with slow update
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Update target position (actual mouse position)
			targetMousePosRef.current = { x: e.clientX, y: e.clientY };
			// Keep state for dependency (but use refs for smooth interpolation)
			setMousePos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

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

			{/* Interactive Constellation Canvas */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none"
				style={{ zIndex: 1 }}
			/>

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
