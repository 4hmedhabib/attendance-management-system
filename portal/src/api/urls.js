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
};
