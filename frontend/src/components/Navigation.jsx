import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navigation() {
  return (
    <nav className="container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
