import React from 'react';

function Input({
  currentWord,
  addCurrentWord,
  handleSubmitGuess,
  answer,
  gameStatus,
}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    console.log('focus');
    inputRef.current.focus();
  }, [answer]);

  function handleOnChange(e) {
    const formatInput = e.target.value
      .replace(/[^a-z]/gi, '')
      .toUpperCase();

    const newWord = formatInput;
    addCurrentWord(newWord);
  }

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={handleSubmitGuess}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        ref={inputRef}
        id="guess-input"
        type="text"
        maxLength={5}
        pattern=".{5,}"
        title="You need to add a word with 5 characters"
        value={currentWord}
        onChange={handleOnChange}
        required={true}
        disabled={gameStatus === 'running' ? false : true}
      ></input>
    </form>
  );
}

export default Input;
