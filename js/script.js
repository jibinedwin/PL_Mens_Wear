// /**
//  * ÉLAN — The Art of Dressing
//  * Animations Module: IntersectionObserver Scroll Triggers, Parallax & Preloader Sequence
//  */

// document.addEventListener('DOMContentLoaded', () => {
//   initPreloader();
//   initScrollAnimations();
//   initHeroParallax();
// });

// /**
//  * PL Preloader
//  * Controls logo loading, progress animation,
//  * page readiness, and hero reveal.
//  */

// function initPreloader() {
//   const preloader = document.getElementById('preloader');
//   const progressBar = document.querySelector('.preloader__progress-bar');
//   const heroSection = document.getElementById('hero');

//   if (!preloader) return;

//   // Stop page scrolling while preloader is visible
//   document.body.style.overflow = 'hidden';

//   let progress = 0;

//   const loading = setInterval(() => {

//     progress += 2;

//     if (progressBar) {
//       progressBar.style.width = `${progress}%`;
//     }

//     if (progress >= 100) {

//       clearInterval(loading);

//       setTimeout(() => {

//         // Hide preloader
//         preloader.classList.add('preloader--hidden');

//         // Enable scrolling
//         document.body.style.overflow = '';

//         // Start hero animation
//         if (heroSection) {
//           heroSection.classList.add('is-loaded');
//         }

//         // Start music AFTER preloader finishes
//         // (attempts playback immediately; if the browser blocks autoplay,
//         // audio.js silently retries on the first real user gesture)
//         if (typeof startSiteMusic === 'function') {
//             startSiteMusic();
//         }

//         // Remove preloader after fade-out
//         setTimeout(() => {
//           preloader.remove();
//         }, 800);

//       }, 300);
//     }

//   }, 30);
// }

// /**
//  * IntersectionObserver for high-performance scroll-triggered reveals
//  */
// function initScrollAnimations() {
//   const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-clip');

//   if (!('IntersectionObserver' in window)) {
//     // Fallback for browsers without observer
//     revealElements.forEach(el => el.classList.add('is-revealed'));
//     return;
//   }

//   const observerOptions = {
//     root: null,
//     rootMargin: '0px 0px -8% 0px',
//     threshold: 0.15
//   };

//   const revealObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('is-revealed');
//         observer.unobserve(entry.target); // Reveal once
//       }
//     });
//   }, observerOptions);

//   revealElements.forEach(el => revealObserver.observe(el));
// }

// /**
//  * Gentle parallax effect on hero & editorial banner (respecting prefers-reduced-motion)
//  */
// function initHeroParallax() {
//   const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
//   if (mediaQuery.matches) return;

//   const heroBg = document.querySelector('.hero__bg-img');
//   const editorialBg = document.querySelector('.editorial-split__img');

//   window.addEventListener('scroll', () => {
//     const scrollY = window.pageYOffset;
//     if (heroBg && scrollY < window.innerHeight) {
//       heroBg.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0) scale(${heroBg.closest('#hero').classList.contains('is-loaded') ? 1 : 1.12})`;
//     }

//     if (editorialBg) {
//       const rect = editorialBg.getBoundingClientRect();
//       if (rect.top < window.innerHeight && rect.bottom > 0) {
//         const offset = (window.innerHeight - rect.top) * 0.05;
//         editorialBg.style.transform = `translate3d(0, ${offset}px, 0)`;
//       }
//     }
//   }, { passive: true });
// }

// /* =========================================
//    BACKGROUND MUSIC
// ========================================= */

// const siteMusic = document.getElementById("siteMusic");
// const musicToggle = document.getElementById("musicToggle");
// const musicIcon = document.getElementById("musicIcon");

// siteMusic.volume = 0.5;

// /* =========================================
//    TRY TO START MUSIC AUTOMATICALLY
// ========================================= */

// function startSiteMusic() {

//     siteMusic.currentTime = 0;

//     const playPromise = siteMusic.play();

//     if (playPromise !== undefined) {

//         playPromise
//             .then(() => {

//                 // Music started successfully
//                 musicToggle.classList.add("playing");
//                 musicIcon.textContent = "♫";

//                 console.log("Background music started.");

//             })
//             .catch(() => {

//                 // Browser blocked autoplay
//                 musicToggle.classList.remove("playing");
//                 musicIcon.textContent = "🔇";

//                 console.log(
//                     "Autoplay was blocked. Waiting for user interaction."
//                 );

//             });
//     }
// }

// /* =========================================
//    START MUSIC AFTER FIRST USER INTERACTION
// ========================================= */

// function enableMusicAfterInteraction() {

//     if (siteMusic.paused) {

//         siteMusic.play()
//             .then(() => {

//                 musicToggle.classList.add("playing");
//                 musicIcon.textContent = "♫";

//             })
//             .catch(() => {});

//     }

//     document.removeEventListener("click", enableMusicAfterInteraction);
//     document.removeEventListener("touchstart", enableMusicAfterInteraction);
//     document.removeEventListener("keydown", enableMusicAfterInteraction);
// }

// /* =========================================
//    MUSIC ON / OFF
// ========================================= */

// musicToggle.addEventListener("click", async function () {

//     if (siteMusic.paused) {

//         try {

//             await siteMusic.play();

//             musicToggle.classList.add("playing");
//             musicIcon.textContent = "♫";

//         } catch (error) {

//             console.log("Unable to play music:", error);

//         }

//     } else {

//         siteMusic.pause();

//         musicToggle.classList.remove("playing");
//         musicIcon.textContent = "🔇";

//     }

// });

// /* =========================================
//    KEEP BUTTON STATE CORRECT
// ========================================= */

// siteMusic.addEventListener("play", function () {

//     musicToggle.classList.add("playing");
//     musicIcon.textContent = "♫";

// });

// siteMusic.addEventListener("pause", function () {

//     musicToggle.classList.remove("playing");
//     musicIcon.textContent = "🔇";

// });

// /* =========================================
//    TRY AUTOPLAY
// ========================================= */

// window.addEventListener("load", function () {

//     startSiteMusic();

// });

// /* =========================================
//    FALLBACK FOR BROWSER AUTOPLAY BLOCK
// ========================================= */

// document.addEventListener(
//     "click",
//     enableMusicAfterInteraction,
//     { once: true }
// );

// document.addEventListener(
//     "touchstart",
//     enableMusicAfterInteraction,
//     { once: true }
// );

// document.addEventListener(
//     "keydown",
//     enableMusicAfterInteraction,
//     { once: true }
// );

// /* ==========================================================================
//    PL MENS WEAR — EVERY TERRAIN
//    <plmw-terrain> custom element.
//    Pins a full-viewport stage over a long scroll runway; the wordmark
//    "EVERY Terrain" splits apart, a wedge of imagery grows between the words,
//    flies into the featured card while the remaining occasion cards assemble
//    outward from centre, and the giant ruler wordmark fades in behind.
//    Progress-driven (scroll position -> rAF), not time-driven.
//    ========================================================================== */

// (() => {
//   'use strict';

//   if (customElements.get('plmw-terrain')) return;

//   const mobileQuery = window.matchMedia('(max-width: 919px)');

//   const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
//   const easeOut = (value) => 1 - Math.pow(1 - value, 3);
//   const smoothstep = (value) => value * value * (3 - 2 * value);
//   const lerp = (from, to, progress) => from + (to - from) * progress;

//   class PlmwTerrain extends HTMLElement {
//     connectedCallback() {
//       if (this.connected) return;
//       this.connected = true;

//       this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

//       this.pinObserver = new ResizeObserver(() => this.requestMeasure());
//       this.onScroll = this.requestFrame.bind(this);
//       this.onResize = () => {
//         /* skip height-only resizes on mobile (URL bar show/hide) */
//         if (mobileQuery.matches && this.layoutWidth === window.innerWidth) return;
//         this.requestMeasure();
//       };
//       this.onLayoutChange = () => this.requestMeasure();

//       window.addEventListener('resize', this.onResize, { passive: true });
//       this.motionQuery.addEventListener('change', this.onLayoutChange);
//       mobileQuery.addEventListener('change', this.onLayoutChange);
//       document.addEventListener('scroll', this.onScroll, { passive: true });

//       requestAnimationFrame(() => {
//         if (this.isConnected) this.refresh();
//       });
//       if (document.fonts && document.fonts.ready) {
//         document.fonts.ready.then(() => { if (this.isConnected) this.measure(); });
//       }
//     }

//     disconnectedCallback() {
//       this.connected = false;
//       document.removeEventListener('scroll', this.onScroll);
//       window.removeEventListener('resize', this.onResize);
//       this.motionQuery.removeEventListener('change', this.onLayoutChange);
//       mobileQuery.removeEventListener('change', this.onLayoutChange);
//       this.pinObserver.disconnect();
//       if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
//       if (this.measureRequest) cancelAnimationFrame(this.measureRequest);
//       this.frameRequest = 0;
//       this.measureRequest = 0;
//       this.sectionWrapper.removeAttribute('data-terrain-sticky');
//     }

//     refresh() {
//       this.pin = this.querySelector('[data-terrain-pin]');
//       this.pinObserver.disconnect();
//       if (this.pin) this.pinObserver.observe(this.pin);

//       this.firstWord = this.querySelector('[data-terrain-first]');
//       this.secondWord = this.querySelector('[data-terrain-second]');
//       this.introMedia = this.querySelector('[data-terrain-intro-media]');
//       this.rulerFirst = this.querySelector('[data-terrain-ruler-first]');
//       this.rulerSecond = this.querySelector('[data-terrain-ruler-second]');
//       this.rail = this.querySelector('.terrain__rail');
//       this.sectionWrapper = this.closest('.terrain-section') || this.parentElement;

//       this.cards = Array.prototype.slice.call(this.querySelectorAll('[data-terrain-card]'));
//       this.labels = this.cards.map((card) => card.querySelector('.terrain__label'));

//       this.cards.forEach((card) => card.removeAttribute('data-featured'));
//       this.featuredCard = this.cards[Math.floor(this.cards.length / 2)];
//       if (this.featuredCard) this.featuredCard.setAttribute('data-featured', 'true');
//       this.featuredImage = this.featuredCard
//         ? this.featuredCard.querySelector('.terrain__image')
//         : null;

//       this.ensureIntroImage();
//       this.requestMeasure();
//     }

//     ensureIntroImage() {
//       if (!this.introMedia || !this.featuredImage) return;
//       const configured = this.introMedia.querySelector('.terrain__intro-image');
//       if (configured) { this.introImage = configured; return; }
//       const clone = this.featuredImage.cloneNode(true);
//       clone.removeAttribute('id');
//       clone.removeAttribute('loading');
//       clone.alt = '';
//       clone.setAttribute('aria-hidden', 'true');
//       this.introMedia.replaceChildren(clone);
//       this.introImage = clone;
//     }

//     unavailableReason() {
//       if (this.dataset.enableAnimation !== 'true') return 'sticky-disabled';
//       if (this.motionQuery.matches) return 'reduced-motion';
//       if (!this.cards.length) return 'no-cards';
//       if (!this.featuredCard || !this.featuredImage) return 'no-featured-image';
//       return '';
//     }

//     reset() {
//       this.removeAttribute('data-motion-ready');
//       this.removeAttribute('data-done');
//       this.removeAttribute('data-measuring');
//       if (this.sectionWrapper) this.sectionWrapper.removeAttribute('data-terrain-sticky');
//       this.setInteractive(true);
//       this.measurements = null;
//       this.lastProgress = null;
//       [this.firstWord, this.secondWord].forEach((word) => {
//         if (word) word.style.cssText = '';
//       });
//       if (this.introMedia) this.introMedia.style.cssText = '';
//       (this.cards || []).forEach((card) => {
//         card.style.opacity = '';
//         card.style.transform = '';
//         card.style.visibility = '';
//       });
//       (this.labels || []).forEach((label) => {
//         if (label) label.style.opacity = '';
//       });
//     }

//     setInteractive(interactive) {
//       this.toggleAttribute('data-cards-interactive', interactive);
//       if (!this.rail) return;
//       if (interactive) {
//         this.rail.removeAttribute('inert');
//         this.rail.removeAttribute('aria-hidden');
//       } else {
//         this.rail.setAttribute('inert', '');
//         this.rail.setAttribute('aria-hidden', 'true');
//       }
//     }

//     requestMeasure() {
//       if (this.measureRequest) return;
//       this.measureRequest = requestAnimationFrame(() => {
//         this.measureRequest = 0;
//         if (this.isConnected) this.measure();
//       });
//     }

//     measure() {
//       if (!this.pin || !this.firstWord || !this.secondWord || !this.introMedia ||
//           !this.rulerFirst || !this.rulerSecond) return;

//       const unavailable = this.unavailableReason();
//       if (unavailable) {
//         this.reset();
//         this.dataset.motionState = unavailable;
//         return;
//       }
//       this.dataset.motionState = 'ready';
//       this.layoutWidth = window.innerWidth;

//       this.setAttribute('data-measuring', '');
//       this.setAttribute('data-motion-ready', '');
//       if (this.sectionWrapper && this.dataset.stickySection === 'true') {
//         this.sectionWrapper.setAttribute('data-terrain-sticky', '');
//       }
//       this.setInteractive(false);
//       this.cards.forEach((card) => { card.style.transform = ''; });

//       const pinRect = this.pin.getBoundingClientRect();
//       this.viewport = pinRect.height;

//       const relativeRect = (element) => {
//         const rect = element.getBoundingClientRect();
//         return {
//           left: rect.left - pinRect.left,
//           top: rect.top - pinRect.top,
//           width: rect.width,
//           height: rect.height
//         };
//       };

//       [this.firstWord, this.secondWord].forEach((word) => {
//         word.style.position = '';
//         word.style.left = '';
//         word.style.top = '';
//         word.style.transform = '';
//         word.style.visibility = '';
//         word.style.opacity = '';
//       });
//       this.introMedia.style.cssText = '';
//       this.introMedia.style.width = '0px';

//       const startWidth = mobileQuery.matches ? 96 : 150;
//       const startHeight = mobileQuery.matches ? 122 : 190;
//       this.introMedia.style.height = startHeight + 'px';

//       const firstStart = relativeRect(this.firstWord);
//       const secondStart = relativeRect(this.secondWord);
//       const centre = (firstStart.left + firstStart.width + secondStart.left) / 2;

//       this.measurements = {
//         firstStart: firstStart,
//         secondStart: secondStart,
//         imageStart: {
//           left: centre,
//           top: firstStart.top + firstStart.height / 2 - startHeight / 2,
//           width: startWidth,
//           height: startHeight
//         },
//         firstEnd: relativeRect(this.rulerFirst),
//         secondEnd: relativeRect(this.rulerSecond),
//         imageEnd: relativeRect(this.featuredImage)
//       };

