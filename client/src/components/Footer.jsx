import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

function Footer() {
  const companies = [
    { name: 'Razorpay', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e40e60129048050883c_Razorpay.svg' },
    { name: 'SIEMENS', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e5594c84f21ccbc5bcf_Siemens-logo%201.svg' },
    { name: 'General Mills', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e29690ab92c606429b3_General_Mills_logo.svg%201.svg' },
    { name: 'Rakuten', logo: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/company_logos/rakuten.svg' },
    { name: 'M2P', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e30fbc455f4376f9f02_M2P.svg' },
  ];
  return (
    <footer className="bg-customDark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div 
            className="h-8 w-32 mb-4 bg-no-repeat bg-contain" 
            style={{backgroundImage: "url(https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/648175fc7332de3fb931061a_intervue.svg)"}}
            aria-label="Intervue"
          />
          <div className="flex space-x-4 mb-4">
            <Facebook className="w-6 h-6" />
            <Instagram className="w-6 h-6" />
            <Twitter className="w-6 h-6" />
            <Linkedin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Hire tech folks faster!</h3>
          <p className="mb-4">Save engineering bandwidth & reduce time-to-hire by 70%</p>
          <div className="flex space-x-4 mb-4">
            {companies.map((partner) => (
              <img key={partner.name} src={partner.logo} alt={partner.name} width={40} height={20} />
            ))}
          </div>
            <button className="w-full bg-black text-white py-3 px-4 rounded text-center font-semibold">Request Demo</button>
          </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Company</h3>
            <ul className="space-y-2">
              {["Mission", "Slack Community", "Contact us", "Request a feature", "Our customers", "FAQs"].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Product</h3>
            <ul className="space-y-2">
              {["Interview as a Service", "Features", "Profiles", "Pricing", "Testimonials", "Integrations", "Status", "Changelogs"].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Resources</h3>
            <ul className="space-y-2">
              {["Candidates Starter Guide", "Case studies", "Blog", "Glossary", "Job Description", "Product roadmap", "Sitemap"].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Solutions</h3>
            <ul className="space-y-2">
              {["Startups", "IT services", "IT staffing", "Campuses", "Coding Schools"].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Use cases</h3>
            <ul className="space-y-2">
              {[
                "Accelerate tech hiring",
                "Standardized interviews",
                "Cater to niche roles",
                "Candidate experience",
                "Hiring analytics",
                "Diversity & inclusion",
                "Mock interviews",
                "Pair programming",
                "Ask pseudo code",
                "Reduce Rejection Ratio",
              ].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-2 text-lg">Use cases</h3>
            <ul className="space-y-2">
              {[
                "System design interviews",
                "Product manager interviews",
                "Lateral hiring",
                "Campus hiring",
                "Frontend application development",
                "Backend application development",
                "Fullstack application development",
                "Data Science-based application development"
              ].map((item) => (
                <li key={item}><a href="#" className="text-gray-400 hover:text-white transition duration-300">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer

                
