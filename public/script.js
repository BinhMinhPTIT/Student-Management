const studentsList = document.getElementById('students-list');
const classFilterInput = document.getElementById('classFilter');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');

// Thêm sinh viên
async function addStudent(firstName, lastName, role, lop) {
    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, role, lop })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Student added successfully!');
            clearForm();
            fetchStudents();
        } else {
            alert(`Error: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cập nhật sinh viên
async function updateStudent(studentId, firstName, lastName, role, lop) {
    try {
        const response = await fetch(`/students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, role, lop })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Student updated successfully!');
            clearForm();
            fetchStudents();
        } else {
            alert(`Error: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Xóa sinh viên
async function deleteStudent(studentId) {
    try {
        const response = await fetch(`/students/${studentId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert('Student deleted successfully!');
            fetchStudents();
        } else {
            alert(`Error: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Sắp xếp danh sách sinh viên theo tên theo thứ tự alphabet
function sortStudentsByName(students) {
    return students.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

// Lấy danh sách sinh viên
async function fetchStudents() {
    try {
        let endpoint = '/students';
        const classFilter = classFilterInput.value;
        if (classFilter) {
            endpoint = `/students/find/${classFilter}`;
        }
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (response.ok) {
            const sortedStudents = sortStudentsByName(data.student);
            displayStudents(sortedStudents);
        } else {
            alert(`Error: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Hiển thị danh sách sinh viên
function displayStudents(students) {
    studentsList.innerHTML = students.map(student => `
        <li>${student.lastName} ${student.firstName} - ${student.role} - ${student.lop} 
            <button onclick="setUpdateMode('${student._id}', '${student.firstName}', '${student.lastName}', 
            '${student.role}', '${student.lop}')">Edit</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
        </li>`
    ).join('');
}

// Xóa dữ liệu trên form và chuyển về chế độ thêm sinh viên
function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('role').value = '';
    document.getElementById('lop').value = '';
    addBtn.style.display = 'block';
    updateBtn.style.display = 'none';
}

// Lắng nghe sự kiện click nút "Add Student"
addBtn.addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    addStudent(firstName, lastName, role, lop);
});

// Lắng nghe sự kiện click nút "Update Student"
updateBtn.addEventListener('click', function() {
    const studentId = document.getElementById('studentId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const role = document.getElementById('role').value;
    const lop = document.getElementById('lop').value;
    updateStudent(studentId, firstName, lastName, role, lop);
});

// Lắng nghe sự kiện click nút "Filter"
document.getElementById('filterBtn').addEventListener('click', function() {
    fetchStudents();
});

// Lấy danh sách sinh viên khi trang web được tải lần đầu tiên
fetchStudents();

// Chế độ chỉnh sửa sinh viên
function setUpdateMode(studentId, firstName, lastName, role, lop) {
    document.getElementById('studentId').value = studentId;
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('role').value = role;
    document.getElementById('lop').value = lop;
    addBtn.style.display = 'none';
    updateBtn.style.display = 'block';
}
