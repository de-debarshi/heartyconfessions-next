import Image from 'next/image'
import styles from './page.module.css'
import Showcase from '@/components/Showcase'

export default function Home() {
  return (
    <div className="home-page">
      <div className="introduction-text">
        <p>Welcome to Hearty Confessions, a place where you can share and explore stories <i>anonymously</i>!</p>
      </div>
      <Showcase />
      <div>
        <a href="/submit" className="button-styled submit-stories-btn">Submit Your Stories</a>
      </div>
      <div>
        <a href="/explore" className="button-styled">Explore Stories</a>
      </div>
    </div>
  )
}