//       [[this.firstWord, firstStart], [this.secondWord, secondStart]].forEach((pair) => {
//         const word = pair[0], rect = pair[1];
//         word.style.position = 'absolute';
//         word.style.left = rect.left + 'px';
//         word.style.top = rect.top + 'px';
//       });
//       this.introMedia.style.position = 'absolute';
//       this.introMedia.style.left = this.measurements.imageStart.left + 'px';
//       this.introMedia.style.top = this.measurements.imageStart.top + 'px';

//       this.lastProgress = null;
//       this.render();
//       this.removeAttribute('data-measuring');
//     }

//     requestFrame() {
//       if (this.frameRequest || !this.measurements) return;
//       this.frameRequest = requestAnimationFrame(() => {
//         this.frameRequest = 0;
//         this.render();
//       });
//     }

//     placeWord(element, start, end, initialOffset, progress) {
//       const scale = lerp(1, end.width / Math.max(start.width, 1), progress);
//       const x = lerp(initialOffset, end.left - start.left, progress);
//       const y = lerp(0, end.top - start.top, progress);
//       element.style.transform =
//         'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(' + scale.toFixed(4) + ')';
//     }

//     /* outward from the featured card: left/right neighbours by distance */
//     orderedCards() {
//       const featuredIndex = Math.max(0, this.cards.indexOf(this.featuredCard));
//       const output = [];
//       for (let distance = 1; output.length < this.cards.length - 1; distance += 1) {
//         const left = this.cards[featuredIndex - distance];
//         const right = this.cards[featuredIndex + distance];
//         if (left) output.push({ card: left, direction: -1, distance: distance });
//         if (right) output.push({ card: right, direction: 1, distance: distance });
//         if (!left && !right) break;
//       }
//       return output;
//     }

//     render() {
//       if (!this.measurements) return;

//       const bounds = this.getBoundingClientRect();
//       const viewportTop = 0; /* document.scrollingElement */
//       const hold = this.viewport;
//       const run = Math.max(bounds.height - this.viewport - hold, 1);
//       const progress = clamp((viewportTop - bounds.top) / run);
//       if (progress === this.lastProgress) return;
//       this.lastProgress = progress;

//       /* phase 1 — wedge widens between the words */
//       const widenProgress = easeOut(clamp(progress / 0.3));
//       const wedgeWidth = this.measurements.imageStart.width * widenProgress;
//       const wordPush = (wedgeWidth + 32 * widenProgress) / 2;

//       /* phase 2 — words + wedge fly to their final positions */
//       const flightProgress = smoothstep(clamp((progress - 0.38) / 0.48));

//       this.placeWord(this.firstWord, this.measurements.firstStart,
//         this.measurements.firstEnd, -wordPush, flightProgress);
//       this.placeWord(this.secondWord, this.measurements.secondStart,
//         this.measurements.secondEnd, wordPush, flightProgress);

//       const wordOpacity = 1 - 0.9 * smoothstep(clamp((progress - 0.52) / 0.32));
//       this.firstWord.style.opacity = wordOpacity.toFixed(3);
//       this.secondWord.style.opacity = wordOpacity.toFixed(3);

//       const imageStart = this.measurements.imageStart;
//       const imageEnd = this.measurements.imageEnd;
//       this.introMedia.style.left =
//         lerp(imageStart.left - wedgeWidth / 2, imageEnd.left, flightProgress).toFixed(2) + 'px';
//       this.introMedia.style.top =
//         lerp(imageStart.top, imageEnd.top, flightProgress).toFixed(2) + 'px';
//       this.introMedia.style.width =
//         lerp(wedgeWidth, imageEnd.width, flightProgress).toFixed(2) + 'px';
//       this.introMedia.style.height =
//         lerp(imageStart.height, imageEnd.height, flightProgress).toFixed(2) + 'px';

//       const done = flightProgress >= 0.985;
//       this.toggleAttribute('data-done', done);
//       this.setInteractive(progress >= 0.99);

//       const visibility = done ? 'hidden' : 'visible';
//       this.introMedia.style.visibility = visibility;
//       this.firstWord.style.visibility = visibility;
//       this.secondWord.style.visibility = visibility;

//       /* labels: featured first, then outward */
//       const featuredIndex = this.cards.indexOf(this.featuredCard);
//       [featuredIndex, featuredIndex - 1, featuredIndex + 1, featuredIndex - 2, featuredIndex + 2]
//         .filter((index) => index >= 0 && index < this.labels.length)
//         .forEach((labelIndex, orderIndex) => {
//           const label = this.labels[labelIndex];
//           if (!label) return;
//           label.style.opacity =
//             smoothstep(clamp((progress - (0.62 + orderIndex * 0.045)) / 0.14)).toFixed(3);
//         });

//       /* cards: featured holds, neighbours slide in from outside */
//       this.featuredCard.style.opacity = '1';
//       this.featuredCard.style.visibility = progress > 0.62 ? 'visible' : 'hidden';
//       this.orderedCards().forEach((entry, orderIndex) => {
//         const card = entry.card, direction = entry.direction, distance = entry.distance;
//         const reveal = smoothstep(clamp((progress - (0.66 + orderIndex * 0.05)) / 0.16));
//         card.style.opacity = reveal.toFixed(3);
//         card.style.visibility = reveal > 0 ? 'visible' : 'hidden';
//         card.style.transform = done ? '' :
//           'translate3d(' +
//           lerp(direction * (distance === 1 ? 34 : 56), 0, reveal).toFixed(2) + 'px,0,0)';
//       });
//     }
//   }

//   customElements.define('plmw-terrain', PlmwTerrain);
// })();

// /* ==========================================================================
//    PL MENS WEAR — PRODUCTS
//    Card factory + homepage sections + quick view + PLP + PDP + lookbook
//    Exposes window.PLMWProducts
//    ========================================================================== */

// (function (window, document) {
//   'use strict';

//   var UI = window.PLMWUI, Data = window.PLMW, Wishlist = window.PLMWWishlist,
//       Cart = window.PLMWCart, Nav = window.PLMWNav;
//   var $ = UI.$, $all = UI.$all;

//   /* ========================================================================
//      CARD FACTORY
//      ======================================================================== */
//   function card(p, opts) {
//     opts = opts || {};
//     var off = Data.discountPercent(p);
//     var wished = Wishlist.has(p.id);
//     var imgA = Data.productImage(p.id, 'a');
//     var imgB = Data.productImage(p.id, 'b');
//     return (
//       '<article class="pcard reveal' + (opts.delay ? ' reveal-delay-' + opts.delay : '') + '">' +
//       '  <div class="pcard__media">' +
//       '    <span class="pill pcard__badge">' + (p.badge || '') + '</span>' +
//       '    <button class="pcard__wish' + (wished ? ' is-active' : '') + '" data-wish="' + p.id + '" aria-label="' + (wished ? 'Remove from' : 'Add to') + ' wishlist" aria-pressed="' + wished + '">' + UI.icon('heart') + '</button>' +
//       '    <img class="img-a" src="' + imgA + '" alt="' + p.name + ' — ' + p.colors[0] + '" loading="lazy" decoding="async" width="1000" height="1250">' +
//       '    <img class="img-b" src="' + imgB + '" alt="" aria-hidden="true" loading="lazy" decoding="async" width="1000" height="1250">' +
//       '    <div class="pcard__actions">' +
//       '      <button class="pcard__add" data-add="' + p.id + '">Add to bag</button>' +
//       '      <button class="pcard__view" data-quickview="' + p.id + '" aria-label="Quick view ' + p.name + '">' + UI.icon('eye') + '</button>' +
//       '    </div>' +
//       '  </div>' +
//       '  <div class="pcard__info">' +
//       '    <span class="pcard__cat">' + p.category + ' · ' + p.collection + '</span>' +
//       '    <h3 class="pcard__name"><a href="#collections" data-quickview="' + p.id + '">' + p.name + '</a></h3>' +
//       '    <div class="pcard__row">' +
//       '      <span class="pcard__price">' + Data.formatPrice(p.price) + '</span>' +
//       (off > 0 ? '<span class="pcard__mrp">' + Data.formatPrice(p.mrp) + '</span><span class="pcard__off">' + off + '% off</span>' : '') +
//       '    </div>' +
//       '    <div class="pcard__colors" aria-label="Available colours">' +
//       p.colors.map(function (c, i) { return '<span class="swatch" style="background:' + p.colorValues[i] + '"></span>'; }).join('') +
//       '    </div>' +
//       (opts.rating ? '<div class="pcard__rating">' + UI.ratingHtml(p) + '</div>' : '') +
//       '  </div>' +
//       '</article>'
//     );
//   }

//   /* ========================================================================
//      HOMEPAGE
//      ======================================================================== */
//   function renderRail(el, list, opts) {
//     el.innerHTML = list.map(function (p, i) { return card(p, { rating: opts && opts.rating, delay: (i % 4) + 1 }); }).join('');
//     initRevealIn(el);
//   }

//   function initRevealIn(el) {
//     var els = el.classList.contains('reveal') ? [el] : [];
//     UI.$all('.reveal, .reveal--img', el).forEach(function (x) { els.push(x); });
//     if (!('IntersectionObserver' in window)) { els.forEach(function (x) { x.classList.add('is-visible'); }); return; }
//     var io = new IntersectionObserver(function (entries) {
//       entries.forEach(function (en) {
//         if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
//       });
//     }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
//     els.forEach(function (x) { io.observe(x); });
//   }

//   function initRailArrows() {
//     $all('[data-rail-prev], [data-rail-next]').forEach(function (btn) {
//       if (btn.dataset.railBound) return;
//       btn.dataset.railBound = '1';
//       btn.addEventListener('click', function () {
//         var section = btn.closest('.section, section, .rail-wrap') || document;
//         var rail = $('.rail', section) || $('[data-rail]');
//         if (!rail) return;
//         var step = rail.clientWidth * 0.8 * (btn.hasAttribute('data-rail-next') ? 1 : -1);
//         rail.scrollBy({ left: step, behavior: 'smooth' });
//       });
//     });
//   }

//   function home() {
//     var railNew = $('[data-rail="new"]');
//     if (railNew) {
//       var newIn = Data.getProducts().filter(function (p) { return p.badge === 'New'; });
//       if (newIn.length < 4) { newIn = Data.getProducts().slice(0, 8); }
//       renderRail(railNew, newIn.slice(0, 8));
//     }
//     var railBest = $('[data-rail="best"]');
//     if (railBest) {
//       var best = Data.getProducts().slice().sort(function (a, b) { return b.reviews - a.reviews; }).slice(0, 8);
//       renderRail(railBest, best, { rating: true });
//     }
//     initRailArrows();
//     var strip = $('[data-showcase]');
//     if (strip) {
//       var picks = ['relaxed-linen-shirt', '4-way-stretch-trouser', 'motion-polo', 'quilted-travel-jacket', 'straight-fit-jeans', 'merino-polo'];
//       var html = '';
//       picks.forEach(function (id) {
//         var p = Data.getProductById(id);
//         if (!p) return;
//         html +=
//           '<a class="mtile" href="#collections" data-quickview="' + p.id + '">' +
//           '  <img src="' + Data.productImage(p.id, 'b') + '" alt="Model wearing the ' + p.name + '" loading="lazy" decoding="async">' +
//           '  <div class="mtile__overlay">' +
//           '    <span class="label">' + p.category + '</span>' +
//           '    <span class="mtile__name">' + p.name + '</span>' +
//           '    <span class="mtile__price">' + Data.formatPrice(p.price) + '</span>' +
//           '    <span class="text-link">Shop now ' + UI.icon('arrow') + '</span>' +
//           '  </div>' +
//           '</a>';
//       });
//       strip.innerHTML = html;
//     }
//   }

//   /* ========================================================================
//      QUICK VIEW
//      ======================================================================== */
//   var qv = null;

//   function ensureQuickView() {
//     if (qv) return;
//     qv = document.createElement('div');
//     qv.className = 'modal';
//     qv.setAttribute('role', 'dialog');
//     qv.setAttribute('aria-modal', 'true');
//     qv.setAttribute('aria-label', 'Quick view');
//     qv.innerHTML = '<div class="modal__backdrop" data-qv-close></div><div class="modal__panel"></div>';
//     document.body.appendChild(qv);
//     qv.addEventListener('click', function (e) {
//       if (e.target.closest('[data-qv-close]')) { closeQuickView(); }
//     });
//     document.addEventListener('keydown', function (e) {
//       if (e.key === 'Escape' && qv.classList.contains('is-open')) { closeQuickView(); }
//     });
//   }

//   function openQuickView(id) {
//     ensureQuickView();
//     var p = Data.getProductById(id);
//     if (!p) return;
//     var off = Data.discountPercent(p);
//     var wished = Wishlist.has(p.id);
//     $('.modal__panel', qv).innerHTML =
//       '<button class="modal__close" data-qv-close aria-label="Close quick view">' + UI.icon('close') + '</button>' +
//       '<div class="modal__media"><img src="' + Data.productImage(p.id, 'a') + '" alt="' + p.name + '"></div>' +
//       '<div class="modal__info">' +
//       '  <span class="pcard__cat">' + p.category + ' · ' + p.collection + '</span>' +
//       '  <h2 class="h-sub" style="margin-top:8px">' + p.name + '</h2>' +
//       '  <p class="muted" style="margin-top:8px;font-size:14px;line-height:1.5">' + p.description + '</p>' +
//       '  <div class="pdp-pricing" style="margin-top:12px"><span class="pdp-price">' + Data.formatPrice(p.price) + '</span>' +
//       (off > 0 ? '<span class="pdp-mrp">' + Data.formatPrice(p.mrp) + '</span><span class="pdp-save">Save ' + Data.formatPrice(p.mrp - p.price) + '</span>' : '') +
//       '  </div>' +
//       '  <div class="pdp-block"><span class="label">Colour</span><div class="swatch-row">' +
//       p.colors.map(function (c, i) { return '<button type="button" class="swatch-btn is-active" style="background:' + p.colorValues[i] + '" aria-label="' + c + '"></button>'; }).join('') +
//       '  </div></div>' +
//       '  <div class="pdp-block"><span class="label">Size</span><div class="size-row">' +
//       p.sizes.map(function (s, i) { return '<button type="button" class="size-btn' + (i === Math.floor(p.sizes.length / 2) ? ' is-active' : '') + '">' + s + '</button>'; }).join('') +
//       '  </div></div>' +
//       '  <div class="pdp-cta" style="grid-template-columns:1fr;margin-top:18px"><button class="btn btn--solid" data-add="' + p.id + '">Add to bag</button></div>' +
//       '</div>';
//     qv.classList.add('is-open');
//     Nav.lockScroll();
//     wireVariantToggles($('.modal__panel', qv), p);
//   }

