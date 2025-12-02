import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import Link from "next/link";
import blogData from '../../data/blog-posts.json';
import Head from 'next/head';

export async function generateStaticParams() {
  return (blogData.posts || []).map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

type PageProps = { params: { slug: string } };
export default function Page({ params }: PageProps) {
  const { slug } = params;
  const post = (blogData.posts || []).find((p: { slug: string }) => p.slug === slug);
  const related = (blogData.posts || [])
    .filter((p: { category?: string; slug: string }) => p.category === post?.category && p.slug !== slug)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://trendtacticsdigital.com/${post.image?.replace(/^\/*/, "")}`,
    "author": {
      "@type": "Person",
      "name": post.author || "Trendtactics Digital"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trendtactics Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trendtacticsdigital.com/images/og-image.jpg"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.excerpt,
    "mainEntityOfPage": `https://trendtacticsdigital.com/blog/${post.slug}`
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <main className="flex-1">
          <article className="py-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <img
                src={`/${post.image?.replace(/^\/*/, "")}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <div className="flex gap-4 text-xs text-gray-500 mb-4">
                <span>By {post.author}</span>
                <span>{new Date(post.date || '').toLocaleDateString()}</span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag: string) => (
                  <span key={tag} className="bg-blue-50 text-primary px-2 py-1 rounded text-xs font-medium">{tag}</span>
                ))}
              </div>
              <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              {post.cta && (
                <div className="my-8 text-center">
                  <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded font-semibold shadow hover:bg-blue-700 transition">
                    {post.cta}
                  </Link>
                </div>
              )}
              {/* Related Posts */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Related Posts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map((r: { slug: string; title: string; author?: string; date?: string; excerpt: string }) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="block bg-gray-50 rounded p-4 hover:shadow">
                        <div className="font-semibold mb-1">{r.title}</div>
                        <div className="text-xs text-gray-500 mb-1">By {r.author} &bull; {new Date(r.date || '').toLocaleDateString()}</div>
                        <div className="text-gray-600 text-sm">{r.excerpt}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}