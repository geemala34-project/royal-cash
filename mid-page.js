/* =========================================================
   ROYAL CASH — MID PAGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const gamesBtn = document.getElementById("gamesBtn");

    gamesBtn?.addEventListener("click", () => {
        const gamesSection = document.getElementById("games");

        if (gamesSection) {
            gamesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            window.location.href = "index.html#games";
        }
    });

});


/* =========================================================
   ROYAL CASH — 6 REVIEW CAROUSEL JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("reviewsTrack");
    const prev = document.getElementById("reviewPrev");
    const next = document.getElementById("reviewNext");
    const dots = [...document.querySelectorAll("#reviewDots button")];

    if (!track || !prev || !next) return;

    let page = 0;
    const totalPages = 2;

    function showPage(newPage) {
        page = Math.max(0, Math.min(newPage, totalPages - 1));

        const cards = [...track.querySelectorAll(".review-card")];
        const viewport = track.parentElement;

        if (window.innerWidth <= 650) {
            const cardWidth = viewport.clientWidth;
            track.style.transform = `translateX(-${page * cardWidth * 3}px)`;
        } else {
            const gap = 22;
            const cardWidth = cards[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${page * (cardWidth * 3 + gap * 3)}px)`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === page);
        });
    }

    next.addEventListener("click", () => {
        showPage(page + 1 >= totalPages ? 0 : page + 1);
    });

    prev.addEventListener("click", () => {
        showPage(page - 1 < 0 ? totalPages - 1 : page - 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => showPage(i));
    });

    window.addEventListener("resize", () => showPage(page));

    showPage(0);
});


/* =========================================================
   ROYAL CASH — SUBSCRIBE API CONNECTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const subscribeScreen = document.getElementById("subscribeScreen");
    const subscribeBtn = document.getElementById("subscribeBtn");


    // Google se aaya token URL mein ho to save karo (LAZMI)
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
        localStorage.setItem("token", urlToken);

        const urlName = params.get("name");
        const urlEmail = params.get("email");

        if (urlName || urlEmail) {
            localStorage.setItem("user", JSON.stringify({
                name: urlName ? decodeURIComponent(urlName) : "",
                email: urlEmail ? decodeURIComponent(urlEmail) : ""
            }));
        }

        window.history.replaceState({}, "", "mid-page.html");
    }


    function openSubscribeScreen() {

        subscribeScreen.classList.add("show");

        subscribeScreen.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "subscribe-locked"
        );

    }


    // Google se naya user aaye to subscribe screen khud-ba-khud kholo
    if (params.get("google") === "true") {
        openSubscribeScreen();
    }


    subscribeBtn?.addEventListener("click", async () => {


        const token = localStorage.getItem("token");


        if(!token){

            alert("Please login first");
            return;

        }


        try {


            const response = await fetch(
"https://royal-cash-backend-production-04cf.up.railway.app/subscription/subscribe",
                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json",

                        "Authorization":
                        "Bearer " + token

                    },

                    body:JSON.stringify({})

                }
            );


            const data = await response.json();



            if(!response.ok){

                alert(
                    data.message || "Subscription failed"
                );

                return;

            }



            console.log(
                "Subscription:",
                data
            );


            // Save subscriber status

            localStorage.setItem(
                "subscribed",
                "true"
            );


            // Go home

            window.location.href =
            "home.html";



        }
        catch(error){

            console.log(error);

            alert(
                "Server connection failed"
            );

        }


    });


});
