// app/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

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
    return res.json()
}

export async function getProduct(slug: string) {
    const res = await fetch(`${API_URL}/api/v1/products/${slug}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Product not found')
    return res.json()
}

export async function getHome() {
    const res = await fetch(`${API_URL}/api/v1/home`, { cache: 'no-store' })
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${API_URL}/api/v1/categories`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}

export async function getContact() {
    const res = await fetch(`${API_URL}/api/v1/contact`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch contact data')
    return res.json()
}
