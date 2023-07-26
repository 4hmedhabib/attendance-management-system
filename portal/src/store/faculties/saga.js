import { call, put, takeEvery } from "redux-saga/effects";

// Faculty Redux States
import {
  ADD_NEW_FACULTY,
  DELETE_FACULTY,
  GET_FACULTIES,
  UPDATE_FACULTY,
} from "./actionTypes";
import {
  addFacultyFail,
  addFacultySuccess,
  deleteFacultyFail,
  deleteFacultySuccess,
  getFacultiesFail,
  getFacultiesSuccess,
  updateFacultyFail,
  updateFacultySuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  addNewFaculty,
  deleteFaculty,
  getFaculties,
  updateFaculty,
} from "../../helpers/fakebackend_helper";

function* fetchFaculties() {
  try {
    const response = yield call(getFaculties);
    yield put(getFacultiesSuccess(response));
  } catch (error) {
    yield put(getFacultiesFail(error));
  }
}

function* onUpdateFaculty({ payload: order }) {
  try {
    const response = yield call(updateFaculty, order);
    yield put(updateFacultySuccess(response));
  } catch (error) {
    yield put(updateFacultyFail(error));
  }
}

function* onDeleteFaculty({ payload: order }) {
  try {
    const response = yield call(deleteFaculty, order);
    yield put(deleteFacultySuccess(response));
  } catch (error) {
    yield put(deleteFacultyFail(error));
  }
}

function* onAddNewFaculty({ payload: order }) {
  try {
    const response = yield call(addNewFaculty, order);
    yield put(addFacultySuccess(response));
  } catch (error) {
    yield put(addFacultyFail(error));
  }
}

function* facultySaga() {
  yield takeEvery(GET_FACULTIES, fetchFaculties);
  yield takeEvery(ADD_NEW_FACULTY, onAddNewFaculty);
  yield takeEvery(UPDATE_FACULTY, onUpdateFaculty);
  yield takeEvery(DELETE_FACULTY, onDeleteFaculty);
}

export default facultySaga;
