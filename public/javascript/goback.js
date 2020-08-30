const backBtn = document.getElementById("go-back-btn");

function goBack() {
    window.history.back();
  }

document.addEventListener(backBtn, goBack);

