const ctx = document.getElementById('myChart').getContext('2d');
const pieChartCanvas = document.getElementById('pieChart').getContext('2d');
const sidebar = document.querySelector('.sidebar');
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const accessToken = localStorage.getItem('token');
const studentsList = document.getElementById('students-list');
const classFilterInput = document.getElementById('classFilter');
const gpaFilterInput = document.getElementById('gpaFilter');


openBtn.addEventListener('click', () => {
    sidebar.classList.add('opened');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('opened');
});

const analyticsLink = document.querySelector('.sidebar ul li:nth-child(1)');
analyticsLink.addEventListener('click', function() {
    window.location.href = "analytics.html";
});

const applicationLink = document.querySelector('.sidebar ul li:nth-child(2)');
applicationLink.addEventListener('click', function() {
    window.location.href = "index.html";
});

const dashboardLink = document.querySelector('.sidebar ul li:nth-child(3)');
dashboardLink.addEventListener('click', function() {
    window.location.href = "dashboard.html";
});

filterBtn.addEventListener('click', function() {
    fetchStudents();
});

filterGpaBtn.addEventListener('click', function() {
    fetchStudentByGpa();
});

async function fetchBarChartData() {
    try {
        const response = await fetch('/students/chart/barchart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            const labels = data.map(student => student.name);
            const gpas = data.map(student => student.gpa);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'GPA',
                        data: gpas,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.log('Error fetching chart data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchPieChartData() {
    try {
        const response = await fetch('/students/chart/piechart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const counts = data.reduce((acc, student) => {
                acc[student.lop] = (acc[student.lop] || 0) + 1;
                return acc;
            }, {});

            const labels = Object.keys(counts);
            const values = Object.values(counts);

            new Chart(pieChartCanvas, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(192, 99, 71, 0.2)',
                            'rgba(51, 207, 171, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(192, 99, 71, 1)',
                            'rgba(51, 207, 171, 1)',
                        ],
                        borderWidth: 1
                    }]
                }
            });
        } else {
            console.error('Error fetching pie chart data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


fetchBarChartData();

fetchPieChartData();

let currentPage = 1;
const studentsPerPage = 10;

async function fetchStudents() {
    try {
        let endpoint = `/students?_page=${currentPage}&_limit=${studentsPerPage}`;
        const classFilter = classFilterInput.value;
        if (classFilter) {
            endpoint = `/students/find/${classFilter}?_page=${currentPage}&_limit=${studentsPerPage}`;
        }

        const response = await fetch(endpoint, {
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

async function fetchStudentByGpa() {
    try {
        let endpoint = '/students';
        const gpaFilter = gpaFilterInput.value;
        if (gpaFilter) {
            endpoint = `/students/find/gpa/${gpaFilter}`;
        }
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const { students } = data;
            const sortedStudents = students.sort((a, b) => a.firstName.localeCompare(b.firstName));
            displayStudents(sortedStudents);
        } else {
            console.error('Error fetching data from server.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayStudents(studentsData) {
    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = ""; // Clear previous content
  
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