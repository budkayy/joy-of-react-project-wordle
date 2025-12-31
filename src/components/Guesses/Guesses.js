import React from 'react';
import Guess from '../Guess/Guess';
import Guess2 from '../Guess/Guess2';

function Guesses({ wordsArray, answer, currentWord, count }) {
  return (
    <div className="guess-results">
      <Guess2
        key={crypto.randomUUID()}
        answer={answer}
        wordsArray={wordsArray}
        currentWord={currentWord}
        count={count}
      />
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
