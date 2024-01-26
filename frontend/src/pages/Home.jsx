import Hive from '../components/Hive';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPossibleWordsLength,
  setLettersOfTheDay,
} from '../store/wordsSlice';

export default function Home() {
  const [minTime, setMinTime] = useState(0);
  const { lettersOfTheDay, possibleWordsLength } = useSelector(
    (state) => state.words
  );
  const dispatch = useDispatch();

  const [errorMessage, setError] = useState(false);
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
