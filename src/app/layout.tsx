import type { Metadata } from 'next'

import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/800.css'
import '../style/index.css'

export const metadata: Metadata = {
  title: 'Greatest500 - Discover music',
  description: 'Discover music from the 500 greatest albums of all time.',
}

export const runtime = 'edge'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-slate-950'>
        <div className='text-slate-200 font-medium min-h-screen flex flex-col'>
          <nav className='flex items-center p-4'>
            <a className='flex items-center gap-3' href='/'>
              <img className='w-8 h-8' src='/icon.svg' alt='Logo' />
              <div className='text-xl font-extrabold'>Greatest500</div>
            </a>
            <div className='grow'></div>
            <a href='/random' className=''>
              <div
                style={{
                  maskImage: `url(/random.svg)`,
                  maskSize: '100% 100%',
                }}
                className='w-8 h-8 bg-current'
              />
            </a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
