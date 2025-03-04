import './index.css'
import Navbar from './components/InterviewNavbar.jsx'
import AccessAccount from './components/AccessAccount.jsx';
import Footer from './components/Footer.jsx'
import LoginMarketing from './components/LoginMarketing.jsx';

function Login() {
  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <AccessAccount></AccessAccount>
      <LoginMarketing></LoginMarketing>
      <Footer></Footer>
    </div>
  );
}

export default Login;
