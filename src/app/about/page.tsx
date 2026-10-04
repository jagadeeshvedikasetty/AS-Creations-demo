import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Hero Profile Section */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
          <div className="w-full md:w-1/2 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80" 
              alt="AS Creations Photographer" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-black dark:text-white">
              Capturing life's <br/> <span className="font-semibold italic opacity-80">unscripted</span> moments.
            </h1>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-400 font-light text-lg leading-relaxed">
              <p>
                Hi, I'm the creator behind AS Creations. For over a decade, I've been chasing light, shadows, and the raw emotion that exists in the split second before a shutter clicks. 
              </p>
              <p>
                My photography journey started not with a high-end camera, but with a fascination for storytelling. Whether I'm shooting an intimate wedding, a high-fashion editorial, or the breathtaking silence of a mountain peak, my goal is always the same: to tell a story that words cannot.
              </p>
              <p>
                I believe the best photos aren't manufactured—they are discovered. Let's discover yours.
              </p>
            </div>
            
            <div className="pt-6 border-t border-black/10 dark:border-white/10">
              <h3 className="text-sm tracking-widest uppercase font-medium text-black dark:text-white mb-4">Focus Areas</h3>
              <div className="flex flex-wrap gap-3">
                {['Wedding', 'Editorial', 'Portrait', 'Landscape'].map((focus) => (
                  <span key={focus} className="px-4 py-2 text-sm border border-black/20 dark:border-white/20 rounded-full text-black dark:text-white">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Gear Section */}
        <div className="py-24 border-t border-black/10 dark:border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-black dark:text-white mb-4">My Arsenal</h2>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">The tools I use to bring visions to life.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cameras */}
            <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
              <h3 className="text-xl font-light text-black dark:text-white mb-6 uppercase tracking-widest">Cameras</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-light">
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Sony A7R IV</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Primary</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Sony A7 III</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Backup / Video</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Leica Q2</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Street / Travel</span>
                </li>
              </ul>
            </div>

            {/* Lenses */}
            <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
              <h3 className="text-xl font-light text-black dark:text-white mb-6 uppercase tracking-widest">Glass</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-light">
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Sony FE 24-70mm f/2.8 GM</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Workhorse</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Sony FE 85mm f/1.4 GM</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Portraits</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Sony FE 35mm f/1.4 GM</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Storytelling</span>
                </li>
              </ul>
            </div>

            {/* Drone & Accessories */}
            <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
              <h3 className="text-xl font-light text-black dark:text-white mb-6 uppercase tracking-widest">Extras</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-light">
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>DJI Mavic 3 Pro</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Aerials</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>Profoto B10X</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Lighting</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span>PolarPro Peter McKinnon NDs</span>
                  <span className="text-xs uppercase tracking-widest opacity-50">Filters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
