import './inputBar.scss';

export default function InputBar({ firstType, typedLetters }) {
  return (
    <div className='input-container'>
      <span className={`${typedLetters.length > 0 ? 'active' : ''} letters-container`}>
        {!firstType
          ? 'Type or Click'
          : typedLetters.map(({ letter, className }, i) => (
              <span key={i} className={`${className} letter`}>
                {letter}
              </span>
            ))}
      </span>
    </div>
  );
}
