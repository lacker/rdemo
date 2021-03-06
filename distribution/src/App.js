import React, { useState } from "react";
import "./App.css";

let NUM = 2;
let SIDES = 20;

function choice(list) {
  let index = Math.floor(Math.random() * list.length) + 1;
  return list[index];
}

let add = {
  char: "+",
  f: (x, y) => x + y,
  base: 0,
};

let sub = {
  char: "-",
  f: (x, y) => {
    if (x === "nothing") {
      return y; 
    }
    return x - y;
  },
  base: "nothing"
};

let mult = {
  char: "x",
  f: (x, y) => x * y,
  base: 1,
};

let OP = add;

function evaluate(list) {
  let answer = OP.base;
  for (let x of list) {
    answer = OP.f(answer, x);
  }
  return answer;
}

function repeat(x, n) {
  let answer = [];
  for (let i = 0; i < n; i++) {
    answer.push(x);
  }
  return answer;
}

let MIN = evaluate(repeat(1, NUM));
let MAX = evaluate(repeat(SIDES, NUM));

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
    "hello! you are rolling " + NUM + " dice with " + SIDES + " sides"
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
            for (let i = 0; i < NUM; i++) {
              let r = roll();
              dice.push(r);
            }
            let result = evaluate(dice);
            setMessage(
              "you rolled " + dice.join(" " + OP.char + " ") + " = " + result
            );
            let newDist = {
              ...dist
            };
            newDist[result] = (dist[result] || 0) + 1;
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
