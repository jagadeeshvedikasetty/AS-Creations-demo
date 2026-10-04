import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function PortfolioHome() {
  const supabase = await createClient()

  // Fetch featured galleries (e.g. the latest 3)
  const { data: galleries } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  // Fetch some latest photos for a masonry grid
  const { data: recentPhotos } = await supabase
    .from('photos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(9)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Mobile Video (Hidden on screens md and up) */}
        <video 
          src="/mobile-animation.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover block md:hidden"
        />
        
        {/* Desktop Video (Hidden on small screens, block on md and up) */}
        <video 
          src="/desktop-animation.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover hidden md:block"
        />
      </section>

      {/* Featured Galleries */}
      <section id="galleries" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white dark:bg-black transition-colors duration-300">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-black dark:text-white">Featured Galleries</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries?.map((gallery) => (
            <Link href={`/gallery/${gallery.id}`} key={gallery.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-zinc-900 rounded-sm">
                <img 
                  src={gallery.cover_image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'} 
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="mt-6 text-center text-black dark:text-white">
                <h3 className="text-xl tracking-widest uppercase">{gallery.title}</h3>
                <div className="h-px w-12 bg-black/30 dark:bg-white/30 mx-auto mt-4 transition-all duration-300 group-hover:w-24" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Work / Masonry Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-16 text-black dark:text-white">Recent Work</h2>
          
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {recentPhotos?.map((photo) => (
              <div key={photo.id} className="break-inside-avoid relative group rounded-sm overflow-hidden bg-gray-200 dark:bg-zinc-900">
                <img 
                  src={photo.image_url} 
                  alt={photo.title || 'Portfolio Image'} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-sm uppercase tracking-widest text-white/90 font-medium">View full</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
