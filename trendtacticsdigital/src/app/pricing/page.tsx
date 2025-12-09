"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Link from "next/link";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: 1500,
    period: "/month",
    description: "Perfect for small businesses starting their digital journey",
    features: [
      "Custom Website Design",
      "Basic SEO Optimization",
      "Social Media Management (3 platforms)",
      "Monthly Performance Report",
      "Email Support",
      "Google Analytics Setup",
      "Basic Content Creation",
      "Mobile Optimization",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    price: 3500,
    period: "/month",
    description: "Ideal for growing businesses ready to scale",
    features: [
      "Everything in Starter",
      "Advanced SEO Strategy",
      "Content Marketing (8 articles/month)",
      "Social Media Management (5 platforms)",
      "Weekly Performance Calls",
      "PPC Campaign Management",
      "Email Marketing Setup",
      "Conversion Rate Optimization",
      "Priority Support",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Scale",
    price: 7500,
    period: "/month",
    description: "Complete digital transformation for established businesses",
    features: [
      "Everything in Growth",
      "AI-Powered Marketing Automation",
      "Custom Marketing Tools",
      "Dedicated Account Manager",
      "Advanced Analytics & Reporting",
      "Multi-Channel Campaign Strategy",
      "Brand Strategy & Positioning",
      "Competitor Analysis",
      "24/7 Priority Support",
      "Custom Integrations",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

const featureComparison = [
  {
    feature: "Website Design",
    values: [true, true, true],
  },
  {
    feature: "SEO Optimization",
    values: ["Basic", "Advanced", "Premium"],
  },
  {
    feature: "Social Media Management",
    values: ["3 Platforms", "5 Platforms", "All Platforms"],
  },
  {
    feature: "Content Marketing",
    values: [false, "8 Articles/Month", "Unlimited"],
  },
  {
    feature: "PPC Management",
    values: [false, true, true],
  },
  {
    feature: "Email Marketing",
    values: [false, true, true],
  },
  {
    feature: "AI Automation",
    values: [false, false, true],
  },
  {
    feature: "Account Manager",
    values: [false, false, true],
  },
  {
    feature: "Support",
    values: ["Email", "Priority", "24/7 Priority"],
  },
];

const PricingPage = () => {
  const [annual, setAnnual] = useState(false);

  // Calculate price with 20% discount for annual billing
  const getPrice = (price: number) =>
    annual ? Math.round(price * 12 * 0.8) : price;
  const getPeriod = () => (annual ? "/year" : "/month");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="py-16 glass-bg text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="container mx-auto px-4 glassmorphism shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Transparent Pricing</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include our proven strategies and expert support.
            </p>
          </div>
        </motion.section>
        {/* Pricing Toggle */}
        <section className="py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <span className={!annual ? "font-bold text-primary" : "text-gray-500"}>Monthly</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={annual}
                  onChange={() => setAnnual((a) => !a)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary dark:bg-gray-700 peer-checked:bg-primary transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
              <span className={annual ? "font-bold text-primary" : "text-gray-500"}>
                Annual <span className="ml-1 text-green-600 font-semibold">Save 20%</span>
              </span>
            </div>
          </div>
        </section>
        {/* Service Pricing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Service Packages</h2>
              <p className="text-gray-600">Comprehensive packages designed to meet your specific needs and budget.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  className={`glass-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center border-2 transition-all focus:ring-4 focus:ring-cyan-400 ${plan.featured ? "border-primary bg-blue-50 scale-105 z-10" : "border-gray-100 bg-white"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                >
                  {plan.featured && (
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">Most Popular</div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center mb-2">
                    <span className="text-3xl font-bold text-primary">${getPrice(plan.price)}</span>
                    <span className="text-gray-500 ml-1">{getPeriod()}</span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                  <ul className="text-left mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className="text-green-600"><i className="fas fa-check" aria-hidden="true" /></span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`w-full py-2 rounded font-semibold border focus:ring-4 focus:ring-cyan-400 ${plan.featured ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary hover:bg-primary hover:text-white"} transition text-center`}>{plan.cta}</Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Feature Comparison */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Compare Features</h2>
              <p className="text-gray-600">See what&#39;s included in each package to make the best choice for your business.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className={`py-2 px-4 font-semibold ${plan.featured ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>{plan.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row) => (
                    <tr key={row.feature} className="border-t">
                      <td className="py-2 px-4 font-medium text-gray-700">{row.feature}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className={`py-2 px-4 text-center ${plans[i].featured ? "bg-blue-50" : ""}`}>
                          {val === true && <span className="text-green-600"><i className="fas fa-check" /></span>}
                          {val === false && <span className="text-red-500"><i className="fas fa-times" /></span>}
                          {typeof val === "string" && val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage; 