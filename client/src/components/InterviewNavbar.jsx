'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`flex flex-col w-full fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-[0_1px_10px_rgba(0,0,0,0.15)]' : ''
      }`}
    >
      <div className="bg-black  text-gray-400 py-3 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="flex items-center ">
              Outsource Interviews <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
            <a href="#" className="flex items-center ">
              Assessment platform <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
            <a href="#" className="flex items-center ">
              Mock interview <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="">Contact us</a>
            <a href="/access-account" className="flex items-center ">
              Login <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white text-black py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="block">
            <div 
              className="h-8 w-32 bg-no-repeat bg-contain" 
              style={{backgroundImage: "url(https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg)"}}
              aria-label="Intervue"
            />
          </a>
          <div className="flex space-x-6 items-center">
            <a href="#" className="flex items-center ">
              Solutions <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a href="#" className="flex items-center ">
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a href="#" className="flex items-center ">
              Integrations <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a href="#" className="">Pricing</a>
            <a href="#" className="flex items-center ">
              Become an interview engineer <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          <button className="bg-black text-white px-4 py-2">
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