//   function closeQuickView() {
//     if (!qv) return;
//     qv.classList.remove('is-open');
//     Nav.unlockScroll();
//   }

//   function openWishlist() {
//     ensureQuickView();
//     var ids = Wishlist.count() ? wishlistIds() : [];
//     var html;
//     if (!ids.length) {
//       html =
//         '<button class="modal__close" data-qv-close aria-label="Close wishlist">' + UI.icon('close') + '</button>' +
//         '<div class="modal__info" style="grid-column:1/-1;text-align:center;padding-block:60px">' +
//         '  <h2 class="h-sub">Your wishlist is empty</h2>' +
//         '  <p class="muted" style="margin-top:10px">Tap the heart on any piece to save it here.</p>' +
//         '  <a class="btn btn--solid" style="margin-top:24px" href="#collections" data-qv-close>Explore collections</a>' +
//         '</div>';
//     } else {
//       html =
//         '<button class="modal__close" data-qv-close aria-label="Close wishlist">' + UI.icon('close') + '</button>' +
//         '<div class="modal__info" style="grid-column:1/-1">' +
//         '  <h2 class="h-sub">Your wishlist</h2>' +
//         '  <div style="margin-top:18px">' +
//         ids.map(function (p) {
//           return '<div class="cart-line" data-wishline="' + p.id + '">' +
//             '  <a href="#collections" data-quickview="' + p.id + '"><img src="' + Data.productImage(p.id) + '" alt="' + p.name + '" loading="lazy"></a>' +
//             '  <div>' +
//             '    <div class="cart-line__name">' + p.name + '</div>' +
//             '    <div class="cart-line__meta">' + p.category + '</div>' +
//             '    <div class="cart-line__controls">' +
//             '      <button class="pcard__add" style="min-height:38px;padding:8px 14px" data-add="' + p.id + '">Add to bag</button>' +
//             '      <button class="cart-line__remove" data-wish="' + p.id + '">Remove</button>' +
//             '    </div>' +
//             '  </div>' +
//             '  <span class="cart-line__price">' + Data.formatPrice(p.price) + '</span>' +
//             '</div>';
//         }).join('') +
//         '  </div>' +
//         '</div>';
//     }
//     $('.modal__panel', qv).innerHTML = html;
//     qv.classList.add('is-open');
//     Nav.lockScroll();
//   }

//   function wishlistIds() {
//     try {
//       var raw = localStorage.getItem('plmw-wishlist');
//       var ids = raw ? JSON.parse(raw) : [];
//       return ids.map(function (id) { return Data.getProductById(id); }).filter(Boolean);
//     } catch (e) { return []; }
//   }

//   function wireVariantToggles(root, p) {
//     $all('.size-btn', root).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         $all('.size-btn', root).forEach(function (b) { b.classList.remove('is-active'); });
//         btn.classList.add('is-active');
//         var addBtn = $('[data-add]', root);
//         if (addBtn) { addBtn.setAttribute('data-size', btn.textContent.trim()); }
//       });
//     });
//   }

//   /* ========================================================================
//      PLP (shop / collection pages)
//      ======================================================================== */
//   var plpState = { category: [], size: [], color: [], fit: [], fabric: [], collection: [], price: [], availability: [], sort: 'featured', view: 'grid', q: '', preset: null };

//   function initPLP() {
//     var grid = $('[data-plp-grid]');
//     if (!grid) return;

//     /* URL-driven state */
//     var params = new URLSearchParams(location.search);
//     /* collection-page hero image follows the selected collection */
//     var collHero = $('[data-coll-hero]');
//     if (collHero) {
//       var slug = params.get('collection');
//       var cfg0 = Data.getConfig();
//       var collMatch = (cfg0.collections || []).filter(function (c) { return c.slug === slug; })[0];
//       if (collMatch && collMatch.image) {
//         collHero.setAttribute('src', Data.base() + collMatch.image);
//         collHero.setAttribute('alt', collMatch.name + ' campaign imagery');
//       }
//     }
//     var cat = params.get('category');
//     if (cat) {
//       if (cat === 'T-Shirts & Polos') {
//         plpState.category = ['T-Shirts', 'Polos'];
//         setPageTitle('T-Shirts & Polos');
//       } else if (cat === 'Jackets & Outerwears') {
//         plpState.category = ['Jackets'];
//         setPageTitle('Jackets & Outerwears');
//       } else if (cat === 'Denim') {
//         plpState.category = ['Jeans'];
//         setPageTitle('Denim Collection');
//       } else if (cat === 'Occassion wear' || cat === 'Occasion wear') {
//         plpState.preset = 'occasion:Festive';
//         setPageTitle('Occasion Wear');
//       } else if (cat === 'Accessories') {
//         plpState.category = ['Accessories'];
//         setPageTitle('Accessories');
//       } else {
//         plpState.category = [cat];
//         setPageTitle(cat + "'s Edit");
//       }
//     }
//     var coll = params.get('collection');
//     if (coll) {
//       var cfg = Data.getConfig();
//       var match = (cfg.collections || []).filter(function (c) { return c.slug === coll; })[0];
//       var occasions = (cfg.occasions || []).filter(function (o) { return o.slug === coll; })[0];
//       if (match) {
//         plpState.collection = [match.name];
//         setPageTitle(match.name);
//         var desc = document.querySelector('[data-plp-desc]');
//         if (desc) { desc.textContent = match.description; }
//       } else if (occasions) {
//         plpState.preset = 'occasion:' + occasions.name;
//         setPageTitle(occasions.name + ' Edit');
//       } else if (coll === 'new-arrivals') {
//         plpState.preset = 'new';
//         plpState.sort = 'newest';
//         setPageTitle('New arrivals');
//       } else if (coll === 'best-sellers') {
//         plpState.preset = 'best';
//         setPageTitle('Best sellers');
//       }
//     }
//     plpState.q = params.get('q') || '';
//     var sortParam = params.get('sort');
//     if (sortParam) { plpState.sort = sortParam; }

//     buildFilters();
//     bindToolbar();
//     renderPLP();
//   }

//   function setPageTitle(text) {
//     var t = document.querySelector('[data-plp-title]');
//     if (t) { t.textContent = text; }
//     var bc = document.querySelector('[data-breadcrumb-current]');
//     if (bc) { bc.textContent = text; }
//     document.title = text + ' | PL Mens Wear';
//   }

//   function buildFilters() {
//     var wrap = $('[data-filters-groups]') || $('[data-filters]');
//     if (!wrap) return;
//     var products = Data.getProducts();
//     var uniq = function (arr) {
//       var seen = {}, out = [];
//       arr.forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
//       return out;
//     };

//     function group(key, title, values, renderRow) {
//       return '<div class="filters__group">' +
//         '<button class="filters__btn" aria-expanded="true" aria-controls="flt-' + key + '">' + title + UI.icon('chevronDown') + '</button>' +
//         '<div class="filters__panel" id="flt-' + key + '">' +
//         values.map(renderRow).join('') +
//         '</div></div>';
//     }

//     var colors = uniq(products.reduce(function (a, p) { return a.concat(p.colors); }, []));
//     var colorVals = {};
//     products.forEach(function (p) {
//       p.colors.forEach(function (c, i) { if (!colorVals[c]) { colorVals[c] = p.colorValues[i]; } });
//     });

//     var html = '';
//     html += group('category', 'Category', uniq(products.map(function (p) { return p.category; })), function (v) {
//       return check('category', v, v);
//     });
//     html += group('size', 'Size', ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38'], function (v) {
//       return check('size', v, v);
//     });
//     html += group('color', 'Colour', colors, function (v) {
//       return '<label class="swatch-label"><input type="checkbox" data-f="color" value="' + v + '"' + (plpState.color.indexOf(v) !== -1 ? ' checked' : '') + '><span class="swatch" style="background:' + (colorVals[v] || '#ccc') + '"></span>' + v + '</label>';
//     });
//     html += '<div class="filters__group">' +
//       '<button class="filters__btn" aria-expanded="true" aria-controls="flt-price">Price' + UI.icon('chevronDown') + '</button>' +
//       '<div class="filters__panel" id="flt-price">' +
//       [['lt1500', 'Under ₹1,500'], ['1500-2500', '₹1,500 – ₹2,500'], ['2500-3500', '₹2,500 – ₹3,500'], ['gt3500', 'Above ₹3,500']].map(function (b) {
//         return check('price', b[0], b[1]);
//       }).join('') + '</div></div>';

//     html += group('fit', 'Fit', uniq(products.map(function (p) { return p.fit; })), function (v) { return check('fit', v, v); });
//     html += group('fabric', 'Fabric', uniq(products.map(function (p) { return p.fabric; })), function (v) { return check('fabric', v, v); });
//     html += group('collection', 'Collection', uniq(products.map(function (p) { return p.collection; })), function (v) {
//       return check('collection', v, v);
//     });
//     html += group('availability', 'Availability', ['In stock'], function () {
//       return '<label><input type="checkbox" data-f="availability" value="instock">In stock only</label>';
//     });

//     wrap.innerHTML = html;

//     /* restore URL-driven checks */
//     wrap.querySelectorAll('input[data-f]').forEach(function (input) {
//       var f = input.getAttribute('data-f'), v = input.value;
//       if (plpState[f] && plpState[f].indexOf(v) !== -1) { input.checked = true; }
//     });

//     wrap.addEventListener('change', function (e) {
//       var input = e.target.closest('input[data-f]');
//       if (!input) return;
//       var f = input.getAttribute('data-f'), v = input.value;
//       if (!plpState[f]) { plpState[f] = []; }
//       if (input.checked) {
//         if (plpState[f].indexOf(v) === -1) { plpState[f].push(v); }
//       } else {
//         plpState[f] = plpState[f].filter(function (x) { return x !== v; });
//       }
//       renderPLP();
//     });

//     var clear = $('[data-filters-clear]');
//     if (clear) {
//       clear.addEventListener('click', function () {
//         Object.keys(plpState).forEach(function (k) { if (Array.isArray(plpState[k])) { plpState[k] = []; } });
//         wrap.querySelectorAll('input[data-f]').forEach(function (i) { i.checked = false; });
//         renderPLP();
//       });
//     }
//   }

//   function check(name, value, label) {
//     var on = plpState[name] && plpState[name].indexOf(value) !== -1;
//     return '<label><input type="checkbox" data-f="' + name + '" value="' + value + '"' + (on ? ' checked' : '') + '>' + label + '</label>';
//   }

//   function bindToolbar() {
//     var sortSel = $('[data-sort]');
//     if (sortSel) {
//       sortSel.value = plpState.sort;
//       sortSel.addEventListener('change', function () { plpState.sort = sortSel.value; renderPLP(); });
//     }
//     $all('[data-view]').forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         plpState.view = btn.getAttribute('data-view');
//         $all('[data-view]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
//         renderPLP();
//       });
//     });
//     var ft = $('[data-filter-toggle]');
//     if (ft) {
//       ft.addEventListener('click', function () {
//         var f = $('[data-filters]');
//         f.classList.add('is-open');
//         Nav.lockScroll();
//       });
//     }
//     var fc = $('[data-filters-close]');
//     if (fc) {
//       fc.addEventListener('click', function () {
//         var f = $('[data-filters]');
//         f.classList.remove('is-open');
//         Nav.unlockScroll();
//       });
//     }
//   }

//   function applyFilters() {
//     var s = plpState;
//     var list = Data.getProducts().filter(function (p) {
//       if (s.q && (p.name + ' ' + p.category + ' ' + p.collection).toLowerCase().indexOf(s.q.toLowerCase()) === -1) return false;
//       if (s.category.length && s.category.indexOf(p.category) === -1) return false;
//       if (s.collection.length && s.collection.indexOf(p.collection) === -1) return false;
//       if (s.fit.length && s.fit.indexOf(p.fit) === -1) return false;
//       if (s.fabric.length && s.fabric.indexOf(p.fabric) === -1) return false;
//       if (s.size.length && !s.size.some(function (v) { return p.sizes.indexOf(v) !== -1; })) return false;
//       if (s.color.length && !s.color.some(function (v) { return p.colors.indexOf(v) !== -1; })) return false;
//       if (s.preset === 'new' && p.badge !== 'New') return false;
//       if (s.preset && s.preset.indexOf('occasion:') === 0) {
//         var occ = s.preset.split(':')[1];
//         if (!p.occasion || p.occasion.indexOf(occ) === -1) return false;
//       }
//       if (s.price && s.price.length) {
//         var inBand = s.price.some(function (b) {
//           if (b === 'lt1500') return p.price < 1500;
//           if (b === '1500-2500') return p.price >= 1500 && p.price <= 2500;
//           if (b === '2500-3500') return p.price > 2500 && p.price <= 3500;
//           if (b === 'gt3500') return p.price > 3500;
//           return false;
//         });
//         if (!inBand) return false;
//       }
//       return true;
//     });
//     switch (s.sort) {
//       case 'price-asc': list.sort(function (a, b) { return a.price - b.price; }); break;
//       case 'price-desc': list.sort(function (a, b) { return b.price - a.price; }); break;
//       case 'rating': list.sort(function (a, b) { return b.rating - a.rating; }); break;
//       case 'newest': list.sort(function (a, b) { return (b.badge === 'New') - (a.badge === 'New'); }); break;
//       default: list.sort(function (a, b) { return b.reviews - a.reviews; }); break;
//     }
//     if (s.preset === 'best') { list = list.slice().sort(function (a, b) { return b.reviews - a.reviews; }).slice(0, 8); }
//     return list;
//   }

//   function renderPLP() {
//     var grid = $('[data-plp-grid]');
//     if (!grid) return;
//     var list = applyFilters();
//     var countEl = $('[data-plp-count]');
//     if (countEl) { countEl.textContent = list.length + ' product' + (list.length === 1 ? '' : 's'); }
//     if (!list.length) {
//       grid.innerHTML = '<div class="plp-empty"><strong>Nothing matches those filters</strong><p>Try removing a filter or two.</p></div>';
//       return;
//     }
//     grid.innerHTML = list.map(function (p) { return card(p, {}); }).join('');
//     grid.classList.toggle('plist', plpState.view === 'list');
//     initRevealIn(grid);
//   }

