import { createClient } from '@supabase/supabase-js';
import { MOCK_GALLERY, MOCK_ESSAYS, MOCK_PRODUCTS } from './constants';

// NOTE: In a real environment, these would come from process.env
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to fetch data with a mock fallback for preview environments where Supabase isn't connected.
 * In production, this logic would simply use the supabase client directly.
 */
export async function fetchData<T>(
  tableName: string, 
  mockData: T[]
): Promise<T[]> {
  try {
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Using mock data');
    }
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    return data as T[];
  } catch (e) {
    console.warn(`Supabase fetch failed for ${tableName}, using mock data.`);
    return mockData;
  }
}

export const services = {
  gallery: {
    getAll: () => fetchData('media_items', MOCK_GALLERY),
  },
  essays: {
    getAll: () => fetchData('essays', MOCK_ESSAYS),
    getBySlug: async (slug: string) => {
      const all = await fetchData('essays', MOCK_ESSAYS);
      return all.find(e => e.slug === slug);
    }
  },
  shop: {
    getAll: () => fetchData('printful_products', MOCK_PRODUCTS),
    getBySlug: async (slug: string) => {
      const all = await fetchData('printful_products', MOCK_PRODUCTS);
      return all.find(p => p.slug === slug);
    }
  }
};
