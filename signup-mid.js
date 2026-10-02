/* =========================================================
   ROYAL CASH — AUTH CONNECTION
   LOGIN + SIGNUP + OTP + TIMER + RESEND + JWT + SUBSCRIBE
========================================================= */

(function () {
"use strict";

const API_URL = "https://royal-cash-backend-production-04cf.up.railway.app";

const loginModal = document.getElementById("rcLoginModal");
const signupModal = document.getElementById("rcSignupModal");
const otpModal = document.getElementById("rcOtpModal");

const loginForm = document.getElementById("rcLoginForm");
const signupForm = document.getElementById("rcSignupForm");
const otpForm = document.getElementById("rcOtpForm");

const subscribeScreen = document.getElementById("subscribeScreen");

// OTP verify tak email/password yaad rakhne ke liye
let pendingEmail = "";
let pendingPassword = "";
let otpTimerInterval = null;


/* ================= MODALS ================= */

function openModal(modal){
    if(!modal) return;
    closeModals();
    modal.classList.add("rc-auth-open");
    modal.setAttribute("aria-hidden","false");
}

function openOtpModal(){
    closeModals();
    if(!otpModal) return;
    otpModal.classList.add("rc-otp-open");
    otpModal.setAttribute("aria-hidden","false");
}

function closeModals(){
    [loginModal, signupModal].forEach(m => {
        if(!m) return;
        m.classList.remove("rc-auth-open");
        m.setAttribute("aria-hidden","true");
    });
    if(otpModal){
        otpModal.classList.remove("rc-otp-open");
        otpModal.setAttribute("aria-hidden","true");
    }
    if(otpTimerInterval){
        clearInterval(otpTimerInterval);
        otpTimerInterval = null;
    }
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
        } else {
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

    const email = document.getElementById("rcLoginEmail").value;
    const password = document.getElementById("rcLoginPassword").value;

    try{
        const response = await fetch(`${API_URL}/auth/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        });
        const data = await response.json();
        if(!response.ok){ alert(data.message || "Login failed"); return; }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("subscribed", data.subscribed);
        localStorage.setItem("user", JSON.stringify(data.user));

        if(data.subscribed){
            window.location.href="home.html";
        } else {
            window.location.href="mid-page.html";
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

    const username = document.getElementById("rcSignupUsername").value;
    const email = document.getElementById("rcSignupEmail").value;
    const password = document.getElementById("rcSignupPassword").value;
    const confirmPassword = document.getElementById("rcSignupConfirm").value;

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    try{
        const response = await fetch(`${API_URL}/auth/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,email,password,confirmPassword})
        });
        const data = await response.json();
        if(!response.ok){ alert(data.message || "Signup failed"); return; }

        // OTP step ke liye yaad rakho
        pendingEmail = email;
        pendingPassword = password;

        // OTP modal kholo + timer shuru
        const otpEmailLabel = document.getElementById("rcOtpEmail");
        if(otpEmailLabel) otpEmailLabel.textContent = email;
        const otpInput = document.getElementById("rcOtpInput");
        if(otpInput) otpInput.value = "";
        openOtpModal();
        startOtpTimer();
    }
    catch(error){
        console.log(error);
        alert("Server connection failed");
    }
});


/* ================= OTP VERIFY ================= */

otpForm?.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const otp = document.getElementById("rcOtpInput").value.trim();
    if(!otp){ alert("Please enter the OTP"); return; }

    try{
        // 1. OTP verify karo
        const verifyRes = await fetch(`${API_URL}/auth/verify-otp`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ email: pendingEmail, otp })
        });
        const verifyData = await verifyRes.json();
        if(!verifyRes.ok){ alert(verifyData.message || "Invalid OTP"); return; }

        // 2. Auto-login taake token mil jaye
        const loginRes = await fetch(`${API_URL}/auth/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ email: pendingEmail, password: pendingPassword })
        });
        const loginData = await loginRes.json();
        if(!loginRes.ok){ alert(loginData.message || "Login failed"); return; }

        localStorage.setItem("token", loginData.accessToken);
        localStorage.setItem("subscribed", loginData.subscribed);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        pendingEmail = "";
        pendingPassword = "";

        // 3. Subscribe page par
        window.location.href = "mid-page.html";
    }
    catch(error){
        console.log(error);
        alert("Server connection failed");
    }
});


/* ================= OTP TIMER + RESEND ================= */

function startOtpTimer(){
    const timerWrap = document.getElementById("rcOtpTimerWrap");
    const timerLabel = document.getElementById("rcOtpTimer");
    const resendBtn = document.getElementById("rcResendOtp");

    if(timerWrap) timerWrap.style.display = "block";
    if(resendBtn) resendBtn.style.display = "none";

    let seconds = 60;
    if(timerLabel) timerLabel.textContent = seconds;
    if(otpTimerInterval) clearInterval(otpTimerInterval);

    otpTimerInterval = setInterval(() => {
        seconds--;
        if(timerLabel) timerLabel.textContent = seconds;
        if(seconds <= 0){
            clearInterval(otpTimerInterval);
            otpTimerInterval = null;
            if(timerWrap) timerWrap.style.display = "none";
            if(resendBtn) resendBtn.style.display = "inline-block";
        }
    }, 1000);
}

document.getElementById("rcResendOtp")?.addEventListener("click", async () => {
    const resendBtn = document.getElementById("rcResendOtp");
    try{
        if(resendBtn) resendBtn.disabled = true;
        const response = await fetch(`${API_URL}/auth/resend-otp`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ email: pendingEmail })
        });
        const data = await response.json();
        if(!response.ok){
            alert(data.message || "Resend failed");
            if(resendBtn) resendBtn.disabled = false;
            return;
        }
        const otpInput = document.getElementById("rcOtpInput");
        if(otpInput) otpInput.value = "";
        alert("New code sent to your email");
        if(resendBtn) resendBtn.disabled = false;
        startOtpTimer();
    }
    catch(error){
        console.log(error);
        alert("Server connection failed");
        if(resendBtn) resendBtn.disabled = false;
    }
});


/* ================= GOOGLE LOGIN ================= */

document.querySelectorAll("[data-google-sample]")
.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        window.location.href = API_URL + "/auth/google";
    });
});


/* ================= SUBSCRIBE SCREEN ================= */

function openSubscribe(){
    if(!subscribeScreen) return;
    subscribeScreen.classList.add("show");
    subscribeScreen.setAttribute("aria-hidden","false");
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
