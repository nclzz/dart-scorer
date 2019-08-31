import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import CheckoutTable from "./checkoutTable";
import CheckoutCombinations from "./components/CheckoutCombinations";
import "./styles.css";

const PlayerScore = styled.p`
  font-size: 20rem;
  margin: 0px;
  ${props =>
    props.invalidCheckout &&
    css`
      color: rgb(250, 60, 95);
    `}
`;

const InputScore = styled.input`
  font-size: 10rem;
  font-weight: 200;
  background: transparent;
  caret-color: rgb(105, 145, 245);
  color: rgb(100, 100, 120);
  border: none;
  outline: none;
  text-align: right;
  width: 20rem;
  &:focus {
    border: none;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

function Example() {
  const invalidCheckouts = [169, 168, 166, 165, 163, 162, 159];
  const invalidThrows = [179, 178, 176, 175, 172, 169, 166, 163];
  const [throwScore, setThrowScore] = useState("");
  const [throws, setThrows] = useState([]);
  const [playerScore, setPlayerScore] = useState(301);
  useEffect(() => {
    if (playerScore === 0) {
      addLeg(legs => [...legs, throws]);
      setThrows([]);
      setPlayerScore(301);
    }
  }, [playerScore, throws]);
  const [legs, addLeg] = useState([]);
  const [hint, setHint] = useState("");

  function checkoutIsValid(score) {
    if (score > 170) {
      return false;
    }
    if (invalidCheckouts.includes(score)) {
      return false;
    }
    return true;
  }

  function scoreIsValid(score) {
    if (score > 180) {
      return false;
    }

    if (invalidThrows.includes(score)) {
      return false;
    }

    if (playerScore - throwScore < 0) {
      return false;
    }

    return true;
  }

  function average() {
    const allThrows = legs.flat();
    const throws = allThrows.length;
    const totalScore = allThrows.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return throws > 0 ? (totalScore / throws).toFixed(2) : null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lastThrowScore = Number(throwScore);

    if (!scoreIsValid(lastThrowScore)) {
      setHint("Invalid Throw");
      return;
    }

    if (playerScore - lastThrowScore === 1) {
      setThrows(throws => [...throws, 0]);
      setThrowScore("");
      return;
    }

    if (playerScore === lastThrowScore) {
      if (checkoutIsValid(lastThrowScore)) {
        setPlayerScore(0);
        setThrows(throws => [...throws, lastThrowScore]);
        setThrowScore("");
        return;
      }
      setThrows(throws => [...throws, 0]);
      setThrowScore("");
      setHint("Invalid Checkout");
      return;
    }

    setPlayerScore(playerScore - lastThrowScore);
    setThrows(throws => [...throws, lastThrowScore]);
    setThrowScore("");
    setHint("");
    return;
  }

  function handleChange(value) {
    setThrowScore(value);
  }

  function hasCheckoutCombination(element) {
    return element.score === playerScore;
  }

  return (
    <div id="wrapper">
      <div id="playerScore">
        <PlayerScore invalidCheckout={invalidCheckouts.includes(playerScore)}>
          {playerScore}
        </PlayerScore>
        {average() ? <p>{average()} avg</p> : null}
      </div>
      <div id="checkoutSuggestion">
        {CheckoutTable.find(hasCheckoutCombination) ? (
          <CheckoutCombinations
            checkoutCombinations={CheckoutTable.find(hasCheckoutCombination)}
          />
        ) : null}
      </div>
      <div id="currentThrow">
        <ThrowList throws={throws} />
      </div>
      <div id="currentScore">
        <form onSubmit={handleSubmit}>
          <InputScore
            name="score"
            type="number"
            value={throwScore}
            autoFocus
            onChange={e => handleChange(e.target.value)}
          />
        </form>
        <p>{hint}</p>
      </div>
      <div id="historicalData">
        <ul>
          {legs.map((item, index) => (
            <li key={index}>
              <ThrowList throws={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ThrowList({ throws }) {
  function legAverage(throws) {
    const score = throws.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const throwsCount = throws.length;
    console.log(score, throwsCount);
    return (score / throwsCount).toFixed(2);
  }

  return (
    <ul>
      {throws.length !== 0 ? <p>{legAverage(throws)} avg</p> : null}
      {throws.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

ReactDOM.render(<Example />, document.getElementById("app"));
