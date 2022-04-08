import { put, takeLatest } from "redux-saga/effects";
import { addNewMsg, lastMsgStatus } from "../../../services/firebaseFunctions";
import {
  addNewMessageFetch,
  addNewMessageSuccess,
  addNewMessageFailure,
  readStatusFetch,
  readStatusSuccess,
  readStatusFailure,
} from "../../reducers/messageReducer";

function* addMsgSaga({ payload }: any): Generator<any> {
  try {
    yield addNewMsg(payload);

    yield put(addNewMessageSuccess(null));
  } catch (error) {
    yield put(addNewMessageFailure(error));
  }
}
function* lastMsgStatusSaga({ payload }: any): Generator<any> {
  try {
    yield lastMsgStatus(payload);

    yield put(readStatusSuccess(null));
  } catch (error) {
    yield put(readStatusFailure(error));
  }
}
const msgSaga = [
  takeLatest(addNewMessageFetch, addMsgSaga),
  takeLatest(readStatusFetch, lastMsgStatusSaga),
];

export default msgSaga;
