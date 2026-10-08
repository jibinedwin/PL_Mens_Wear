/* =========================================
   BACKGROUND MUSIC
========================================= */

const siteMusic = document.getElementById("siteMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

siteMusic.volume = 0.5;


/* =========================================
   TRY TO START MUSIC AUTOMATICALLY
========================================= */

function startSiteMusic() {

    siteMusic.currentTime = 0;

    const playPromise = siteMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                // Music started successfully
                musicToggle.classList.add("playing");
                musicIcon.textContent = "♫";

                console.log("Background music started.");

            })
            .catch(() => {

                // Browser blocked autoplay
                musicToggle.classList.remove("playing");
                musicIcon.textContent = "🔇";

                console.log(
                    "Autoplay was blocked. Waiting for user interaction."
                );

            });
    }
}


/* =========================================
   START MUSIC AFTER FIRST USER INTERACTION
========================================= */

function enableMusicAfterInteraction() {

    if (siteMusic.paused) {

        siteMusic.play()
            .then(() => {

                musicToggle.classList.add("playing");
                musicIcon.textContent = "♫";

            })
            .catch(() => {});

    }

    document.removeEventListener("click", enableMusicAfterInteraction);
    document.removeEventListener("touchstart", enableMusicAfterInteraction);
    document.removeEventListener("keydown", enableMusicAfterInteraction);
}


/* =========================================
   MUSIC ON / OFF
========================================= */

musicToggle.addEventListener("click", async function () {

    if (siteMusic.paused) {

        try {

            await siteMusic.play();

            musicToggle.classList.add("playing");
            musicIcon.textContent = "♫";

        } catch (error) {

            console.log("Unable to play music:", error);

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

siteMusic.addEventListener("play", function () {

    musicToggle.classList.add("playing");
    musicIcon.textContent = "♫";

});


siteMusic.addEventListener("pause", function () {

    musicToggle.classList.remove("playing");
    musicIcon.textContent = "🔇";

});


/* =========================================
   TRY AUTOPLAY
========================================= */

window.addEventListener("load", function () {

    startSiteMusic();

});


/* =========================================
   FALLBACK FOR BROWSER AUTOPLAY BLOCK
========================================= */

document.addEventListener(
    "click",
    enableMusicAfterInteraction,
    { once: true }
);

document.addEventListener(
    "touchstart",
    enableMusicAfterInteraction,
    { once: true }
);

document.addEventListener(
    "keydown",
    enableMusicAfterInteraction,
    { once: true }
);