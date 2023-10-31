const signOutBtn = document.getElementById('signOutBtn');
const accessToken = localStorage.getItem('token');
const searchInput = document.getElementById('searchInput');
const numStudent = document.getElementById('numStudent');
const dateTime = document.getElementById('dateTime');
const currentDate = new Date();
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;
const options = { year: 'numeric', month: 'long', day: 'numeric' };

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

async function showStudents(page = 1) {
  try {
      const response = await fetch(`/students?page=${page}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });

      if (response.ok) {
          const data = await response.json();
          const { students, totalPages, totalStudents } = data;
          numStudent.textContent = totalStudents;
          const currentDate = new Date();
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          dateTime.textContent = currentDate.toLocaleDateString(undefined, options);
          displayStudents(students);

          // Hiển thị nút số trang dưới cùng
          renderPaginationButtons(currentPage, totalPages);
      } else {
          console.error('Error fetching data from server.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

function renderPaginationButtons(currentPage, totalPages) {
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
          currentPage = i;
          showStudents(currentPage);
      });
      if (i === currentPage) {
          button.classList.add('active'); // Đánh dấu trang hiện tại
      }
      paginationContainer.appendChild(button);
  }
}

showStudents(currentPage);



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

var totalData = 100; 
var dataPerPage = 10; 

var totalPages = Math.ceil(totalData / dataPerPage);

paginationContainer = document.getElementById('pagination');

for (var i = 1; i <= totalPages; i++) {
  var button = document.createElement('button');
  button.classList.add('page-btn');
  button.textContent = i;
  // button.addEventListener('click', function() {
  //   var pageButtons = document.querySelectorAll('.page-btn');
  //   pageButtons.forEach(function(btn) {
  //     btn.classList.remove('active');
  //   });
  //   this.classList.add('active');
  
  // });

  paginationContainer.appendChild(button);
}

button.addEventListener('click', function() {
  var pageButtons = document.querySelectorAll('#pagination button');
  pageButtons.forEach(function(btn) {
      btn.classList.remove('active');
  });
  this.classList.add('active');
});