import { useState } from 'react';
import './button.scss';

export default function Button({ title, clickEvent, className }) {
  const [animate, setAnimate] = useState(false);
  return (
    <button
      className={`${className ?? ''} ${animate ? 'animate' : ''} custom-button`}
      onClick={() => {
        clickEvent();
        setAnimate(true);
      }}
      onAnimationEnd={() => setAnimate(false)}
    >
      {title}
    </button>
  );
}
