"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Link from "next/link";
import Head from 'next/head';
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/data/blog-posts.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        // Extract unique categories
        const cats = Array.from(new Set((data.posts || []).map((p: BlogPost) => p.category).filter((cat: string | undefined): cat is string => typeof cat === 'string' && cat.trim() !== ''))) as string[];
        setCategories(cats);
        // Recent posts (latest 5)
        setRecentPosts((data.posts || []).slice(0, 5));
      });
  }, []);

  const featured = posts.find((p) => p.featured) || posts[0];
  const filteredPosts = posts.filter(
    (p) =>
      (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())) &&
      (!featured || p.id !== featured.id)
  );

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Trendtactics Digital Blog",
          "url": "https://trendtacticsdigital.com/blog",
          "description": "Latest digital marketing tips, news, and case studies from Trendtactics Digital.",
          "publisher": {
            "@type": "Organization",
            "name": "Trendtactics Digital",
            "logo": {
              "@type": "ImageObject",
              "url": "https://trendtacticsdigital.com/images/og-image.jpg"
            }
          }
        }`}} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <main className="flex-1">
          {/* Hero Section */}
          <motion.section
            className="py-16 glass-bg text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Blog</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Latest digital marketing tips, news, and case studies from Trendtactics Digital.
              </p>
            </div>
          </motion.section>
          {/* Blog Main Content */}
          <section className="py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
              {/* Blog Content Area */}
              <div className="flex-1">
                {/* Featured Post */}
                {featured && (
                  <motion.div
                    className="mb-8 glass-card shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <img
                      src={`/${featured.image?.replace(/^\/*/, "")}`}
                      alt={featured.title}
                      className="w-full md:w-64 h-48 object-cover rounded mb-4 md:mb-0"
                    />
                    <div className="flex-1">
                      <Link href={`/blog/${featured.slug}`} className="text-2xl font-bold text-primary hover:underline">
                        {featured.title}
                      </Link>
                      <p className="text-gray-700 mt-2 mb-2">{featured.excerpt}</p>
                      <div className="flex gap-4 text-xs text-gray-500 mb-2">
                        <span>By {featured.author}</span>
                        <span>{new Date(featured.date || '').toLocaleDateString()}</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <Link href={`/blog/${featured.slug}`} className="text-blue-600 underline text-sm font-medium">Read More</Link>
                    </div>
                  </motion.div>
                )}
                {/* Blog Post Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredPosts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      className="glass-card shadow p-4 flex flex-col"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                    >
                      <img
                        src={`/${post.image?.replace(/^\/*/, "")}`}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <Link href={`/blog/${post.slug}`} className="font-bold text-lg text-primary hover:underline mb-1">
                        {post.title}
                      </Link>
                      <p className="text-gray-700 text-sm mb-2">{post.excerpt}</p>
                      <div className="flex gap-4 text-xs text-gray-500 mb-2">
                        <span>By {post.author}</span>
                        <span>{new Date(post.date || '').toLocaleDateString()}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="bg-blue-50 text-primary px-2 py-1 rounded text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 underline text-sm font-medium mt-auto">Read More</Link>
                    </motion.div>
                  ))}
                </div>
                {/* Pagination (not implemented, placeholder) */}
                {/* <div className="flex justify-center mt-8">
                  <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
                  <button className="px-4 py-2 bg-gray-200 rounded ml-2">Next</button>
                </div> */}
              </div>
              {/* Blog Sidebar */}
              <aside className="w-full md:w-80 flex-shrink-0">
                {/* Ad Spot 1 */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2">Advertisement</div>
                  <div className="flex flex-col items-center justify-center h-32 w-full bg-gray-200 rounded">
                    <i className="fas fa-ad text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-500">Ad Space</p>
                    <span className="text-xs text-gray-400">300x250</span>
                  </div>
                </div>
                {/* Search */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Search</h4>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Search blog..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Categories</h4>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat} className="text-sm text-gray-700">
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Recent Posts */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Recent Posts</h4>
                  <ul className="space-y-1">
                    {recentPosts.map((post) => (
                      <li key={post.id}>
                        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline text-sm">
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Ad Spot 2 */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2">Sponsored</div>
                  <div className="flex flex-col items-center justify-center h-32 w-full bg-gray-200 rounded">
                    <i className="fas fa-ad text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-500">Ad Space</p>
                    <span className="text-xs text-gray-400">300x250</span>
                  </div>
                </div>
                {/* Newsletter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Newsletter</h4>
                  <p className="text-gray-600 text-sm mb-2">Get the latest digital marketing insights delivered to your inbox.</p>
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Thank you! You've been subscribed to our updates.");
                    }}
                  >
                    <input type="email" placeholder="Enter your email" required className="flex-1 px-3 py-2 rounded border" />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold">Subscribe</button>
                  </form>
                </div>
                {/* Ad Spot 3 */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2">Advertisement</div>
                  <div className="flex flex-col items-center justify-center h-32 w-full bg-gray-200 rounded">
                    <i className="fas fa-ad text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-500">Ad Space</p>
                    <span className="text-xs text-gray-400">300x250</span>
                  </div>
                </div>
                {/* Social Links */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Follow Us</h4>
                  <div className="flex gap-3">
                    <a href="#" className="text-blue-600"><i className="fab fa-facebook" /></a>
                    <a href="#" className="text-blue-400"><i className="fab fa-twitter" /></a>
                    <a href="#" className="text-blue-700"><i className="fab fa-linkedin" /></a>
                    <a href="#" className="text-pink-500"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </aside>
            </div>
          </section>
          {/* Blog CTA Section */}
          <section className="py-12 bg-primary text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">Stay Updated with Our Latest Insights</h2>
              <p className="mb-6">Get weekly digital marketing tips, industry updates, and exclusive content delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-primary px-6 py-3 rounded font-semibold border border-white hover:bg-gray-100 transition">Subscribe to Newsletter</Link>
                <Link href="/academy" className="bg-transparent border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-primary transition">Join Our Academy</Link>
              </div>
            </div>
          </section>
          {/* Ebook Promo Marquee */}
          <section className="w-full bg-lime-300 py-2 overflow-x-auto whitespace-nowrap text-center font-semibold text-base mb-6">
            <span className="inline-block animate-marquee">🔥 Discover my premium ebooks for business growth! Visit the <Link href="/shop" className="underline">Author Shop</Link> to buy now and unlock your success! 🔥</span>
          </section>
          {/* Scroll to Top Button */}
          <ScrollToTop />
        </main>
        <Footer />
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            min-width: 100vw;
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default BlogPage; 