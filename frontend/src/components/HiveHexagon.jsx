import { BsHexagonFill } from 'react-icons/bs';
import './hiveHexagon.scss';
import { useState } from 'react';

export default function HiveHexagon({ actualLetter, addHandler, position = '', translate = '' }) {
  const [animate, setAnimate] = useState(false);
  return (
    <div
      className={`item ${animate ? 'animateHex' : ''} ${position} ${translate}`}
      style={{ transform: translate }}
      onClick={e => {
        addHandler(e, actualLetter);
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 150);
      }}
    >
      <BsHexagonFill />
      <span>{actualLetter}</span>
    </div>
  );
}
