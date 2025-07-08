import Showcase from '@/components/Showcase'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-page">
      <div className="introduction-text">
        <p>Welcome to Hearty Confessions, here you can share and explore stories <i>anonymously</i>!</p>
      </div>
      <Showcase />
      <div>
        <Link href="/submit" className="button-styled submit-stories-btn">Submit Your Stories</Link>
      </div>
      <div>
        <Link href="/explore" className="button-styled">Explore Stories</Link>
      </div>
    </div>
  )
}
