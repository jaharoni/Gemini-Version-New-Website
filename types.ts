export type Media = {
  id: string;
  filename: string;
  storage_path: string;
  bucket_name: string;
  public_url: string;
  media_type: string;
  mime_type?: string | null;
  file_size?: number | null;
  width?: number | null;
  height?: number | null;
  title?: string | null;
  description?: string | null;
  alt_text?: string | null;
  tags?: string[] | null;
  page_context?: string | null;
  is_active?: boolean | null;
  sort_order?: number | null;
  created_at: string;
  updated_at: string;
};

export type Essay = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  excerpt?: string | null;
  featured_image_id?: string | null;
  content: string; // TipTap JSON or HTML
  publish_status: "draft" | "published";
  is_featured?: boolean | null;
  tags?: string[] | null;
  view_count?: number;
  read_time_minutes?: number;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  // Augmented for UI convenience if needed
  featured_image_url?: string; 
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  base_price: number;
  images: string[]; // Simplification for JSONB
  variants: any; // JSONB
  tags: string[];
  is_active: boolean;
  is_digital: boolean;
  inventory_count?: number | null;
  printful_product_id?: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type LTOOffer = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  status: 'draft' | 'active' | 'completed';
  end_type: 'date' | 'quantity' | 'manual';
  end_date?: string | null;
  max_quantity?: number | null;
  current_quantity: number;
  created_at: string;
  updated_at: string;
};

export type LTOVariant = {
  id: string;
  offer_id: string;
  name: string;
  price: number;
  inventory?: number | null;
  sold: number;
  printful_variant_id?: string | null;
  created_at: string;
};

export type CartItem = Product & {
  quantity: number;
};
