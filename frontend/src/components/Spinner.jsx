import './spinner.scss';
import spinner from '../assets/image/spinner.gif';

export default function Spinner() {
  return (
    <div className='spinner'>
      <img src={spinner} alt='Loading...' />
    </div>
  );
}
