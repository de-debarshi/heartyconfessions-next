import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';

export const metadata = {
  metadataBase: new URL('https://www.heartyconfessions.com'),
  title: 'Hearty Confessions',
  description: 'Welcome to Hearty Confessions, here you can share and explore stories anonymously!',
  keywords: ['hearty confessions', 'confessions', 'stories', 'anonymous'],
  manifest: '/manifest.json',
  themeColor: '#ffedf1',
  openGraph: {
    title: 'Hearty Confessions',
    description: 'Welcome to Hearty Confessions, here you can share and explore stories anonymously!',
    url: '/',
    siteName: 'Hearty Confessions',
    images: [
      {
        url: 'https://www.heartyconfessions.com/logo512.png',
        width: 512,
        height: 512,
      },
      {
        url: 'https://www.heartyconfessions.com/logo192.png',
        width: 192,
        height: 192,
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google tag (gtag.js) */}
          <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-03CTMD81P3" />
          <Script id="gtm">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-03CTMD81P3');
            `}
          </Script>
          {/* End Google tag (gtag.js) */}
          {/* Adsense Code */}
          <Script strategy="afterInteractive" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6764403383314817" crossorigin="anonymous" />
          {/* End Adsense Code */}
          {/* Meta Pixel Code */}
            <Script id="fbPixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1090671751818689');
                fbq('track', 'PageView');
              `}
            </Script>
          {/* End Meta Pixel Code */}
        <Header/>
        <main>
          {children}
        </main>
        <footer>
          <div className="footer__contact-details"><a href="mailto:heartyconfessions.contact@gmail.com">Need to Contact?</a></div>
        </footer>
      </body>
    </html>
  )
}
