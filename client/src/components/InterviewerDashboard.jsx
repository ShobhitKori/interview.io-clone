import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LightbulbIcon,
  Calendar,
  Clock,
  User,
  Video,
  FileText,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("candidate");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
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
        </div>
      </div>
    </header>
  );
};

const ProfileWelcome = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-semibold text-xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Hi, {user.name.split(" ")[0]}
          </h2>
          <p className="text-gray-600 max-w-xl">
            Welcome to your interviewer dashboard. Here you will find your
            scheduled interviews, feedback history, and candidate evaluations.
          </p>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap">
        Schedule Interview <ArrowRight size={16} />
      </button>
    </div>
  );
};

const ResourcesSidebar = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const resources = [
    {
      id: 1,
      title: "Effective Technical Interviewing",
      description:
        "Learn best practices for evaluating technical skills, avoiding bias, and identifying top talent.",
      link: "#",
    },
    {
      id: 2,
      title: "Behavioral Interview Questions",
      description:
        "A comprehensive guide to behavioral questions that reveal candidate soft skills and cultural fit.",
      link: "#",
    },
    {
      id: 3,
      title: "Remote Interview Techniques",
      description:
        "Master the art of conducting effective remote interviews with these proven strategies.",
      link: "#",
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? resources.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === resources.length - 1 ? 0 : prev + 1));
  };

  return (
    <aside className="bg-gray-100 rounded-lg p-6 h-full sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <LightbulbIcon size={20} className="text-yellow-500" />
        <h3 className="text-lg font-semibold">Interviewer resources</h3>
      </div>

      <div className="relative bg-white rounded-lg p-6 shadow-sm mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm z-10"
          onClick={handlePrevSlide}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="text-center">
          <h4 className="text-base font-semibold mb-3">
            {resources[currentSlide].title}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {resources[currentSlide].description}
          </p>
          <a
            href={resources[currentSlide].link}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Read more
          </a>
        </div>

        <button
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm z-10"
          onClick={handleNextSlide}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {resources.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a
              href="#questions"
              className="block p-2 rounded-md hover:bg-gray-200 transition-colors text-gray-700"
            >
              Interview Question Bank
            </a>
          </li>
          <li>
            <a
              href="#templates"
              className="block p-2 rounded-md hover:bg-gray-200 transition-colors text-gray-700"
            >
              Feedback Templates
            </a>
          </li>
          <li>
            <a
              href="#training"
              className="block p-2 rounded-md hover:bg-gray-200 transition-colors text-gray-700"
            >
              Interviewer Training
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const TabNavigation = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const UpcomingInterviews = ({ activeTab }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const interviewerDetails = {
    name: user.name,
    email: user.email,
  };
  const [interviewData, setInterviewData] = useState([]);
  console.log(interviewerDetails);
  const fetchInterviewData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/interviews/interviewer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interviewerDetails),
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
    if (activeTab === "upcoming") {
      fetchInterviewData();
    }
  }, [activeTab]);
  const parsedInterviewData = JSON.stringify(interviewData)
  
  const upcomingInterviews = interviewData.map((interview, index) => ({
    id: index, 
    candidate: interview.candidate.name,
    candidateEmail: interview.candidate.email,
    business: interview.business,
    position: interview.role, // Or role
    date: interview.interviewSchedule.date,
    time: `${interview.interviewSchedule.time} - ${
      parseInt(interview.interviewSchedule.time.split(":")[0]) +
      interview.interviewSchedule.duration / 60
    }:${interview.interviewSchedule.time.split(":")[1]}`, // create a time range
    type: "Video Call", 
    feedback: "Not Submitted", 
    result: "Pending", 
  }));

  // Mock data for completed interviews
  const completedInterviews = [
    {
      id: 4,
      candidate: "Riley Smith",
      position: "UX Designer",
      date: "2025-03-10",
      time: "9:00 AM - 10:00 AM",
      type: "Video Call",
      feedback: "Submitted",
      result: "Recommended",
    },
    {
      id: 5,
      candidate: "Casey Johnson",
      position: "Backend Developer",
      date: "2025-03-08",
      time: "3:30 PM - 4:30 PM",
      type: "Video Call",
      feedback: "Submitted",
      result: "Not Recommended",
    },
  ];

  // Mock data for feedback
  const feedbackHistory = [
    {
      id: 6,
      candidate: "Riley Smith",
      position: "UX Designer",
      date: "2025-03-10",
      rating: 4.5,
      notes:
        "Strong portfolio, excellent communication skills, good cultural fit.",
    },
    {
      id: 7,
      candidate: "Casey Johnson",
      position: "Backend Developer",
      date: "2025-03-08",
      rating: 2.5,
      notes:
        "Limited knowledge of system design, struggled with algorithm questions.",
    },
  ];

  const renderContent = () => {
    if (activeTab === "upcoming") {
      if (upcomingInterviews.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-600 mb-6">
              You have no upcoming interviews
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Schedule Interview
            </button>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{interview.candidate}</h3>
                <span className="text-sm text-gray-600">
                  {interview.position}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={16} />
                  <span>
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Video size={16} />
                  <span>{interview.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <User size={16} />
                  View Profile
                </button>
                <button
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    localStorage.setItem("company", JSON.stringify(interview.business))
                    localStorage.setItem("candidate", JSON.stringify({name: interview.candidate, email: interview.candidateEmail}))
                    setTimeout(() => {
                      navigate("/video-call")
                    }, 2000)
                  }}
                >
                  Start Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "completed") {
      return (
        <div className="space-y-4">
          {completedInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{interview.candidate}</h3>
                <span className="text-sm text-gray-600">
                  {interview.position}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    interview.result === "Recommended"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {interview.result}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={16} />
                  <span>
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} />
                  <span>{interview.time}</span>
                </div>
              </div>
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                View Feedback
              </button>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "feedback") {
      return (
        <div className="space-y-4">
          {feedbackHistory.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{feedback.candidate}</h3>
                <span className="text-sm text-gray-600">
                  {feedback.position}
                </span>
                <div className="mt-2 flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(feedback.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {feedback.rating}/5
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Calendar size={16} />
                <span>
                  {new Date(feedback.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2">Notes:</h4>
                <p className="text-gray-700 text-sm">{feedback.notes}</p>
              </div>
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                Edit Feedback
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return <div className="mt-6">{renderContent()}</div>;
};

export default function InterviewerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const interviewer = {
    name: userProfile.name,
    role: "Senior Technical Interviewer",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={interviewer} />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfileWelcome user={interviewer} />
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={[
                { id: "upcoming", label: "Upcoming" },
                { id: "completed", label: "Completed" },
                { id: "feedback", label: "My Feedback" },
              ]}
            />
            <UpcomingInterviews activeTab={activeTab} />
          </div>
          <div className="lg:col-span-1">
            <ResourcesSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
