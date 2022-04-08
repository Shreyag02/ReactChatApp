import {
  call,
  put,
  takeLatest,
  take,
  cancelled,
  PutEffect,
} from "redux-saga/effects";
import {
  signupWithEmailAndPassword,
  loginWithEmailAndPassword,
  firebaseUsers,
  deleteUserAvatar,
  updateUserAvatar,
} from "../../../services/firebaseFunctions";
import {
  emailSignUpFetch,
  emailSignUpFailure,
  emailSignUpSuccess,
  emailLogInFetch,
  emailLogInSuccess,
  emailLogInFailure,
  getChatUsersFailure,
  getChatUsersSuccess,
  getChatUsersFetch,
  deleteAvatarFailure,
  deleteAvatarFetch,
  deleteAvatarSuccess,
  updateAvatarFailure,
  updateAvatarFetch,
  updateAvatarSuccess,
} from "../../reducers/userReducer";

function* deleteAvatarSaga({ payload }: any): Generator<any> {
  try {
    yield deleteUserAvatar(payload);

    yield put(deleteAvatarSuccess(null));
  } catch (error) {
    yield put(deleteAvatarFailure(error));
  }
}
function* updateAvatarSaga({ payload }: any): Generator<any> {
  try {
    const data = yield updateUserAvatar(payload);

    yield put(updateAvatarSuccess(data));
  } catch (error) {
    yield put(updateAvatarFailure(error));
  }
}

function* emailSignup({ payload }: any): Generator<
  | Promise<any>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  unknown
> {
  try {
    const user = yield signupWithEmailAndPassword(payload);

    yield put(emailSignUpSuccess(user));
  } catch (error) {
    yield put(emailSignUpFailure(error));
  }
}

function* emailLogIn({ payload }: any): Generator<
  | Promise<any>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  unknown
> {
  try {
    const user = yield loginWithEmailAndPassword(payload);

    yield put(emailLogInSuccess(user));
  } catch (error) {
    yield put(emailLogInFailure(error));
  }
}

function* getChatUsers({ payload }: any): Generator<any, void, unknown> {
  try {
    const chatUsers: any = yield call(firebaseUsers, payload);

    try {
      while (true) {
        const updatedUsers = yield take(chatUsers);
        yield put(getChatUsersSuccess(updatedUsers));
      }
    } finally {
      console.log("unsubscribe");

      if (yield cancelled()) {
        chatUsers.close();
      }
    }
  } catch (error) {
    yield put(getChatUsersFailure(error));
  }
}

const userSaga = [
  takeLatest(getChatUsersFetch, getChatUsers),
  takeLatest(emailSignUpFetch, emailSignup),
  takeLatest(emailLogInFetch, emailLogIn),
  takeLatest(deleteAvatarFetch, deleteAvatarSaga),
  takeLatest(updateAvatarFetch, updateAvatarSaga),
];

export default userSaga;
