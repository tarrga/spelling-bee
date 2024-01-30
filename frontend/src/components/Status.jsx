import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './status.scss';

export default function Status({ words, percentage, possibleWordsLength }) {
  const [level, setLevel] = useState('');
  const [openWordsList, setOpenWordsList] = useState(false);
  const ref = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (percentage === 'zero') {
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

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

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
            <div className={`value ${percentage ?? ''}`}>{words.length}</div>
          </div>
        </div>

        <div className={'status-container'} style={{ height: width <= 900 ? (openWordsList ? ref.current?.offsetHeight + 50 : 50) : '100%' }}>
          <div className='small-title'>
            <span>You have found {words.length} words</span>
            <span onClick={() => setOpenWordsList(!openWordsList)} className={`btn ${openWordsList ? 'open' : ''}`}>
              <IoIosArrowDown />
            </span>
          </div>
          {words.length > 0 && (
            <ul className='letters-container' ref={ref}>
              {words.map(letter => (
                <li key={letter} className='letter'>
                  {letter}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
