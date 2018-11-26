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

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {x} + {y}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            setNumbers(makeNumbers());
          }}
        >
          <input type="submit" value="Submit" autofocus="true" />
        </form>
      </header>
    </div>
  );
}
