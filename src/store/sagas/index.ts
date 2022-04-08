import { all } from "redux-saga/effects";
import chatSaga from "./chatSaga";
import userSaga from "./userSaga";
import msgSaga from "./msgSaga";
// import profileSaga from "./profileSaga";

export const tasks = [...chatSaga, ...userSaga, ...msgSaga];

const rootSaga = function* rootSaga() {
  yield all(tasks);
};

export default rootSaga;
