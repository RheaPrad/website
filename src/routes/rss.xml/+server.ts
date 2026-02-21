import type { RequestHandler } from './$types';

export const prerender = true;

const title = 'Rhea Prad'; // Change if needed based on the site info
const siteURL = 'https://rheaprad.com'; // Adjust to actual URL
const siteDescription = 'The portfolio and blog of Rhea Prad';

export const GET: RequestHandler = async () => {
  // Import all markdown files eagerly
  const modules = import.meta.glob('/src/lib/content/**/*.md', { eager: true });

  // Import images to resolve their static paths during build
  const images = import.meta.glob('/src/lib/content/**/*.{jpg,jpeg,png,webp}', {
    query: '?url',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  const posts = Object.entries(modules)
    .map(([path, module]: [string, any]) => {
      const metadata = module.metadata || {};
      // Compute slug based on file path.
      const parts = path.split('/');
      const fileNameWithExt = parts.pop() || '';
      const slug = fileNameWithExt.replace('.md', '');

      let routePath = '';
      if (path.includes('/art-page/books/')) {
        routePath = `/art/books/${slug}`;
      } else if (path.includes('/art-page/comics/')) {
        routePath = `/art/comics/${slug}`;
      } else if (path.includes('/blog-page/')) {
        routePath = `/blog/${slug}`;
      } else {
        routePath = `/${slug}`;
      }

      // Get image if it exists
      const rawImagePath = metadata.cover_image || metadata.image;
      let imageSrc = '';
      if (rawImagePath && images[rawImagePath]) {
        const resolvedPath = images[rawImagePath];
        // Ensure it is absolute URL
        imageSrc = resolvedPath.startsWith('http') ? resolvedPath : `${siteURL}${resolvedPath}`;
      } else if (rawImagePath && rawImagePath.startsWith('http')) {
        imageSrc = rawImagePath;
      } else if (rawImagePath && rawImagePath.startsWith('/')) {
        imageSrc = `${siteURL}${rawImagePath}`;
      }

      return {
        title: metadata.title || 'Untitled',
        description: metadata.description || metadata.title || '',
        imageSrc,
        date: metadata.date || new Date().toISOString(),
        url: `${siteURL}${routePath}`
      };
    })
    .filter((post) => post.title !== 'Untitled' && post.date)
    .filter((post) => !post.url.endsWith('/about'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const xml = `
		<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>${title}</title>
				<description>${siteDescription}</description>
				<link>${siteURL}</link>
				<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
      .map((post) => {
        const imageHtml = post.imageSrc
          ?\`<img src="\${post.imageSrc}" alt="\${post.title}" /><br/>\`
							: '';
						return \`
						<item>
							<title><![CDATA[\${post.title}]]></title>
							<description><![CDATA[\${imageHtml}\${post.description}]]></description>
							<link>\${post.url}</link>
							<guid isPermaLink="true">\${post.url}</guid>
							<pubDate>\${new Date(post.date).toUTCString()}</pubDate>
						</item>
					\`;
					})
					.join('')}
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
