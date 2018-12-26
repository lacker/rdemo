import React, { useState } from "react";
import "./App.css";

let MAX = 40;

function makeNumber() {
  return Math.floor(Math.random() * (MAX + 1));
}

function makeNumbers() {
  return [makeNumber(), makeNumber()];
}

function makeAddition() {
  let [x, y] = makeNumbers();
  return {
    question: "" + x + " + " + y,
    answer: x + y,
  };
}

function makeAdditionX() {
  let [x, y] = makeNumbers();
  let lhs;
  if (Math.random() < 0.5) {
    lhs = "x + " + y;
  } else {
    lhs = "" + y + " + x";
  }
    return {
      question: lhs + " = " + (x + y),
      answer: x,
    }
  }
}

export default function App() {
  let [[x, y], setNumbers] = useState(makeNumbers());
  let [value, setValue] = useState("");
  let [message, setMessage] = useState("");
  let [streak, setStreak] = useState(0);

  if (message !== "") {
    setTimeout(() => {
      setMessage("");
      setNumbers(makeNumbers());
      setValue("");
    }, 2000);

    return (
      <div className="App">
        <header className="App-header">{message}</header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>math yes no</h1>
        <br />
        <p>
          {x} + {y}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (value === "" + (x + y)) {
              setStreak(streak + 1);
              setMessage("yes!");
            } else {
              setStreak(0);
              setMessage("no!");
            }
          }}
        >
          <input
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            type="text"
            name="answer"
            autoFocus={true}
            autocomplete="off"
          />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}
