import React, { useState } from "react";
import "./App.css";

function makeNumber() {
  return Math.floor(Math.random() * 10);
}

function makeNumbers() {
  return [makeNumber(), makeNumber()];
}

export default function App() {
  let [[x, y], setNumbers] = useState(makeNumbers());
  let [value, setValue] = useState("");
  let [message, setMessage] = useState("");

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
        <p>
          {x} + {y}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (value === "" + (x + y)) {
              setMessage("yes!");
            } else {
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
