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

async function addStudent(firstName, lastName, role, lop) {
    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ firstName, lastName, role, lop })
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

async function updateStudent(studentId, firstName, lastName, role, lop) {
    try {
        const response = await fetch(`/students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ firstName, lastName, role, lop })
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

// async function fetchStudents() {
//     try {
//         const response = await fetch(`/students`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         console.log(response);

//         if (response.ok) {
//             const data = await response.json();
//             const { students } = data;
//             console.log(data);
//             const sortedStudents = students.sort((a, b) => a.firstName.localeCompare(b.firstName));
//             displayStudents(sortedStudents);
//         } else {
//             console.error('Error fetching data from server.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// async function filterStudents() {
//     try {
//         const classFilter = classFilterInput.value;
//         const response = await fetch(`/students/find/${classFilter}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const { students } = data;
//             console.log(data);
//             const sortedStudents = students.sort((a, b) => a.firstName.localeCompare(b.firstName));
//             displayStudents(sortedStudents);
//         } else {
//             console.error('Error fetching data from server.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

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
            ${student.lastName} ${student.firstName} - ${student.role} - ${student.lop}
            <button class="edit-button" onclick="setUpdateMode('${student._id}', '${student.firstName}', '${student.lastName}', '${student.role}', '${student.lop}')">Edit</button>
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
    addBtn.style.display = 'block';
    updateBtn.style.display = 'none';
}

function setUpdateMode(studentId, firstName, lastName, role, lop) {
    document.getElementById('studentId').value = studentId;
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('role').value = role;
    document.getElementById('lop').value = lop;
    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';
}

addBtn.addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    addStudent(firstName, lastName, role, lop);
});

updateBtn.addEventListener('click', function() {
    const studentId = document.getElementById('studentId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    updateStudent(studentId, firstName, lastName, role, lop);
});

document.getElementById('filterBtn').addEventListener('click', function() {
    fetchStudents();
});

// document.getElementById('filterBtn').addEventListener('click', filterStudents);

fetchStudents();

function myFunction(x) {
    x.classList.toggle("change");
} 