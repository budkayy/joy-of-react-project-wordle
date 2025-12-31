import LettersSpan from './LettersSpan.js';
import WordParagraph from './WordParagraph.js';

import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED as allowedAt } from '../../constants.js';
import Confetti from 'react-confetti';

function Guess({ answer, wordsArray, count, currentWord }) {
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
        <WordParagraph key={Math.random()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;
            const currentLetter = currentWord[sIndex];
            return (
              <LettersSpan
                key={Math.random()}
                className="cell"
                letter={currentLetter}
              />
            );
          })}
        </WordParagraph>
      );
    } else if (typeof wordsArray[pIndex] !== 'undefined') {
      return (
        <WordParagraph key={wordsArray[pIndex].id}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;

            const currentLetter = wordsArray[pIndex].guess[sIndex];

            const currentLetterMatch =
              answer[sIndex] === currentLetter ? true : false;

            const classEst =
              wordsArray[pIndex].letters[sIndex].status;

            return (
              <LettersSpan
                key={wordsArray[pIndex].letters[sIndex].id}
                className={classEst}
                letter={wordsArray[pIndex].guess[sIndex]}
              />
            );
          })}
        </WordParagraph>
      );
    } else {
      return (
        <WordParagraph key={Math.random()}>
          {range(answer.length).map((item, index) => {
            const sIndex = index;
            return (
              <LettersSpan key={Math.random()} className="cell" />
            );
          })}
        </WordParagraph>
      );
    }
    return;
  });

  return <div className="guess-results">{allowedWordsElement}</div>;
}

export default Guess;
