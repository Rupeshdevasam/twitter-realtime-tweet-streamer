import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import socketIOClient from "socket.io-client";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import * as actionType from "../store/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TweetFeed = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { tweets, tweetsShown, error, isWaiting, noOfTweetsShown, rule } =
    state;

  const [loader, setLoader] = useState(false);

  const streamTweets = () => {
    let socket;

    if (process.env.NODE_ENV === "development") {
      socket = socketIOClient("http://localhost:3001/");
    } else {
      socket = socketIOClient("/");
    }

    socket.on("connect", () => {});
    socket.on("tweet", (json) => {
      if (json.data) {
        dispatch({ type: "add_tweet", payload: json });
        console.log(json, state);
      }
      if (tweetsShown.length < 25) {
        dispatch({ type: actionType.SET_TWEETS_Shown });
      }
    });
    socket.on("heartbeat", (data) => {
      dispatch({ type: "update_waiting" });
    });
    socket.on("error", (data) => {
      dispatch({ type: "show_error", payload: data });
    });
    socket.on("authError", (data) => {
      console.log("data =>", data);
      dispatch({ type: "add_errors", payload: [data] });
    });
  };

  const reconnectMessage = () => {
    const message = {
      title: "Reconnecting",
      detail: "Please wait while we reconnect to the stream.",
    };

    if (error && error.detail) {
      return (
        <div>
          <ErrorMessage key={error.title} error={error} styleType="warning" />
          <ErrorMessage
            key={message.title}
            error={message}
            styleType="success"
          />
          <Spinner />
        </div>
      );
    }
  };

  const errorMessage = () => {
    const { errors } = state;

    if (errors && errors.length > 0) {
      return errors.map((error) => (
        <ErrorMessage key={error.title} error={error} styleType="negative" />
      ));
    }
  };

  const waitingMessage = () => {
    if (isWaiting && tweetsShown.length === 0) {
      return <Spinner />;
    }
  };

  useEffect(() => {
    (async () => {
      if (rule.length > 0) {
        streamTweets();
      } else {
        await dispatch({ type: actionType.RESET_TWEETS });
      }
    })();
  }, [rule]);

  useEffect(() => {
    dispatch({ type: actionType.UPDATE_WAITING });
    dispatch({ type: actionType.SET_TWEETS_Shown });
  }, [noOfTweetsShown]);

  useEffect(() => {
    setTimeout(() => setLoader(true), 5000);
  }, []);

  const showTweets = () => {
    if (tweets.length > 0) {
      return (
        <>
          {(!loader || state.tweetsShown.length == 0) && <Spinner />}
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignContent: "center",
              overflowY: "scroll",
              width: "100%",
              height: "auto",
              visibility: loader ? "visible" : "hidden",
            }}
          >
            {tweetsShown.map((tweet) => (
              <Tweet key={tweet.data.id} json={tweet} />
            ))}
            {waitingMessage()}
            {tweets.length > tweetsShown.length && tweetsShown.length >= 25 && (
              <button
                className="loadmore"
                onClick={() => {
                  return dispatch({ type: actionType.INCR_NO_OF_TWEETS_SHOWN });
                }}
              >
                Load more ({tweets.length - tweetsShown.length} unread tweets)
              </button>
            )}
          </span>
        </>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div style={{ maxHeight: "100%" }}>
      {reconnectMessage()}
      {errorMessage()}
      {showTweets()}
    </div>
  );
};

export default TweetFeed;
