import React, { useEffect, useRef, useState } from "react";
import "./HowItWorks.css"; // Add CSS file for styles

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { number: 1, text: "Select profile & template to request interviewer" },
    { number: 2, text: "Wait for the interview to be happen" },
    { number: 3, text: "Make informed decision with report" }
  ];

  const sectionRef = useRef(null);

  // Animation effect for scroll/trigger
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const sectionPosition = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionPosition < windowHeight) {
        section.classList.add("animate");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="section-how-it-works"
      ref={sectionRef}
      style={{ animationDuration: "8000ms" }}
    >
      <div className="how-it-works-content-title font-bold text-center">
          Here's how it works
      </div>
      <div className="flex">
        <div className="p-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`relative mb-4 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                step.number === activeStep ? 'bg-black' : 'bg-customDark'
              }`}
              onClick={() => setActiveStep(step.number)}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.number === activeStep ? 'bg-white text-black' : 'bg-gray-700 text-white'
                }`}>
                  {step.number}
                </div>
                <span className={`text-lg ${
                  step.number === activeStep ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.text}
                </span>
              </div>
              {step.number === activeStep && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
