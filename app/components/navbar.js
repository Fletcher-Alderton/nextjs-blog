import React from 'react';
import Link from 'next/link';
import '../components/navbar.css'

export default function Navbar() {
  return (
    <header>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
