"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("my-interviews");
  const [activeBlogSlide, setActiveBlogSlide] = useState(0);
  const [activeQuestionSlide, setActiveQuestionSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const tabs = [
    { id: "my-interviews", label: "My Interviews" },
    { id: "completed", label: "Completed" },
    { id: "badges", label: "My Badges" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "What is Full-Stack Development?",
      description:
        "Explore Full-Stack Development: Covering Design, Creation, Testing, and Deployment of Web Applications, Including Databases, Front-End & Back-End Development.",
      image:
        "https://leadproinfotech.com/wp-content/uploads/2025/01/mern-stack.png",
      readMore: "https://leadproinfotech.com/mern-stack-introduction-examples/",
    },
    {
      id: 2,
      title: "Getting Started with React Hooks",
      description:
        "Learn how to leverage React Hooks to write cleaner and more efficient functional components. Dive into useState, useEffect, and useContext.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
      readMore: "https://www.example.com/react-hooks-guide",
    },
    {
      id: 3,
      title: "Introduction to Python for Data Science",
      description:
        "Explore the fundamentals of Python for data science. Learn to manipulate data with Pandas and visualize data with Matplotlib.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
      readMore: "https://www.example.com/python-data-science",
    },
    {
      id: 4,
      title: "Introduction to TypeScript",
      description:
        "Discover TypeScript, a statically typed superset of JavaScript. Learn about its benefits and how it can improve your development workflow.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
      readMore: "https://www.example.com/typescript-intro",
    },
    {
      id: 5,
      title: "Building Mobile Apps with React Native",
      description:
        "Explore React Native for building cross-platform mobile applications. Learn to create native-like apps using React.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
      readMore: "https://www.example.com/react-native-apps",
    },
  ];

  const interviewQuestions = [
    {
      id: 1,
      title: "Advanced Swift Interview Questions",
      description:
        "Essential Swift interview questions to effectively assess experienced candidates.",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.almabetter.com%2Fbytes%2Farticles%2Fmern-stack&psig=AOvVaw0Cxut1UVss3_aZzTFAiiv6&ust=1742557289116000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCGuvrJmIwDFQAAAAAdAAAAABAE",
    },
    // Add more questions here
  ];

  const logOut = () => {
    toast.success("Logged out");
    setTimeout(() => {
      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("candidate");
    }, 2000);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const user = JSON.parse(localStorage.getItem("candidate"));
  const candidateDetails = {
    name: user.name,
    email: user.email,
  };
  const [interviewData, setInterviewData] = useState([]);

  const fetchInterviewData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/interviews/candidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidateDetails),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch interview data.");
      }
      const data = await response.json();
      setInterviewData(data);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "my-interviews") {
      fetchInterviewData();
    }
  }, [activeTab, fetchInterviewData]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex bg-black text-white font-bold justify-between items-center px-4">
        <div
          className="h-8 w-32 mb-4 bg-no-repeat bg-contain mt-3 ml-2"
          style={{
            backgroundImage:
              "url(https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/648175fc7332de3fb931061a_intervue.svg)",
          }}
          aria-label="Intervue"
        />
        <div className="flex items-center gap-4">
          <button className="mr-3">Contact us</button>
          <div
            className="profile flex items-center gap-2 relative cursor-pointer"
            onClick={handleToggle}
            ref={dropdownRef}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {user.name.charAt(0)}
            </div>
            <span className="">{user.name}</span>
            <ChevronDown size={20} className="mr-3" />

            {isOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#0a0908] rounded-md shadow-lg p-2 w-48">
                <button
                  className="flex items-center w-full p-2 hover:[#343a40] rounded-md"
                  onClick={logOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
            <ToastContainer />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Hi, {user.name}</h1>
                  <p className="text-gray-600">
                    Welcome to your mock interviews dashboard, here you will
                    find the scheduled interviews along with detailed history of
                    the ones you have completed
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() =>
                  setTimeout(() => {
                    navigate("/video-call/candidate");
                  }, 1)
                }
              >
                Request Interview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b mb-8">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (activeTab === "my-interviews") {
                        fetchInterviewData();
                      }
                    }}
                    className={`pb-4 relative ${
                      activeTab === tab.id
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              {activeTab === "my-interviews" ? (
                // Interviews Content
                <div>
                  <h1 className="text-2xl font-semibold">
                    Upcoming Interviews
                  </h1>
                  {interviewData.length > 0 ? (
                    <ul className="space-y-4">
                      {interviewData.map((interview) => (
                        <li
                          key={interview._id}
                          className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                          <div className="flex-grow">
                            <p className="text-gray-700">
                              <span className="font-semibold">Company:</span>{" "}
                              {interview.business.name} (
                              {interview.business.email})
                            </p>
                            <p className="text-gray-700">
                              <span className="font-semibold">
                                Interviewer:
                              </span>{" "}
                              {interview.interviewer.name} (
                              {interview.interviewer.email})
                            </p>
                            <p className="text-gray-700">
                              <span className="font-semibold">Schedule:</span>{" "}
                              {interview.interviewSchedule.date}{" "}
                              {interview.interviewSchedule.time}
                            </p>
                          </div>
                          <div>
                            <a
                              href="/video-call/candidate"
                              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                            >
                              Start Interview
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">😕</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-4">
                        You have no upcoming interviews
                      </h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mx-auto">
                        Request Interview
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h1>Nothing Here</h1>
                </div>
              )}
            </div>
            {/* Empty State */}
          </div>

          {/* Sidebar */}
          <div className="w-96 space-y-8">
            {/* Blog Section */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <span className="text-2xl">💡</span>
                Discover helpful resources
              </h2>
              <h3 className="font-medium mb-4">Explore our blog</h3>

              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  {blogPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className={`${
                        index === activeBlogSlide ? "block" : "hidden"
                      }`}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h4 className="font-semibold mb-2">{post.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {post.description}
                      </p>
                      <a
                        href={post.readMore}
                        target="blank"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Read more
                      </a>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setActiveBlogSlide((prev) => Math.max(0, prev - 1))
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveBlogSlide((prev) =>
                      Math.min(blogPosts.length - 1, prev + 1)
                    )
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {blogPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveBlogSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === activeBlogSlide
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Interview Questions Section */}
            <section>
              <h3 className="font-medium mb-4">Interview Questions</h3>
              <div className="relative">
                {/* Similar carousel structure as blog section */}
                {/* ... */}
              </div>
            </section>

            {/* Sample Resumes Section */}
            <section>
              <h3 className="font-medium mb-4">Sample Resumes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <img
                      src="https://d31kzl7c7thvlu.cloudfront.net/ghost/2022/09/Account-Manager.jpg"
                      alt="Resume icon"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Angular Developer Resume
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Wondering how to compose an Angular developer resume that
                      stands out in the competitive market?
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
