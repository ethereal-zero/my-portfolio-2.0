import React from 'react';

export default function NavHeader() {
  return (
    <header className="nav-header sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <nav>
        <div className="logo">
          <h1>My Portfolio</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}