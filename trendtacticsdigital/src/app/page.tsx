"use client";
import Link from "next/link";
import { FaRocket, FaBrain, FaUsers, FaChartLine, FaClock, FaShieldAlt, FaBriefcase, FaStar, FaAward, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaBullhorn, FaSearch, FaCrown, FaShoppingCart, FaEdit, FaChevronUp } from "react-icons/fa";
import ReasonCard from "../../components/ReasonCard";
import ServiceCard from "../../components/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard";
import { useState, useEffect, useRef } from "react";
import testimonials from "../../data/testimonials.json";
import services from "../../data/services.json";
import React from "react";
// import any SVGs or images as needed
// import logo from "@/public/your-logo.svg";
// import ogImage from "@/public/og-image.jpg";

const serviceIcons: Record<string, React.ReactNode> = {
  FaRocket: <FaRocket className="text-cyan-500" />,
  FaBullhorn: <FaBullhorn className="text-cyan-500" />,
  FaSearch: <FaSearch className="text-cyan-500" />,
  FaCrown: <FaCrown className="text-cyan-500" />,
  FaShoppingCart: <FaShoppingCart className="text-cyan-500" />,
  FaEdit: <FaEdit className="text-cyan-500" />,
};

export default function HomePage() {
  // Scroll-to-top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set client-side flag and initialize perView
  useEffect(() => {
    setIsClient(true);
    const updatePerView = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  // Calculate total slides only after perView is set
  const totalSlides = isClient ? Math.ceil(testimonials.length / perView) : 1;

  // Auto-play
  useEffect(() => {
    if (!isClient) return;
    
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.ceil(testimonials.length / perView));
    }, 7000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [perView, testimonials.length, isClient]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((prev) => (prev + 1) % totalSlides);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-[#0A1E3F] font-sans">
      {/* Navigation */}
      <nav className="navbar shadow-md sticky top-0 z-50 bg-white">
        <div className="nav-container flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="nav-logo text-2xl font-bold">
            <span className="logo-text">Trendtactics Digital</span>
          </div>
          <div className="nav-actions flex items-center gap-6">
            <div className="nav-menu hidden md:flex gap-4">
              <Link href="/" className="nav-link active">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/pricing" className="nav-link">Pricing</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
              <Link href="/portfolio" className="nav-link">Portfolio</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>
            {/* Mobile nav toggle and CTA */}
            <div className="nav-toggle md:hidden flex flex-col gap-1 cursor-pointer">
              <span className="w-6 h-0.5 bg-[#0A1E3F]"></span>
              <span className="w-6 h-0.5 bg-[#0A1E3F]"></span>
              <span className="w-6 h-0.5 bg-[#0A1E3F]"></span>
            </div>
            <div className="nav-cta flex gap-2">
              <Link href="/quiz" className="btn btn-outline">Take Quiz</Link>
              <Link href="/contact" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Replace with <Image> if you have a static video thumbnail fallback */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/Trendtactics-digital-promo.jpg"
            >
              <source src="/images/Trendtactics-digital-promo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />
          </div>
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="hero-title text-4xl md:text-6xl font-extrabold mb-4">
              <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                We Engineer Digital Growth
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-2xl mb-8 max-w-2xl">
              Unlock strategy, creativity, and AI power — all in one studio. Transform your business with data-driven digital marketing that delivers real results.
            </p>
            <div className="hero-cta flex gap-4">
              <Link href="/services" className="btn btn-primary btn-large">Explore Services</Link>
              <Link href="/portfolio" className="btn btn-outline btn-large">View Our Work</Link>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="brands py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <p className="brands-label text-center text-sm font-semibold mb-2">Trusted by leading brands</p>
            <div className="brands-container flex justify-center">
              <div className="brands-grid grid grid-cols-2 md:grid-cols-4 gap-4" id="brands-grid">
                {/* TODO: Dynamically load brands from JSON or static list */}
                {/* Example: <Image src="/images/brand1.png" alt="Brand 1" width={120} height={40} /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us py-16 relative">
          <div className="side-accent absolute left-0 top-0 h-full w-2 bg-cyan-400 rounded-r-lg hidden md:block" />
          <div className="container mx-auto px-4">
            <div className="section-header text-center mb-10">
              <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">Why Choose Trendtactics Digital?</h2>
              <p className="section-subtitle text-lg text-gray-600">
                We don&apos;t just deliver results — we engineer sustainable growth through strategic innovation and proven methodologies.
              </p>
            </div>
            <div className="reasons-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              <ReasonCard icon={<FaRocket className="text-cyan-500" />} title="Proven Results" description="We've helped 500+ businesses achieve an average of 300% ROI increase and 200% traffic growth within 6 months." />
              <ReasonCard icon={<FaBrain className="text-cyan-500" />} title="AI-Powered Strategy" description="Leverage cutting-edge AI tools and data analytics to make informed decisions and optimize campaigns in real-time." />
              <ReasonCard icon={<FaUsers className="text-cyan-500" />} title="Expert Team" description="Our certified professionals bring 10+ years of experience in digital marketing, SEO, and growth hacking." />
              <ReasonCard icon={<FaChartLine className="text-cyan-500" />} title="Transparent Reporting" description="Get detailed monthly reports with actionable insights, performance metrics, and growth recommendations." />
              <ReasonCard icon={<FaClock className="text-cyan-500" />} title="Fast Implementation" description="See results within 30 days with our rapid deployment strategies and optimized workflows." />
              <ReasonCard icon={<FaShieldAlt className="text-cyan-500" />} title="Risk-Free Guarantee" description="100% satisfaction guarantee with performance-based pricing and no long-term contracts required." />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="section-header text-center mb-10">
              <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">Our Services</h2>
              <p className="section-subtitle text-lg text-gray-600">
                Comprehensive digital marketing solutions designed to accelerate your business growth and maximize ROI.
              </p>
            </div>
            <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <ServiceCard
                  key={service.title + idx}
                  icon={serviceIcons[service.icon]}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  link={service.link}
                  linkText={service.linkText}
                />
              ))}
            </div>
            {/* SVG Divider */}
            <div className="w-full overflow-hidden mt-8">
              {/* You can use a static SVG or a component here */}
              <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
                <path d="M0,40 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z" fill="#00FFFF" fillOpacity="0.12" />
              </svg>
            </div>
          </div>
        </section>

        {/* Scrolling Trust Bar */}
        <div className="scrolling-trust-bar bg-cyan-50 py-2 overflow-x-auto whitespace-nowrap text-center font-semibold text-cyan-800">
          <span className="inline-block mx-8"><FaBriefcase className="mr-2" />500+ Projects Delivered</span>
          <span className="inline-block mx-8"><FaStar className="mr-2" />98% Client Satisfaction</span>
          <span className="inline-block mx-8"><FaAward className="mr-2" />10+ Years Experience</span>
          {/* ...repeat as needed... */}
        </div>

        {/* Testimonials Section */}
        <section className="testimonials py-16">
          <div className="container mx-auto px-4">
            <div className="section-header text-center mb-10">
              <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">What Our Clients Say</h2>
              <p className="section-subtitle text-lg text-gray-600">
                Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience with Trendtactics Digital.
              </p>
            </div>
            <div className="testimonials-container relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
                >
                  {isClient && Array.from({ length: totalSlides }).map((_, slideIdx) => (
                    <div
                      key={slideIdx}
                      className="flex gap-8 min-w-full"
                      style={{ minWidth: '100%' }}
                    >
                      {testimonials.slice(slideIdx * perView, (slideIdx + 1) * perView).map((t, idx) => (
                        <TestimonialCard key={t.authorName + idx} {...t} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Carousel controls */}
              {isClient && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button onClick={prev} className="p-2 rounded-full bg-cyan-100 hover:bg-cyan-300 text-cyan-700"><FaChevronUp className="rotate-[-90deg]" /></button>
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className={`w-3 h-3 rounded-full mx-1 ${current === idx ? 'bg-cyan-500' : 'bg-cyan-200'}`}
                      aria-label={`Go to testimonial slide ${idx + 1}`}
                    />
                  ))}
                  <button onClick={next} className="p-2 rounded-full bg-cyan-100 hover:bg-cyan-300 text-cyan-700"><FaChevronUp className="rotate-90" /></button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta py-16 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="cta-title text-3xl md:text-4xl font-bold mb-2">Ready to Accelerate Your Growth?</h2>
            <p className="cta-subtitle text-lg mb-6">
              Let&apos;s discuss how we can help you achieve your digital marketing goals and drive real business results.
            </p>
            <div className="cta-buttons flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary btn-large">Get Free Consultation</Link>
              <Link href="/quiz" className="btn btn-outline btn-large">Take Growth Quiz</Link>
            </div>
          </div>
        </section>

        {/* Ebook Promo Marquee */}
        <div className="w-full bg-lime-300 text-[#0A1E3F] py-2 font-semibold text-center text-base overflow-x-auto whitespace-nowrap mb-6">
          <span className="inline-block animate-marquee">
            🔥 Discover my premium ebooks for business growth! Visit the <Link href="/shop" className="underline">Author Shop</Link> to buy now and unlock your success! 🔥
          </span>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-cyan-600 transition-opacity animate-fade-in"
          aria-label="Scroll to top"
        >
          <FaChevronUp size={20} />
        </button>
      )}

      {/* Footer */}
      <footer className="footer bg-[#0A1E3F] text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="footer-content flex flex-col md:flex-row md:justify-between gap-8">
            <div className="footer-brand max-w-xs">
              <div className="footer-logo text-2xl font-bold mb-2">Trendtactics Digital</div>
              <p className="footer-description mb-4">
                We don&apos;t just market brands — we engineer digital growth. Unlock strategy, creativity, and AI power — all in one studio.
              </p>
              <div className="social-links flex gap-3 mt-2">
                <a href="https://linkedin.com/company/trendtactics-digital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className="text-2xl hover:text-cyan-400" />
                </a>
                <a href="https://twitter.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter className="text-2xl hover:text-cyan-400" />
                </a>
                <a href="https://instagram.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="text-2xl hover:text-cyan-400" />
                </a>
                <a href="https://facebook.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="text-2xl hover:text-cyan-400" />
                </a>
                <a href="https://youtube.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube className="text-2xl hover:text-cyan-400" />
                </a>
              </div>
              {/* Google Translate placeholder */}
              {/* <div id="google_translate_element"></div> */}
            </div>
            <div className="footer-column">
              <h3 className="font-semibold mb-2">Services</h3>
              <ul className="space-y-1">
                <li><Link href="/services#web-design">Web Design</Link></li>
                <li><Link href="/services#digital-marketing">Digital Marketing</Link></li>
                <li><Link href="/services#seo">SEO Optimization</Link></li>
                <li><Link href="/services#brand-strategy">Brand Strategy</Link></li>
                <li><Link href="/services#ecommerce">E-commerce Development</Link></li>
                <li><Link href="/services#content-marketing">Content Marketing</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/portfolio">Our Work</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/academy">Academy</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-1">
                <li><Link href="/ebooks">Free Ebooks</Link></li>
                <li><Link href="/tools">Marketing Tools</Link></li>
                <li><Link href="/quiz">Growth Quiz</Link></li>
                <li><Link href="/blog">Latest Articles</Link></li>
                <li><Link href="/academy">Online Courses</Link></li>
                <li><Link href="/contact">Free Consultation</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-newsletter-section mt-8">
            <div className="footer-newsletter max-w-md mx-auto text-center">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="mb-4">Get the latest digital marketing insights and tips delivered to your inbox.</p>
              <form className="newsletter-form flex flex-col sm:flex-row gap-2 justify-center">
                <input type="email" placeholder="Enter your email" required className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none" />
                <button type="submit" className="px-6 py-2 bg-cyan-500 text-white rounded-r-md hover:bg-cyan-600">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom mt-8 flex flex-col md:flex-row md:justify-between items-center text-sm border-t border-white/20 pt-4">
            <p>&copy; 2025 Trendtactics Digital. All rights reserved.</p>
            <div className="footer-legal flex gap-4 mt-2 md:mt-0">
              <Link href="#privacy">Privacy Policy</Link>
              <Link href="#terms">Terms of Service</Link>
              <Link href="#cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
