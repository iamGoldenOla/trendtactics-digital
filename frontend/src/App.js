import React from "react";

function App() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#0A1E3F]">Trendtactics Digital</div>
          <div className="hidden md:flex gap-6">
            <a href="#home" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Home</a>
            <a href="#about" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">About</a>
            <a href="#services" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Services</a>
            <a href="#pricing" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Pricing</a>
            <a href="#blog" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Blog</a>
            <a href="#portfolio" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Portfolio</a>
            <a href="#tools" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Tools</a>
            <a href="#quiz" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Quiz</a>
            <a href="#contact" className="text-[#0A1E3F] hover:text-cyan-500 font-medium transition">Contact</a>
          </div>
          <div className="md:hidden">
            <button className="text-[#0A1E3F]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-white via-cyan-50 to-cyan-100 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A1E3F] mb-6">
            Transform Your Business with
            <span className="text-cyan-500"> Digital Marketing</span>
          </h1>
          <p className="text-lg md:text-xl text-[#0A1E3F] mb-8 max-w-2xl mx-auto">
            We help businesses grow online with proven digital marketing strategies, 
            innovative tools, and data-driven insights that deliver real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#services" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105">
              Get Started Today
            </a>
            <a href="#tools" className="bg-white border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105">
              Try Our Tools
            </a>
          </div>
          <div className="flex justify-center items-center gap-8 text-sm text-[#0A1E3F]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span>500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span>95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-4">Our Digital Marketing Services</h2>
            <p className="text-lg text-[#0A1E3F] max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">SEO & Content Marketing</h3>
              <p className="text-[#0A1E3F] mb-4">Boost your search rankings and attract qualified traffic with our proven SEO strategies and compelling content.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Social Media Marketing</h3>
              <p className="text-[#0A1E3F] mb-4">Build meaningful connections and grow your audience with creative, data-driven social media campaigns.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">PPC & Google Ads</h3>
              <p className="text-[#0A1E3F] mb-4">Drive targeted traffic and conversions with strategic paid advertising campaigns that maximize your ROI.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Web Design & Development</h3>
              <p className="text-[#0A1E3F] mb-4">Create stunning, conversion-focused websites that engage visitors and drive business growth.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Analytics & Reporting</h3>
              <p className="text-[#0A1E3F] mb-4">Track performance, measure success, and make data-driven decisions with comprehensive analytics.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
            <div className="bg-white border border-cyan-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Email Marketing</h3>
              <p className="text-[#0A1E3F] mb-4">Nurture leads and drive sales with personalized email campaigns that convert subscribers into customers.</p>
              <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600 transition">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Tools Section */}
      <section id="tools" className="py-20 px-4 bg-gradient-to-br from-cyan-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-4">Free Digital Marketing Tools</h2>
            <p className="text-lg text-[#0A1E3F] max-w-2xl mx-auto">
              Powerful tools to help you grow your business and make informed marketing decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Business Name Generator</h3>
              <p className="text-[#0A1E3F] mb-4">Generate creative and memorable business names for your startup or brand.</p>
              <a href="#" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition">Try Tool</a>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Business Idea Generator</h3>
              <p className="text-[#0A1E3F] mb-4">Discover profitable business ideas based on your interests and market trends.</p>
              <a href="#" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition">Try Tool</a>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1E3F] mb-3">Content Calendar Generator</h3>
              <p className="text-[#0A1E3F] mb-4">Plan your content strategy with our smart content calendar generator.</p>
              <a href="#" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition">Try Tool</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-4">What Our Clients Say</h2>
            <p className="text-lg text-[#0A1E3F] max-w-2xl mx-auto">
              Real results from real businesses we've helped grow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0A1E3F]">Sarah Johnson</h4>
                  <p className="text-sm text-[#0A1E3F]">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-[#0A1E3F] mb-4">"Trendtactics Digital transformed our online presence. Our website traffic increased by 300% in just 6 months!"</p>
              <div className="flex text-cyan-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0A1E3F]">Mike Chen</h4>
                  <p className="text-sm text-[#0A1E3F]">Founder, EcoStore</p>
                </div>
              </div>
              <p className="text-[#0A1E3F] mb-4">"Their digital marketing strategies helped us reach new customers and increase sales by 150%. Highly recommended!"</p>
              <div className="flex text-cyan-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">L</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#0A1E3F]">Lisa Rodriguez</h4>
                  <p className="text-sm text-[#0A1E3F]">Marketing Director, GrowthCo</p>
                </div>
              </div>
              <p className="text-[#0A1E3F] mb-4">"The team at Trendtactics Digital is professional, creative, and delivers results. Our ROI has never been better!"</p>
              <div className="flex text-cyan-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0A1E3F] to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of successful businesses that trust Trendtactics Digital for their growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-[#0A1E3F] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105">
              Get Free Consultation
            </a>
            <a href="#quiz" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A1E3F] font-semibold px-8 py-4 rounded-lg transition transform hover:scale-105">
              Take Growth Quiz
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1E3F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Trendtactics Digital</h3>
              <p className="text-gray-300 mb-4">Empowering businesses with innovative digital marketing solutions and tools.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition">LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-cyan-400 transition">SEO & Content</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Social Media</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">PPC & Ads</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Web Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-cyan-400 transition">Business Name Generator</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Idea Generator</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Content Calendar</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Growth Quiz</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>info@trendtacticsdigital.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Digital Street<br />Marketing City, MC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Trendtactics Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
