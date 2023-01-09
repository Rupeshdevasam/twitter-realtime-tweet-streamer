import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./components/App";
import reducer from "./store/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/saga/saga";

const sagaMiddleware = createSagaMiddleware();
const store = compose(applyMiddleware(sagaMiddleware))(createStore)(reducer);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
