import React from 'react';

const CompanyTypeSection = () => {
  const profiles = [
    'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer1.png',
    'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer2.png',
    'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer3.png',
    'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer4.png',
    'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer5.png',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 flex justify-between items-start">
      <div className="max-w-2xl">
        <h2 className="text-4xl mb-2">
          Experts from every <strong>domain</strong> to every <strong>company size</strong>
        </h2>
        <p className="text-xl text-gray-600 mb-8">1000+ active interviewers</p>
        
        <div className="flex mb-6">
          {profiles.map((profile, index) => (
            <img
              key={index}
              src={profile}
              alt={`Profile ${index + 1}`}
              width={48}
              height={48}
              className="rounded-full border-2 border-white mr-4"
            />
          ))}
        </div>
        
        <h3 className="font-semibold mb-2">Hypergrowth</h3>
        <p className="text-gray-600">
          Startups that are growing at a rapid pace and on the journey to becoming an enterprise
        </p>
      </div>
      
      <div className="relative w-96 h-64">
        <img
          src="https://www.researchgate.net/profile/Asghar-Fazel/publication/285590154/figure/fig1/AS:613508026732546@1523283120106/Map-showing-location-of-FNR-Rio-pilot-countries.png"
          alt="World Map"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export default CompanyTypeSection;
