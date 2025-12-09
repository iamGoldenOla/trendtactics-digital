"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Head from 'next/head';
import { motion } from "framer-motion";

interface Value {
  icon: string;
  title: string;
  description: string;
}
interface TeamMember {
  avatar?: string;
  name: string;
  position: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
  };
}

const AboutPage = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/data/content.json")
      .then((res) => res.json())
      .then((data) => {
        setValues(data.values || []);
        setTeam(data.team || []);
      });
  }, []);

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://trendtacticsdigital.com/about",
          "name": "About Trendtactics Digital",
          "description": "Learn about Trendtactics Digital, our story, mission, vision, values, and the team behind your digital growth.",
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
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">About Trendtactics Digital</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We don&#39;t just market brands — we engineer digital growth. Discover our story, mission, and the team behind your success.
              </p>
            </div>
          </motion.section>

          {/* Company Story */}
          <section className="py-12">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&crop=faces" alt="Trendtactics Digital Team" className="rounded-lg shadow-lg w-full max-w-xs mx-auto md:mx-0" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Story</h2>
                <p className="mb-2 text-gray-700">
                  Founded in 2020 by Akinola Olujobi, Trendtactics Digital emerged from a simple belief: that every business deserves access to world-class digital marketing expertise.
                </p>
                <p className="mb-2 text-gray-700">
                  What started as a one-person operation in Lagos has grown into a global team of strategists, designers, developers, and marketers working across four continents. We&#39;ve helped over 500 businesses transform their digital presence and achieve remarkable growth.
                </p>
                <p className="text-gray-700">
                  Our journey has been driven by innovation, creativity, and an unwavering commitment to delivering measurable results. From small startups to Fortune 500 companies, we&#39;ve proven that the right digital strategy can change everything.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
              <motion.div
                className="glass-card shadow p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-4xl mb-2 text-primary"><i className="fas fa-rocket" /></div>
                <h3 className="font-bold text-xl mb-2">Our Mission</h3>
                <p className="text-gray-700">
                  To democratize access to world-class digital marketing by providing innovative, data-driven solutions that drive real business growth for companies of all sizes.
                </p>
              </motion.div>
              <motion.div
                className="glass-card shadow p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="text-4xl mb-2 text-primary"><i className="fas fa-mountain" /></div>
                <h3 className="font-bold text-xl mb-2">Our Vision</h3>
                <p className="text-gray-700">
                  To be the leading digital growth partner for ambitious businesses worldwide, known for delivering exceptional results through creativity, technology, and strategic thinking.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Values */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Our Core Values</h2>
                <p className="text-gray-600">These principles guide everything we do and every decision we make.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {values.map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card shadow p-6 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                  >
                    <div className="text-3xl mb-2 text-primary"><i className={val.icon} /></div>
                    <h4 className="font-bold mb-1">{val.title}</h4>
                    <p className="text-gray-700 text-sm">{val.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Meet Our Team</h2>
                <p className="text-gray-600">The brilliant minds behind your digital success.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {team.map((member, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card shadow p-6 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                  >
                    <img src={member.avatar?.replace('./images/', '/images/')} alt={member.name} className="w-24 h-24 rounded-full mb-3 object-cover" />
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <div className="text-primary font-semibold mb-1">{member.position}</div>
                    <p className="text-gray-700 text-sm mb-2">{member.bio}</p>
                    <div className="flex gap-3 justify-center">
                      {member.social?.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><i className="fab fa-linkedin" /></a>
                      )}
                      {member.social?.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><i className="fab fa-twitter" /></a>
                      )}
                      {member.social?.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><i className="fab fa-github" /></a>
                      )}
                      {member.social?.instagram && (
                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><i className="fab fa-instagram" /></a>
                      )}
                      {member.social?.facebook && (
                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><i className="fab fa-facebook" /></a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage; 