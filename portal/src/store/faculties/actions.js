import {
  ADD_FACULTY_FAIL,
  ADD_FACULTY_SUCCESS,
  ADD_NEW_FACULTY,
  DELETE_FACULTY,
  DELETE_FACULTY_FAIL,
  DELETE_FACULTY_SUCCESS,
  GET_FACULTIES,
  GET_FACULTIES_FAIL,
  GET_FACULTIES_SUCCESS,
  UPDATE_FACULTY,
  UPDATE_FACULTY_FAIL,
  UPDATE_FACULTY_SUCCESS,
} from "./actionTypes";

export const getFaculties = () => ({
  type: GET_FACULTIES,
});

export const getFacultiesSuccess = (orders) => ({
  type: GET_FACULTIES_SUCCESS,
  payload: orders,
});

export const getFacultiesFail = (error) => ({
  type: GET_FACULTIES_FAIL,
  payload: error,
});

export const addNewFaculty = (order) => ({
  type: ADD_NEW_FACULTY,
  payload: order,
});

export const addFacultySuccess = (order) => ({
  type: ADD_FACULTY_SUCCESS,
  payload: order,
});

export const addFacultyFail = (error) => ({
  type: ADD_FACULTY_FAIL,
  payload: error,
});

export const updateFaculty = (order) => ({
  type: UPDATE_FACULTY,
  payload: order,
});

export const updateFacultySuccess = (order) => ({
  type: UPDATE_FACULTY_SUCCESS,
  payload: order,
});

export const updateFacultyFail = (error) => ({
  type: UPDATE_FACULTY_FAIL,
  payload: error,
});

export const deleteFaculty = (order) => ({
  type: DELETE_FACULTY,
  payload: order,
});

export const deleteFacultySuccess = (order) => ({
  type: DELETE_FACULTY_SUCCESS,
  payload: order,
});

export const deleteFacultyFail = (error) => ({
  type: DELETE_FACULTY_FAIL,
  payload: error,
});
