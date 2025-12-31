/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

export function checkGuess(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';

  if (!guess) {
    return null;
    r;
  }

  const guessChars = guess.toUpperCase().split('');
  const answerChars = answer.split('');

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: 'correct',
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = 'incorrect';
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = 'misplaced';
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

async function getRandomWord(length) {
  const responses = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${length}`
  );
  const data = await responses.json();
}

export function processWord(currentWord, answer) {
  const values = [];
  const SOLVED_CHAR = '✓';

  const guessChars = currentWord.toUpperCase().split('');
  const answerChars = answer.split('');

  const result = [];

  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: 'cell correct',
        id: crypto.randomUUID(),
      };
    } else if (answerChars.includes(guessChars[i])) {
      result[i] = {
        letter: guessChars[i],
        status: 'cell misplaced',
        id: crypto.randomUUID(),
      };
    } else {
      result[i] = {
        letter: guessChars[i],
        status: 'cell incorrect',
        id: crypto.randomUUID(),
      };
    }
  }
  console.log(result);
  return result;
}
