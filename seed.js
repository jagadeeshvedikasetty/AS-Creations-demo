const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://zfuxzpubwnkmmsaoqjun.supabase.co'
const supabaseKey = 'sb_publishable_jQIxIyVsbwxHJOvy8PpimA_3Ui2EL2m'
const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('Seeding categories...')
  
  // Insert Categories
  const { data: cat1, error: err1 } = await supabase.from('categories').insert([
    { title: 'Weddings', slug: 'weddings', cover_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' }
  ]).select()
  
  const { data: cat2, error: err2 } = await supabase.from('categories').insert([
    { title: 'Nature', slug: 'nature', cover_image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80' }
  ]).select()
  
  const { data: cat3, error: err3 } = await supabase.from('categories').insert([
    { title: 'Portraits', slug: 'portraits', cover_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' }
  ]).select()

  if (err1 || err2 || err3) {
    console.error('Error inserting categories:', err1 || err2 || err3)
    return
  }

  console.log('Categories created. Inserting photos...')

  const photos = [
    // Weddings
    { category_id: cat1[0].id, image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Wedding 1' },
    { category_id: cat1[0].id, image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'Wedding 2' },
    { category_id: cat1[0].id, image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', title: 'Wedding 3' },
    // Nature
    { category_id: cat2[0].id, image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', title: 'Nature 1' },
    { category_id: cat2[0].id, image_url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80', title: 'Nature 2' },
    { category_id: cat2[0].id, image_url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80', title: 'Nature 3' },
    // Portraits
    { category_id: cat3[0].id, image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', title: 'Portrait 1' },
    { category_id: cat3[0].id, image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', title: 'Portrait 2' },
    { category_id: cat3[0].id, image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80', title: 'Portrait 3' },
  ]

  const { error: photoErr } = await supabase.from('photos').insert(photos)
  
  if (photoErr) {
    console.error('Error inserting photos:', photoErr)
  } else {
    console.log('Successfully seeded database with demo data!')
  }
}

seed()