//   /* ========================================================================
//      PDP
//      ======================================================================== */
//   function initPDP() {
//     var root = $('[data-pdp]');
//     if (!root) return;
//     var params = new URLSearchParams(location.search);
//     var id = params.get('id') || 'relaxed-linen-shirt';
//     var p = Data.getProductById(id) || Data.getProductById('relaxed-linen-shirt');
//     if (!p) return;

//     document.title = p.name + ' | PL Mens Wear';
//     var crumb = $('[data-pdp-crumb]');
//     if (crumb) { crumb.textContent = p.name; }
//     var stickyName = $('[data-sticky-name]');
//     if (stickyName) { stickyName.textContent = p.name; }
//     var off = Data.discountPercent(p);
//     var wished = Wishlist.has(p.id);

//     var gallery = $('[data-pdp-gallery]');
//     var images = [
//       { src: Data.productImage(p.id, 'a'), alt: p.name + ' in ' + p.colors[0] },
//       { src: Data.productImage(p.id, 'b'), alt: p.name + ' styled on model' },
//       { src: Data.base() + 'assets/images/lifestyle/story-side.svg', alt: p.name + ' — fabric detail' },
//       { src: Data.base() + 'assets/images/lookbook/look-02.svg', alt: p.name + ' — seasonal look' }
//     ];
//     gallery.innerHTML =
//       '<div class="pdp-main"><img id="pdp-main-img" src="' + images[0].src + '" alt="' + images[0].alt + '" width="1000" height="1250"></div>' +
//       '<div class="pdp-thumbs">' +
//       images.map(function (im, i) {
//         return '<button class="pdp-thumb' + (i === 0 ? ' is-active' : '') + '" data-thumb="' + i + '" aria-label="View image ' + (i + 1) + '"><img src="' + im.src + '" alt=""></button>';
//       }).join('') +
//       '</div>';

//     var info = $('[data-pdp-info]');
//     info.innerHTML =
//       '<span class="pdp-info__cat">' + p.category + ' · ' + p.collection + '</span>' +
//       '<h1>' + p.name + '</h1>' +
//       '<div class="rating" style="margin-top:12px">' + UI.stars(p.rating) + '<span class="count">' + p.rating + ' · ' + p.reviews + ' reviews</span></div>' +
//       '<div class="pdp-pricing">' +
//       '  <span class="pdp-price">' + Data.formatPrice(p.price) + '</span>' +
//       (off > 0 ? '<span class="pdp-mrp">MRP ' + Data.formatPrice(p.mrp) + '</span><span class="pdp-save">You save ' + Data.formatPrice(p.mrp - p.price) + '</span>' : '') +
//       '</div>' +
//       '<p class="pdp-tax">Inclusive of all taxes</p>' +
//       '<div class="pdp-block"><span class="label">Colour — <span data-selected-color>' + p.colors[0] + '</span></span>' +
//       '  <div class="swatch-row">' +
//       p.colors.map(function (c, i) {
//         return '<button type="button" class="swatch-btn' + (i === 0 ? ' is-active' : '') + '" style="background:' + p.colorValues[i] + '" data-color-btn="' + c + '" aria-label="Colour ' + c + '"></button>';
//       }).join('') +
//       '  </div></div>' +
//       '<div class="pdp-block"><span class="label">Size</span>' +
//       '  <div style="display:flex;align-items:center"><div class="size-row" style="flex:1">' +
//       p.sizes.map(function (s, i) {
//         return '<button type="button" class="size-btn' + (i === Math.floor(p.sizes.length / 2) ? ' is-active' : '') + '" data-size-btn>' + s + '</button>';
//       }).join('') +
//       '  </div><button type="button" class="size-guide-link" data-sizeguide>Size guide</button></div>' +
//       '</div>' +
//       '<div class="pdp-qty-row">' +
//       '  <span class="qty"><button data-qty-pdp="-1" aria-label="Decrease quantity">−</button><span class="qty-value" data-qty-value>1</span><button data-qty-pdp="1" aria-label="Increase quantity">+</button></span>' +
//       '  <span class="small muted" data-qty-hint>Quantity</span>' +
//       '</div>' +
//       '<div class="pdp-cta">' +
//       '  <button class="btn btn--solid" data-pdp-add>Add to bag</button>' +
//       '  <button class="btn" data-pdp-buy>Buy now</button>' +
//       '</div>' +
//       '<div class="pdp-wish-row"><button class="pdp-wish' + (wished ? ' is-active' : '') + '" data-pdp-wish="' + p.id + '">' + UI.icon('heart') + '<span>' + (wished ? 'In your wishlist' : 'Add to wishlist') + '</span></button></div>' +
//       '<div class="accordions">' +
//       acc('Description', '<p>' + p.description + '</p><p style="margin-top:10px">Part of the ' + p.collection + ', cut for ' + p.fit.toLowerCase() + ' comfort and finished to move between occasions without effort.</p>', true) +
//       acc('Fabric &amp; care', '<ul><li>Fabric: ' + p.fabric + '</li><li>Machine wash cold with like colours</li><li>Do not bleach · Warm iron if needed</li><li>Dry flat or line dry in shade</li></ul>') +
//       acc('Fit &amp; sizing', '<p>' + p.fit + ' fit. The model is 6\\u20192" / 188 cm and wears size M.</p><p style="margin-top:8px">Between sizes? We recommend sizing up for a relaxed drape.</p>') +
//       acc('Delivery &amp; returns', '<ul><li>Free shipping on orders above ₹1,999</li><li>Dispatched in 1–2 working days from Mumbai</li><li>7-day easy returns, no questions asked</li></ul>') +
//       acc('Product details', '<ul><li>Style code: PL-' + p.id.toUpperCase().replace(/-/g, '') + '</li><li>Country of origin: India</li><li>Manufactured with responsibly sourced yarns</li></ul>') +
//       '</div>';

//     /* gallery behaviour */
//     var mainImg = $('#pdp-main-img', root);
//     $all('.pdp-thumb', root).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         var i = parseInt(btn.getAttribute('data-thumb'), 10);
//         $all('.pdp-thumb', root).forEach(function (b) { b.classList.remove('is-active'); });
//         btn.classList.add('is-active');
//         mainImg.classList.add('is-switching');
//         setTimeout(function () {
//           mainImg.src = images[i].src;
//           mainImg.alt = images[i].alt;
//           mainImg.classList.remove('is-switching');
//         }, 180);
//       });
//     });

//     /* variants */
//     var state = { size: p.sizes[Math.floor(p.sizes.length / 2)], color: p.colors[0], qty: 1 };
//     $all('[data-color-btn]', info).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         $all('[data-color-btn]', info).forEach(function (b) { b.classList.remove('is-active'); });
//         btn.classList.add('is-active');
//         state.color = btn.getAttribute('data-color-btn');
//         $('[data-selected-color]', info).textContent = state.color;
//       });
//     });
//     $all('[data-size-btn]', info).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         $all('[data-size-btn]', info).forEach(function (b) { b.classList.remove('is-active'); });
//         btn.classList.add('is-active');
//         state.size = btn.textContent.trim();
//       });
//     });
//     $all('[data-qty-pdp]', info).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         var d = parseInt(btn.getAttribute('data-qty-pdp'), 10);
//         state.qty = Math.max(1, Math.min(9, state.qty + d));
//         $('[data-qty-value]', info).textContent = String(state.qty);
//       });
//     });

//     /* size guide modal (reuses quick-view modal shell) */
//     var sg = $('[data-sizeguide]', info);
//     if (sg) {
//       sg.addEventListener('click', function () {
//         ensureQuickView();
//         $('.modal__panel', qv).innerHTML =
//           '<button class="modal__close" data-qv-close aria-label="Close size guide">' + UI.icon('close') + '</button>' +
//           '<div class="modal__info" style="grid-column:1/-1">' +
//           '  <h2 class="h-sub">Size guide</h2>' +
//           '  <table class="size-table" style="margin-top:20px">' +
//           '    <tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th><th>Length (in)</th></tr>' +
//           '    <tr><td>S</td><td>38</td><td>32</td><td>27</td></tr>' +
//           '    <tr><td>M</td><td>40</td><td>34</td><td>28</td></tr>' +
//           '    <tr><td>L</td><td>42</td><td>36</td><td>29</td></tr>' +
//           '    <tr><td>XL</td><td>44</td><td>38</td><td>30</td></tr>' +
//           '    <tr><td>XXL</td><td>46</td><td>40</td><td>31</td></tr>' +
//           '  </table>' +
//           '</div>';
//         qv.classList.add('is-open');
//         Nav.lockScroll();
//       });
//     }

//     /* add / buy / wish */
//     $('[data-pdp-add]', info).addEventListener('click', function () {
//       Cart.add(p.id, state.size, state.qty);
//     });
//     $('[data-pdp-buy]', info).addEventListener('click', function () {
//       Cart.add(p.id, state.size, state.qty);
//       UI.toast('Checkout is a demo — connect your payment provider here');
//     });
//     var wishBtn = $('[data-pdp-wish]', info);
//     wishBtn.addEventListener('click', function () {
//       var added = Wishlist.toggle(p.id);
//       wishBtn.classList.toggle('is-active', added);
//       $('span', wishBtn).textContent = added ? 'In your wishlist' : 'Add to wishlist';
//       UI.toast(added ? 'Saved to wishlist' : 'Removed from wishlist');
//     });

//     /* You may also like */
//     var related = $('[data-rail="related"]');
//     if (related) {
//       var rel = Data.getProducts().filter(function (x) { return x.category === p.category && x.id !== p.id; });
//       if (rel.length < 4) {
//         Data.getProducts().forEach(function (x) {
//           if (x.id !== p.id && rel.indexOf(x) === -1 && rel.length < 8) { rel.push(x); }
//         });
//       }
//       renderRail(related, rel.slice(0, 8));
//       initRailArrows();
//     }

//     /* sticky ATC sync */
//     var sticky = $('.pdp-sticky-atc');
//     if (sticky) {
//       var sp = $('[data-sticky-price]', sticky);
//       if (sp) { sp.textContent = Data.formatPrice(p.price); }
//       var sa = $('[data-sticky-add]', sticky);
//       if (sa) {
//         sa.setAttribute('data-add', p.id);
//         sa.setAttribute('data-size', state.size);
//         $all('[data-size-btn]', info).forEach(function (btn) {
//           if (btn.classList.contains('is-active')) { sa.setAttribute('data-size', btn.textContent.trim()); }
//         });
//       }
//       var mq = window.matchMedia('(max-width: 760px)');
//       var onScroll = function () {
//         var infoBottom = info.getBoundingClientRect().top < 0;
//         sticky.classList.toggle('is-visible', mq.matches && infoBottom);
//       };
//       window.addEventListener('scroll', onScroll, { passive: true });
//       onScroll();
//     }

//     /* structured data */
//     try {
//       var ld = document.createElement('script');
//       ld.type = 'application/ld+json';
//       ld.textContent = JSON.stringify({
//         '@context': 'https://schema.org', '@type': 'Product',
//         name: p.name, description: p.description,
//         image: location.origin + '/' + Data.productImage(p.id, 'a'),
//         brand: { '@type': 'Brand', name: 'PL Mens Wear' },
//         aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
//         offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock' }
//       });
//       document.head.appendChild(ld);
//     } catch (e) { /* no-op */ }
//   }

//   function acc(title, body, open) {
//     return '<div class="acc">' +
//       '<button class="acc__btn" aria-expanded="' + (open ? 'true' : 'false') + '">' + title + UI.icon('chevronDown') + '</button>' +
//       '<div class="acc__panel">' + body + '</div>' +
//       '</div>';
//   }

//   /* ========================================================================
//      LOOKBOOK LIGHTBOX
//      ======================================================================== */
//   function initLookbook() {
//     var grid = $('[data-lookbook]');
//     if (!grid) return;
//     var items = $all('.masonry__item', grid);
//     var srcs = items.map(function (it) { return $('img', it).getAttribute('src'); });
//     var caps = items.map(function (it) {
//       var l = $('.masonry__cap .label', it);
//       return l ? l.textContent : '';
//     });

//     var box = document.createElement('div');
//     box.className = 'lightbox';
//     box.setAttribute('role', 'dialog');
//     box.setAttribute('aria-modal', 'true');
//     box.setAttribute('aria-label', 'Lookbook image');
//     box.innerHTML =
//       '<button class="lightbox__close icon-btn" data-lb-close aria-label="Close">' + UI.icon('close') + '</button>' +
//       '<button class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="Previous image">' + UI.icon('chevronLeft') + '</button>' +
//       '<img src="" alt="">' +
//       '<button class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="Next image">' + UI.icon('chevronRight') + '</button>' +
//       '<p class="lightbox__caption"></p>';
//     document.body.appendChild(box);

//     var idx = 0;
//     function show(i) {
//       idx = (i + items.length) % items.length;
//       $('img', box).src = srcs[idx];
//       $('.lightbox__caption', box).textContent = caps[idx];
//     }
//     function openBox(i) { show(i); box.classList.add('is-open'); Nav.lockScroll(); document.addEventListener('keydown', keys); }
//     function closeBox() { box.classList.remove('is-open'); Nav.unlockScroll(); document.removeEventListener('keydown', keys); }
//     function keys(e) {
//       if (e.key === 'Escape') closeBox();
//       if (e.key === 'ArrowLeft') show(idx - 1);
//       if (e.key === 'ArrowRight') show(idx + 1);
//     }
//     items.forEach(function (it, i) {
//       it.addEventListener('click', function () { openBox(i); });
//       it.setAttribute('tabindex', '0');
//       it.setAttribute('role', 'button');
//       it.addEventListener('keydown', function (e) {
//         if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(i); }
//       });
//     });
//     box.addEventListener('click', function (e) {
//       if (e.target.closest('[data-lb-close]')) closeBox();
//       if (e.target.closest('[data-lb-prev]')) show(idx - 1);
//       if (e.target.closest('[data-lb-next]')) show(idx + 1);
//     });
//   }

//   /* ========================================================================
//      GLOBAL EVENTS + BOOT
//      ======================================================================== */
//   function boot() {
//     Data.ready(function () {
//       home();
//       initPLP();
//       initPDP();
//       initLookbook();
//     });
//     document.addEventListener('click', function (e) {
//       var w = e.target.closest('[data-wish]');
//       if (w) {
//         e.preventDefault();
//         var id = w.getAttribute('data-wish');
//         var added = Wishlist.toggle(id);
//         $all('[data-wish="' + id + '"]').forEach(function (btn) {
//           btn.classList.toggle('is-active', added);
//           btn.setAttribute('aria-pressed', String(added));
//         });
//         UI.toast(added ? 'Saved to wishlist' : 'Removed from wishlist');
//         return;
//       }
//       var q = e.target.closest('[data-quickview]');
//       if (q) { e.preventDefault(); openQuickView(q.getAttribute('data-quickview')); return; }
//       var wopen = e.target.closest('[data-wishlist-open]');
//       if (wopen) { e.preventDefault(); openWishlist(); }
//     });
//   }

