"use client";

import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "../index.css";
import { useState } from "react";

const companies = [
  {
    name: "Razorpay",
    logo: "https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e40e60129048050883c_Razorpay.svg",
  },
  {
    name: "SIEMENS",
    logo: "https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e5594c84f21ccbc5bcf_Siemens-logo%201.svg",
  },
  {
    name: "General Mills",
    logo: "https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e29690ab92c606429b3_General_Mills_logo.svg%201.svg",
  },
  {
    name: "Rakuten",
    logo: "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/company_logos/rakuten.svg",
  },
  {
    name: "M2P",
    logo: "https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e30fbc455f4376f9f02_M2P.svg",
  },
];

// Basic Button Component
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Basic Input Component
const Input = ({ className, ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-black transition-shadow ${className}`}
      {...props}
    />
  );
};

export default function InterviewerSignupPage() {
  const [formData, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup/interviewer", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      console.log(result);
      navigate("/login/interviewer");
    } catch (error) {
      console.error(error.message);
    } finally {
      setData({
        name: "",
        email: "",
        phone: "",
        password: ""
      })
    }
  };
  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Left Side - Clients Section */}
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-center bg-customLight">
        <div className="max-w-md">
          <h2 className="text-4xl mb-4">Our clients</h2>
          <p className="text-gray-600 mb-12">
            We are already working with teams that want to hire the best
            engineers
          </p>

          {/* Client Logos */}
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-8 items-center">
              <img
                src={companies[0].logo}
                alt="Razorpay"
                className="h-8 object-contain"
              />
              <img
                src={companies[1].logo}
                alt="Siemens"
                className="h-8 object-contain"
              />
              <img
                src={companies[2].logo}
                alt="General Mills"
                className="h-8 object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 items-center">
              <img
                src={companies[3].logo}
                alt="Rakuten"
                className="h-8 object-contain"
              />
              <img
                src={companies[4].logo}
                alt="M2P"
                className="h-8 object-contain"
              />
            </div>
          </div>

          {/* View All Link */}
          <a
            href="#"
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 mt-12 group"
          >
            View all success stories
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <a href="/" className="block flex justify-center mb-8">
            <div
              className="h-8 w-32 bg-no-repeat bg-contain"
              style={{
                backgroundImage:
                  "url(https://d2b1cooxpkirg1.cloudfront.net/publicAssets/intervue.svg)",
              }}
              aria-label="Intervue"
            />
          </a>

          {/* INTERVIEWER Badge */}
          <div className="flex justify-center">
            <span className="bg-black text-white text-sm font-semibold px-4 py-1 rounded">
              INTERVIEWER
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Signup as Interviewer
            </h1>

            {/* Google Sign In Button */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-green-600 rounded text-black bg-white hover:bg-gray-50 transition-colors">
              {/* <img 
                src="/placeholder.svg?height=20&width=20" 
                alt="Google Logo" 
                className="w-5 h-5"
              /> */}
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </i>
              Continue with your work email
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#fafafa] font-bold text-black">
                  OR
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 text-xl">
                <Input
                  type="name"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-200"
                />
                <Input
                  type="email"
                  placeholder="Work email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-200"
                />
                <Input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  required
                  onChange={handleChange}
                  className="bg-gray-200"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className="bg-gray-200"
                />
              </div>
              {error && <div className="font-red">{error}</div>}
              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white font-bold flex items-center justify-center gap-2 pt-4 pb-4"
              >
                Create an Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-4"></div>

            {/* Create Account Section */}
            <div className="text-center space-y-2">
              <p className="text-gray-500 text-sm">Already have an account?</p>
              <a
                href="/login/interviewer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Login into to your account
              </a>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 space-y-4">
              <p>By signing up you agree to Intervue's</p>
              <div>
                <a href="#" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:text-green-700">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
