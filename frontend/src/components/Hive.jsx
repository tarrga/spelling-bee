import { useState } from 'react';
import './hive.css';

//components
import Button from './Button';

//svg
import { BsHexagonFill } from 'react-icons/bs';
import { SlRefresh } from 'react-icons/sl';
import { useEffect } from 'react';
import { useCallback } from 'react';

import InputBar from './InputBar';
import Status from './Status';

import { useSelector, useDispatch } from 'react-redux';
import { addWord } from '../store/wordsSlice';

export default function Hive({ actualLetters, possibleWordsLength }) {
  const [positions, setPositions] = useState([
    'translate(33%, -95%)',
    'translate(33%, -5%)',
    'translate(-50%, 40%)',
    'translate(-133%, -5%)',
    'translate(-133%, -95%)',
    'translate(-50%, -140%)',
  ]);

  const [percentage, setPercentage] = useState('');
  const [typedLetters, setTypedLetters] = useState([]);
  const [firstType, setFirstType] = useState(false);
  const [error, setError] = useState('');

  const { guessedWords } = useSelector((state) => state.words);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error === '') return;
    setTimeout(() => {
      setError('');
    }, 1500);
  }, [error]);

  const enterEvent = useCallback(async () => {
    setError('');

    //validation

    // check length
    if (typedLetters.length < 4) {
      setError('Too short');
      return;
    }

    //convert array to string
    const typeLetterString = typedLetters
      .map((tl) => tl.letter)
      .toString()
      .replaceAll(',', '');

    // check for duplicates
    if (guessedWords.some((gw) => gw === typeLetterString)) {
      setError('No duplicates');
      setTypedLetters([]);
      return;
    }

    //check for invalid letters
    if (typedLetters.some((letter) => letter.className === 'invalid')) {
      setTypedLetters([]);
      setError('Invalid letters');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/words`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word: typeLetterString }),
        }
      );

      if (!res.ok) throw Error('Something went wrong!');
      const data = await res.json();
      if (data.word) {
        dispatch(addWord(data.word));
        setTypedLetters([]);
      } else {
        setError(data.error);
        setTypedLetters([]);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }, [guessedWords, typedLetters, dispatch]);

  useEffect(() => {
    setPercentage(() => {
      if (
        guessedWords.length >= possibleWordsLength * 0.25 &&
        guessedWords.length < possibleWordsLength * 0.5
      ) {
        return 'twenty-five';
      }
      if (
        guessedWords.length >= possibleWordsLength * 0.5 &&
        guessedWords.length < possibleWordsLength * 0.75
      ) {
        return 'fifty';
      }
      if (
        guessedWords.length >= possibleWordsLength * 0.75 &&
        guessedWords.length < possibleWordsLength
      ) {
        return 'seventy-five';
      }
      if (guessedWords.length >= possibleWordsLength) {
        return 'hundred';
      }
    });
  }, [guessedWords, possibleWordsLength]);

  //add letter
  const addHandler = useCallback(
    (e, lett = '') => {
      let letter;

      //click
      if (e.type === 'click') {
        if (e.target.tagName !== 'SPAN' && e.target.tagName !== 'path') {
          return;
        }
        letter = lett;
      }

      //keypress
      if (e.type === 'keydown') {
        if (e.keyCode === 8) {
          setTypedLetters((prev) => {
            return [...prev].slice(0, -1);
          });
        }
        if (e.keyCode === 13) {
          enterEvent();
          return;
        }
        if (e.keyCode < 65 || e.keyCode > 90) {
          return;
        }
        letter = e.key;
      }

      if (!firstType) setFirstType(true);
      setTypedLetters((prev) => {
        const hasLetter = actualLetters.some(
          (acLetter) => acLetter === letter.toLowerCase()
        );
        return [
          ...prev,
          {
            letter,
            className: hasLetter ? '' : 'invalid',
          },
        ];
      });
    },
    [actualLetters, firstType, enterEvent]
  );

  useEffect(() => {
    window.addEventListener('keydown', addHandler);
    return () => window.removeEventListener('keydown', addHandler);
  }, [addHandler]);

  const deleteEvent = () => {
    setTypedLetters((prev) => {
      return [...prev].slice(0, -1);
    });
  };

  const randomizeLetters = () => {
    setPositions((prev) => {
      let randNewArr = [...prev];
      randNewArr.sort((a, b) => 0.5 - Math.random());
      while (randNewArr.some((el, i) => el === prev[i])) {
        randNewArr.sort((a, b) => 0.5 - Math.random());
      }

      return [...randNewArr];
    });
  };

  return (
    <>
      <div className="hive-container">
        <div className="hive-buttons-container">
          <InputBar typedLetters={typedLetters} firstType={firstType} />
          <div className="hive">
            {error && <div className="error">{error}</div>}
            <div
              className="item center"
              onClick={(e) => addHandler(e, actualLetters[0])}
            >
              <BsHexagonFill />
              <span>{actualLetters[0]}</span>
            </div>
            <div
              className={`item top`}
              style={{ transform: positions[0] }}
              onClick={(e) => addHandler(e, actualLetters[6])}
            >
              <BsHexagonFill />
              <span>{actualLetters[6]}</span>
            </div>
            <div
              className="item top-right"
              style={{ transform: positions[1] }}
              onClick={(e) => addHandler(e, actualLetters[1])}
            >
              <BsHexagonFill />
              <span>{actualLetters[1]}</span>
            </div>
            <div
              className="item bottom-right"
              style={{ transform: positions[2] }}
              onClick={(e) => addHandler(e, actualLetters[2])}
            >
              <BsHexagonFill />
              <span>{actualLetters[2]}</span>
            </div>
            <div
              className="item bottom"
              style={{ transform: positions[3] }}
              onClick={(e) => addHandler(e, actualLetters[3])}
            >
              <BsHexagonFill />
              <span>{actualLetters[3]}</span>
            </div>
            <div
              className="item bottom-left"
              style={{ transform: positions[4] }}
              onClick={(e) => addHandler(e, actualLetters[4])}
            >
              <BsHexagonFill />
              <span>{actualLetters[4]}</span>
            </div>
            <div
              className="item top-left"
              style={{ transform: positions[5] }}
              onClick={(e) => addHandler(e, actualLetters[5])}
            >
              <BsHexagonFill />
              <span>{actualLetters[5]}</span>
            </div>
          </div>
          <div className="buttonsContainer">
            <Button title="Delete" clickEvent={deleteEvent} />
            <Button
              className="circle"
              title={<SlRefresh />}
              clickEvent={randomizeLetters}
            />
            <Button title="Enter" clickEvent={enterEvent} />
          </div>
        </div>
        <Status
          words={guessedWords}
          percentage={percentage}
          possibleWordsLength={possibleWordsLength}
        />
      </div>
    </>
  );
}
