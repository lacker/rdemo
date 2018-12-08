import React, { useState } from "react";
import "./App.css";

let NUM = 2;
let SIDES = 20;

let MIN = NUM;
let MAX = NUM * SIDES;

function xline(num, count) {
  let str = "" + num;
  while (str.length < ("" + MAX).length) {
    str = " " + str;
  }
  str += ": ";
  for (let i = 0; i < count; i++) {
    str += "X";
  }
  return str;
}

function roll() {
  return 1 + Math.floor(Math.random() * SIDES);
}

function App() {
  let [dist, setDist] = useState({});
  let [message, setMessage] = useState(
    "you are rolling " + NUM + " dice with " + SIDES + " sides"
  );

  let lines = [];
  for (let i = MIN; i <= MAX; i++) {
    lines.push([i, dist[i]]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Dice Counting</p>
        <p>{message}</p>
        <button
          style={{ height: "100px", width: "1000px", fontSize: 36 }}
          onClick={() => {
            let dice = [];
            let sum = 0;
            for (let i = 0; i < NUM; i++) {
              let r = roll();
              dice.push(r);
              sum += r;
            }
            setMessage("you rolled " + dice.join(", ") + " which makes " + sum);
            let newDist = {
              ...dist
            };
            newDist[sum] = (dist[sum] || 0) + 1;
            console.log(newDist);
            setDist(newDist);
          }}
          autoFocus={true}
        >
          Roll
        </button>
        <pre style={{ textAlign: "left", fontSize: 16 }}>
          {lines.map(([n, c]) => xline(n, c)).join("\n")}
        </pre>
      </header>
    </div>
  );
}

export default App;
