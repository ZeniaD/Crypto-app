import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import InfoBar from "@/components/InfoBar";
import NavBar from "@/components/NavBar";
import Providers from "@/app/providers";
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'CryptoCraze',
  description: 'CryptoCraze',
}

const RootLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <main className="bg-[#F3F5F9] dark:bg-[#13121A] min-h-screen">
          <Providers>
            <InfoBar />
            <NavBar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}

export default RootLayout;
