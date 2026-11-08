export interface Product {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  material: string | null;
  stones: string | null;
  weight: string | null;
  dimensions: string | null;
  finish: string | null;
  image: string;
  images: string[];
  shortDesc: string | null;
  description: string | null;
  culturalNote: string | null;
  featured: boolean;
}
