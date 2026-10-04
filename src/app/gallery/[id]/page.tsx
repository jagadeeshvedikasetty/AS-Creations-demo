import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function GalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the gallery (category) details
  const { data: gallery, error: galleryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (galleryError || !gallery) {
    notFound()
  }

  // Fetch all photos for this gallery
  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('category_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <Link href="/#galleries" className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12 uppercase tracking-widest text-sm font-light">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Gallery Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-black dark:text-white uppercase mb-4">
            {gallery.title}
          </h1>
          <div className="w-24 h-px bg-black/20 dark:bg-white/20" />
        </div>

        {/* Masonry Grid for Photos */}
        {photos && photos.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {photos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid group relative rounded-sm overflow-hidden bg-gray-100 dark:bg-zinc-900">
                <img 
                  src={photo.image_url} 
                  alt={photo.title || gallery.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white text-sm font-light tracking-widest uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500 font-light">
            <p>No photos have been uploaded to this gallery yet.</p>
          </div>
        )}
        
      </div>
    </div>
  )
}
