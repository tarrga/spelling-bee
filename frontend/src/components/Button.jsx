import './button.css';

export default function Button({ title, clickEvent, className }) {
  return (
    <div className={`${className ?? ''} custom-button`} onClick={clickEvent}>
      {title}
    </div>
  );
}
