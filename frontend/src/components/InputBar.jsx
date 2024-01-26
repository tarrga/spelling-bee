export default function InputBar({ firstType, typedLetters }) {
  return (
    <div className='input-container'>
      <span className={`${typedLetters.length > 0 ? 'active' : ''}`}>
        {!firstType
          ? 'Type or Click'
          : typedLetters.map(({ letter, className }, i) => (
              <span key={i} className={`${className}`}>
                {letter}
              </span>
            ))}
      </span>
    </div>
  );
}
