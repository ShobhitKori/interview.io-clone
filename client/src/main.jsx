import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import { RouterProvider,  createBrowserRouter } from 'react-router-dom'
import Login from './Login.jsx'
import CompanyLoginPage from './components/CompanyLogin.jsx'
import CandidateLoginPage from './components/CandidateLogin.jsx'
import CompanySignupPage from './components/CompanySignup.jsx'
import CandidateSignupPage from './components/CandidateSignup.jsx'
import CompanyRequestInterview from './components/CompanyRequestInterview.jsx'
import CandidateDashboard from './components/CandidateHomePage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/access-account", element: <Login /> },
  { path: "/login", element: <CompanyLoginPage /> },
  { path: "/signup", element: <CompanySignupPage /> },
  { path: "/login/candidate", element: <CandidateLoginPage /> },
  { path: "/signup/candidate", element: <CandidateSignupPage /> },
  { path: "/comapany/request-interview", element: <CompanyRequestInterview /> },
  { path: "/profile/interviews", element: <CandidateDashboard /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
