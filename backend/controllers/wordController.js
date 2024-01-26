const { wordList, sevenLetterWordList } = require('../models/wordsList');

console.log(sevenLetterWordList);

let lettersOfTheDay;
let possibleWords;

const checkPossibleWords = () => {
  possibleWords = wordList.filter((wordListW) => {
    const wordListWA = wordListW.split('');
    return wordListWA.every((letter) =>
      lettersOfTheDay.some((l) => l === letter)
    );
  });
};

const start = () => {
  const startDate = '2024-01-25';
  const currentDate = new Date();

  const day = Math.ceil(
    new Date(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    ) /
      86400000 -
      new Date(startDate) / 86400000
  );

  lettersOfTheDay = sevenLetterWordList[day]?.split('') ?? [
    'r',
    'f',
    'v',
    'a',
    'o',
    'e',
    'h',
  ];
  possibleWords;

  checkPossibleWords();
  possibleWords = possibleWords.filter((pw) => {
    return pw.split('').some((pwl) => pwl === lettersOfTheDay[0]);
  });

  return { lettersOfTheDay, possibleWords };
};

// @desc get the lettersOfTheDay and possible words
// route GET /api/words
// @access Public

const gameStart = (req, res) => {
  const { lettersOfTheDay, possibleWords } = start();
  res.json({ word: lettersOfTheDay, wordListLength: possibleWords.length });
};

// @desc user post a word
// route POST /api/words
// @access Public

const postWord = (req, res) => {
  const { word } = req.body;
  const wordLowerCase = word.toLowerCase();
  const wordToArray = wordLowerCase.split('');
  if (wordToArray.length < 4) {
    res.json({ error: 'too short' });
  }
  if (!wordToArray.some((wta) => wta === lettersOfTheDay[0])) {
    // letter in the center of star
    res.json({
      error: `It's missing the letter ${lettersOfTheDay[0].toUpperCase()}`,
    });
  }
  wordToArray.forEach((letter) => {
    const hasLetter = lettersOfTheDay.some((letOfDay) => letter === letOfDay);
    if (!hasLetter) {
      res.json({ error: 'Wrong letters' });
    }
  });
  const match = possibleWords.some((w) => w === wordLowerCase);
  if (match) {
    console.log(typeof word);
    console.log(typeof wordLowerCase);
    res.json({ word: wordLowerCase });
  } else {
    res.json({ error: `There is no match` });
  }
};

module.exports = { gameStart, postWord };
