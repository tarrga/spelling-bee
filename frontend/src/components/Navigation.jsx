import { NavLink } from 'react-router-dom';

import './navigation.scss';

export default function Navigation() {
  return (
    <nav>
      <div className='wrapper'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>
    </nav>
  );
}
