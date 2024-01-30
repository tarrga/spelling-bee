import { useState } from 'react';
import './button.scss';

export default function Button({ title, clickEvent, className }) {
  const [animate, setAnimate] = useState(false);
  return (
    <button
      className={`${className ?? ''} ${animate ? 'animate' : ''} custom-button`}
      onClick={() => {
        console.log('click');
        clickEvent();
        setAnimate(true);
      }}
      onAnimationStart={() => console.log('animation start')}
      onAnimationEnd={() => setAnimate(false)}
    >
      {title}
    </button>
  );
}
