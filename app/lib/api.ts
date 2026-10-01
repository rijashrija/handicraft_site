// app/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getAbout() {
    const res = await fetch(`${API_URL}/api/v1/about`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch about data')
    return res.json()
}

export async function getProducts(category?: string) {
    const url = category
        ? `${API_URL}/api/v1/products?category=${category}`
        : `${API_URL}/api/v1/products`
    const res = await fetch(url, { next: { revalidate: 60 } }) // cache 60s
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
}

export async function getProduct(slug: string) {
    const res = await fetch(`${API_URL}/api/v1/products/${slug}`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Product not found')
    return res.json()
}

export async function getHome() {
    const res = await fetch(`${API_URL}/api/v1/home`, { next: { revalidate: 60 } })
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${API_URL}/api/v1/categories`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}

export async function getContact() {
    const res = await fetch(`${API_URL}/api/v1/contact`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('Failed to fetch contact data')
    return res.json()
}
