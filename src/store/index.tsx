import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import logger from "redux-logger";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga, logger],
});

saga.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
