import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import Guesses from '../Guesses/Guesses';
import EndGame from '../EndGame/EndGame';

import useSWR from 'swr';

import { NUM_OF_GUESSES_ALLOWED as allowedAt } from '../../constants.js';
import { checkGuess, processWord } from '../../game-helpers.js';

import { sample } from '../../utils';
import { WORDS, PWORDS } from '../../data';

// Pick a random word on every pageload.
let answer = sample(WORDS).toUpperCase();

// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState('running');
  const [wordsArray, setWordsArray] = React.useState([]);

  const [count, setCount] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState('');
  const [selectedLetters, setSelectedLetters] = React.useState([]);

  function addCurrentWord(word) {
    setCurrentWord(word);
  }

  function handleSubmitGuess(e) {
    e.preventDefault();

    if (!PWORDS.includes(currentWord.toLowerCase())) {
      // console.log(currentWord.toLowerCase());
      alert('please enter an actual word');
      return;
    }

    const values = processWord(currentWord, answer);

    const nextGuesses = [
      ...wordsArray,
      {
        guess: currentWord,
        id: crypto.randomUUID(),
        letters: values,
      },
    ];

    setSelectedLetters((prev) => {
      const statusMap = values.reduce(
        (acc, { letter, status }) => {
          const priority = {
            'cell correct': 3,
            'cell misplaced': 2,
            'cell incorrect': 1,
          };
          if (
            !acc[letter] ||
            priority[status] > priority[acc[letter]]
          ) {
            acc[letter] = status;
          }
          return acc;
        },
        { ...prev }
      );
      return statusMap;
    });

    // console.log(selectedLetters);

    setWordsArray(nextGuesses);

    setCurrentWord('');

    const newCount = count + 1;
    setCount(newCount);

    if (answer === currentWord) {
      setGameStatus('won');
    } else if (nextGuesses.length >= allowedAt) {
      setGameStatus('lost');
    }

    // console.log(nextGuesses);
  }

  function handleResetGame() {
    setGameStatus('running');
    setWordsArray([]);
    setCount(0);
    setCurrentWord('');
    answer = sample(WORDS).toUpperCase();
    console.info({ answer });
    setSelectedLetters([]);
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
        selectedLetters={selectedLetters}
      />
    </>
  );
}

export default Game;
