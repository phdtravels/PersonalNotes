import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function postUrl(post: Post) {
  return withBase(`/posts/${post.id}/`);
}

export function slugify(value: string) {
  return value.toLocaleLowerCase('vi')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagUrl(tag: string) {
  return withBase(`/tags/${slugify(tag)}/`);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(date);
}

export async function allPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function groupByYear(posts: Post[]) {
  const result = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getUTCFullYear();
    result.set(year, [...(result.get(year) ?? []), post]);
  }
  return [...result.entries()].sort(([a], [b]) => b - a);
}
