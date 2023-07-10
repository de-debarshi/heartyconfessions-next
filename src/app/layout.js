import './globals.css'
import Header from '../components/Header';

export const metadata = {
  title: 'Hearty Confessions',
  description: 'Welcome to Hearty Confessions, a place where you can share and explore stories anonymously!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  )
}