//   window.PLMWProducts = {
//     card: card,
//     renderRail: renderRail,
//     openQuickView: openQuickView,
//     closeQuickView: closeQuickView
//   };

//   boot();
// })(window, document);

// /* ==========================================================================
//    PL MENS WEAR — CART
//    localStorage-backed cart, slide-out drawer, quantity controls,
//    free-shipping progress, add-to-bag wiring, checkout stub.
//    Exposes window.PLMWCart
//    ========================================================================== */

// (function (window, document) {
//   'use strict';

//   var UI = window.PLMWUI, Data = window.PLMW, Nav = window.PLMWNav, Wishlist = window.PLMWWishlist;
//   var $ = UI.$;
//   var KEY = 'plmw-cart';
//   var FREE_SHIP = 1999;
//   function read() {
//     try { return JSON.parse(localStorage.getItem(KEY)) || []; }
//     catch (e) { return []; }
//   }
//   function write(items) {
//     try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
//     renderBadge(); renderDrawer(); renderSticky();
//   }

//   function items() { return read(); }
//   function count() { return read().reduce(function (n, li) { return n + li.qty; }, 0); }
//   function subtotal() { return read().reduce(function (n, li) { return n + li.qty * li.price; }, 0); }

//   function add(productId, size, qty) {
//     var p = Data.getProductById(productId);
//     if (!p) return;
//     qty = qty || 1;
//     var chosenSize = size || (p.sizes && p.sizes.length ? p.sizes[Math.floor(p.sizes.length / 2)] : 'M');
//     var color = p.colors && p.colors[0] ? p.colors[0] : '';
//     var list = read();
//     var key = productId + '|' + chosenSize + '|' + color;
//     var existing = null;
//     for (var i = 0; i < list.length; i++) { if (list[i].key === key) { existing = list[i]; break; } }
//     if (existing) { existing.qty += qty; }
//     else {
//       list.push({
//         key: key, id: productId, name: p.name, size: chosenSize, color: color,
//         price: p.price, qty: qty,
//         image: 'assets/images/products/' + productId + '-a.svg'
//       });
//     }
//     write(list);
//     UI.toast(p.name + ' added to bag');
//     openDrawer();
//   }

//   function updateQty(key, qty) {
//     var list = read();
//     for (var i = 0; i < list.length; i++) {
//       if (list[i].key === key) {
//         list[i].qty = qty;
//         if (list[i].qty <= 0) { list.splice(i, 1); }
//         break;
//       }
//     }
//     write(list);
//   }
//   function remove(key) {
//     write(read().filter(function (li) { return li.key !== key; }));
//   }

//   /* ---------- Badge ---------- */
//   function renderBadge() {
//     document.querySelectorAll('[data-cart-count]').forEach(function (el) {
//       var n = count();
//       el.textContent = String(n);
//       el.style.display = n > 0 ? '' : 'none';
//     });
//   }

//   /* ---------- Drawer ---------- */
//   var els = {};

//   function ensureDrawer() {
//     if (els.drawer) return;
//     els.drawer = document.querySelector('.drawer');
//     if (!els.drawer) { buildDrawer(); els.drawer = document.querySelector('.drawer'); }
//     els.body = $('.drawer__body', els.drawer);
//     els.foot = $('.drawer__foot', els.drawer);
//     els.drawer.addEventListener('click', function (e) {
//       var t = e.target;
//       if (t.closest('[data-cart-close]')) { closeDrawer(); }
//       if (t.closest('[data-cart-checkout]')) {
//         e.preventDefault();
//         UI.toast('Checkout is a demo — connect your payment provider here');
//       }
//       var qbtn = t.closest('[data-qty]');
//       if (qbtn) {
//         var key = qbtn.getAttribute('data-key');
//         var delta = parseInt(qbtn.getAttribute('data-qty'), 10);
//         var li = read().filter(function (x) { return x.key === key; })[0];
//         if (li) { updateQty(key, li.qty + delta); }
//       }
//       var rbtn = t.closest('[data-remove]');
//       if (rbtn) { remove(rbtn.getAttribute('data-remove')); }
//     });
//   }

//   function buildDrawer() {
//     var d = document.createElement('aside');
//     d.className = 'drawer';
//     d.setAttribute('role', 'dialog');
//     d.setAttribute('aria-modal', 'true');
//     d.setAttribute('aria-label', 'Shopping bag');
//     d.innerHTML =
//       '<div class="drawer__head">' +
//       '  <span class="drawer__title">Your Bag <span data-cart-count-inline></span></span>' +
//       '  <button class="drawer__close" data-cart-close aria-label="Close bag">' + UI.icon('close') + '</button>' +
//       '</div>' +
//       '<div class="drawer__body"></div>' +
//       '<div class="drawer__foot"></div>';
//     document.body.appendChild(d);
//   }

//   function renderDrawer() {
//     ensureDrawer();
//     if (!els.drawer) return;
//     var list = read();
//     var inline = document.querySelector('[data-cart-count-inline]');
//     if (inline) { inline.textContent = list.length ? '(' + count() + ')' : ''; }

//     if (!list.length) {
//       els.body.innerHTML =
//         '<div class="cart-empty">' +
//         '  <strong>Your bag is empty</strong>' +
//         '  <p>Pieces you add will appear here.</p>' +
//         '</div>';
//       els.foot.innerHTML = '<a class="btn btn--solid btn--block" href="#collections" data-cart-close-link>Continue shopping</a>';
//       var cl = $('[data-cart-close-link]', els.foot);
//       if (cl) { cl.addEventListener('click', function () { closeDrawer(); }); }
//       return;
//     }

//     var html = '';
//     list.forEach(function (li) {
//       html +=
//         '<div class="cart-line">' +
//         '  <a href="#collections" data-quickview="' + li.id + '"><img src="' + Data.base() + li.image + '" alt="' + li.name + '" loading="lazy"></a>' +
//         '  <div>' +
//         '    <div class="cart-line__name">' + li.name + '</div>' +
//         '    <div class="cart-line__meta">Size ' + li.size + (li.color ? ' · ' + li.color : '') + '</div>' +
//         '    <div class="cart-line__controls">' +
//         '      <span class="qty">' +
//         '        <button data-qty="-1" data-key="' + li.key + '" aria-label="Decrease quantity">−</button>' +
//         '        <span class="qty-value">' + li.qty + '</span>' +
//         '        <button data-qty="1" data-key="' + li.key + '" aria-label="Increase quantity">+</button>' +
//         '      </span>' +
//         '      <button class="cart-line__remove" data-remove="' + li.key + '">Remove</button>' +
//         '    </div>' +
//         '  </div>' +
//         '  <span class="cart-line__price">' + Data.formatPrice(li.price * li.qty) + '</span>' +
//         '</div>';
//     });
//     els.body.innerHTML = html;

//     var sub = subtotal();
//     var remaining = FREE_SHIP - sub;
//     var pct = Math.min(100, Math.round((sub / FREE_SHIP) * 100));
//     var shipMsg = remaining > 0
//       ? 'Add ' + Data.formatPrice(remaining) + ' more to unlock free shipping.'
//       : 'Your order ships free.';
//     els.foot.innerHTML =
//       '<div class="shipping-bar">' +
//       '  <p class="shipping-bar__msg">' + shipMsg + '</p>' +
//       '  <div class="shipping-bar__track"><span class="shipping-bar__fill" style="width:' + pct + '%"></span></div>' +
//       '</div>' +
//       '<div class="cart-subtotal"><span class="label">Subtotal</span><strong>' + Data.formatPrice(sub) + '</strong></div>' +
//       '<p class="cart-note">Shipping &amp; taxes calculated at checkout. Free shipping above ' + Data.formatPrice(FREE_SHIP) + '.</p>' +
//       '<button class="btn btn--solid btn--block" data-cart-checkout>Checkout</button>' +
//       '<a class="btn btn--block" href="#collections" data-cart-close-link>Continue browsing</a>';
//     var cl2 = $('[data-cart-close-link]', els.foot);
//     if (cl2) { cl2.addEventListener('click', function () { closeDrawer(); }); }
//   }

//   /* ---------- Open / close ---------- */
//   var closeHandler = null;
//   function openDrawer() {
//     ensureDrawer();
//     renderDrawer();
//     els.drawer.classList.add('is-open');
//     Nav.lockScroll();
//     document.addEventListener('keydown', escClose);
//     closeHandler = escClose;
//   }
//   function closeDrawer() {
//     if (!els.drawer) return;
//     els.drawer.classList.remove('is-open');
//     Nav.unlockScroll();
//     document.removeEventListener('keydown', escClose);
//   }
//   function escClose(e) { if (e.key === 'Escape') { closeDrawer(); } }

//   /* ---------- Sticky ATC bar (PDP, mobile) ---------- */
//   function renderSticky() {
//     var bar = document.querySelector('.pdp-sticky-atc');
//     if (!bar) return;
//     var priceEl = $('[data-sticky-price]', bar);
//     var main = $('.pdp-info');
//     if (!main) return;
//     if (priceEl && main) {
//       /* price is re-rendered by products.js PDP logic; just keep in sync via data attribute */
//     }
//   }

//   /* ---------- Wiring ---------- */
//   function init() {
//     document.addEventListener('click', function (e) {
//       var opener = e.target.closest('[data-cart-open]');
//       if (opener) { e.preventDefault(); openDrawer(); return; }
//       var addBtn = e.target.closest('[data-add]');
//       if (addBtn) {
//         e.preventDefault();
//         add(addBtn.getAttribute('data-add'), addBtn.getAttribute('data-size') || null,
//           parseInt(addBtn.getAttribute('data-qty') || '1', 10));
//       }
//     });
//     document.addEventListener('DOMContentLoaded', function () {
//       renderBadge(); renderDrawer();
//     });
//   }

//   window.PLMWCart = {
//     add: add, remove: remove, updateQty: updateQty,
//     items: items, count: count, subtotal: subtotal,
//     openDrawer: openDrawer, closeDrawer: closeDrawer,
//     renderBadge: renderBadge
//   };

//   init();
// })(window, document);

// /* ==========================================================================
//    PL Mens Wear — Data module
//    Loads catalog + site config via Fetch API, with a built-in fallback so the
//    site still works when opened from the filesystem (file://) without a server.
//    Exposes: window.PLMW.getProducts(), window.PLMW.getConfig(), helpers.
//    ========================================================================== */

// (function (window) {
//   'use strict';

