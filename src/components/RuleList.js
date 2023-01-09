import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../store/actions";

const RuleList = ({ styles }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await dispatch(actionType.showRules());
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    if (search.length == 0 && state?.rule[0]?.value) {
      setSearch(state?.rule[0]?.value);
    }
  }, [state.rule]);

  const createRule = async (e) => {
    e.preventDefault();

    if (state.rule.length > 0) {
      await deleteRule(state.rule[0].id);
    }
    if (search.length == 0) return;
    const payload = { add: [{ value: search }] };

    try {
      await dispatch(actionType.addRule(payload));
      dispatch({ type: actionType.RESET_TWEETS });
    } catch (e) {
      alert(e);
    }
  };

  const deleteRule = async (id) => {
    const payload = { delete: { ids: [id] } };
    await dispatch(actionType.deleteRule(payload));
  };

  return (
    <div style={styles}>
      <form onSubmit={async (e) => await createRule(e)}>
        <div className="ui fluid action input">
          <input
            style={{ width: "100px" }}
            type="text"
            autoFocus={true}
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="ui primary button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default RuleList;
