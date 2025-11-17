'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from '@/components/navigation/Header';
import Hero from '@/components/home/Hero';
import WhatWeDo from '@/components/home/WhatWeDo';
import Philosophy from '@/components/home/Philosophy';
import WhatWeBuildTogether from '@/components/home/WhatWeBuildTogether';
import WhoWeBuildWith from '@/components/home/WhoWeBuildWith';
import NoirDoorAdvantage from '@/components/home/NoirDoorAdvantage';
import Portfolio from '@/components/home/Portfolio';
import CTA from '@/components/home/CTA';
import Footer from '@/components/navigation/Footer';

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
			<WhatWeDo addToRefs={addToRefs} />
			<Philosophy addToRefs={addToRefs} />
			<WhatWeBuildTogether addToRefs={addToRefs} />
			<WhoWeBuildWith addToRefs={addToRefs} />
			<NoirDoorAdvantage addToRefs={addToRefs} />
			<Portfolio addToRefs={addToRefs} />
			<CTA addToRefs={addToRefs} />
			<Footer />
		</div>
	);
}
