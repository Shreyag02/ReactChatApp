import {
  call,
  put,
  takeLatest,
  all,
  take,
  cancelled,
  close,
} from "redux-saga/effects";
import {
  signupWithEmailAndPassword,
  loginWithEmailAndPassword,
  firebaseUsers,
} from "../../services/firebaseFunctions";
import {
  emailSignUpFailure,
  emailSignUpSuccess,
  emailLogInSuccess,
  emailLogInFailure,
  getChatUsersFailure,
  getChatUsersSuccess,
  getChatUsersFetch,
} from "../../store/reducers/userReducer";

function* emailSignup({ payload }) {
  try {
    const user = yield signupWithEmailAndPassword(payload);

    yield put(emailSignUpSuccess(user));
  } catch (error) {
    yield put(emailSignUpFailure(error));
  }
}

function* emailLogIn({ payload }) {
  try {
    const user = yield loginWithEmailAndPassword(payload);

    yield put(emailLogInSuccess(user));
  } catch (error) {
    yield put(emailLogInFailure(error));
  }
}

function* getChatUsers({ payload }) {
  try {
    const chatUsers = yield call(() => firebaseUsers(payload));

    // try {
    //   while (true) {
    //     const updatedUsers = yield take(chatUsers);
    //     yield put(getChatUsersSuccess(updatedUsers));
    //   }
    // } finally {
    //   if (yield cancelled()) {
    //     channel.close();
    //   }
    // }

    // yield put(getChatUsersSuccess(chatUsers));
  } catch (error) {
    yield put(getChatUsersFailure(error));
  }
}

const userSaga = function* userSaga() {
  yield all([
    takeLatest(getChatUsersFetch, getChatUsers),
    takeLatest(emailSignUpFetch, emailSignup),
    takeLatest(emailLogInFetch, emailLogIn),
  ]);
};

export default userSaga;
