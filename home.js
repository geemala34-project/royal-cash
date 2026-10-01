

/* =========================================================
   ROYAL CASH HOME JS
   Slider + game-row controls + premium desktop tilt
========================================================= */


/* =========================
   EMPTY AUTO SLIDER
========================= */

const slides = document.querySelectorAll(".update-slide");
const dotsContainer = document.getElementById("sliderDots");
const prevButton = document.getElementById("sliderPrev");
const nextButton = document.getElementById("sliderNext");

let currentSlide = 0;
let sliderTimer = null;


/* Create slider dots automatically */
slides.forEach((slide, index) => {
  const dot = document.createElement("button");

  dot.className = "slider-dot";

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
    restartSlider();
  });

  dotsContainer.appendChild(dot);
});


function getDots() {
  return document.querySelectorAll(".slider-dot");
}


function showSlide(index) {
  const dots = getDots();

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (slides[index]) {
    slides[index].classList.add("active");
  }

  if (dots[index]) {
    dots[index].classList.add("active");
  }
}


function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}


function previousSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}


function startSlider() {
  if (slides.length <= 1) return;

  sliderTimer = setInterval(nextSlide, 4500);
}


function restartSlider() {
  clearInterval(sliderTimer);
  startSlider();
}


nextButton?.addEventListener("click", () => {
  nextSlide();
  restartSlider();
});


prevButton?.addEventListener("click", () => {
  previousSlide();
  restartSlider();
});


startSlider();



/* =========================
   GAME ROW ARROWS
   Desktop/tablet use buttons.
   Mobile users can swipe naturally.
========================= */

document.querySelectorAll(".game-row-wrap").forEach((wrapper) => {
  const row = wrapper.querySelector(".game-row");
  const leftButton = wrapper.querySelector(".row-left");
  const rightButton = wrapper.querySelector(".row-right");

  const scrollAmount = () => {
    const firstCard = row?.querySelector(".game-card");

    if (!firstCard) return 300;

    return firstCard.getBoundingClientRect().width + 20;
  };

  leftButton?.addEventListener("click", () => {
    row.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth"
    });
  });

  rightButton?.addEventListener("click", () => {
    row.scrollBy({
      left: scrollAmount(),
      behavior: "smooth"
    });
  });
});



/* =========================
   PROFESSIONAL LOGOUT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    const logoutModal = document.getElementById("logoutModal");

    const cancelLogout = document.getElementById("cancelLogout");

    const confirmLogout = document.getElementById("confirmLogout");


    logoutBtn?.addEventListener("click", () => {

        logoutModal?.classList.add("show");

    });


    cancelLogout?.addEventListener("click", () => {

        logoutModal?.classList.remove("show");

    });


    confirmLogout?.addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("subscribed");

         localStorage.removeItem("user");

        window.location.href = "mid-page.html";

    });

});

/* =========================
   SHOW LOGGED USER NAME
========================= */

document.addEventListener("DOMContentLoaded",()=>{

    const userName =
    document.getElementById("userName");


    const user =
    JSON.parse(localStorage.getItem("user"));


    if(user && userName){

        userName.textContent = user.name;

    }

});

/* =========================
   PROFILE DROPDOWN
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const userProfile = document.querySelector(".user-profile");
    const userTop = document.querySelector(".user-top");


    userTop?.addEventListener("click", () => {

        userProfile.classList.toggle("active");

    });


    document.addEventListener("click", (e)=>{

        if(!userProfile?.contains(e.target)){

            userProfile.classList.remove("active");

        }

    });


});



// =========================
// PROFILE DASHBOARD FINAL
// =========================

document.addEventListener("DOMContentLoaded",()=>{


const myProfileBtn = document.getElementById("myProfileBtn");

const profileDashboard =
document.getElementById("profileDashboard");

const closeProfile =
document.getElementById("closeProfile");

const userProfile =
document.querySelector(".user-profile");



myProfileBtn?.addEventListener("click",(e)=>{

    e.stopPropagation();

    userProfile?.classList.remove("active");

    profileDashboard.style.display="flex";

});



closeProfile?.addEventListener("click",(e)=>{

    e.stopPropagation();

    profileDashboard.style.display="none";

    userProfile?.classList.remove("active");

});



});

// =========================
// LOAD PROFILE DATA
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const profileName =
    document.getElementById("profileName");


    const vipStatus =
    document.getElementById("vipStatus");


    if(user){

        if(profileName){
            profileName.textContent = user.name;
        }


        if(vipStatus){

            // temporary status
            if(vipStatus && user.vipLevel){

    vipStatus.textContent = user.vipLevel;

}

        }

    }

});

const imageUpload =
document.getElementById("imageUpload");


const profileImage =
document.getElementById("profileImage");



imageUpload?.addEventListener(
"change",
function(){


const file=this.files[0];


if(file){


const reader=new FileReader();


reader.onload=function(e){

profileImage.src=e.target.result;


localStorage.setItem(
"profileImage",
e.target.result
);


}


reader.readAsDataURL(file);


}


});




// load saved image

const savedImage =
localStorage.getItem("profileImage");


if(savedImage && profileImage){

profileImage.src=savedImage;

}

document.addEventListener("DOMContentLoaded",()=>{


const closeProfile = 
document.getElementById("closeProfile");


const profileDashboard =
document.getElementById("profileDashboard");



closeProfile?.addEventListener("click",()=>{

    profileDashboard.style.display="none";

    document
    .querySelector(".user-profile")
    ?.classList.remove("active");

});

});

// =========================
// PROFILE MENU SWITCH
// =========================

document.addEventListener("DOMContentLoaded",()=>{


const myProfileTab = document.getElementById("myProfileTab");

const securityTab = document.getElementById("securityTab");


const profileContent = document.getElementById("profileContent");

const securityContent = document.getElementById("securityContent");



/* SECURITY CLICK */

