import { Inter } from 'next/font/google'
import './globals.css'
import SparklesIcon from '../components/SparklesIcon';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-b from-bgGradientFrom to-bgGradientTo min-h-screen text-white"}>
        <main className="p-4 max-w-2xl mx-auto">
          <header className='flex justify-between my-8'>
            <Link className="flex gap-1" href='/'><SparklesIcon />
              <span>CaptionGen</span>
            </Link>
            <nav className="flex gap-6 text-white/80">
              <Link href='/'>Home</Link>
              <Link href='/pricing'>Pricing</Link>
              <Link href='/about'>About</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}