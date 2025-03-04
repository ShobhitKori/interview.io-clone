'use client'

import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('requested')
  const [activeBlogSlide, setActiveBlogSlide] = useState(0)
  const [activeQuestionSlide, setActiveQuestionSlide] = useState(0)

  const tabs = [
    { id: 'requested', label: 'Requested' },
    { id: 'completed', label: 'Completed' },
    { id: 'badges', label: 'My Badges' },
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'What is full-stack Development',
      description: 'Explore Full Stack Development: Covering Design, Creation, Testing, and Deployment of Web Applications, Including Databases, Front-End & Back-End Development.',
      image: '/placeholder.svg?height=200&width=300',
    },
    // Add more blog posts here
  ]

  const interviewQuestions = [
    {
      id: 1,
      title: 'Advanced Swift Interview Questions',
      description: 'Essential Swift interview questions to effectively assess experienced candidates.',
      image: '/placeholder.svg?height=200&width=300',
    },
    // Add more questions here
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex bg-black text-white font-bold justify-between items-center px-4">
        <div 
            className="h-8 w-32 mb-4 bg-no-repeat bg-contain mt-3 ml-2" 
            style={{backgroundImage: "url(https://uploads-ssl.webflow.com/608e9cc36cbcc089f0998643/648175fc7332de3fb931061a_intervue.svg)"}}
            aria-label="Intervue"
          />
        <div className="flex items-center gap-4">
          <button className="mr-3">Contact us</button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              U
            </div>
            <span className="">User</span>
            <ChevronDown size={20} className='mr-3' />
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
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                  <img 
                    src="/placeholder.svg?height=48&width=48" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Hi, User</h1>
                  <p className="text-gray-600">
                    Welcome to your mock interviews dashboard, here you will find the scheduled interviews
                    along with detailed history of the ones you have completed
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Request Interview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b mb-8">
              <div className="flex gap-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 relative ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
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

            {/* Empty State */}
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">😕</span>
              </div>
              <h2 className="text-xl font-semibold mb-4">You have no upcoming interviews</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mx-auto">
                Request Interview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
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
                        index === activeBlogSlide ? 'block' : 'hidden'
                      }`}
                    >
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h4 className="font-semibold mb-2">{post.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        Read more
                      </a>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setActiveBlogSlide(prev => Math.max(0, prev - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveBlogSlide(prev => Math.min(blogPosts.length - 1, prev + 1))}
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
                        index === activeBlogSlide ? 'bg-blue-600' : 'bg-gray-300'
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
                      src="/placeholder.svg?height=40&width=40" 
                      alt="Resume icon"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Angular Developer Resume</h4>
                    <p className="text-gray-600 text-sm">
                      Wondering how to compose an Angular developer resume that stands out in the competitive market?
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}