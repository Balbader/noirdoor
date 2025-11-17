'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Star {
	x: number;
	y: number;
	size: number;
	opacity: number;
	brightness: number;
	targetX: number;
	targetY: number;
	velocityX: number;
	velocityY: number;
}

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scrollIconRef = useRef<HTMLDivElement>(null);
	const scrollChevronRef = useRef<SVGSVGElement>(null);
	const mousePosRef = useRef({ x: -1000, y: -1000 }); // Start off-screen
	const starsRef = useRef<Star[]>([]);
	const animationFrameRef = useRef<number | undefined>(undefined);
	const gsapContextRef = useRef<gsap.Context | null>(null);

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

		// Generate stars with initial positions and targets
		const numStars = 150;
		const stars: Star[] = [];
		for (let i = 0; i < numStars; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			stars.push({
				x,
				y,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.3,
				brightness: Math.random(),
				targetX: x,
				targetY: y,
				velocityX: 0,
				velocityY: 0,
			});
		}
		starsRef.current = stars;

		// Function to create ongoing movement for a star
		const createOngoingMovement = (star: Star, index: number) => {
			const movementRange = 0.3; // 30% of canvas size for more dynamic movement
			const baseDuration = 8 + Math.random() * 12; // 8-20 seconds (faster)
			const delay = index * 0.1;

			// Function to animate to a new random position
			const animateToNewPosition = () => {
				// Calculate new target position within bounds
				const newTargetX = Math.max(
					50,
					Math.min(
						canvas.width - 50,
						star.x +
							(Math.random() - 0.5) *
								canvas.width *
								movementRange,
					),
				);
				const newTargetY = Math.max(
					50,
					Math.min(
						canvas.height - 50,
						star.y +
							(Math.random() - 0.5) *
								canvas.height *
								movementRange,
					),
				);

				// Animate X and Y independently with different durations for organic flow
				const xDuration = baseDuration * (0.9 + Math.random() * 0.2);
				const yDuration = baseDuration * (0.9 + Math.random() * 0.2);

				gsap.to(star, {
					targetX: newTargetX,
					duration: xDuration,
					ease: 'sine.inOut',
					onComplete: animateToNewPosition, // Continuously create new animations
				});

				gsap.to(star, {
					targetY: newTargetY,
					duration: yDuration,
					ease: 'sine.inOut',
					delay: delay * 0.5,
				});
			};

			// Start the ongoing movement
			animateToNewPosition();
		};

		// GSAP Context for animations
		gsapContextRef.current = gsap.context(() => {
			// Animate stars with ongoing, continuous movement
			stars.forEach((star, index) => {
				const delay = index * 0.08;

				// Create ongoing position movement
				createOngoingMovement(star, index);

				// Elegant twinkling with smooth opacity transitions (ongoing)
				gsap.to(star, {
					opacity: star.opacity + 0.3,
					duration: 1 + Math.random() * 1, // 1-2 seconds (faster)
					ease: 'power2.inOut',
					delay: delay * 0.6,
					repeat: -1,
					yoyo: true,
				});

				// Subtle, breathing-like size pulsing (ongoing)
				gsap.to(star, {
					size: star.size + 0.3,
					duration: 1.5 + Math.random() * 1.5, // 1.5-3 seconds (faster)
					ease: 'power1.inOut',
					delay: delay * 0.8,
					repeat: -1,
					yoyo: true,
				});
			});
		});

		// Draw constellation with smooth interpolation
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Smooth interpolation towards target positions
			stars.forEach((star) => {
				// Smooth position interpolation
				const smoothing = 0.03;
				star.x += (star.targetX - star.x) * smoothing;
				star.y += (star.targetY - star.y) * smoothing;

				// Update twinkling
				star.brightness += 0.015;
				const twinkle = Math.sin(star.brightness) * 0.1;
				const finalOpacity = Math.max(
					0.2,
					Math.min(1, star.opacity + twinkle),
				);
				const finalSize = star.size;

				// Draw star glow with gradient
				const gradient = ctx.createRadialGradient(
					star.x,
					star.y,
					0,
					star.x,
					star.y,
					finalSize * 4,
				);
				gradient.addColorStop(
					0,
					`rgba(107, 114, 128, ${finalOpacity})`,
				);
				gradient.addColorStop(
					0.4,
					`rgba(107, 114, 128, ${finalOpacity * 0.4})`,
				);
				gradient.addColorStop(1, 'rgba(107, 114, 128, 0)');

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(star.x, star.y, finalSize * 4, 0, Math.PI * 2);
				ctx.fill();

				// Draw star core
				ctx.fillStyle = `rgba(156, 163, 175, ${finalOpacity})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, finalSize, 0, Math.PI * 2);
				ctx.fill();
			});

			// Draw connections between nearby stars
			const maxDistance = 200;
			const mouse = mousePosRef.current;
			const mouseInteractionRadius = 250; // Radius around mouse for interaction

			stars.forEach((star1, i) => {
				stars.slice(i + 1).forEach((star2) => {
					const dx = star1.x - star2.x;
					const dy = star1.y - star2.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < maxDistance) {
						// Base opacity
						let opacity = (1 - distance / maxDistance) * 0.2;
						let lineWidth = 0.5;

						// Check if mouse is near either star or the line
						const distToStar1 = Math.sqrt(
							Math.pow(mouse.x - star1.x, 2) +
								Math.pow(mouse.y - star1.y, 2),
						);
						const distToStar2 = Math.sqrt(
							Math.pow(mouse.x - star2.x, 2) +
								Math.pow(mouse.y - star2.y, 2),
						);

						// Calculate distance from mouse to line segment
						const lineLength = distance;
						const t = Math.max(
							0,
							Math.min(
								1,
								((mouse.x - star1.x) * dx +
									(mouse.y - star1.y) * dy) /
									(lineLength * lineLength),
							),
						);
						const closestX = star1.x + t * dx;
						const closestY = star1.y + t * dy;
						const distToLine = Math.sqrt(
							Math.pow(mouse.x - closestX, 2) +
								Math.pow(mouse.y - closestY, 2),
						);

						// Mouse interaction enhancement
						const minDist = Math.min(
							distToStar1,
							distToStar2,
							distToLine,
						);
						if (minDist < mouseInteractionRadius) {
							const influence =
								1 - minDist / mouseInteractionRadius;
							// Enhance connection when mouse is near
							opacity += influence * 0.3;
							lineWidth += influence * 0.8;
						}

						// Create multicolor gradient with bright, vibrant colors including rainbow
						const colorVariations = [
							{ start: [99, 102, 241], end: [129, 140, 248] }, // Bright indigo
							{ start: [139, 92, 246], end: [167, 139, 250] }, // Vibrant purple
							{ start: [59, 130, 246], end: [96, 165, 250] }, // Bright blue
							{ start: [236, 72, 153], end: [251, 146, 200] }, // Bright pink
							{ start: [34, 197, 94], end: [134, 239, 172] }, // Bright green
							{ start: [168, 85, 247], end: [192, 132, 252] }, // Vibrant violet
							{ start: [249, 115, 22], end: [251, 146, 60] }, // Bright orange
							{ start: [168, 85, 247], end: [192, 132, 252] }, // Vibrant violet
							{ start: [14, 165, 233], end: [125, 211, 252] }, // Bright cyan
							{ start: [239, 68, 68], end: [248, 113, 113] }, // Bright red
							{ start: [20, 184, 166], end: [94, 234, 212] }, // Bright teal
							{ start: [147, 51, 234], end: [196, 181, 253] }, // Deep purple
							{ start: [217, 70, 239], end: [240, 171, 252] }, // Bright magenta
							{ start: [139, 92, 246], end: [167, 139, 250] }, // Vibrant purple
							{ start: [6, 182, 212], end: [103, 232, 249] }, // Sky blue
							{ start: [190, 24, 93], end: [244, 114, 182] }, // Rose pink
							{ start: [5, 150, 105], end: [52, 211, 153] }, // Emerald green
							{ start: [124, 58, 237], end: [167, 139, 250] }, // Royal purple
							{ start: [225, 29, 72], end: [248, 113, 113] }, // Coral red
							{ start: [37, 99, 235], end: [96, 165, 250] }, // Electric blue
							// Rainbow colors
							{ start: [255, 0, 0], end: [255, 100, 100] }, // Pure red
							{ start: [255, 127, 0], end: [255, 180, 100] }, // Pure orange
							{ start: [99, 102, 241], end: [129, 140, 248] }, // Bright indigo
							{ start: [0, 255, 0], end: [100, 255, 100] }, // Pure green
							{ start: [0, 0, 255], end: [100, 100, 255] }, // Pure blue
							{ start: [75, 0, 130], end: [150, 100, 200] }, // Indigo
							{ start: [148, 0, 211], end: [200, 100, 255] }, // Violet
							{ start: [255, 20, 147], end: [255, 150, 200] }, // Deep pink
							{ start: [0, 191, 255], end: [100, 220, 255] }, // Deep sky blue
							{ start: [50, 205, 50], end: [150, 255, 150] }, // Lime green
						];

						// Select color variation based on star indices for variety
						const colorIndex =
							(i + (i + 1)) % colorVariations.length;
						const colors = colorVariations[colorIndex];

						// Create linear gradient along the line
						const gradient = ctx.createLinearGradient(
							star1.x,
							star1.y,
							star2.x,
							star2.y,
						);

						const finalOpacity = Math.min(0.6, opacity);
						gradient.addColorStop(
							0,
							`rgba(${colors.start[0]}, ${colors.start[1]}, ${colors.start[2]}, ${finalOpacity})`,
						);
						gradient.addColorStop(
							0.5,
							`rgba(${colors.end[0]}, ${colors.end[1]}, ${
								colors.end[2]
							}, ${finalOpacity * 0.8})`,
						);
						gradient.addColorStop(
							1,
							`rgba(${colors.start[0]}, ${colors.start[1]}, ${colors.start[2]}, ${finalOpacity})`,
						);

						ctx.strokeStyle = gradient;
						ctx.lineWidth = lineWidth;
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
			if (gsapContextRef.current) {
				gsapContextRef.current.revert();
			}
		};
	}, []);

	// Mouse tracking for hover interaction
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mousePosRef.current = { x: e.clientX, y: e.clientY };
		};

		const handleMouseLeave = () => {
			// Move mouse off-screen when leaving the section
			mousePosRef.current = { x: -1000, y: -1000 };
		};

		window.addEventListener('mousemove', handleMouseMove);
		if (heroRef.current) {
			heroRef.current.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			if (heroRef.current) {
				heroRef.current.removeEventListener(
					'mouseleave',
					handleMouseLeave,
				);
			}
		};
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

				// Animate scroll down icon with smooth bounce
				if (scrollChevronRef.current) {
					gsap.to(scrollChevronRef.current, {
						y: 8,
						duration: 1.2,
						ease: 'power2.inOut',
						repeat: -1,
						yoyo: true,
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
						className="bg-black text-white hover:bg-gray-800 hover:text-white text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/10 hover:shadow-gray-800/20"
					>
						Start Building
						<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700 hover:text-black text-lg px-10 py-4 h-auto font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
					>
						Pitch Your Idea
					</Button>
				</div> */}
			</div>

			{/* Scroll Down Indicator */}
			<div
				ref={scrollIconRef}
				onClick={() => {
					window.scrollTo({
						top: window.innerHeight,
						behavior: 'smooth',
					});
				}}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
			>
				<span className="text-xs text-gray-500 font-light tracking-wider uppercase group-hover:text-gray-700 transition-colors duration-300">
					Scroll
				</span>
				<ChevronDown
					ref={scrollChevronRef}
					className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
				/>
			</div>
		</section>
	);
}
