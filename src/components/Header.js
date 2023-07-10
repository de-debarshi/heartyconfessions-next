'use client'

export default function Header() {

  const redirectToHome = () => {
    window.location.href = '/';
  }

  return (
    <header className="header">
      <img src="/assets/logo-large.png" alt="Hearty Confessions Logo" className="header-logo" onClick={redirectToHome}></img>
    </header>
  );
}