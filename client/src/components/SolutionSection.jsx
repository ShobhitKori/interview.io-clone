import React, { useState, useEffect } from 'react';
import { ArrowRight, Github } from 'lucide-react';


const SolutionSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { icon: '📊', label: 'Assessments' },
    { icon: '📁', label: 'Projects' },
    { icon: '👥', label: 'Outsource Interviews' },
    { icon: '💻', label: 'Pair programming' },
  ];

  const tabContent = [
    {
      title: 'Assessments',
      description: 'Accelerate your screening process with our custom assessments, large question bank and auto scoring features.',
      imageSrc: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/solutions/assessments.png',
    },
    {
      title: 'Projects',
      description: 'Industry graded projects for in-depth candidate evaluation.',
      imageSrc: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/solutions/projects.png',
    },
    {
      title: 'Outsource Interviews',
      description: 'Interviews happen asynchronously conducted by vetted interviewers on Intervue\'s platform. A detailed report of candidate\'s performance is available in minutes.',
      imageSrc: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/solutions/outsourced_interviews.png',
    },
    {
      title: 'Pair programming',
      description: 'Collaborate in real-time with candidates using our advanced pair programming tools.',
      imageSrc: 'https://d2b1cooxpkirg1.cloudfront.net/publicAssets/solutions/live_interviews.png',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderTabContent = () => {
    const content = tabContent[activeTab];

    return (
      <div className="flex">
        <div className=" rounded-lg overflow-hidden">
          <img src={content.imageSrc} alt={content.title} width={600} height={400} layout="responsive" />
        </div>
        <div className="w-1/3 pl-8">
          <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
          <p className="text-gray-600 mb-6">{content.description}</p>
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold mb-4">
            Get started
          </button>
          <a href="#" className="text-blue-600 font-semibold flex items-center">
            Explore {content.title.toLowerCase()} <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl text-center mb-2">Your own <strong>360°</strong> solution</h2>
      <p className="text-xl text-center text-gray-600 mb-8">
        Screen, interview and shortlist the best candidates all in on place
      </p>

      <div className="flex justify-center mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center px-4 py-2 mx-2 rounded-full ${
              activeTab === index ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => setActiveTab(index)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default SolutionSection;