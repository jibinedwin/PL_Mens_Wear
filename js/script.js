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
    progress += 4;
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
   Lazy videos: only download/play a video when it is needed
   [data-lazy-src]                       -> loads when scrolled near the viewport
   [data-lazy-src][data-lazy-trigger=hover] -> loads on first hover of the mega menu
   -------------------------------------------------------------------------- */
function loadLazyVideo(video) {
  if (!video.dataset.lazySrc) return;
  video.src = video.dataset.lazySrc;
  delete video.dataset.lazySrc;
  const p = video.play();
  if (p !== undefined) p.catch(() => {});
}

function initLazyVideos() {
  $all("video[data-lazy-src]").forEach((video) => {
    if (video.dataset.lazyTrigger === "hover") {
      const host = video.closest(".has-mega") || video;
      host.addEventListener("mouseenter", () => loadLazyVideo(video), {
        once: true,
      });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      loadLazyVideo(video);
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadLazyVideo(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(video);
  });
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
   .reveal-left / .reveal-right -> "is-revealed"
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = $all(
    ".reveal, .reveal--img, .reveal-left, .reveal-right",
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

    // Open WhatsApp with the message pre-filled (no backend needed)
    const data = new FormData(form);
    const text =
      "*" + data.get("topic") + "*\n" +
      "Name: " + data.get("name") + "\n" +
      "Email: " + data.get("email") + "\n\n" +
      data.get("message");
    window.open(
      "https://wa.me/916385779315?text=" + encodeURIComponent(text),
      "_blank",
      "noopener",
    );

    if (success)
      success.textContent = "Thank you — opening WhatsApp to send your message.";
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
      const clone = this.featuredImage.cloneNode(true);
      clone.removeAttribute("id");
      clone.removeAttribute("loading");
      clone.alt = "";
      clone.setAttribute("aria-hidden", "true");
      this.introMedia.replaceChildren(clone);
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
  initHeader();
  initLazyVideos();
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