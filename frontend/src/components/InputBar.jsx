import './inputBar.scss';

export default function InputBar({ firstType, typedLetters, error }) {
  console.log(error);
  return (
    <div className='input-container'>
      {error && <div className='error'>{error}</div>}
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