//   var FALLBACK_PRODUCTS = [
//     { id: 'relaxed-linen-shirt', name: 'Relaxed Linen Shirt', category: 'Shirts', collection: 'Linen Edit', occasion: ['Weekend', 'Travel'], price: 2499, mrp: 2999, colors: ['Ivory', 'Sand', 'Olive'], colorValues: ['#efe7d8', '#cbb391', '#6b6f4e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Relaxed', fabric: 'Pure Linen', rating: 4.6, reviews: 182, badge: 'New', description: 'A relaxed linen shirt cut from breathable pure linen.' },
//     { id: 'oxford-stretch-shirt', name: 'Oxford Stretch Shirt', category: 'Shirts', collection: 'Essential Collection', occasion: ['Work'], price: 2199, mrp: 2799, colors: ['White', 'Muted Navy'], colorValues: ['#f5f2ec', '#39485e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Slim', fabric: 'Cotton Oxford', rating: 4.7, reviews: 264, badge: 'Bestseller', description: 'The desk-to-dinner shirt in breathable oxford cotton.' },
//     { id: 'no-iron-travel-shirt', name: 'No-Iron Travel Shirt', category: 'Shirts', collection: 'Travel', occasion: ['Travel', 'Work'], price: 2699, mrp: 3199, colors: ['Sky', 'Stone Grey'], colorValues: ['#aebfca', '#8d8a83'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Tech Cotton Poplin', rating: 4.5, reviews: 143, description: 'Packs flat, lands crisp. Wrinkle-resistant poplin.' },
//     { id: 'brushed-twill-shirt', name: 'Brushed Twill Overshirt', category: 'Shirts', collection: 'Weekend Collection', occasion: ['Weekend', 'Evening'], price: 2999, mrp: 3499, colors: ['Dark Brown', 'Charcoal'], colorValues: ['#4a3a2e', '#33342f'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Brushed Cotton Twill', rating: 4.8, reviews: 207, description: 'Half shirt, half light jacket in brushed twill.' },
//     { id: 'festive-textured-shirt', name: 'Festive Textured Shirt', category: 'Shirts', collection: 'Festive Edit', occasion: ['Festive', 'Evening'], price: 2899, mrp: 3599, colors: ['Ivory', 'Burgundy'], colorValues: ['#efe7d8', '#5c2530'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Slim', fabric: 'Self-Textured Cotton', rating: 4.4, reviews: 96, badge: 'New', description: 'Subtle self-texture, quiet sheen, festive without the noise.' },
//     { id: 'featherweight-tee', name: 'Featherweight Crew Tee', category: 'T-Shirts', collection: 'Essential Collection', occasion: ['Weekend'], price: 999, mrp: 1299, colors: ['White', 'Charcoal', 'Olive'], colorValues: ['#f5f2ec', '#33342f', '#6b6f4e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Supima Cotton', rating: 4.7, reviews: 421, badge: 'Bestseller', description: 'The perfect-weight tee in long-staple Supima cotton.' },
//     { id: 'heavyweight-pocket-tee', name: 'Heavyweight Pocket Tee', category: 'T-Shirts', collection: 'Weekend Collection', occasion: ['Weekend', 'Travel'], price: 1199, mrp: 1499, colors: ['Sand', 'Dark Brown'], colorValues: ['#cbb391', '#4a3a2e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Relaxed', fabric: 'Loopback Cotton', rating: 4.5, reviews: 188, description: 'A pocket tee with the presence of a light knit.' },
//     { id: 'motion-polo', name: 'Motion Pique Polo', category: 'Polos', collection: 'Essential Collection', occasion: ['Work', 'Weekend'], price: 1699, mrp: 2199, colors: ['Muted Navy', 'Ivory', 'Stone Grey'], colorValues: ['#39485e', '#efe7d8', '#8d8a83'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Slim', fabric: 'Performance Pique', rating: 4.6, reviews: 312, badge: 'Bestseller', description: 'Four-way stretch pique that stays crisp all day.' },
//     { id: 'linen-cotton-polo', name: 'Linen-Cotton Polo', category: 'Polos', collection: 'Linen Edit', occasion: ['Weekend', 'Travel'], price: 1899, mrp: 2299, colors: ['Sand', 'Sky'], colorValues: ['#cbb391', '#aebfca'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Linen-Cotton Blend', rating: 4.4, reviews: 134, description: 'Breathes like a shirt, wears like a favourite.' },
//     { id: 'merino-polo', name: 'Fine Merino Knit Polo', category: 'Polos', collection: 'Premium Collection', occasion: ['Evening', 'Work'], price: 3299, mrp: 3999, colors: ['Charcoal', 'Burgundy'], colorValues: ['#33342f', '#5c2530'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Slim', fabric: 'Extra-Fine Merino', rating: 4.8, reviews: 89, badge: 'Premium', description: 'Extra-fine merino knitted into a collared silhouette.' },
//     { id: '4-way-stretch-trouser', name: '4-Way Stretch Trouser', category: 'Trousers', collection: 'Essential Collection', occasion: ['Work', 'Travel'], price: 2299, mrp: 2899, colors: ['Charcoal', 'Stone Grey', 'Muted Navy'], colorValues: ['#33342f', '#8d8a83', '#39485e'], sizes: ['30', '32', '34', '36', '38'], fit: 'Tailored', fabric: 'Stretch Cotton Twill', rating: 4.7, reviews: 386, badge: 'Bestseller', description: 'Tailored lines, athleisure bones, hidden comfort waistband.' },
//     { id: 'linen-drawstring-trouser', name: 'Linen Drawstring Trouser', category: 'Trousers', collection: 'Linen Edit', occasion: ['Weekend', 'Travel'], price: 2099, mrp: 2599, colors: ['Ivory', 'Olive'], colorValues: ['#efe7d8', '#6b6f4e'], sizes: ['30', '32', '34', '36', '38'], fit: 'Relaxed', fabric: 'Pure Linen', rating: 4.5, reviews: 167, description: 'Dresses like tailoring, feels like a holiday.' },
//     { id: 'pleated-formal-trouser', name: 'Single-Pleat Formal Trouser', category: 'Trousers', collection: 'Premium Collection', occasion: ['Work', 'Festive'], price: 2799, mrp: 3399, colors: ['Deep Black', 'Stone Grey'], colorValues: ['#1c1b19', '#8d8a83'], sizes: ['30', '32', '34', '36', '38'], fit: 'Tailored', fabric: 'Wool-Blend Suiting', rating: 4.6, reviews: 112, badge: 'New', description: 'A single forward pleat with a quietly modern drape.' },
//     { id: 'straight-fit-jeans', name: 'Straight Fit Jeans', category: 'Jeans', collection: 'Essential Collection', occasion: ['Weekend'], price: 2499, mrp: 2999, colors: ['Mid Indigo', 'Deep Black'], colorValues: ['#46586e', '#1c1b19'], sizes: ['30', '32', '34', '36', '38'], fit: 'Straight', fabric: 'Comfort Denim', rating: 4.6, reviews: 298, description: 'The five-pocket standard, upgraded with two percent stretch.' },
//     { id: 'slim-tapered-jeans', name: 'Slim Tapered Jeans', category: 'Jeans', collection: 'Weekend Collection', occasion: ['Weekend', 'Evening'], price: 2699, mrp: 3299, colors: ['Mid Indigo', 'Charcoal'], colorValues: ['#46586e', '#33342f'], sizes: ['30', '32', '34', '36', '38'], fit: 'Slim', fabric: 'Stretch Denim', rating: 4.5, reviews: 241, description: 'Clean through the thigh, tapered to the ankle.' },
//     { id: 'relaxed-ecru-jeans', name: 'Relaxed Ecru Jeans', category: 'Jeans', collection: 'Linen Edit', occasion: ['Weekend', 'Travel'], price: 2599, mrp: 3099, colors: ['Ecru'], colorValues: ['#e6ddc9'], sizes: ['30', '32', '34', '36', '38'], fit: 'Relaxed', fabric: 'Rigid Cotton Denim', rating: 4.4, reviews: 78, badge: 'New', description: 'Warm-weather denim in undyed ecru.' },
//     { id: 'cotton-chino-short', name: 'Cotton Chino Short', category: 'Shorts', collection: 'Essential Collection', occasion: ['Weekend'], price: 1499, mrp: 1899, colors: ['Sand', 'Olive', 'Muted Navy'], colorValues: ['#cbb391', '#6b6f4e', '#39485e'], sizes: ['30', '32', '34', '36', '38'], fit: 'Regular', fabric: 'Garment-Dyed Cotton', rating: 4.5, reviews: 156, description: 'A 7-inch chino short in garment-dyed cotton.' },
//     { id: 'lounge-short', name: 'Terry Lounge Short', category: 'Shorts', collection: 'Weekend Collection', occasion: ['Weekend'], price: 1299, mrp: 1699, colors: ['Stone Grey', 'Charcoal'], colorValues: ['#8d8a83', '#33342f'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Relaxed', fabric: 'Loopback Terry', rating: 4.6, reviews: 132, description: 'Hotel-towel softness, cut to be seen in.' },
//     { id: 'linen-blouson-jacket', name: 'Linen-Blend Blouson', category: 'Jackets', collection: 'Linen Edit', occasion: ['Evening', 'Travel'], price: 3999, mrp: 4999, colors: ['Stone Grey', 'Olive'], colorValues: ['#8d8a83', '#6b6f4e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Linen-Cotton Blend', rating: 4.7, reviews: 91, badge: 'Premium', description: 'The lightest way to finish an outfit.' },
//     { id: 'quilted-travel-jacket', name: 'Quilted Travel Jacket', category: 'Jackets', collection: 'Travel', occasion: ['Travel', 'Work'], price: 4499, mrp: 5499, colors: ['Dark Brown', 'Deep Black'], colorValues: ['#4a3a2e', '#1c1b19'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Recycled Quilted Nylon', rating: 4.8, reviews: 118, badge: 'Premium', description: 'Packable warmth with hidden travel pockets.' },
//     { id: 'wool-blend-blazer', name: 'Unstructured Wool Blazer', category: 'Jackets', collection: 'Premium Collection', occasion: ['Work', 'Festive', 'Evening'], price: 5999, mrp: 7499, colors: ['Charcoal', 'Muted Navy'], colorValues: ['#33342f', '#39485e'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Tailored', fabric: 'Wool-Blend Twill', rating: 4.9, reviews: 74, badge: 'Premium', description: 'Shoulder-soft tailoring for offices without ties.' },
//     { id: 'knit-overshirt', name: 'Textured Knit Overshirt', category: 'Jackets', collection: 'Weekend Collection', occasion: ['Weekend', 'Evening'], price: 3199, mrp: 3799, colors: ['Sand', 'Burgundy'], colorValues: ['#cbb391', '#5c2530'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fit: 'Regular', fabric: 'Textured Cotton Knit', rating: 4.5, reviews: 87, description: 'The third piece, perfected.' }
//   ];

//   var FALLBACK_CONFIG = {
//     brand: 'PL Mens Wear',
//     promoBar: { messages: ['FREE SHIPPING ABOVE ₹1999', '7-DAY EASY RETURNS', 'NEW SEASON — NOW LIVE'] },
//     trendingSearches: ['Linen Shirts', 'Polos', 'Trousers', 'New Arrivals', 'Best Sellers'],
//     occasions: [
//       { name: 'Work', slug: 'work', image: 'assets/images/occasions/occasion-work.svg', description: 'Sharp shirting and tailored comfort for the nine-to-nine.' },
//       { name: 'Weekend', slug: 'weekend', image: 'assets/images/occasions/occasion-weekend.svg', description: 'Easy pieces that still look considered.' },
//       { name: 'Travel', slug: 'travel', image: 'assets/images/occasions/occasion-travel.svg', description: 'Wrinkle-proof fabrics for the long way there.' },
//       { name: 'Festive', slug: 'festive', image: 'assets/images/occasions/occasion-festive.svg', description: 'Texture and quiet sheen for the season’s evenings.' },
//       { name: 'Evening', slug: 'evening', image: 'assets/images/occasions/occasion-evening.svg', description: 'Dress for dinner without dressing up too much.' }
//     ],
//     collections: [
//       { name: 'The Linen Edit', slug: 'linen', image: 'assets/images/collections/collection-linen.svg', description: 'Lightweight textures and effortless silhouettes designed for warm days.', story: 'Linen that is spun for breathability, cut for movement, and finished to feel broken-in from the first wear.' },
//       { name: 'Essential Collection', slug: 'essentials', image: 'assets/images/collections/collection-essentials.svg', description: 'The core wardrobe, perfected one piece at a time.', story: 'Every essential is wear-tested for months before it earns a place in the line.' },
//       { name: 'Premium Collection', slug: 'premium', image: 'assets/images/collections/collection-premium.svg', description: 'Fine merino, wool suiting and considered finishing.', story: 'Fewer, better pieces — made with premium yarns and quieter details.' },
//       { name: 'Weekend Collection', slug: 'weekend', image: 'assets/images/collections/collection-weekend.svg', description: 'Relaxed fits for the days that belong to you.', story: 'Comfort-first fabrics that still photograph like tailoring.' },
//       { name: 'Festive Edit', slug: 'festive', image: 'assets/images/collections/collection-festive.svg', description: 'Celebration-ready textures in a warm, festive palette.', story: 'Designed for the season’s long evenings and family photographs.' },
//       { name: 'Travel', slug: 'travel', image: 'assets/images/collections/collection-travel.svg', description: 'Wrinkle-resistant, packable pieces built for movement.', story: 'Tested on red-eye flights and long drives before it reaches the rack.' }
//     ]
//   };

//   var state = { products: null, config: null, pending: [] };

//   /* Root-relative base: single page on root */
//   var BASE = '';

//   function ready(fn) {
//     if (state.products && state.config) { fn(); return; }
//     state.pending.push(fn);
//     if (state.pending.length === 1) { loadAll(); }
//   }

//   function loadAll() {
//     var remaining = 2;
//     function done() {
//       remaining -= 1;
//       if (remaining === 0) {
//         var fns = state.pending.slice();
//         state.pending = [];
//         fns.forEach(function (fn) { fn(); });
//       }
//     }
//     fetchJSON(BASE + 'data/products.json', function (data) { state.products = data; done(); });
//     fetchJSON(BASE + 'data/site-config.json', function (data) { state.config = data; done(); });
//   }

//   function fetchJSON(url, cb) {
//     if (window.fetch) {
//       fetch(url).then(function (r) { if (!r.ok) { throw new Error(r.status); } return r.json(); })
//         .then(function (data) { cb(data); })
//         .catch(function () { cb(null); });
//     } else {
//       var xhr = new XMLHttpRequest();
//       xhr.open('GET', url, true);
//       xhr.onload = function () { cb(xhr.status === 200 ? parse(xhr.responseText) : null); };
//       xhr.onerror = function () { cb(null); };
//       xhr.send();
//     }
//   }

//   function parse(text) { try { return JSON.parse(text); } catch (e) { return null; } }

//   /* ---------- Public helpers ---------- */

//   function getProducts() { return (state.products && state.products.products) || FALLBACK_PRODUCTS; }

//   function getConfig() { return (state.config && state.config.brand) ? state.config : FALLBACK_CONFIG; }

//   function getProductById(id) {
//     var list = getProducts();
//     for (var i = 0; i < list.length; i++) { if (list[i].id === id) { return list[i]; } }
//     return null;
//   }

//   function formatPrice(value) {
//     return '₹' + Number(value).toLocaleString('en-IN');
//   }

//   function discountPercent(p) {
//     return Math.round(((p.mrp - p.price) / p.mrp) * 100);
//   }

//   function productImage(id, n, lifestyle) {
//     return BASE + 'assets/images/products/' + id + '-' + (lifestyle ? 'b' : 'a') + '.svg';
//   }

//   function base() { return BASE; }

//   window.PLMW = {
//     ready: ready,
//     getProducts: getProducts,
//     getConfig: getConfig,
//     getProductById: getProductById,
//     formatPrice: formatPrice,
//     discountPercent: discountPercent,
//     productImage: productImage,
//     base: base
//   };
// })(window);

// /* ==========================================================================
//    PL MENS WEAR — NAVIGATION
//    Mega menu, mobile nav, drawer/overlay open-close plumbing
//    Exposes window.PLMWNav
//    ========================================================================== */

// (function (window, document) {
//   'use strict';

//   var $ = window.PLMWUI.$, $all = window.PLMWUI.$all;
//   var openCount = 0;

//   /* ---------- Overlay plumbing ---------- */
//   function lockScroll() {
//     openCount += 1;
//     document.body.classList.add('nav-locked');
//   }
//   function unlockScroll() {
//     openCount = Math.max(0, openCount - 1);
//     if (openCount === 0) { document.body.classList.remove('nav-locked'); }
//   }

//   /* ---------- Mega menu (hover on desktop, click toggle too) ---------- */
//   function megaMenu() {
//     $all('.has-mega').forEach(function (item) {
//       var link = $('.nav-link', item);
//       if (!link) return;
//       item.addEventListener('mouseenter', function () { item.classList.add('is-open'); link.setAttribute('aria-expanded', 'true'); });
//       item.addEventListener('mouseleave', function () { item.classList.remove('is-open'); link.setAttribute('aria-expanded', 'false'); });
//       link.addEventListener('click', function () {
//         item.classList.remove('is-open');
//         link.setAttribute('aria-expanded', 'false');
//       });
//       document.addEventListener('keydown', function (e) {
//         if (e.key === 'Escape' && item.classList.contains('is-open')) {
//           item.classList.remove('is-open');
//           link.setAttribute('aria-expanded', 'false');
//         }
//       });
//     });
//   }

//   /* ---------- Mobile navigation ---------- */
//   function mobileNav() {
//     var nav = $('.mobile-nav');
//     var scrim = $('.scrim');
//     var openBtn = $('.hamburger');
//     if (!nav || !openBtn) return;

//     function close() {
//       nav.classList.remove('is-open');
//       nav.setAttribute('aria-hidden', 'true');
//       openBtn.setAttribute('aria-expanded', 'false');
//       scrim.classList.remove('is-visible');
//       unlockScroll();
//     }
//     function open() {
//       nav.classList.add('is-open');
//       nav.setAttribute('aria-hidden', 'false');
//       openBtn.setAttribute('aria-expanded', 'true');
//       scrim.classList.add('is-visible');
//       lockScroll();
//       var first = $('.mobile-nav__close', nav) || nav;
//       if (first && first.focus) { first.focus(); }
//     }

