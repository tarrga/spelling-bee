import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';
import Navigation from './components/Navigation';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
