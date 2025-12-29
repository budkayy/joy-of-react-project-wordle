import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED as allowedAt } from '../../constants.js';
import Confetti from 'react-confetti';

function Guess({ answer, wordsArray, count, currentWord }) {
  const allowedWordsElement = range(allowedAt).map((item, index) => {
    const pIndex = index;

    if (
      typeof wordsArray[pIndex] === 'undefined' &&
      count === 0 &&
      pIndex === 0
    ) {
      return (
        <p className="guess" key={crypto.randomUUID()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;
            const currentLetter = currentWord[sIndex];
            return (
              <span key={Math.random()} className="cell">
                {currentLetter}
              </span>
            );
          })}
        </p>
      );
    } else if (
      typeof wordsArray[pIndex] === 'undefined' &&
      count !== 0 &&
      pIndex === count
    ) {
      return (
        <p className="guess" key={crypto.randomUUID()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;
            const currentLetter = currentWord[sIndex];

            return (
              <span key={Math.random()} className="cell">
                {currentLetter}
              </span>
            );
          })}
        </p>
      );
    } else if (typeof wordsArray[pIndex] !== 'undefined') {
      return (
        <p className="guess" key={crypto.randomUUID()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;

            const currentLetter = wordsArray[pIndex].guess[sIndex];

            const currentLetterMatch =
              answer[sIndex] === currentLetter ? true : false;

            const curerntLetterIncluded =
              answer.includes(currentLetter);

            const classEst = currentLetterMatch
              ? 'cell correct'
              : curerntLetterIncluded
              ? 'cell misplaced'
              : 'cell incorrect';

            return (
              <span key={Math.random()} className={classEst}>
                {classEst === 'cell correct' ? <Confetti /> : null}
                {wordsArray[pIndex].guess[sIndex]}
              </span>
            );
          })}
        </p>
      );
    } else {
      return (
        <p className="guess" key={Math.random()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;
            return <span key={Math.random()} className="cell"></span>;
          })}
        </p>
      );
    }
    return;
  });

  return <div className="guess-results">{allowedWordsElement}</div>;
}

export default Guess;
