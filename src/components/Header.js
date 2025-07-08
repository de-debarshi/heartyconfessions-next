'use client'
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <img src="/assets/logo-large.png" alt="Hearty Confessions Logo" className="header-logo" width="300" height="60"></img>
      </Link>
    </header>
  );
}