import { useState } from 'react';
import './hive.scss';

//components
import Button from './Button';

//svg
import { SlRefresh } from 'react-icons/sl';
import { useEffect } from 'react';
import { useCallback } from 'react';

import InputBar from './InputBar';
import Status from './Status';
import HiveHexagon from './HiveHexagon';

import { useSelector, useDispatch } from 'react-redux';
import { addWord } from '../store/wordsSlice';

export default function Hive({ actualLetters, possibleWordsLength }) {
  const [positions, setPositions] = useState(['top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left']);

  const [percentage, setPercentage] = useState('zero');
  const [typedLetters, setTypedLetters] = useState([]);
  const [firstType, setFirstType] = useState(false);
  const [error, setError] = useState('');

  const { guessedWords, lettersOfTheDay } = useSelector(state => state.words);
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
      .map(tl => tl.letter)
      .toString()
      .replaceAll(',', '');

    // check for duplicates
    if (guessedWords.some(gw => gw === typeLetterString)) {
      setError('No duplicates');
      setTypedLetters([]);
      return;
    }

    //check for invalid letters
    if (typedLetters.some(letter => letter.className === 'invalid')) {
      setTypedLetters([]);
      setError('Invalid letters');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: typeLetterString,
          wordOfTheDay: lettersOfTheDay.join(''),
        }),
      });

      if (!res.ok) throw Error('Something went wrong!');
      const data = await res.json();
      if (data.word) {
        dispatch(addWord(data.word));
        localStorage.setItem(`gtSpellingBee-${lettersOfTheDay.join('')}`, JSON.stringify([...guessedWords, data.word]));
        setTypedLetters([]);
      } else {
        setError(data.error);
        setTypedLetters([]);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }, [guessedWords, typedLetters, dispatch, lettersOfTheDay]);

  useEffect(() => {
    setPercentage(() => {
      if (guessedWords.length >= possibleWordsLength * 0.25 && guessedWords.length < possibleWordsLength * 0.5) {
        return 'twenty-five';
      }
      if (guessedWords.length >= possibleWordsLength * 0.5 && guessedWords.length < possibleWordsLength * 0.75) {
        return 'fifty';
      }
      if (guessedWords.length >= possibleWordsLength * 0.75 && guessedWords.length < possibleWordsLength) {
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
          setTypedLetters(prev => {
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
      setTypedLetters(prev => {
        const hasLetter = actualLetters.some(acLetter => acLetter === letter.toLowerCase());
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
    setTypedLetters(prev => {
      return [...prev].slice(0, -1);
    });
  };

  const randomizeLetters = () => {
    setPositions(prev => {
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
      <div className='hive-guessed-container'>
        <div className='hive-buttons-input-container'>
          <InputBar typedLetters={typedLetters} firstType={firstType} error={error} />
          <div className='hive'>
            {/* {error && <div className='error'>{error}</div>} */}
            <HiveHexagon actualLetter={actualLetters[0]} position={'center'} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[1]} translate={positions[0]} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[2]} translate={positions[1]} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[3]} translate={positions[2]} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[4]} translate={positions[3]} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[5]} translate={positions[4]} addHandler={addHandler} />
            <HiveHexagon actualLetter={actualLetters[6]} translate={positions[5]} addHandler={addHandler} />
          </div>
          <div className='buttonsContainer'>
            <Button title='Delete' clickEvent={deleteEvent} />
            <Button className='circle' title={<SlRefresh />} clickEvent={randomizeLetters} />
            <Button title='Enter' clickEvent={enterEvent} />
          </div>
        </div>
        <Status words={guessedWords} percentage={percentage} possibleWordsLength={possibleWordsLength} />
      </div>
    </>
  );
}
