export default {
  api: "/api",
  faculties: function () {
    return `${this.api}/faculties`;
  },
  facultyDetail: function () {
    return `${this.api}/faculties/detail`;
  },
  createFaculty: function () {
    return `${this.api}/faculties/create`;
  },
  updateFaculty: function () {
    return `${this.api}/faculties/update`;
  },
  deleteFaculty: function () {
    return `${this.api}/faculties/delete`;
  },
  users: function () {
    return `${this.api}/users/list`;
  },
  userDetail: function () {
    return `${this.api}/users/detail`;
  },
  createUser: function () {
    return `${this.api}/users/create`;
  },
  updateUser: function () {
    return `${this.api}/users/update`;
  },
  deleteUser: function () {
    return `${this.api}/users/delete`;
  },

  shifts: function () {
    return `${this.api}/shifts/list`;
  },
  shiftDetail: function () {
    return `${this.api}/shifts/detail`;
  },
  createShift: function () {
    return `${this.api}/shifts/create`;
  },
  updateShift: function () {
    return `${this.api}/shifts/update`;
  },
  deleteShift: function () {
    return `${this.api}/shifts/delete`;
  },

  semesters: function () {
    return `${this.api}/semesters/list`;
  },
  semesterDetail: function () {
    return `${this.api}/semesters/detail`;
  },
  createSemester: function () {
    return `${this.api}/semesters/create`;
  },
  updateSemester: function () {
    return `${this.api}/semesters/update`;
  },
  deleteSemester: function () {
    return `${this.api}/semesters/delete`;
  },

  classes: function () {
    return `${this.api}/classes/list`;
  },
  classDetail: function () {
    return `${this.api}/classes/detail`;
  },
  createClass: function () {
    return `${this.api}/classes/create`;
  },
  updateClass: function () {
    return `${this.api}/classes/update`;
  },
  deleteClass: function () {
    return `${this.api}/classes/delete`;
  },

  courses: function () {
    return `${this.api}/courses/list`;
  },
  courseDetail: function () {
    return `${this.api}/courses/detail`;
  },
  createCourse: function () {
    return `${this.api}/courses/create`;
  },
  updateCourse: function () {
    return `${this.api}/courses/update`;
  },
  deleteCourse: function () {
    return `${this.api}/courses/delete`;
  },

  teachers: function () {
    return `${this.api}/teachers/list`;
  },
  teacherDetail: function () {
    return `${this.api}/teachers/detail`;
  },
  createTeacher: function () {
    return `${this.api}/teachers/create`;
  },
  updateTeacher: function () {
    return `${this.api}/teachers/update`;
  },
  deleteTeacher: function () {
    return `${this.api}/teachers/delete`;
  },

  students: function () {
    return `${this.api}/students/list`;
  },
  studentDetail: function () {
    return `${this.api}/students/detail`;
  },
  createStudent: function () {
    return `${this.api}/students/create`;
  },
  updateStudent: function () {
    return `${this.api}/students/update`;
  },
  deleteStudent: function () {
    return `${this.api}/students/delete`;
  },

  enrollments: function () {
    return `${this.api}/students/enrollments/list`;
  },
  enrollmentDetail: function () {
    return `${this.api}/students/enrollments/detail`;
  },
  createEnrollment: function () {
    return `${this.api}/students/enrollments/create`;
  },
  updateEnrollment: function () {
    return `${this.api}/students/enrollments/update`;
  },
  deleteEnrollment: function () {
    return `${this.api}/students/enrollments/delete`;
  },
};
