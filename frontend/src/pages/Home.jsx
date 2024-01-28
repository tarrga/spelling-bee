import Hive from '../components/Hive';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGuessedWords,
  setPossibleWordsLength,
  setLettersOfTheDay,
} from '../store/wordsSlice';

export default function Home() {
  const [minTime, setMinTime] = useState(0);
  const { guessedWords, lettersOfTheDay, possibleWordsLength } = useSelector(
    (state) => state.words
  );
  const dispatch = useDispatch();

  const [errorMessage, setError] = useState(false);

  // get data from the server
  useEffect(() => {
    if (lettersOfTheDay.length !== 0) {
      return;
    }

    const fetchData = async () => {
      setMinTime(800);
      setError(false);
      setTimeout(() => {
        setMinTime(0);
      }, minTime);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/words/`
        );
        if (!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        dispatch(setLettersOfTheDay(data.word));
        dispatch(setPossibleWordsLength(data.wordListLength));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [minTime, dispatch, lettersOfTheDay]);

  // get guessed words from localStorage
  useEffect(() => {
    if (guessedWords.length !== 0) {
      return;
    }

    // remove old items from localStorage
    if (lettersOfTheDay.length !== 0) {
      Object.keys(localStorage).forEach((key) => {
        if (
          key.startsWith('gtSpellingBee-') &&
          key !== `gtSpellingBee-${lettersOfTheDay.join('')}`
        )
          localStorage.removeItem(key);
      });
    }

    const localStorageData = localStorage.getItem(
      `gtSpellingBee-${lettersOfTheDay.join('')}`
    );
    if (localStorageData) {
      dispatch(setGuessedWords(JSON.parse(localStorageData)));
    }
  }, [lettersOfTheDay, dispatch, guessedWords]);

  if (errorMessage) {
    return <h2 className="container">{errorMessage}</h2>;
  }
  if (lettersOfTheDay.length === 0 || minTime !== 0) {
    return <Spinner />;
  }

  return (
    <main>
      <Hive
        actualLetters={lettersOfTheDay}
        possibleWordsLength={possibleWordsLength}
      />
    </main>
  );
}
