"use client";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Link from "next/link";
import Head from 'next/head';
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  client?: string;
  description?: string;
  image?: string;
  services?: string[];
  technologies?: string[];
  duration?: string;
  budget?: string;
  results?: { [key: string]: string | number | boolean | null };
  category?: string;
}

const categories = [
  { label: "All", value: "all" },
  { label: "Adverts", value: "advert" },
  { label: "Image Generation", value: "image-generation" },
  { label: "Website Design", value: "website-design" },
  { label: "Music Generation", value: "music-generation" },
  { label: "Spoken Word", value: "spoken-word" },
  { label: "Facebook Ads", value: "facebook-ads" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Digital Marketing", value: "digital-marketing" },
  { label: "AI Solutions", value: "ai-solutions" },
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showPromo, setShowPromo] = useState(false);
  const promoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/content.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.portfolio?.projects || []));
    // Show promo modal after 7 seconds (once per session)
    if (typeof window !== "undefined" && !sessionStorage.getItem("ebookPromoModalPortfolioShown")) {
      setTimeout(() => {
        setShowPromo(true);
        sessionStorage.setItem("ebookPromoModalPortfolioShown", "yes");
      }, 7000);
    }
    // Focus trap and Esc key for modal
    function handleKey(e: KeyboardEvent) {
      if (showPromo && e.key === 'Escape') setShowPromo(false);
      if (showPromo && e.key === 'Tab' && promoRef.current) {
        const focusable = promoRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showPromo]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://trendtacticsdigital.com/portfolio",
          "name": "Portfolio - Trendtactics Digital",
          "description": "Explore our diverse work in digital marketing, web design, creative media, and ad campaigns. Each project reflects our commitment to innovation and results.",
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
        {/* Ebook Promo Modal */}
        {showPromo && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80" role="presentation">
            <div
              ref={promoRef}
              className="bg-white rounded-xl max-w-sm w-[90vw] p-6 shadow-xl text-center relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="promoTitle"
              aria-describedby="promoDesc"
              tabIndex={-1}
            >
              <button
                className="absolute top-2 right-3 text-2xl text-primary hover:text-red-500 focus:outline-none focus:ring-4 focus:ring-cyan-400"
                onClick={() => setShowPromo(false)}
                aria-label="Close promo modal"
                tabIndex={0}
              >
                &times;
              </button>
              <img src="/images/book1.jpg" alt="Cover of 'Mastering Digital Marketing in Africa' ebook" className="w-20 h-28 object-cover rounded mb-4 mx-auto" />
              <h3 id="promoTitle" className="text-lg font-bold mb-2 text-primary">New! Mastering Digital Marketing in Africa</h3>
              <p id="promoDesc" className="text-gray-700 mb-4">Unlock proven strategies, case studies, and actionable tips tailored for African entrepreneurs and businesses.</p>
              <div className="flex flex-col gap-2">
                <Link href="/shop" className="btn btn-outline border-primary text-primary">See All Ebooks</Link>
                <Link href="/shop" className="btn bg-primary text-white border-primary">Buy Now</Link>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1">
          {/* Hero Section */}
          <motion.section
            className="py-16 glass-bg text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-4 glassmorphism shadow-lg">
              <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our diverse work in digital marketing, web design, creative media, and ad campaigns. Each project reflects our commitment to innovation and results.
              </p>
            </div>
          </motion.section>
          {/* Ebook Promo Marquee */}
          <section className="w-full bg-lime-300 py-2 overflow-x-auto whitespace-nowrap text-center font-semibold text-base mb-6">
            <span className="inline-block animate-marquee">🔥 Discover my premium ebooks for business growth! Visit the <Link href="/shop" className="underline">Author Shop</Link> to buy now and unlock your success! 🔥</span>
          </section>
          {/* Category Filters */}
          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat.value}
                    className={`px-4 py-2 rounded-full border font-semibold transition card-hover glassmorphism animate-fade-in ${activeCategory === cat.value ? "bg-primary text-white border-primary" : "bg-white text-primary border-gray-300 hover:bg-blue-50"}`}
                    onClick={() => setActiveCategory(cat.value)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
          {/* Portfolio Projects */}
          <main className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    className="glass-card shadow p-4 flex flex-col card-hover"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                  >
                    <img
                      src={project.image?.replace('./images/', '/images/')}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <div className="text-primary font-semibold mb-1">{project.client}</div>
                    <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.services?.map((s: string) => (
                        <span key={s} className="bg-blue-50 text-primary px-2 py-1 rounded text-xs font-medium">{s}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies?.map((t: string) => (
                        <span key={t} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">Duration: {project.duration} | Budget: {project.budget}</div>
                    {project.results && (
                      <div className="text-xs text-green-700 mb-1">
                        {Object.entries(project.results).map(([k, v]) => (
                          <span key={k} className="mr-2">{k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {String(v)}</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
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

export default PortfolioPage; 