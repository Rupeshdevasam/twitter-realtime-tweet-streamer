export const ADD_TWEET = "add_tweet";
export const SET_TWEETS_Shown = "set_tweets_shown";
export const INCR_NO_OF_TWEETS_SHOWN = "incr_no_of_tweets_shown";
export const SHOW_ERROR = "show_error";
export const ADD_ERRORS = "add_errors";
export const UPDATE_WAITING = "update_waiting";
export const RESET_TWEETS = "reset_tweets";
export const SHOW_RULES = "show_rules";
export const ADD_RULE = "add_rule";
export const DELETE_RULE = "delete_rule";

export const FETCH_RULES_SAGA = "FETCH_RULES_SAGA";
export const SET_RULE_SAGA = "SET_RULE_SAGA";
export const DELETE_RULE_SAGA = "DELETE_RULE_SAGA";

export const showRules = () => {
  return {
    type: FETCH_RULES_SAGA,
  };
};

export const addRule = (payload) => {
  return {
    type: SET_RULE_SAGA,
    payload: payload,
  };
};

export const deleteRule = (payload) => {
  return {
    type: DELETE_RULE_SAGA,
    payload: payload,
  };
};
