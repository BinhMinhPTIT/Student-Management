const studentsList = document.getElementById('students-list');
const classFilterInput = document.getElementById('classFilter');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const accessToken = localStorage.getItem('token');
const signOutBtn = document.getElementById('signOutBtn');

signOutBtn.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = "auth.html";
});

if (accessToken == null) {
    window.location.href = "auth.html";
}

async function addStudent(firstName, lastName, role, lop, gpa, hometown) {
    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ firstName, lastName, role, lop, gpa, hometown })
        });

        if (response.ok) {
            alert('Student added successfully!');
            clearForm();
            fetchStudents();
        } else {
            alert(`Error`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateStudent(studentId, firstName, lastName, role, lop, gpa, hometown) {
    try {
        const response = await fetch(`/students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ firstName, lastName, role, lop, gpa, hometown }),
        });

        if (response.ok) {
            alert('Student updated successfully!');
            clearForm();
            fetchStudents();
        } else {
            alert(`Error`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteStudent(studentId) {
    try {
        const response = await fetch(`/students/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            alert('Student deleted successfully!');
            fetchStudents();
        } else {
            alert(`Error`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function fetchStudents() {
    try {
        let endpoint = '/students';
        const classFilter = classFilterInput.value;
        if (classFilter) {
            endpoint = `/students/find/${classFilter}`;
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
    console.log(studentsData);
    studentsList.innerHTML = studentsData.map(student => `
        <li class="student-item">
            ${student.lastName} ${student.firstName} - ${student.role} - ${student.lop} - ${student.gpa} - ${student.hometown}
            <button class="edit-button" onclick="setUpdateMode('${student._id}', '${student.firstName}', '${student.lastName}', '${student.role}', '${student.lop}', '${student.gpa}', '${student.hometown}')">Edit</button>
            <button class="delete-button" onclick="deleteStudent('${student._id}')">Delete</button>
        </li>`
    ).join('');
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('role').value = '';
    document.getElementById('lop').value = '';
    document.getElementById('gpa').value = '';
    document.getElementById('hometown').value = '';
    addBtn.style.display = 'block';
    updateBtn.style.display = 'none';
}

function setUpdateMode(studentId, firstName, lastName, role, lop, gpa, hometown) {
    document.getElementById('studentId').value = studentId;
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('role').value = role;
    document.getElementById('lop').value = lop;
    document.getElementById('gpa').value = gpa;
    document.getElementById('hometown').value = hometown;
    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';
}

addBtn.addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    const gpa = document.getElementById('gpa').value;
    const hometown = document.getElementById('hometown').value;
    addStudent(firstName, lastName, role, lop, gpa, hometown);
});

updateBtn.addEventListener('click', function() {
    const studentId = document.getElementById('studentId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    const gpa = document.getElementById('gpa').value;
    const hometown = document.getElementById('hometown').value;
    updateStudent(studentId, firstName, lastName, role, lop, gpa, hometown);
});

document.getElementById('filterBtn').addEventListener('click', function() {
    fetchStudents();
});

// document.getElementById('filterBtn').addEventListener('click', filterStudents);

fetchStudents();


const sidebar = document.querySelector('.sidebar');
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');

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
