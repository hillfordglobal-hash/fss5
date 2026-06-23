import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/SchemaMarkup';
import { blogPosts } from '@/data/blog';
import { courseModules } from '@/data/modules';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — First Sale Society`,
    description: post.description,
    alternates: { canonical: `https://firstsalesociety.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // BlogPosting (not Article) per the implementation prompt's Phase 11.2
  // schema spec and the deep research report's Part 11.2 template.
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { '@type': 'Organization', name: 'First Sale Society' },
    publisher: {
      '@type': 'Organization',
      name: 'First Sale Society',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://firstsalesociety.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://firstsalesociety.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://firstsalesociety.com/blog/${post.slug}` },
    ],
  };

  const relatedModules = post.relatedModuleSlugs
    .map((s) => courseModules.find((m) => m.slug === s))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const relatedPosts = blogPosts.filter((p) => p.pillar === post.pillar && p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SchemaMarkup schema={[blogPostingSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="blog" />
      <div className="module-content">
        <nav aria-label="Breadcrumb" style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 12 }}>
          <Link href="/" style={{ color: 'var(--text3)' }}>
            Home
          </Link>
          {' › '}
          <Link href="/blog" style={{ color: 'var(--text3)' }}>
            Blog
          </Link>
          {' › '}
          <span style={{ color: 'var(--text2)' }}>{post.pillar}</span>
        </nav>

        <h1>{post.title}</h1>
        <div style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 16 }}>
          First Sale Society — Active Operators · {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 18px',
            margin: '0 0 20px',
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: 'var(--heading)' }}>TL;DR — </strong>
          <span style={{ color: 'var(--text2)' }}>{post.tldr}</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }} />

        {relatedModules.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <h3>Go Deeper in the Course</h3>
            <ul>
              {relatedModules.map((m) => (
                <li key={m.id}>
                  <Link href={`/course/${m.slug}`}>{m.title} →</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3>More on {post.pillar}</h3>
            <ul>
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Link href="/" className="module-nav-btn primary">
            Explore the operator library →
          </Link>
        </div>
      </div>
    </>
  );
}
