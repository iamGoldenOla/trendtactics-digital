"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import Head from 'next/head';
import { motion } from "framer-motion";

interface Service {
  icon: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  link: string;
  linkText: string;
}

const stats = [
  { number: "500+", label: "Projects Delivered" },
  { number: "98%", label: "Client Satisfaction %" },
  { number: "300%", label: "Avg. ROI Increase %" },
  { number: "10", label: "Years Experience" },
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://trendtacticsdigital.com/services",
          "name": "Comprehensive Digital Marketing Services - Trendtactics Digital",
          "description": "From strategy to execution, we provide end-to-end digital marketing solutions that drive real business growth. Choose from our specialized services or get a custom package tailored to your needs.",
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
            className="py-16 glass-bg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-4 text-center glassmorphism shadow-lg">
              <h1 className="text-4xl font-bold mb-4">
                Comprehensive Digital <span className="text-primary">Marketing Services</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                From strategy to execution, we provide end-to-end digital marketing solutions that drive real business growth. Choose from our specialized services or get a custom package tailored to your needs.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center animate-scale-in"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              {/* Service Showcase */}
              <div className="mb-8">
                <div className="font-semibold mb-2">Our Core Services</div>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {services.map((service, idx) => {
                    const Icon = FaIcons[service.icon as keyof typeof FaIcons] || FaIcons.FaRocket;
                    return (
                      <motion.button
                        key={service.title}
                        className={`flex flex-col items-center px-4 py-2 rounded-lg border transition card-hover glassmorphism shadow-lg animate-fade-in focus:ring-4 focus:ring-cyan-400`}
                        onClick={() => setActiveIdx(idx)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                      >
                        <Icon className="text-2xl mb-1" aria-hidden="true" />
                        <span className="text-xs font-medium">{service.title}</span>
                      </motion.button>
                    );
                  })}
                </div>
                {services[activeIdx] && (
                  <motion.div
                    className="text-gray-700 text-base max-w-xl mx-auto glass-card rounded p-4 shadow animate-slide-up"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {services[activeIdx].description}
                  </motion.div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a href="#services-grid" className="bg-primary text-white px-6 py-3 rounded font-semibold shadow hover:bg-blue-700 transition button-primary animate-scale-in">Explore Services</a>
                <Link href="/contact" className="bg-transparent border border-primary text-primary px-6 py-3 rounded font-semibold hover:bg-primary hover:text-white transition button-secondary animate-scale-in">Get Free Audit</Link>
              </div>
            </div>
          </motion.section>
          {/* Scrolling Banner */}
          <section className="w-full bg-lime-300 py-2 overflow-x-auto whitespace-nowrap text-center font-semibold text-base mb-6">
            <span className="inline-block animate-marquee">🔥 I AM OPEN FOR FREELANCING 🔥&nbsp;&nbsp;</span>
            <span className="inline-block animate-marquee">🔥 I AM OPEN FOR FREELANCING 🔥&nbsp;&nbsp;</span>
            <span className="inline-block animate-marquee">🔥 I AM OPEN FOR FREELANCING 🔥&nbsp;&nbsp;</span>
          </section>
          {/* Services Overview */}
          <section className="py-12" id="services-grid">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Our Service Categories</h2>
                <p className="text-gray-600">Comprehensive digital solutions designed to transform your business and drive measurable growth.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {services.map((service, idx) => {
                  const Icon = FaIcons[service.icon as keyof typeof FaIcons] || FaIcons.FaRocket;
                  return (
                    <motion.div
                      key={service.title}
                      className="glass-card shadow p-6 flex flex-col items-center text-center card-hover focus:ring-4 focus:ring-cyan-400"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                    >
                      <div className="text-3xl mb-2 text-primary"><Icon aria-hidden="true" /></div>
                      <h3 className="font-bold mb-1">{service.title}</h3>
                      <p className="text-gray-700 text-sm mb-2">{service.description}</p>
                      <div className="flex gap-2 items-center mb-2">
                        <span className="font-semibold text-primary">{service.price}</span>
                        <span className="text-gray-400 text-xs">{service.duration}</span>
                      </div>
                      <Link href={service.link} className="text-blue-600 underline text-sm font-medium mt-2 button-secondary animate-scale-in">{service.linkText}</Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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

export default ServicesPage; 