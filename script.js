document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("loadingProgress");
  const loadingPercent = document.getElementById("loadingPercent");
  const introScreen = document.getElementById("introScreen");

  let progress = 0;

  const loadingInterval = setInterval(() => {
    progress++;

    progressBar.style.width = progress + "%";
    loadingPercent.textContent = progress + "%";

    if (progress >= 100) {
      clearInterval(loadingInterval);

      setTimeout(() => {
        introScreen.classList.add("hide");

        setTimeout(() => {
          window.location.href = "mid-page.html";
        }, 800);

      }, 400);
    }
  }, 40);
});
