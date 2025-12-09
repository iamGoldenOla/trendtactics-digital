import React from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-6 mt-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
        {/* Brand & Social */}
        <div className="flex-1 min-w-[220px]">
          <div className="text-2xl font-bold mb-2">Trendtactics Digital</div>
          <p className="mb-4 text-gray-300">
            We don&#39;t just market brands — we engineer digital growth. Unlock strategy, creativity, and AI power — all in one studio.
          </p>
          <div className="flex gap-3 mb-4">
            <a href="https://linkedin.com/company/trendtactics-digital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary"><i className="fab fa-linkedin" /></a>
            <a href="https://twitter.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary"><i className="fab fa-twitter" /></a>
            <a href="https://instagram.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary"><i className="fab fa-instagram" /></a>
            <a href="https://facebook.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary"><i className="fab fa-facebook" /></a>
            <a href="https://youtube.com/trendtactics" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary"><i className="fab fa-youtube" /></a>
          </div>
        </div>
        {/* Columns */}
        <div className="flex flex-1 gap-8 justify-between">
          <div>
            <h3 className="font-semibold mb-2">Services</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="/services#web-design">Web Design</Link></li>
              <li><Link href="/services#digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/services#brand-strategy">Brand Strategy</Link></li>
              <li><Link href="/services#ecommerce">E-commerce</Link></li>
              <li><Link href="/services#consulting">Consulting</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/portfolio">Our Work</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/academy">Academy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="/ebooks">Free Ebooks</Link></li>
              <li><Link href="/tools">Marketing Tools</Link></li>
              <li><Link href="/quiz">Growth Quiz</Link></li>
              <li><Link href="/blog">Latest Articles</Link></li>
              <li><Link href="/academy">Online Courses</Link></li>
              <li><Link href="/contact">Free Consultation</Link></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Newsletter */}
      <div className="mb-8">
        <div className="bg-gray-800 rounded p-6 max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Stay Updated</h3>
          <p className="mb-3 text-gray-400">Get the latest digital marketing insights and tips delivered to your inbox.</p>
          <NewsletterForm />
        </div>
      </div>
      {/* Bottom */}
      <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-700 pt-4 text-sm text-gray-400">
        <p>&copy; 2025 Trendtactics Digital. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="#privacy">Privacy Policy</Link>
          <Link href="#terms">Terms of Service</Link>
          <Link href="#cookies">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 