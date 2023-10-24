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

async function showStudents() {
  try {
      const response = await fetch('/students', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });

      if (response.ok) {
          const data = await response.json();
          const { students } = data;
          displayStudents(students);
      } else {
          console.error('Error fetching data from server.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

showStudents();



function displayStudents(studentsData) {
  const tableBody = document.getElementById('students-table-body');
  tableBody.innerHTML = "";

  studentsData.forEach(student => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = `${student.lastName} ${student.firstName}`;

      const roleCell = document.createElement('td');
      roleCell.textContent = student.role;

      const classCell = document.createElement('td');
      classCell.textContent = student.lop;

      const gpaCell = document.createElement('td');
      gpaCell.textContent = student.gpa;

      const hometownCell = document.createElement('td');
      hometownCell.textContent = student.hometown;

      row.appendChild(nameCell);
      row.appendChild(roleCell);
      row.appendChild(classCell);
      row.appendChild(gpaCell);
      row.appendChild(hometownCell);

      tableBody.appendChild(row);
  });
}
