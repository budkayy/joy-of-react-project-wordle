import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import Guesses from '../Guesses/Guesses';
import EndGame from '../EndGame/EndGame';

import useSWR from 'swr';

import { NUM_OF_GUESSES_ALLOWED as allowedAt } from '../../constants.js';
import { checkGuess } from '../../game-helpers.js';

import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const ENDPOINT = `https://random-word-api.herokuapp.com/word?length=`;
async function fetchRandomWord(endpoint, length) {
  const response = await fetch(endpoint, length);
  const data = await response.json();
  return data;
}

function Game() {
  const [gameStatus, setGameStatus] = React.useState('running');
  const [wordsArray, setWordsArray] = React.useState([]);

  const [count, setCount] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState('');

  const { data, error } = useSWR(fetchRandomWord, fetcher);
  console.log(data, error);

  function addCurrentWord(word) {
    setCurrentWord(word);
  }

  function processWord() {
    const SOLVED_CHAR = '✓';
  }

  function handleSubmitGuess(e) {
    e.preventDefault();

    const nextGuesses = [
      ...wordsArray,
      {
        guess: currentWord,
        id: crypto.randomUUID(),
        letters: checkGuess(currentWord, answer),
      },
    ];

    setWordsArray(nextGuesses);

    setCurrentWord('');

    const newCount = count + 1;
    setCount(newCount);

    if (answer === currentWord) {
      setGameStatus('won');
    } else if (nextGuesses.length >= allowedAt) {
      setGameStatus('lost');
    }
  }

  function handleResetGame() {
    setGameStatus('running');
    setWordsArray([]);
    setCount(0);
    setCurrentWord('');
    answer = sample(WORDS);
    console.info({ answer });
  }

  return (
    <>
      {gameStatus !== 'running' ? (
        <EndGame
          answer={answer}
          handleResetGame={handleResetGame}
          gameStatus={gameStatus}
        />
      ) : null}

      <Guesses
        wordsArray={wordsArray}
        answer={answer}
        count={count}
        currentWord={currentWord}
      />

      <InputContainer
        addCurrentWord={addCurrentWord}
        handleSubmitGuess={handleSubmitGuess}
        currentWord={currentWord}
        answer={answer}
        gameStatus={gameStatus}
      />
    </>
  );
}

export default Game;
