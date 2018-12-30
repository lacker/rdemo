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
    answer: "" + x + y,
  };
}

function makeMultiplication() {
  let [x, y] = makeNumbers();
  return {
    question: "" + x + " x " + y,
    answer: "" + x * y,
  };
}

function makeMultiplicationX() {
  let [x, y] = makeNumbers();
  let lhs;
  if (Math.random() < 0.5) {
    lhs = "A x  " + y;
  } else {
    lhs = "" + y + " x A";
  }
    return {
      question: lhs + " = " + (x * y),
      answer: "" + x,
    }
  }
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
      answer: "" + x,
    }
  }
}

function makePuzzle() {
  let list = [
    makeAddition,
    makeMultiplication,
    makeAdditionX,
    makeMultiplicationX,
    ];
  let index = Math.floor(Math.random() * list.length) + 1;
  return list[index](); 
}

export default function App() {
  let [puzzle, setPuzzle] = useState(makePuzzle());
  let [value, setValue] = useState("");
  let [message, setMessage] = useState("");
  let [streak, setStreak] = useState(0);

  if (message !== "") {
    setTimeout(() => {
      setMessage("");
      setPuzzle(makePuzzle());
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
          {puzzle.question}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (value === puzzle.answer) {
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
