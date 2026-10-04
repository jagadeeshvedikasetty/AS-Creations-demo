import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'AS Creations',
  description: 'Photography Portfolio',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white selection:bg-black/10 dark:selection:bg-white/30 transition-colors duration-300">
            {/* Navigation */}
            <Navbar />

            {/* Main Page Content */}
            <main>
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-zinc-950 py-12 text-center text-gray-500 text-sm font-light tracking-widest uppercase border-t border-black/5 dark:border-white/5 transition-colors duration-300">
              <p>© {new Date().getFullYear()} AS Creations. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
