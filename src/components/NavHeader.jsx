import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavHeader() {
  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="flex gap-2 items-center px-4 py-2 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200 w-full h-24 shadow-sm shadow-accent">
      <div className="logo">
        <img
          src="android-chrome-512x512.png"
          alt="Portfolio Logo"
          className="h-20 object-cover"
        />
      </div>

      <nav className="hidden sm:block flex items-center">
        <ul className="flex gap-2 items-center justify-left">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1 rounded transition ${
                    isActive ? 'font-semibold underline' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
