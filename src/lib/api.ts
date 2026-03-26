const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${res.status}`);
  }

  return res.json();
}

export async function getPosts(categorySlug?: string) {
  let endpoint = '/posts?_embed';
  if (categorySlug) {
    const categories = await getCategories();
    const category = categories.find((cat: any) => cat.slug === categorySlug);
    if (category) {
      endpoint += `&categories=${category.id}`;
    } else {
      // If a slug was provided but no category was found, return empty array to avoid showing all posts
      return [];
    }
  }
  return fetchAPI(endpoint);
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchAPI(`/posts?slug=${slug}&_embed`);
  return posts[0];
}

export async function getPageBySlug(slug: string) {
  const pages = await fetchAPI(`/pages?slug=${slug}&_embed`);
  return pages[0];
}

export async function getCategories() {
  return fetchAPI('/categories');
}
