import LettersSpan from './LettersSpan.js';
import WordParagraph from './WordParagraph.js';

import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED as allowedAt } from '../../constants.js';
import Confetti from 'react-confetti';

function Guess2({ answer, wordsArray, count, currentWord }) {
  const allowedWordsElement = range(allowedAt).map((item, index) => {
    const pIndex = index;

    const displayCurrent =
      (typeof wordsArray[pIndex] === 'undefined' &&
        count === 0 &&
        pIndex === 0) ||
      (typeof wordsArray[pIndex] === 'undefined' &&
        count !== 0 &&
        pIndex === count);

    if (displayCurrent) {
      return (
        <p className="guess" key={Math.random()}>
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
        <p className="guess" key={wordsArray[pIndex].id}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;

            const currentLetter = wordsArray[pIndex].guess[sIndex];

            const currentLetterMatch =
              answer[sIndex] === currentLetter ? true : false;

            const classEst =
              wordsArray[pIndex].letters[sIndex].status;

            return (
              <span
                key={wordsArray[pIndex].letters[sIndex].id}
                className={classEst}
              >
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

export default Guess2;
