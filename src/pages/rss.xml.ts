import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { allPosts, postUrl } from '../lib/posts';
import { SITE } from '../site';

export const GET: APIRoute = async (context) => {
  const posts = await allPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>vi-VN</language>',
  });
};
