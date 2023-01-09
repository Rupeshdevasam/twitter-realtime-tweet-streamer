import React, { useEffect } from "react";
import TweetFeed from "./TweetFeed";
import RuleList from "./RuleList";

import "../stylesheets/App.css";
import { useSelector } from "react-redux";

const App = () => {
  const state = useSelector((state) => state);

  useEffect(() => {
    const el = document.querySelector(".notification");
    let count = 0;
    if (state.tweets.length - state.tweetsShown.length > 0) {
      count = state.tweets.length - state.tweetsShown.length;
      el.setAttribute("data-count", count);
      el.classList.remove("notify");
      el.offsetWidth;
      el.classList.add("notify");
    } else {
      el.setAttribute("data-count", count);
    }
    el.classList.add("show-count");
  }, [state.tweets]);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <div className="ui container" style={{ display: "flex" }}>
      <h1 className="ui header">
        <img
          className="ui image"
          src="/Twitter_Logo_Blue.png"
          alt="Twitter Logo"
        />
        <div className="notification" onClick={() => scrollToBottom()}></div>
      </h1>

      <div
        className="ui container"
        style={{
          marginTop: "10%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <RuleList
          styles={{
            margin: "0 auto",
            width: "100%",
            maxWidth: "500px",
            position: "fixed",
            top: "3%",
            left: "50%",
            zIndex: "9999",
            transform: "translateX(-50%)",
          }}
        />
        <TweetFeed />
      </div>
    </div>
  );
};

export default App;
