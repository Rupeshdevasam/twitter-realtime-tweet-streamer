import * as actionType from "./actions";

const initialState = {
  tweets: [],
  noOfTweetsShown: 25,
  tweetsShown: [],
  error: {},
  isWaiting: true,
  rule: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TWEET:
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
        error: null,
        isWaiting: false,
        errors: [],
      };
    case actionType.RESET_TWEETS:
      return {
        ...state,
        tweets: [],
        noOfTweetsShown: 25,
        tweetsShown: [],
        error: {},
        isWaiting: true,
      };
    case actionType.SET_TWEETS_Shown:
      return {
        ...state,
        tweetsShown: state.tweets.slice(0, state.noOfTweetsShown),
        error: null,
        isWaiting: false,
        errors: [],
      };
    case actionType.INCR_NO_OF_TWEETS_SHOWN:
      return {
        ...state,
        noOfTweetsShown: state.noOfTweetsShown + 10,
        error: null,
        isWaiting: false,
        errors: [],
      };
    case actionType.SHOW_ERROR:
      return { ...state, error: action.payload, isWaiting: false };
    case actionType.ADD_ERRORS:
      return { ...state, errors: action.payload, isWaiting: false };
    case actionType.UPDATE_WAITING:
      return { ...state, error: null, isWaiting: true };
    case actionType.SHOW_RULES:
      return { ...state, rule: action.payload };
    case actionType.FETCH_RULES_SAGA:
      return {
        ...state,
      };
    case actionType.SET_RULE_SAGA:
      return {
        ...state,
      };
    case actionType.DELETE_RULE_SAGA:
      return {
        ...state,
      };
    case actionType.ADD_RULE:
      return {
        ...state,
        rule: action.payload,
        tweets: [],
        noOfTweetsShown: 25,
        tweetsShown: [],
        error: {},
        isWaiting: true,
      };
    case actionType.DELETE_RULE:
      return {
        ...state,
        rule: [],
      };
    default:
      return state;
  }
};

export default reducer;
