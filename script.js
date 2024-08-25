// Class representing a Student
class Student {
    constructor(name, age, grade) {
      this.name = name;
      this.age = age;
      this.grade = grade;
    }
  }
  
  // Class for handling UI tasks
  class UI {
    static displayStudents() {
      const students = Store.getStudents();
      students.forEach((student) => UI.addStudentToList(student));
    }
  
    static addStudentToList(student) {
      const list = document.getElementById('student-list');
      
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Name:</strong> ${student.name} <br>
        <strong>Age:</strong> ${student.age} <br>
        <strong>Grade:</strong> ${student.grade}
      `;
      
      list.appendChild(li);
    }
  
    static clearFields() {
      document.getElementById('name').value = '';
      document.getElementById('age').value = '';
      document.getElementById('grade').value = '';
    }
  }
  
  // Class for handling local storage
  class Store {
    static getStudents() {
      let students;
      if (localStorage.getItem('students') === null) {
        students = [];
      } else {
        students = JSON.parse(localStorage.getItem('students'));
      }
      return students;
    }
  
    static addStudent(student) {
      const students = Store.getStudents();
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
    }
  }
  
  // Event: Display Students
  document.addEventListener('DOMContentLoaded', UI.displayStudents);
  
  // Event: Add a Student
  document.getElementById('student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    
    // Instantiate a student
    const student = new Student(name, age, grade);
  
    // Add student to UI
    UI.addStudentToList(student);
  
    // Add student to store
    Store.addStudent(student);
  
    // Clear fields
    UI.clearFields();
  });
  