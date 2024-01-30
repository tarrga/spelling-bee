import { BsHexagonFill } from 'react-icons/bs';
import './hiveHexagon.scss';

export default function HiveHexagon({ actualLetter, addHandler, position = '', translate = '' }) {
  return (
    <div className={`item ${position}`} style={{ transform: translate }} onClick={e => addHandler(e, actualLetter)}>
      <BsHexagonFill />
      <span>{actualLetter}</span>
    </div>
  );
}
