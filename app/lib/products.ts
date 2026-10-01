import productsData from "../../data/products.json";

export type ProductCategory =
  | "all"
  | "silver-idols"
  | "necklaces"
  | "artifacts"
  | "gemstone";

export interface Product {
  slug: string;
  name: string;
  category: Exclude<ProductCategory, "all">;
  categoryLabel: string;
  material: string;
  stones?: string;
  weight?: string;
  dimensions?: string;
  finish: string;
  image: string;
  images: string[];
  shortDesc: string;
  description: string;
  culturalNote: string;
  featured?: boolean;
}

// Source of truth: data/products.json
export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(
  slug: string,
  category: ProductCategory,
  limit = 3
): Product[] {
  return products
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export const categoryLabels: Record<Exclude<ProductCategory, "all">, string> = {
  "silver-idols": "Silver Idols",
  necklaces: "Necklaces",
  artifacts: "Cultural Artifacts",
  gemstone: "Gemstone Pieces",
};
