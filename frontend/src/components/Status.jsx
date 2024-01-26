import { useEffect, useState } from 'react';
import './status.css';

export default function Status({ words, percentage, possibleWordsLength }) {
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (percentage === '') {
      setLevel('Beginner');
    }
    if (percentage === 'twenty-five') {
      setLevel('Intermediate');
    }
    if (percentage === 'fifty') {
      setLevel('Expert');
    }
    if (percentage === 'seventy-five') {
      setLevel('Pro');
    }
    if (percentage === 'hundred') {
      setLevel('Master');
    }
  }, [percentage]);
  return (
    <>
      <div className='status-container-wrapper'>
        <div className='status-bar-container'>
          <span className='level-text'>{level}</span>
          <div className='level-line'>
            <span className='dots'></span>
            <span className='dots'></span>
            <span className='dots'></span>
            <span className='dots'></span>
            <span className='dots'></span>
            <span className='dots'>{possibleWordsLength}</span>
            <div className={`value ${percentage}`}>{words.length}</div>
          </div>
        </div>

        <div className='status-container'>
          {words.length === 0 ? (
            <div className='small-title'>You have found 0 words</div>
          ) : (
            <div className='small-title'>You have found {words.length} words</div>
          )}
          <div className='letters-container'>
            {words.length > 0 &&
              words.map((letter) => (
                <div key={letter} className='letter'>
                  {letter}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
