const signOutBtn = document.getElementById('signOutBtn');
const accessToken = localStorage.getItem('token');
const searchInput = document.getElementById('searchInput');

signOutBtn.addEventListener('click', function() {
  localStorage.removeItem('token');
  window.location.href = "auth.html";
});

if (accessToken == null) {
  window.location.href = "auth.html";
}

let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

const analyticsLink = document.getElementById('AnalyticsBtn');
analyticsLink.addEventListener('click', function() {
    window.location.href = "analytics.html";
});

const applicationLink = document.getElementById('ApplicationBtn');
applicationLink.addEventListener('click', function() {
    window.location.href = "index.html";
});

const dashboardLink = document.getElementById('DashboardBtn');
dashboardLink.addEventListener('click', function() {
    window.location.href = "dashboard.html";
});

