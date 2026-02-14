import React from 'react';

export default function NavHeader() {
  return (
    <header className="flex gap-2 px-4 py-2 absolute top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200 w-full h-24">
      <div className="logo">
        <img
          src="android-chrome-512x512.png"
          alt="Portfolio lOGO"
          className="h-20 object-cover"
        />
      </div>
      <nav className='flex items-center h-full'>
        <ul className="flex gap-2 items-center justify-left">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}