document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentList = document.getElementById("students");
    const searchNameInput = document.getElementById("searchName");
    const searchClassInput = document.getElementById("searchClass");
    const searchButton = document.getElementById("searchButton");

    // Mảng chứa danh sách sinh viên (sử dụng dữ liệu mẫu)
    const students = [];

    // Hàm hiển thị danh sách sinh viên
    function displayStudents(filteredStudents = students) {
        studentList.innerHTML = ""; // Xóa danh sách hiện tại để cập nhật lại

        filteredStudents.forEach((student, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${student.name}</span>
                <span>${student.role}</span>
                <span>${student.class}</span>
                <button class="delete" data-index="${index}">Xóa</button>
            `;
            studentList.appendChild(li);

            // Bắt sự kiện xóa sinh viên khi nhấn nút "Xóa"
            const deleteButtons = document.querySelectorAll(".delete");
            deleteButtons.forEach((button) => {
                button.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    deleteStudent(index);
                });
            });
        });
    }

    // Hàm thêm sinh viên vào danh sách
    function addStudent(name, role, lop) {
        students.push({ name, role, class: lop });
        displayStudents();
    }

    // Hàm xóa sinh viên khỏi danh sách dựa vào index
    function deleteStudent(index) {
        students.splice(index, 1);
        displayStudents();
    }

    // Hàm tìm sinh viên theo tên
    function searchStudentByName(name) {
        const filteredStudents = students.filter((student) =>
            student.name.toLowerCase().includes(name.toLowerCase())
        );
        displayStudents(filteredStudents);
    }

    // Hàm tìm sinh viên theo lớp
    function searchStudentByClass(lop) {
        const filteredStudents = students.filter((student) =>
            student.class.toLowerCase() === lop.toLowerCase()
        );
        displayStudents(filteredStudents);
    }

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const roleInput = document.getElementById("role");
        const classInput = document.getElementById("class");
        const name = nameInput.value;
        const role = roleInput.value;
        const lop = classInput.value;

        if (name && role && lop) {
            addStudent(name, role, lop);
            nameInput.value = "";
            roleInput.value = "";
            classInput.value = "";
        }
    });

    searchNameInput.addEventListener("input", function () {
        const searchValue = searchNameInput.value;
        searchStudentByName(searchValue);
    });

    searchClassInput.addEventListener("input", function () {
        const searchValue = searchClassInput.value;
        searchStudentByClass(searchValue);
    });

    searchButton.addEventListener("click", function () {
        const searchNameValue = searchNameInput.value;
        const searchClassValue = searchClassInput.value;
        
        if (searchNameValue && searchClassValue) {
            // Tìm theo tên và lớp
            const filteredStudents = students.filter((student) =>
                student.name.toLowerCase().includes(searchNameValue.toLowerCase()) &&
                student.class.toLowerCase() === searchClassValue.toLowerCase()
            );
            displayStudents(filteredStudents);
        } else if (searchNameValue) {
            // Chỉ tìm theo tên
            searchStudentByName(searchNameValue);
        } else if (searchClassValue) {
            // Chỉ tìm theo lớp
            searchStudentByClass(searchClassValue);
        } else {
            // Hiển thị tất cả sinh viên nếu không có điều kiện tìm kiếm
            displayStudents();
        }
    });

    // Hiển thị danh sách sinh viên ban đầu
    displayStudents();
});
