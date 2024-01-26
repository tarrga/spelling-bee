export default function About() {
  return (
    <div className="container">
      <h2>About</h2>
      <div className="about">
        This is my Spelling Bee game, based on New York Times{' '}
        <a
          href="https://www.nytimes.com/puzzles/spelling-bee"
          rel="noreferrer"
          target="_blank"
        >
          Spelling Bee
        </a>{' '}
        game.
        <p>
          The rules are simple: you receive a set of 7 letters and have to form
          words with at least 4 letters from them. All letters can be used as
          often as desired, but each word must contain the one letter colored
          yellow.
        </p>
      </div>
    </div>
  );
}
