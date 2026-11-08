// app/lib/api.ts
import type { Product } from "./products";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

interface ApiProduct {
    slug: string;
    name: string;
    category: { slug: string; label: string } | null;
    category_label: string | null;
    material: string | null;
    stones: string | null;
    weight: string | null;
    dimensions: string | null;
    finish: string | null;
    image: string | null;
    images: string[];
    short_desc: string | null;
    description: string | null;
    cultural_note: string | null;
    featured: boolean;
}

export interface Category {
    slug: string;
    label: string;
    title: string;
    description: string;
    image: string;
}

function normalizeProduct(product: ApiProduct): Product {
    return {
        slug: product.slug,
        name: product.name,
        category: product.category?.slug ?? "",
        categoryLabel: product.category_label ?? product.category?.label ?? "",
        material: product.material,
        stones: product.stones,
        weight: product.weight,
        dimensions: product.dimensions,
        finish: product.finish,
        image: product.image || "/images/hero-bg.jpg",
        images: Array.isArray(product.images) ? product.images : [],
        shortDesc: product.short_desc,
        description: product.description,
        culturalNote: product.cultural_note,
        featured: product.featured,
    };
}

export async function getAbout() {
    const res = await fetch(`${API_URL}/api/v1/about`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch about data')
    return res.json()
}

export async function getProducts(category?: string, featured?: boolean) {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (featured !== undefined) params.append('featured', String(featured))
    const queryString = params.toString()
    const url = `${API_URL}/api/v1/products${queryString ? `?${queryString}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch products')
    const products = await res.json() as ApiProduct[];
    return products.map(normalizeProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
    const res = await fetch(`${API_URL}/api/v1/products/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch product')
    return normalizeProduct(await res.json() as ApiProduct);
}

export async function getHome() {
    const res = await fetch(`${API_URL}/api/v1/home`, { cache: 'no-store' })
    return res.json()
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/api/v1/categories`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}

export async function getContact() {
    const res = await fetch(`${API_URL}/api/v1/contact/info`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch contact data')
    return res.json()
}

export async function getNavlinks() {
    const res = await fetch(`${API_URL}/api/v1/navlinks`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch navlinks')
    return res.json()
}
