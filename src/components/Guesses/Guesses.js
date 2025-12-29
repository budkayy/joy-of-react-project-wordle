import React from 'react';
import Guess from '../Guess/Guess';

function Guesses({ wordsArray, answer, currentWord, count }) {
  return (
    <div className="guess-results">
      <Guess
        key={crypto.randomUUID()}
        answer={answer}
        wordsArray={wordsArray}
        currentWord={currentWord}
        count={count}
      />
    </div>
  );
}

export default Guesses;
