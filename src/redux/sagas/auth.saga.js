import { startAuth, logoutUser, checkAuth, authUserSuccess, authFail } from "redux/features/auth.slice";
import { put, call, takeLatest } from "redux-saga/effects";
import snackbar from "utils/snackbar";
import axios from "axios";

const signInWithEmailAndPassword = async (email, password) => {
  return await axios.post("http://localhost:8000/login", { email, password }).catch((err) => {
    console.log(err);
    throw err;
  });
};

const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return await axios.get("http://localhost:8000/api/profile", { headers: { Authorization: `Bearer ${token}` } }).catch((err) => {
    console.log(err);
    throw err;
  });
};

function* handleAuthUser(action) {
  try {
    // User is logging into his account
    const { email, password } = yield action.payload.fields;
    const {
      data: { token, user },
    } = yield call(signInWithEmailAndPassword, email, password);
    if (!user) return yield put(logoutUser());
    yield put(authUserSuccess(user));
    yield localStorage.setItem("isAuth", 1);
    yield localStorage.setItem("token", token);
  } catch (error) {
    yield put(
      authFail({
        email: error?.response?.data?.message || "The email address or password that you’ve entered doesn’t match any account.",
      })
    );
    yield put(handleLogoutUser());
    yield snackbar.error(`Something went wrong while fetching your data.`);
  }
}

function* handleLogoutUser() {
  yield localStorage.removeItem("isAuth");
  yield localStorage.removeItem("token");
}

// eslint-disable-next-line consistent-return
function* handleCheckAuth() {
  try {
    const {
      data: { user },
    } = yield call(getUserProfile);
    if (!user) return yield put(logoutUser());
    yield put(authUserSuccess(user));
    yield localStorage.setItem("isAuth", 1);
  } catch (error) {
    yield put(logoutUser());
    yield snackbar.error(`You are Unauthorized to Call this Action.`);
  }
}

export default function* watchAuth() {
  yield takeLatest(startAuth.toString(), handleAuthUser);
  yield takeLatest(logoutUser.toString(), handleLogoutUser);
  yield takeLatest(checkAuth.toString(), handleCheckAuth);
}