//     openBtn.addEventListener('click', open);
//     $('.mobile-nav__close', nav).addEventListener('click', close);
//     scrim.addEventListener('click', close);
//     document.addEventListener('keydown', function (e) {
//       if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); }
//     });

//     $all('.mobile-nav__accordion', nav).forEach(function (btn) {
//       btn.addEventListener('click', function () {
//         var expanded = btn.getAttribute('aria-expanded') === 'true';
//         btn.setAttribute('aria-expanded', String(!expanded));
//       });
//     });

//     return { close: close };
//   }

//   window.PLMWNav = {
//     lockScroll: lockScroll,
//     unlockScroll: unlockScroll,
//     megaMenu: megaMenu,
//     mobileNav: mobileNav
//   };
// })(window, document);

// /* ==========================================================================
//    PL MENS WEAR — MAIN
//    Shared chrome bootstrap: promo bar, header, nav, reveal, toasts, footer.
//    Exposes window.PLMWMain
//    ========================================================================== */

// (function (window, document) {
//   'use strict';

//   var UI = window.PLMWUI, Data = window.PLMW, Nav = window.PLMWNav,
//       Wishlist = window.PLMWWishlist, Cart = window.PLMWCart;

//   /* ---------- Chrome (mega menu) ---------- */
//   function initChrome() {
//     Nav.megaMenu();
//   }

//   /* ---------- Renders config-driven bits of chrome ---------- */
//   function renderDynamicChrome() {
//     Data.ready(function () {
//       /* mega-menu promo tile image from config (first collection) */
//       var promoImg = $('[data-mega-promo-img]');
//       if (promoImg) {
//         var colls = Data.getConfig().collections || [];
//         if (colls.length) {
//           promoImg.setAttribute('src', Data.base() + colls[0].image);
//           promoImg.setAttribute('alt', colls[0].name);
//         }
//       }
//     });
//   }

//   function $(sel, ctx) { return (ctx || document).querySelector(sel); }

//   function init() {
//     UI.onScrollHeader();
//     UI.revealInit();
//     UI.accordions();
//     UI.newsletterForms();
//     UI.contactForm();
//     initChrome();
//     renderDynamicChrome();
//     var mnav = Nav.mobileNav();
//     if (mnav) {
//       /* close mobile nav when a link inside is clicked */
//       UI.$all('.mobile-nav a[href]').forEach(function (a) {
//         a.addEventListener('click', function () { mnav.close(); });
//       });
//     }
//     Wishlist.onChange(function () { Wishlist.updateBadges(); });
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', init);
//   } else {
//     init();
//   }

//   window.PLMWMain = { init: init };
// })(window, document);

// /**
//  * Store Location Tabs & Dynamic Map Switching
//  */
// function initStoreTabs() {
//   const tabButtons = document.querySelectorAll('.store-tab-btn');
//   const storeCards = document.querySelectorAll('.store-info-card');
//   const mapIframe = document.querySelector('.map-iframe');

//   const mapUrls = {
//     mumbai: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9142750694116!2d72.83151897593257!3d18.935105282240974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1ddb3f07297%3A0xbce5c79294d1f211!2sFort%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714560000000!5m2!1sen!2sin",

//   };

//   tabButtons.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const targetStore = btn.getAttribute('data-store');

//       tabButtons.forEach(b => b.classList.remove('active'));
//       storeCards.forEach(c => c.classList.remove('active'));

//       btn.classList.add('active');
//       const activeCard = document.getElementById(`store-${targetStore}`);
//       if (activeCard) activeCard.classList.add('active');

//       if (mapIframe && mapUrls[targetStore]) {
//         mapIframe.src = mapUrls[targetStore];
//       }
//     });
//   });
// }

// /* ==========================================================================
//    PL MENS WEAR — SEARCH
//    Full-screen search overlay with trending chips + live results
//    Exposes window.PLMWSearch
//    ========================================================================== */

// (function (window, document) {
//   'use strict';

//   var UI = window.PLMWUI, Data = window.PLMW, Nav = window.PLMWNav;
//   var $ = UI.$;

//   var els = {};

//   function ensureOverlay() {
//     if (els.overlay) return;
//     els.overlay = document.querySelector('.search-overlay');
//     if (!els.overlay) {
//       var d = document.createElement('div');
//       d.className = 'search-overlay';
//       d.setAttribute('role', 'dialog');
//       d.setAttribute('aria-modal', 'true');
//       d.setAttribute('aria-label', 'Search');
//       d.innerHTML =
//         '<div class="search-overlay__inner">' +
//         '  <button class="search-overlay__close icon-btn" data-search-close aria-label="Close search">' + UI.icon('close') + '</button>' +
//         '  <form class="search-form" role="search">' +
//         '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
//         '    <input id="plmw-search-input" type="search" placeholder="Search for shirts, trousers, polos..." autocomplete="off" aria-label="Search products">' +
//         '  </form>' +
//         '  <p class="search-hint">Press Esc to close</p>' +
//         '  <div class="search-trending">' +
//         '    <h3>Trending searches</h3>' +
//         '    <ul data-trending></ul>' +
//         '  </div>' +
//         '  <div class="search-results" data-results aria-live="polite"></div>' +
//         '</div>';
//       document.body.appendChild(d);
//       els.overlay = d;
//     }
//     els.input = $('.search-form input', els.overlay);
//     els.trending = $('[data-trending]', els.overlay);
//     els.results = $('[data-results]', els.overlay);

//     els.overlay.addEventListener('click', function (e) {
//       if (e.target.closest('[data-search-close]')) { close(); }
//       if (e.target.closest('.search-hit')) { close(); }
//     });
//     els.input.addEventListener('input', run);
//     els.overlay.addEventListener('click', function (e) {
//       var chip = e.target.closest('[data-term]');
//       if (chip) { els.input.value = chip.getAttribute('data-term'); run(); els.input.focus(); }
//     });
//   }

//   function fillTrending() {
//     var terms = Data.getConfig().trendingSearches || [];
//     els.trending.innerHTML = terms.map(function (t) {
//       return '<li><button type="button" data-term="' + t + '">' + t + '</button></li>';
//     }).join('');
//   }

//   function run() {
//     var q = els.input.value.trim().toLowerCase();
//     if (q.length < 2) {
//       els.results.classList.remove('is-active');
//       els.results.innerHTML = '';
//       return;
//     }
//     var list = Data.getProducts().filter(function (p) {
//       var hay = (p.name + ' ' + p.category + ' ' + p.collection + ' ' + (p.colors || []).join(' ') + ' ' + (p.fabric || '')).toLowerCase();
//       return q.split(/\s+/).every(function (word) { return hay.indexOf(word) !== -1; });
//     });
//     var html = '<p class="search-results__head">' + list.length + ' result' + (list.length === 1 ? '' : 's') + ' for “' + escapeHtml(q) + '”</p>';
//     if (!list.length) {
//       html += '<p class="search-empty is-active">No pieces match that search — try “linen”, “polo” or “jeans”.</p>';
//     } else {
//       html += list.slice(0, 8).map(function (p) {
//         return '<a class="search-hit" href="#collections" data-quickview="' + p.id + '">' +
//           '<img src="' + Data.productImage(p.id, 'a') + '" alt="' + p.name + '" loading="lazy">' +
//           '<span><span class="search-hit__name">' + p.name + '</span><br>' +
//           '<span class="search-hit__meta">' + p.category + ' · ' + p.collection + '</span></span>' +
//           '<span class="search-hit__price">' + Data.formatPrice(p.price) + '</span>' +
//           '</a>';
//       }).join('');
//       if (list.length > 8) {
//         html += '<a class="btn btn--block" style="margin-top:18px" href="#collections" data-search-close>Browse all collections</a>';
//       }
//     }
//     els.results.innerHTML = html;
//     els.results.classList.add('is-active');
//   }

//   function escapeHtml(s) {
//     return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//   }

//   function open() {
//     ensureOverlay();
//     fillTrending();
//     els.overlay.classList.add('is-open');
//     Nav.lockScroll();
//     document.addEventListener('keydown', esc);
//     setTimeout(function () { els.input.focus(); }, 60);
//   }
//   function close() {
//     if (!els.overlay) return;
//     els.overlay.classList.remove('is-open');
//     Nav.unlockScroll();
//     document.removeEventListener('keydown', esc);
//   }
//   function esc(e) { if (e.key === 'Escape') { close(); } }

//   function init() {
//     document.addEventListener('click', function (e) {
//       if (e.target.closest('[data-search-open]')) { e.preventDefault(); open(); }
//     });
//   }

//   window.PLMWSearch = { open: open, close: close };
//   init();
// })(window, document);

// /* ==========================================================================
//    PL MENS WEAR — WISHLIST
//    localStorage-backed wishlist with header count + toast feedback
//    Exposes window.PLMWWishlist
//    ========================================================================== */

// (function (window) {
//   'use strict';

//   var KEY = 'plmw-wishlist';
//   var listeners = [];

//   function read() {
//     try { return JSON.parse(localStorage.getItem(KEY)) || []; }
//     catch (e) { return []; }
//   }
//   function write(list) {
//     try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* private mode */ }
//     listeners.forEach(function (fn) { fn(list); });
//   }

//   function has(id) { return read().indexOf(id) !== -1; }
//   function count() { return read().length; }

//   function toggle(id) {
//     var list = read();
//     var i = list.indexOf(id);
//     if (i === -1) { list.push(id); write(list); return true; }
//     list.splice(i, 1); write(list); return false;
//   }
//   function add(id) {
//     if (has(id)) return false;
//     var list = read(); list.push(id); write(list); return true;
//   }
//   function remove(id) {
//     var list = read();
//     var i = list.indexOf(id);
//     if (i !== -1) { list.splice(i, 1); write(list); return true; }
//     return false;
//   }

//   function updateBadges() {
//     document.querySelectorAll('[data-wishlist-count]').forEach(function (el) {
//       var n = count();
//       el.textContent = String(n);
//       el.style.display = n > 0 ? '' : 'none';
//     });
//   }

//   document.addEventListener('DOMContentLoaded', updateBadges);

//   window.PLMWWishlist = {
//     has: has, count: count, toggle: toggle, add: add, remove: remove,
//     updateBadges: updateBadges,
//     onChange: function (fn) { listeners.push(fn); }
//   };
// })(window);

/* ==========================================================================
   PL MENS WEAR — single script
   Preloader · header · mega/mobile nav · scroll reveal · contact form
   · background music · "Every Journey" terrain element
   ========================================================================== */

/* --------------------------------------------------------------------------
   Small helpers
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $all = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

let scrollLocks = 0;
function lockScroll() {
  scrollLocks += 1;
  document.body.classList.add("nav-locked");
}
function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.classList.remove("nav-locked");
}

/* --------------------------------------------------------------------------
   Background music (defined first so the preloader can call it)
   -------------------------------------------------------------------------- */
const siteMusic = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

function setMusicUI(isPlaying) {
  if (!musicToggle || !musicIcon) return;
  musicToggle.classList.toggle("playing", isPlaying);
  musicIcon.textContent = isPlaying ? "♫" : "🔇";
}

function startSiteMusic() {
  if (!siteMusic) return;
  const p = siteMusic.play();
  if (p !== undefined) {
    p.then(() => setMusicUI(true)).catch(() => setMusicUI(false)); // autoplay blocked
  }
}

function initMusic() {
  if (!siteMusic || !musicToggle) return;
  siteMusic.volume = 0.5;

  musicToggle.addEventListener("click", async () => {
    if (siteMusic.paused) {
      try {
        await siteMusic.play();
      } catch (e) {
        console.log("Unable to play music:", e);
      }
    } else {
      siteMusic.pause();
    }
  });

  siteMusic.addEventListener("play", () => setMusicUI(true));
  siteMusic.addEventListener("pause", () => setMusicUI(false));

  // If autoplay is blocked, start on the first real user gesture
  const unlock = () => {
    if (siteMusic.paused && !siteMusic.dataset.userPaused) {
      siteMusic.play().catch(() => {});
    }
    ["click", "touchstart", "keydown"].forEach((evt) =>
      document.removeEventListener(evt, unlock),
    );
  };
  ["click", "touchstart", "keydown"].forEach((evt) =>
    document.addEventListener(evt, unlock, { once: true }),
  );

  // Do not let the unlock handler fight a deliberate pause
  musicToggle.addEventListener("click", () => {
    siteMusic.dataset.userPaused = siteMusic.paused ? "1" : "";
  });
}

/* --------------------------------------------------------------------------
   Preloader
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = $(".preloader__progress-bar");
  const hero = document.getElementById("home");

  if (!preloader) return;

  document.body.style.overflow = "hidden";
  let progress = 0;

  const timer = setInterval(() => {
    progress += 2;
    if (progressBar) progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        preloader.classList.add("preloader--hidden");
        document.body.style.overflow = "";
        if (hero) hero.classList.add("is-loaded");
        startSiteMusic();
        setTimeout(() => preloader.remove(), 800);
      }, 300);
    }
  }, 30);
}

/* --------------------------------------------------------------------------
   Hero video autoplay
   -------------------------------------------------------------------------- */
function initHeroVideo() {
  const video = $(".hero-video");
  if (!video) return;
  const start = () => {
    const p = video.play();
    if (p !== undefined)
      p.catch(() => console.log("Video autoplay was prevented."));
  };
  if (video.readyState >= 3) start();
  else video.addEventListener("canplay", start, { once: true });
}

/* --------------------------------------------------------------------------
   Header: scrolled state
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = $(".site-header");
  if (!header) return;
  const update = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* --------------------------------------------------------------------------
   Navigation: desktop mega menu + mobile drawer
   -------------------------------------------------------------------------- */
function initMegaMenu() {
  $all(".has-mega").forEach((item) => {
    const link = $(".nav-link", item);
    if (!link) return;

    const open = () => {
      item.classList.add("is-open");
      link.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      item.classList.remove("is-open");
      link.setAttribute("aria-expanded", "false");
    };

    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    link.addEventListener("click", close);
    $all("a", item).forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && item.classList.contains("is-open")) close();
    });
  });
}

function initMobileNav() {
  const nav = $(".mobile-nav");
  const scrim = $(".scrim");
  const openBtn = $(".hamburger");
  const closeBtn = nav ? $(".mobile-nav__close", nav) : null;
  if (!nav || !openBtn || !scrim) return;

  const close = () => {
    if (!nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    nav.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    scrim.classList.remove("is-visible");
    unlockScroll();
  };
  const open = () => {
    if (nav.classList.contains("is-open")) return;
    nav.classList.add("is-open");
    nav.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    scrim.classList.add("is-visible");
    lockScroll();
    if (closeBtn) closeBtn.focus();
  };

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  scrim.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  $all(".mobile-nav__accordion", nav).forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });

  // close when any link inside is tapped
  $all("a[href]", nav).forEach((a) => a.addEventListener("click", close));
}

