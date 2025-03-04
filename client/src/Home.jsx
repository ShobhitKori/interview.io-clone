import './index.css'
import Navbar from './components/InterviewNavbar.jsx'
import Selector from './components/InterviewSelector.jsx'
import ProfileSelector from './components/ProfileSelector.jsx'
import Marketing from './components/Marketing.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import CompanyTypeSection from './components/CompanyTypesection.jsx'
import SolutionSection from './components/SolutionSection.jsx'
import FAQSection from './components/FAQSection.jsx'
import Footer from './components/Footer.jsx'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <div className='pt-[120px]'>
        <Selector></Selector>
      </div>
      <br></br>
      <ProfileSelector></ProfileSelector>
      <br></br>
      <Marketing></Marketing>
      <br></br>
      <HowItWorks></HowItWorks>
      <br></br>
      <CompanyTypeSection></CompanyTypeSection>
      <br></br>
      <div className="bg-customLight">
        <SolutionSection></SolutionSection>
      </div>
      <br></br>
      <FAQSection></FAQSection>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Home;
