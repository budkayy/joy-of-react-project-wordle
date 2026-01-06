import React from 'react';
import './EndGams.css';
import Confetti from 'react-confetti';
import FocusLock from 'react-focus-lock';

function EndGame({ gameStatus, answer, handleResetGame }) {
  const [animationFinished, setAnimationFinished] =
    React.useState(false);
  return (
    <FocusLock disabled={!animationFinished}>
      <div
        className="end-game-container"
        onAnimationEnd={() => setAnimationFinished(true)}
      >
        {gameStatus === 'won' ? <Confetti /> : null}
        <div>
          <h2>
            The Game is {gameStatus === 'won' ? 'Won' : 'Over'}!
          </h2>
          {gameStatus === 'won' ? <p>You Win!</p> : <p>Game over!</p>}
          {gameStatus === 'won' ? (
            <p>Well done guessing {answer}</p>
          ) : (
            <p>You loose! better learn the word {answer}</p>
          )}
        </div>

        <button className="rst-btn" onClick={() => handleResetGame()}>
          Restart Game
        </button>
      </div>
    </FocusLock>
  );
}

export default EndGame;
