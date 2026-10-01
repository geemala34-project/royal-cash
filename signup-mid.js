/* =========================================================
   ROYAL CASH — AUTH CONNECTION
   LOGIN + SIGNUP + JWT + SUBSCRIPTION CHECK
========================================================= */

(function () {
"use strict";


const API_URL = "https://royal-cash-backend-production-04cf.up.railway.app";

const loginModal = document.getElementById("rcLoginModal");
const signupModal = document.getElementById("rcSignupModal");

const loginForm = document.getElementById("rcLoginForm");
const signupForm = document.getElementById("rcSignupForm");

const subscribeScreen = document.getElementById("subscribeScreen");



/* ================= MODALS ================= */

function openModal(modal){

    loginModal.classList.remove("rc-auth-open");
    signupModal.classList.remove("rc-auth-open");

    modal.classList.add("rc-auth-open");
    modal.setAttribute("aria-hidden","false");

}


function closeModals(){

    loginModal.classList.remove("rc-auth-open");
    signupModal.classList.remove("rc-auth-open");

    loginModal.setAttribute("aria-hidden","true");
    signupModal.setAttribute("aria-hidden","true");

}



/* LOGIN BUTTON */

document.getElementById("loginBtn")?.addEventListener("click",()=>{
    openModal(loginModal);
});


/* JOIN BUTTONS */

document.querySelectorAll("#joinTopBtn,#joinHeroBtn")
.forEach(btn=>{

btn?.addEventListener("click",()=>{
    openModal(signupModal);
});

});



/* SWITCH LOGIN/SIGNUP */

document.querySelectorAll("[data-switch-auth]")
.forEach(btn=>{

btn.addEventListener("click",()=>{

if(btn.dataset.switchAuth==="signup"){
    openModal(signupModal);
}
else{
    openModal(loginModal);
}

});

});



/* CLOSE */

document.querySelectorAll("[data-close-auth]")
.forEach(btn=>{

btn.addEventListener("click",closeModals);

});



/* ================= LOGIN ================= */


loginForm?.addEventListener("submit", async(e)=>{

e.preventDefault();


const email =
document.getElementById("rcLoginEmail").value;


const password =
document.getElementById("rcLoginPassword").value;



try{


const response = await fetch(
`${API_URL}/auth/login`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

});


const data = await response.json();


if(!response.ok){

alert(data.message || "Login failed");
return;

}



/* SAVE TOKEN */

localStorage.setItem(
"token",
data.accessToken
);



localStorage.setItem(
"subscribed",
data.subscribed
);

localStorage.setItem(
"user",
JSON.stringify(data.user)
);



if(data.subscribed){

window.location.href="home.html";

}
else{

openSubscribe();

}



}
catch(error){

console.log(error);
alert("Server connection failed");

}


});




/* ================= SIGNUP ================= */


signupForm?.addEventListener("submit", async(e)=>{

e.preventDefault();


const username =
document.getElementById("rcSignupUsername").value;


const email =
document.getElementById("rcSignupEmail").value;


const password =
document.getElementById("rcSignupPassword").value;


const confirmPassword =
document.getElementById("rcSignupConfirm").value;



if(password !== confirmPassword){

alert("Passwords do not match");
return;

}



try{


const response = await fetch(
`${API_URL}/auth/signup`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,
email,
password,
confirmPassword

})

});



const data = await response.json();



if(!response.ok){

alert(data.message || "Signup failed");
return;

}


// SAVE NEW USER DATA

localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);


// Open subscribe screen

openSubscribe();


}
catch(error){

console.log(error);
alert("Server connection failed");

}


});

/* ================= GOOGLE LOGIN ================= */

document.querySelectorAll("[data-google-sample]")
.forEach((btn)=>{

    btn.addEventListener("click",()=>{

        window.location.href =
        "https://royal-cash-backend-production.up.railway.app/auth/google";

    });

});



/* ================= SUBSCRIBE SCREEN ================= */


function openSubscribe(){

if(!subscribeScreen) return;


subscribeScreen.classList.add("show");

subscribeScreen.setAttribute(
"aria-hidden",
"false"
);

}



})();

document.querySelectorAll("[data-password-toggle]").forEach(button => {

    button.addEventListener("click", () => {

        const passwordId = button.getAttribute("data-password-toggle");
        const passwordInput = document.getElementById(passwordId);

        if(passwordInput.type === "password"){
            passwordInput.type = "text";
        }
        else{
            passwordInput.type = "password";
        }

    });

});
