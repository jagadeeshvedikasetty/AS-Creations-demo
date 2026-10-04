'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shootType: 'Wedding',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: `[${formData.shootType}] ${formData.message}`
        }
      ])

    if (error) {
      setErrorMessage(error.message)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 bg-gray-100 dark:bg-zinc-900/50 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 transition-colors duration-300">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" 
            alt="Photographer holding camera" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-3xl font-light tracking-wide text-white mb-2">Let's create something beautiful.</h2>
            <p className="text-gray-200 font-light tracking-wide">Available for bookings worldwide.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex items-center">
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center py-20"
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-light mb-4 text-black dark:text-white">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => {
                  setStatus('idle')
                  setFormData({ name: '', email: '', shootType: 'Wedding', message: '' })
                }}
                className="mt-8 px-6 py-2 border border-black/20 dark:border-white/20 rounded-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <div className="w-full">
              <h1 className="text-3xl font-light tracking-wide mb-8 text-black dark:text-white">Get In Touch</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Type of Shoot</label>
                  <select 
                    value={formData.shootType}
                    onChange={(e) => setFormData({...formData, shootType: e.target.value})}
                    className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors appearance-none"
                  >
                    <option value="Wedding">Wedding / Engagement</option>
                    <option value="Portrait">Portrait Session</option>
                    <option value="Commercial">Commercial / Brand</option>
                    <option value="Event">Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-3 text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors resize-none"
                    placeholder="Tell me about your vision..."
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="text-red-500 dark:text-red-400 text-sm">{errorMessage}</div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-medium tracking-widest uppercase py-4 rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