/* --------------------------------------------------------------------------
   Scroll reveal
   .reveal / .reveal--img      -> adds "is-visible"
   .reveal-left / .reveal-right / .reveal-on-scroll / .reveal-clip -> "is-revealed"
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = $all(
    ".reveal, .reveal--img, .reveal-left, .reveal-right, .reveal-on-scroll, .reveal-clip",
  );
  if (!targets.length) return;

  const show = (el) => {
    el.classList.add("is-visible", "is-revealed");
  };

  if (!("IntersectionObserver" in window)) {
    targets.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  targets.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Contact form (validation + success message)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = $(".contact-form");
  if (!form) return;

  const success = $(".form-success", form);
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validateField = (input) => {
    const field = input.closest(".form-field");
    if (!field) return true;
    const value = input.value.trim();
    let ok = value !== "";
    if (ok && input.type === "email") ok = emailOk(value);
    field.classList.toggle("has-error", !ok);
    return ok;
  };

  const inputs = $all(
    "input[required], select[required], textarea[required]",
    form,
  );
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      const field = input.closest(".form-field");
      if (field && field.classList.contains("has-error")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = inputs.map(validateField);
    if (results.includes(false)) {
      if (success) success.textContent = "";
      const firstBad = inputs.find((i) =>
        i.closest(".form-field").classList.contains("has-error"),
      );
      if (firstBad) firstBad.focus();
      return;
    }

    // Open the visitor's mail app with the message pre-filled (no backend needed)
    const data = new FormData(form);
    const subject = encodeURIComponent(
      "[" + data.get("topic") + "] Message from " + data.get("name"),
    );
    const body = encodeURIComponent(
      data.get("message") +
        "\n\n— " +
        data.get("name") +
        " (" +
        data.get("email") +
        ")",
    );
    window.location.href =
      "mailto:contactplmenswear@gmail.com?subject=" + subject + "&body=" + body;

    if (success)
      success.textContent = "Thank you — your message is ready to send.";
    form.reset();
  });
}

/* ==========================================================================
   <plmw-terrain> — "Every Journey" pinned scroll choreography
   ========================================================================== */
(() => {
  "use strict";

  if (customElements.get("plmw-terrain")) return;

  const mobileQuery = window.matchMedia("(max-width: 919px)");

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const easeOut = (v) => 1 - Math.pow(1 - v, 3);
  const smoothstep = (v) => v * v * (3 - 2 * v);
  const lerp = (a, b, t) => a + (b - a) * t;

  class PlmwTerrain extends HTMLElement {
    connectedCallback() {
      if (this.connected) return;
      this.connected = true;

      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.pinObserver = new ResizeObserver(() => this.requestMeasure());
      this.onScroll = this.requestFrame.bind(this);
      this.onResize = () => {
        if (mobileQuery.matches && this.layoutWidth === window.innerWidth)
          return;
        this.requestMeasure();
      };
      this.onLayoutChange = () => this.requestMeasure();

      window.addEventListener("resize", this.onResize, { passive: true });
      this.motionQuery.addEventListener("change", this.onLayoutChange);
      mobileQuery.addEventListener("change", this.onLayoutChange);
      document.addEventListener("scroll", this.onScroll, { passive: true });

      requestAnimationFrame(() => {
        if (this.isConnected) this.refresh();
      });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          if (this.isConnected) this.measure();
        });
      }
      // images/videos change layout once loaded
      window.addEventListener("load", this.onLayoutChange);
    }

    disconnectedCallback() {
      this.connected = false;
      document.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.onResize);
      window.removeEventListener("load", this.onLayoutChange);
      this.motionQuery.removeEventListener("change", this.onLayoutChange);
      mobileQuery.removeEventListener("change", this.onLayoutChange);
      this.pinObserver.disconnect();
      if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
      if (this.measureRequest) cancelAnimationFrame(this.measureRequest);
      this.frameRequest = 0;
      this.measureRequest = 0;
      if (this.sectionWrapper)
        this.sectionWrapper.removeAttribute("data-terrain-sticky");
    }

    refresh() {
      this.pin = this.querySelector("[data-terrain-pin]");
      this.pinObserver.disconnect();
      if (this.pin) this.pinObserver.observe(this.pin);

      this.firstWord = this.querySelector("[data-terrain-first]");
      this.secondWord = this.querySelector("[data-terrain-second]");
      this.introMedia = this.querySelector("[data-terrain-intro-media]");
      this.rulerFirst = this.querySelector("[data-terrain-ruler-first]");
      this.rulerSecond = this.querySelector("[data-terrain-ruler-second]");
      this.rail = this.querySelector(".terrain__rail");
      this.sectionWrapper =
        this.closest(".terrain-section") || this.parentElement;

      this.cards = Array.from(this.querySelectorAll("[data-terrain-card]"));
      this.labels = this.cards.map((c) => c.querySelector(".terrain__label"));

      this.cards.forEach((c) => c.removeAttribute("data-featured"));
      this.featuredCard = this.cards[Math.floor(this.cards.length / 2)];
      if (this.featuredCard)
        this.featuredCard.setAttribute("data-featured", "true");
      this.featuredImage = this.featuredCard
        ? this.featuredCard.querySelector(".terrain__image")
        : null;

      this.ensureIntroImage();
      this.requestMeasure();
    }

    ensureIntroImage() {
      if (!this.introMedia || !this.featuredImage) return;
      const configured = this.introMedia.querySelector(".terrain__intro-image");
      if (configured) {
        this.introImage = configured;
        return;
      }
      const clone = this.featuredImage.cloneNode(true);
      clone.removeAttribute("id");
      clone.removeAttribute("loading");
      clone.alt = "";
      clone.setAttribute("aria-hidden", "true");
      this.introMedia.replaceChildren(clone);
      this.introImage = clone;
    }

    unavailableReason() {
      if (this.dataset.enableAnimation !== "true") return "sticky-disabled";
      if (this.motionQuery.matches) return "reduced-motion";
      if (!this.cards || !this.cards.length) return "no-cards";
      if (!this.featuredCard || !this.featuredImage) return "no-featured-image";
      return "";
    }

    reset() {
      this.removeAttribute("data-motion-ready");
      this.removeAttribute("data-done");
      this.removeAttribute("data-measuring");
      if (this.sectionWrapper)
        this.sectionWrapper.removeAttribute("data-terrain-sticky");
      this.setInteractive(true);
      this.measurements = null;
      this.lastProgress = null;
      [this.firstWord, this.secondWord].forEach((w) => {
        if (w) w.style.cssText = "";
      });
      if (this.introMedia) this.introMedia.style.cssText = "";
      (this.cards || []).forEach((c) => {
        c.style.opacity = "";
        c.style.transform = "";
        c.style.visibility = "";
      });
      (this.labels || []).forEach((l) => {
        if (l) l.style.opacity = "";
      });
    }

    setInteractive(interactive) {
      this.toggleAttribute("data-cards-interactive", interactive);
      if (!this.rail) return;
      if (interactive) {
        this.rail.removeAttribute("inert");
        this.rail.removeAttribute("aria-hidden");
      } else {
        this.rail.setAttribute("inert", "");
        this.rail.setAttribute("aria-hidden", "true");
      }
    }

    requestMeasure() {
      if (this.measureRequest) return;
      this.measureRequest = requestAnimationFrame(() => {
        this.measureRequest = 0;
        if (this.isConnected) this.measure();
      });
    }

    measure() {
      if (
        !this.pin ||
        !this.firstWord ||
        !this.secondWord ||
        !this.introMedia ||
        !this.rulerFirst ||
        !this.rulerSecond
      )
        return;

      const unavailable = this.unavailableReason();
      if (unavailable) {
        this.reset();
        this.dataset.motionState = unavailable;
        return;
      }
      this.dataset.motionState = "ready";
      this.layoutWidth = window.innerWidth;

      this.setAttribute("data-measuring", "");
      this.setAttribute("data-motion-ready", "");
      if (this.sectionWrapper && this.dataset.stickySection === "true") {
        this.sectionWrapper.setAttribute("data-terrain-sticky", "");
      }
      this.setInteractive(false);
      this.cards.forEach((c) => {
        c.style.transform = "";
      });

      const pinRect = this.pin.getBoundingClientRect();
      this.viewport = pinRect.height;

      const relativeRect = (el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - pinRect.left,
          top: r.top - pinRect.top,
          width: r.width,
          height: r.height,
        };
      };

      [this.firstWord, this.secondWord].forEach((w) => {
        w.style.position = "";
        w.style.left = "";
        w.style.top = "";
        w.style.transform = "";
        w.style.visibility = "";
        w.style.opacity = "";
      });
      this.introMedia.style.cssText = "";
      this.introMedia.style.width = "0px";

      const startWidth = mobileQuery.matches ? 96 : 150;
      const startHeight = mobileQuery.matches ? 122 : 190;
      this.introMedia.style.height = startHeight + "px";

      const firstStart = relativeRect(this.firstWord);
      const secondStart = relativeRect(this.secondWord);
      const centre =
        (firstStart.left + firstStart.width + secondStart.left) / 2;

      this.measurements = {
        firstStart,
        secondStart,
        imageStart: {
          left: centre,
          top: firstStart.top + firstStart.height / 2 - startHeight / 2,
          width: startWidth,
          height: startHeight,
        },
        firstEnd: relativeRect(this.rulerFirst),
        secondEnd: relativeRect(this.rulerSecond),
        imageEnd: relativeRect(this.featuredImage),
      };

      [
        [this.firstWord, firstStart],
        [this.secondWord, secondStart],
      ].forEach(([word, rect]) => {
        word.style.position = "absolute";
        word.style.left = rect.left + "px";
        word.style.top = rect.top + "px";
      });
      this.introMedia.style.position = "absolute";
      this.introMedia.style.left = this.measurements.imageStart.left + "px";
      this.introMedia.style.top = this.measurements.imageStart.top + "px";

      this.lastProgress = null;
      this.render();
      this.removeAttribute("data-measuring");
    }

    requestFrame() {
      if (this.frameRequest || !this.measurements) return;
      this.frameRequest = requestAnimationFrame(() => {
        this.frameRequest = 0;
        this.render();
      });
    }

    placeWord(el, start, end, initialOffset, progress) {
      const scale = lerp(1, end.width / Math.max(start.width, 1), progress);
      const x = lerp(initialOffset, end.left - start.left, progress);
      const y = lerp(0, end.top - start.top, progress);
      el.style.transform =
        "translate3d(" +
        x.toFixed(2) +
        "px," +
        y.toFixed(2) +
        "px,0) scale(" +
        scale.toFixed(4) +
        ")";
    }

    orderedCards() {
      const fi = Math.max(0, this.cards.indexOf(this.featuredCard));
      const out = [];
      for (let d = 1; out.length < this.cards.length - 1; d += 1) {
        const left = this.cards[fi - d];
        const right = this.cards[fi + d];
        if (left) out.push({ card: left, direction: -1, distance: d });
        if (right) out.push({ card: right, direction: 1, distance: d });
        if (!left && !right) break;
      }
      return out;
    }

    render() {
      if (!this.measurements) return;

      const bounds = this.getBoundingClientRect();
      const hold = this.viewport;
      const run = Math.max(bounds.height - this.viewport - hold, 1);
      const progress = clamp((0 - bounds.top) / run);
      if (progress === this.lastProgress) return;
      this.lastProgress = progress;

      // phase 1 — wedge widens between the words
      const widen = easeOut(clamp(progress / 0.3));
      const wedgeWidth = this.measurements.imageStart.width * widen;
      const wordPush = (wedgeWidth + 32 * widen) / 2;

      // phase 2 — words + wedge fly to final positions
      const flight = smoothstep(clamp((progress - 0.38) / 0.48));

      this.placeWord(
        this.firstWord,
        this.measurements.firstStart,
        this.measurements.firstEnd,
        -wordPush,
        flight,
      );
      this.placeWord(
        this.secondWord,
        this.measurements.secondStart,
        this.measurements.secondEnd,
        wordPush,
        flight,
      );

      const wordOpacity = 1 - 0.9 * smoothstep(clamp((progress - 0.52) / 0.32));
      this.firstWord.style.opacity = wordOpacity.toFixed(3);
      this.secondWord.style.opacity = wordOpacity.toFixed(3);

      const s = this.measurements.imageStart;
      const e = this.measurements.imageEnd;
      this.introMedia.style.left =
        lerp(s.left - wedgeWidth / 2, e.left, flight).toFixed(2) + "px";
      this.introMedia.style.top = lerp(s.top, e.top, flight).toFixed(2) + "px";
      this.introMedia.style.width =
        lerp(wedgeWidth, e.width, flight).toFixed(2) + "px";
      this.introMedia.style.height =
        lerp(s.height, e.height, flight).toFixed(2) + "px";

      const done = flight >= 0.985;
      this.toggleAttribute("data-done", done);
      this.setInteractive(progress >= 0.99);

      const vis = done ? "hidden" : "visible";
      this.introMedia.style.visibility = vis;
      this.firstWord.style.visibility = vis;
      this.secondWord.style.visibility = vis;

      // labels: featured first, then outward
      const fi = this.cards.indexOf(this.featuredCard);
      [fi, fi - 1, fi + 1, fi - 2, fi + 2]
        .filter((i) => i >= 0 && i < this.labels.length)
        .forEach((labelIndex, order) => {
          const label = this.labels[labelIndex];
          if (!label) return;
          label.style.opacity = smoothstep(
            clamp((progress - (0.62 + order * 0.045)) / 0.14),
          ).toFixed(3);
        });

      // cards: featured holds, neighbours slide in
      this.featuredCard.style.opacity = "1";
      this.featuredCard.style.visibility =
        progress > 0.62 ? "visible" : "hidden";
      this.orderedCards().forEach(({ card, direction, distance }, order) => {
        const reveal = smoothstep(
          clamp((progress - (0.66 + order * 0.05)) / 0.16),
        );
        card.style.opacity = reveal.toFixed(3);
        card.style.visibility = reveal > 0 ? "visible" : "hidden";
        card.style.transform = done
          ? ""
          : "translate3d(" +
            lerp(direction * (distance === 1 ? 34 : 56), 0, reveal).toFixed(2) +
            "px,0,0)";
      });
    }
  }

  customElements.define("plmw-terrain", PlmwTerrain);
})();

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
function boot() {
  initPreloader();
  initHeroVideo();
  initHeader();
  initMegaMenu();
  initMobileNav();
  initScrollReveal();
  initContactForm();
  initMusic();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
