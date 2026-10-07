/* =========================================
   BACKGROUND MUSIC
========================================= */

const siteMusic = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

siteMusic.volume = 0.5;
/*
 * Real user-gesture events only.
 * Browsers (Chrome / Safari / Firefox) allow audible playback only after an
 * ACTUAL user gesture — synthetic/programmatic clicks do not count,
 * and neither do scroll or mousemove.
 */
const MUSIC_ACTIVATION_EVENTS = ["pointerdown", "touchstart", "click", "keydown"];

let musicStartRequested = false;

function removeMusicActivationListeners(handler) {
    MUSIC_ACTIVATION_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handler);
    });
}



/* =========================================
   START MUSIC AFTER PRELOADER
========================================= */

function startSiteMusic() {
    if (musicStartRequested) return;
    musicStartRequested = true;

    const tryPlay = () => {
        siteMusic.muted = false;
        siteMusic.volume = 0.5;
        siteMusic.currentTime = 0;
        const playPromise = siteMusic.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Music started — stop listening for retries
                    removeMusicActivationListeners(tryPlay);
                })
                .catch(() => {
                    // Browser blocked autoplay (no user gesture yet).
                    // Stay silent and retry on the first real interaction.
                    musicToggle.classList.remove("playing");
                    musicIcon.textContent = "🔇";
                });
        }
    };

    // Attempt 1: starts immediately when the browser allows it
    // (returning visitor, or the user already interacted with this page).
    tryPlay();

    // Attempt 2+: retry silently on the first REAL user gesture until allowed.
    MUSIC_ACTIVATION_EVENTS.forEach((evt) => {
        window.addEventListener(evt, tryPlay);
    });
}


/* =========================================
   MUSIC ON / OFF
========================================= */

musicToggle.addEventListener("click", async () => {

    if (siteMusic.paused) {

        try {

            await siteMusic.play();

            musicToggle.classList.add("playing");
            musicIcon.textContent = "♫";

        } catch (error) {

            console.log("Unable to play music.");

        }

    } else {

        siteMusic.pause();

        musicToggle.classList.remove("playing");
        musicIcon.textContent = "🔇";

    }

});


/* =========================================
   KEEP BUTTON STATE CORRECT
========================================= */

siteMusic.addEventListener("play", () => {

    musicToggle.classList.add("playing");
    musicIcon.textContent = "♫";

});


siteMusic.addEventListener("pause", () => {

    musicToggle.classList.remove("playing");
    musicIcon.textContent = "🔇";

});