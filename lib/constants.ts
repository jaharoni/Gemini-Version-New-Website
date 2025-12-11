import { Product, Essay, Media, LTOOffer } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Ethereal Mountains',
    slug: 'ethereal-mountains',
    base_price: 120,
    images: ['https://picsum.photos/seed/art1/800/800'],
    category: 'Prints',
    description: 'High-quality giclée print on archival paper. Signed by the artist.',
    is_active: true,
    is_digital: false,
    tags: ['landscape', 'print'],
    variants: [],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Midnight Solace',
    slug: 'midnight-solace',
    base_price: 350,
    images: ['https://picsum.photos/seed/art2/800/800'],
    category: 'Originals',
    description: 'Original oil painting on canvas. 24x36 inches.',
    is_active: true,
    is_digital: false,
    tags: ['oil', 'original', 'dark'],
    variants: [],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Golden Hour Study',
    slug: 'golden-hour-study',
    base_price: 85,
    images: ['https://picsum.photos/seed/art3/800/800'],
    category: 'Prints',
    description: 'Limited edition print from the Summer collection.',
    is_active: true,
    is_digital: false,
    tags: ['warm', 'print'],
    variants: [],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Urban Abstract #4',
    slug: 'urban-abstract-4',
    base_price: 400,
    images: ['https://picsum.photos/seed/art4/800/800'],
    category: 'Originals',
    description: 'Mixed media on wood panel.',
    is_active: true,
    is_digital: false,
    tags: ['abstract', 'original'],
    variants: [],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export const MOCK_ESSAYS: Essay[] = [
  {
    id: '1',
    title: 'The Process of Seeing',
    slug: 'process-of-seeing',
    subtitle: 'From shadows to silhouettes',
    excerpt: 'How learning to draw changed the way I interpret the world around me, from shadows to silhouettes.',
    content: '<p>Full essay content would go here...</p>',
    publish_status: 'published',
    read_time_minutes: 5,
    featured_image_url: 'https://picsum.photos/seed/essay1/1200/600',
    tags: ['Philosophy', 'Technique'],
    created_at: '2023-10-12T10:00:00Z',
    updated_at: '2023-10-12T10:00:00Z',
    published_at: '2023-10-12T10:00:00Z'
  },
  {
    id: '2',
    title: 'Pigments & Patience',
    slug: 'pigments-and-patience',
    subtitle: 'A history of ochre',
    excerpt: 'A deep dive into the history of ochre and why I strictly use natural earth pigments in my recent series.',
    content: '<p>Full essay content would go here...</p>',
    publish_status: 'published',
    read_time_minutes: 8,
    featured_image_url: 'https://picsum.photos/seed/essay2/1200/600',
    tags: ['Materials', 'History'],
    created_at: '2023-09-28T10:00:00Z',
    updated_at: '2023-09-28T10:00:00Z',
    published_at: '2023-09-28T10:00:00Z'
  },
  {
    id: '3',
    title: 'Digital vs. Physical',
    slug: 'digital-vs-physical',
    excerpt: 'Navigating the bridge between Procreate sketches and oil painting finality.',
    content: '<p>Full essay content would go here...</p>',
    publish_status: 'published',
    read_time_minutes: 6,
    featured_image_url: 'https://picsum.photos/seed/essay3/1200/600',
    tags: ['Digital Art', 'Oil Painting'],
    created_at: '2023-08-15T10:00:00Z',
    updated_at: '2023-08-15T10:00:00Z',
    published_at: '2023-08-15T10:00:00Z'
  }
];

export const MOCK_GALLERY: Media[] = [
  { id: '1', public_url: 'https://picsum.photos/seed/g1/600/800', title: 'Silence', tags: ['Oil'], filename: 'g1.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
  { id: '2', public_url: 'https://picsum.photos/seed/g2/800/600', title: 'Noise', tags: ['Digital'], filename: 'g2.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
  { id: '3', public_url: 'https://picsum.photos/seed/g3/600/600', title: 'Form', tags: ['Sketch'], filename: 'g3.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
  { id: '4', public_url: 'https://picsum.photos/seed/g4/600/900', title: 'Void', tags: ['Oil'], filename: 'g4.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
  { id: '5', public_url: 'https://picsum.photos/seed/g5/800/800', title: 'Matter', tags: ['Digital'], filename: 'g5.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
  { id: '6', public_url: 'https://picsum.photos/seed/g6/600/700', title: 'Entropy', tags: ['Oil'], filename: 'g6.jpg', storage_path: '', bucket_name: 'images', media_type: 'image', created_at: '', updated_at: '' },
];

export const MOCK_LTO: LTOOffer[] = [
  {
    id: '1',
    title: 'Winter Solstice Print',
    slug: 'winter-solstice-2023',
    status: 'active',
    end_type: 'quantity',
    max_quantity: 50,
    current_quantity: 12,
    image_url: 'https://picsum.photos/seed/lto1/800/1000',
    description: 'A special limited edition for the season.',
    created_at: '',
    updated_at: ''
  }
];
