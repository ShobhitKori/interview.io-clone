import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";
import CompanyLoginPage from "./components/CompanyLogin.jsx";
import CandidateLoginPage from "./components/CandidateLogin.jsx";
import CompanySignupPage from "./components/CompanySignup.jsx";
import CandidateSignupPage from "./components/CandidateSignup.jsx";
import CompanyRequestInterview from "./components/CompanyRequestInterview.jsx";
import CandidateDashboard from "./components/CandidateHomePage.jsx";
import VideoCall from "./components/VideoCall";
import Room from "./components/Room";
import { SocketProvider } from "./context/SocketProvider";
import InterviewerSignupPage from "./components/InterviewerSignup";
import InterviewerLoginPage from "./components/InterviewerLogin ";
import InterviewerDashboard from "./components/InterviewerDashboard";
import CandidateReport from "./components/CandidateReport";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/access-account", element: <Login /> },
  { path: "/login", element: <CompanyLoginPage /> },
  { path: "/signup", element: <CompanySignupPage /> },
  { path: "/login/candidate", element: <CandidateLoginPage /> },
  { path: "/signup/candidate", element: <CandidateSignupPage /> },
  { path: "/signup/interviewer", element: <InterviewerSignupPage /> },
  { path: "/login/interviewer", element: <InterviewerLoginPage /> },
  { path: "/comapany/request-interview", element: <CompanyRequestInterview /> },
  { path: "/profile/candidate", element: <CandidateDashboard /> },
  { path: "/profile/interviewer", element: <InterviewerDashboard /> },
  { path: "/video-call", element: <VideoCall /> },
  { path: "/room/:roomid", element: <Room /> },
  { path: "/candidate-report", element: <CandidateReport /> },
  { path: "/*", element: <NotFound /> },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
);
