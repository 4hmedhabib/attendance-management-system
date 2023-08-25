import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postJwtLogin } from "../../../helpers/fakebackend_helper";
import urls from "../../../api/urls";
import useApiCall from "../../../hooks/apiHook";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      payload: {
        username: user.username,
        password: user.password
      }
    });

    localStorage.setItem("authUser", JSON.stringify(response));


    yield put(loginSuccess(response));

    history("/dashboard");
  } catch (error) {
    console.log(error)

    let message;
    if (Array.isArray(error.response?.data?.message)) {
      message = Object.values(error.response?.data?.message[0])[0][0]
    } else if (typeof error.response?.data?.message === 'string') {
      message = error.response?.data?.message
    }

    yield put(apiError(message || error.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    // const response = yield call(fireBaseBackend.logout);
    yield put(logoutUserSuccess({ response: "" }));

    history("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
