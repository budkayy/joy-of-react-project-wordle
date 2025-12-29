import React from 'react';
import Input from '../Input/Input';
import Keyboard from '../Keyboard/Keyboard';

function InputContainer({
  currentWord,
  handleSubmitGuess,
  addCurrentWord,
  answer,
  gameStatus,
}) {
  return (
    <>
      <Input
        addCurrentWord={addCurrentWord}
        handleSubmitGuess={handleSubmitGuess}
        currentWord={currentWord}
        answer={answer}
        gameStatus={gameStatus}
      />

      <Keyboard currentWord={currentWord} />
    </>
  );
}

export default InputContainer;
