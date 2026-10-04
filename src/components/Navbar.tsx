'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/#galleries' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl px-6 py-2 bg-white/60 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] saturate-150 ${isOpen ? 'rounded-3xl' : 'rounded-full md:rounded-full'}`}>
      <div className="flex items-center justify-between">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group">
          <img 
            src="/logo.jpeg" 
            alt="AS Creations Logo" 
            className="w-10 h-10 object-cover rounded-full transition-transform duration-500 group-hover:scale-105" 
          />
          <span className="text-xl font-light tracking-widest uppercase text-black dark:text-white">AS Creations</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase font-light text-black/70 dark:text-white/90" onMouseLeave={() => setHoveredPath(null)}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/#galleries' && false) // simple active logic if needed
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onMouseEnter={() => setHoveredPath(link.name)}
                className={`relative px-4 py-2 rounded-full transition-colors ${
                  hoveredPath === link.name ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white'
                }`}
              >
                {hoveredPath === link.name && (
                  <motion.div
                    layoutId="nav-liquid"
                    className="absolute inset-0 bg-black/10 dark:bg-white/10 -z-10"
                    style={{ borderRadius: 9999 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            )
          })}
          
          <div className="ml-4 flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle & Theme (Visible on small screens) */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-4 pb-4 border-t border-black/10 dark:border-white/10 overflow-hidden flex flex-col gap-4 text-center text-sm tracking-widest uppercase font-light text-black/70 dark:text-white/90"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="block pt-2 pb-2 hover:bg-white/20 dark:hover:bg-white/5 rounded-lg transition-colors hover:text-black dark:hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
