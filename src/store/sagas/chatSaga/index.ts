import { call, put, takeLatest, take, cancelled } from "redux-saga/effects";
import {
  firebaseChatMsgs,
  getUserLastMsg,
} from "../../../services/firebaseFunctions";
import {
  selectedChatMessagesFetch,
  selectedChatMessagesSuccess,
  selectedChatMessagesFailure,
  getUserLastMsgFetch,
  getUserLastMsgSuccess,
  getUserLastMsgFailure,
} from "../../reducers/chatReducer";

function* getChatMessages({ payload }: any): Generator<any, void, unknown> {
  try {
    const chatMsgs: any = yield call(firebaseChatMsgs, payload);

    try {
      while (true) {
        const updatedChatMsgs = yield take(chatMsgs);
        yield put(selectedChatMessagesSuccess(updatedChatMsgs));
      }
    } finally {
      if (yield cancelled()) {
        chatMsgs.close();
      }
    }
  } catch (error) {
    yield put(selectedChatMessagesFailure(error));
  }
}

function* getUserLastMsgSaga({ payload }: any): Generator<any, void, unknown> {
  try {
    const lastMsg: any = yield call(getUserLastMsg, payload);
    yield put(getUserLastMsgSuccess(lastMsg));
    // try {
    //   while (true) {
    //     const updatedLastMsgs = yield take(lastMsg);

    //     yield put(getUserLastMsgSuccess(updatedLastMsgs));
    //   }
    // } finally {
    //   if (yield cancelled()) {
    //     lastMsg.close();
    //   }
    // }
  } catch (error) {
    yield put(getUserLastMsgFailure(error));
  }
}

const chatSaga = [
  takeLatest(selectedChatMessagesFetch, getChatMessages),
  takeLatest(getUserLastMsgFetch, getUserLastMsgSaga),
];

export default chatSaga;
