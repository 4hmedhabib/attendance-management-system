const urls = {
  // FACULTIES
  faculties: "faculties/",
  createFaculty: "faculties/create",
  facultyDetail: "faculties/detail",
  deleteFaculty: "faculties/delete",

  // SHIFTS
  shifts: "shifts/",
  shiftDetail: function () {
    return `${this.shifts}/detail`;
  },
  deleteShift: function () {
    return `${this.shifts}/delete`;
  },

  // CLASSES
  classes: "classes/",
  classDetail: function () {
    return `${this.classes}/detail`;
  },
  deleteClass: function () {
    return `${this.classes}/delete`;
  },

  // SEMESTERS
  semesters: "semesters/",
  semesterDetail: function () {
    return `${this.semesters}/detail`;
  },
  deleteSemester: function () {
    return `${this.semesters}/delete`;
  },

  // COURSES
  courses: "courses/",
  courseDetail: function () {
    return `${this.courses}/detail`;
  },
  deleteCourse: function () {
    return `${this.courses}/delete`;
  },

  // STUDENTS
  students: "students/",
  studentDetail: function () {
    return `${this.students}/detail`;
  },
  deleteStudent: function () {
    return `${this.students}/delete`;
  },

  // TEACHERS
  teachers: "teachers/",
  teacherDetail: function () {
    return `${this.teachers}/detail`;
  },
  deleteTeacher: function () {
    return `${this.teachers}/delete`;
  },

  // USERS
  users: "users/",
  userDetail: function () {
    return `${this.users}/detail`;
  },
  deleteUser: function () {
    return `${this.users}/delete`;
  },
};

export default urls;
