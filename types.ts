
export interface Media {
  id: string;
  filename: string;
  public_url: string;
  storage_path: string;
  bucket_name: string;
  title?: string;
  alt_text?: string;
  description?: string;
  tags?: string[];
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  // UI helpers
  width?: number;
  height?: number;
  media_type?: string;
}

export interface Essay {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  content: string; // TipTap HTML
  featured_image_id?: string;
  featured_image_url?: string;
  publish_status: 'draft' | 'published';
  tags?: string[];
  view_count?: number;
  read_time_minutes?: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  // Joins
  media_items?: Media; // featured image
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  base_price: number;
  images: string[]; // JSONB -> string[]
  variants?: any; // JSONB
  tags?: string[];
  is_active: boolean;
  is_digital?: boolean;
  metadata?: any;
  inventory_count?: number;
  created_at: string;
  updated_at: string;
}

export interface LTOOffer {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  status: 'draft' | 'active' | 'completed';
  end_type: 'date' | 'quantity' | 'manual';
  end_date?: string;
  max_quantity?: number;
  current_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface LTOVariant {
  id: string;
  offer_id: string;
  name: string;
  price: number;
  inventory?: number;
  sold: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variantId?: string;
}