securityTab?.addEventListener("click",()=>{


    // hide profile
    profileContent.style.display="none";


    // show security
    securityContent.style.display="block";



    // active button change

    myProfileTab.classList.remove("active");

    securityTab.classList.add("active");


});





/* PROFILE CLICK */


myProfileTab?.addEventListener("click",()=>{


    // show profile

    profileContent.style.display="block";


    // hide security

    securityContent.style.display="none";



    // active button change

    securityTab.classList.remove("active");

    myProfileTab.classList.add("active");


});



});

document.addEventListener("DOMContentLoaded", function () {

    const termsTab = document.getElementById("termsTab");
    const termsDashboardTab = document.getElementById("termsDashboardTab");

    const profileDashboard = document.getElementById("profileDashboard");

    const profileContent = document.getElementById("profileContent");
    const securityContent = document.getElementById("securityContent");
    const termsContent = document.getElementById("termsContent");

    const myProfileTab = document.getElementById("myProfileTab");
    const securityTab = document.getElementById("securityTab");


   function showTerms() {

    if (!profileDashboard || !profileContent || !securityContent || !termsContent) {
        return;
    }


    profileDashboard.style.display = "flex";


    profileContent.style.display = "none";

    securityContent.style.display = "none";

    termsContent.style.display = "block";



    // remove all active buttons

    myProfileTab?.classList.remove("active");

    securityTab?.classList.remove("active");

    termsDashboardTab?.classList.remove("active");



    // add active only to terms

    termsDashboardTab?.classList.add("active");

}

    // TOP PROFILE DROPDOWN → TERMS
    termsTab?.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        showTerms();
    });


    // PROFILE SIDEBAR → TERMS
    termsDashboardTab?.addEventListener("click", function (e) {
        e.preventDefault();

        showTerms();
    });

});

/* =========================
   FIX ALL PROFILE ACTIVE BUTTONS
========================= */

document.addEventListener("DOMContentLoaded",()=>{


const profileButtons = document.querySelectorAll(
    "#myProfileTab, #securityTab, #termsDashboardTab"
);


profileButtons.forEach(btn=>{


    btn.addEventListener("click",()=>{


        // remove active from all

        profileButtons.forEach(item=>{

            item.classList.remove("active");

        });



        // add active to clicked one

        btn.classList.add("active");


    });


});


});

/* =========================
   FIX PROFILE CONTENT SWITCH
========================= */

document.addEventListener("DOMContentLoaded",()=>{


const profileContent = document.getElementById("profileContent");
const securityContent = document.getElementById("securityContent");
const termsContent = document.getElementById("termsContent");


const myProfileTab = document.getElementById("myProfileTab");
const securityTab = document.getElementById("securityTab");
const termsTab = document.getElementById("termsDashboardTab");



myProfileTab?.addEventListener("click",()=>{

    profileContent.style.display="block";

    securityContent.style.display="none";

    termsContent.style.display="none";

});



securityTab?.addEventListener("click",()=>{

    profileContent.style.display="none";

    securityContent.style.display="block";

    termsContent.style.display="none";

});



termsTab?.addEventListener("click",()=>{

    profileContent.style.display="none";

    securityContent.style.display="none";

    termsContent.style.display="block";

});


});

// =========================
// CHANGE PASSWORD
// =========================

document.addEventListener("DOMContentLoaded", () => {


    const updatePasswordBtn = document.querySelector(".security-update-btn");


    console.log("PASSWORD BUTTON:", updatePasswordBtn);



    if(updatePasswordBtn){


        updatePasswordBtn.addEventListener("click", async () => {


            const currentPassword =
            document.querySelector("#currentPassword").value;


            const newPassword =
            document.querySelector("#newPassword").value;


            const confirmPassword =
            document.querySelector("#confirmPassword").value;



            if(!currentPassword || !newPassword || !confirmPassword){

                alert("Please fill all password fields");
                return;

            }



            if(newPassword !== confirmPassword){

                alert("New passwords do not match");
                return;

            }



            const user = JSON.parse(
                localStorage.getItem("user")
            );



            if(!user){

                alert("User session not found. Please login again.");
                return;

            }



            try{


                const response = await fetch(
"https://royal-cash-backend-production-04cf.up.railway.app/auth/change-password",
                    {

                        method:"POST",

                        headers:{

                            "Content-Type":"application/json"

                        },


                        body:JSON.stringify({

                            email:user.email,

                            currentPassword:currentPassword,

                            newPassword:newPassword

                        })

                    }

                );



                const data = await response.json();



                if(response.ok){


                    alert("Password updated successfully");


                    document.querySelector("#currentPassword").value="";
                    document.querySelector("#newPassword").value="";
                    document.querySelector("#confirmPassword").value="";


                }
                else{


                    alert(
                        data.message || 
                        "Password update failed"
                    );


                }



            }
            catch(error){


                console.log(error);

                alert("Server connection error");


            }



        });


    }


});
