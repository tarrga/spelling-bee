import './header.scss';

export default function Header() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return (
    <header>
      <h1 className='container'>
        Spelling Bee&nbsp;
        <span>
          {month} {day}, {year}
        </span>
      </h1>
    </header>
  );
}
