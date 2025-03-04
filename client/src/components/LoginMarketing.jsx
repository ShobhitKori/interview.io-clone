import React from 'react';

const companies = [
  { name: 'Razorpay', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e40e60129048050883c_Razorpay.svg' },
  { name: 'SIEMENS', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e5594c84f21ccbc5bcf_Siemens-logo%201.svg' },
  { name: 'General Mills', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e29690ab92c606429b3_General_Mills_logo.svg%201.svg' },
  { name: 'Rakuten', logo: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/company_logos/rakuten.svg' },
  { name: 'M2P', logo: 'https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/66e16e30fbc455f4376f9f02_M2P.svg' },
]

const LoginMarketing = () => {
  return (
    <section className="py-12 bg-customGreen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="flex justify-between items-center flex-wrap">
          {companies.map((company) => (
            <div key={company.name} className="w-1/5 sm:w-1/5 md:w-1/5 px-4 mb-8 sm:mb-0 ">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-12 w-auto mx-auto max-w-3xl"
                style={{maxWidth: '100%'}}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LoginMarketing