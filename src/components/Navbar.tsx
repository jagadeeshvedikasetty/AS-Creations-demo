'use client'

import { useState, useEffect } from 'react'
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

  // Prevent scrolling when full-screen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl px-6 py-3 bg-white/60 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] saturate-150 rounded-full">
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
              className="text-black dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative z-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/90 dark:bg-black/90 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-3xl tracking-widest uppercase font-light text-black dark:text-white">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="hover:opacity-50 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
