import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";

const rulesURL = "/api/rules";
const getRules = async () => {
  const response = await axios.get(rulesURL);
  return response.data.body;
};

const postRules = async (payload) => {
  const response = await axios.post(rulesURL, payload);
  return response.data.body;
};

const deleteRules = async (payload) => {
  await axios.post(rulesURL, payload);
};

function* deleteRule(action) {
  try {
    yield call(deleteRules, action.payload);
    yield put({ type: "delete_rule" });
  } catch (e) {}
}

function* setRules(action) {
  try {
    const rules = yield call(postRules, action.payload);
    const { data: payload = [] } = rules;
    yield put({ type: "add_rule", payload });
  } catch (e) {}
}

function* fetchRules(action) {
  try {
    const rules = yield call(getRules);
    const { data: payload = [] } = rules;
    yield put({ type: "show_rules", payload });
  } catch (e) {}
}

export default function* rootSaga() {
  yield takeLeading("FETCH_RULES_SAGA", fetchRules);
  yield takeLeading("SET_RULE_SAGA", setRules);
  yield takeLeading("DELETE_RULE_SAGA", deleteRule);
}
