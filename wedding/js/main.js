;(function () {
	'use strict';

	// Add .js class to html for progressive enhancement
	document.documentElement.classList.add('js');

	// Easing function (easeOutExpo replacement)
	const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

	// Animate scroll to top
	const goToTop = () => {
		const btn = document.querySelector('.js-gotop');
		const topEl = document.querySelector('.js-top');
		
		if (btn) {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const start = window.scrollY;
				const duration = 500;
				const startTime = performance.now();
				
				const animate = (currentTime) => {
					const elapsed = currentTime - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const eased = easeOutExpo(progress);
					window.scrollTo(0, start * (1 - eased));
					
					if (progress < 1) {
						requestAnimationFrame(animate);
					}
				};
				requestAnimationFrame(animate);
			});
		}

		// Show/hide button based on scroll
		if (topEl) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > 200) {
					topEl.classList.add('active');
				} else {
					topEl.classList.remove('active');
				}
			}, { passive: true });
		}
	};

	// Scroll-triggered animations (replaces waypoints)
	const contentWayPoint = () => {
		const animateBoxes = document.querySelectorAll('.animate-box');
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting && !entry.target.classList.contains('animated-fast')) {
					const el = entry.target;
					const effect = el.dataset.animateEffect || 'fadeIn';
					
					setTimeout(() => {
						el.classList.add(effect, 'animated-fast');
					}, index * 100);
					
					observer.unobserve(el);
				}
			});
		}, { threshold: 0.15 });

		animateBoxes.forEach(box => observer.observe(box));
	};

	// Loader fade out
	const loaderPage = () => {
		const loader = document.querySelector('.loader');
		if (loader) {
			loader.style.transition = 'opacity 0.5s';
			loader.style.opacity = '0';
			setTimeout(() => loader.remove(), 500);
		}
	};

	// Initialize
	document.addEventListener('DOMContentLoaded', () => {
		goToTop();
		contentWayPoint();
		loaderPage();
	});

}());
