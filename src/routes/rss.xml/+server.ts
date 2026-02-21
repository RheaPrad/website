import type { RequestHandler } from './$types';

export const prerender = true;

const title = 'Rhea Prad';
const siteURL = 'https://rheaprad.com';
const siteDescription = 'The portfolio and blog of Rhea Prad';

export const GET: RequestHandler = async () => {
  const modules = import.meta.glob('/src/lib/content/**/*.md', { eager: true });
  const images = import.meta.glob('/src/lib/content/**/*.{jpg,jpeg,png,webp}', {
    query: '?url',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  const posts = Object.entries(modules)
    .map(([path, module]: [string, any]) => {
      const metadata = module.metadata || {};
      const slug = path.split('/').pop()?.replace('.md', '') || '';

      let routePath = `/${slug}`;
      if (path.includes('/art-page/books/')) routePath = `/art/books/${slug}`;
      else if (path.includes('/art-page/comics/')) routePath = `/art/comics/${slug}`;
      else if (path.includes('/blog-page/')) routePath = `/blog/${slug}`;

      const rawImage = metadata.cover_image || metadata.image;
      let imageSrc = rawImage || '';

      if (rawImage && images[rawImage]) {
        const resolved = images[rawImage];
        imageSrc = resolved.startsWith('http') ? resolved : `${siteURL}${resolved}`;
      } else if (rawImage?.startsWith('/')) {
        imageSrc = `${siteURL}${rawImage}`;
      }

      return {
        title: metadata.title || 'Untitled',
        description: metadata.description || metadata.title || '',
        imageSrc,
        date: metadata.date || new Date().toISOString(),
        url: `${siteURL}${routePath}`
      };
    })
    .filter((p) => p.title !== 'Untitled' && p.date && !p.url.endsWith('/about'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const xml = `
		<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>${title}</title>
				<description>${siteDescription}</description>
				<link>${siteURL}</link>
				<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts.map((p) => {
    const img = p.imageSrc ? '<img src="' + p.imageSrc + '" alt="' + p.title + '" /><br/>' : '';
    return '<item>' +
      '<title><![CDATA[' + p.title + ']]></title>' +
      '<description><![CDATA[' + img + p.description + ']]></description>' +
      '<link>' + p.url + '</link>' +
      '<guid isPermaLink="true">' + p.url + '</guid>' +
      '<pubDate>' + new Date(p.date).toUTCString() + '</pubDate>' +
      '</item>';
  }).join('')}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    }
  });
};
