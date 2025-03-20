const AccessAccount = () => {
  return (
    <div className="container mx-auto px-4 py-12 pt-60">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Interviewer Card */}
        <div className="flex flex-col items-center text-center px-8">
          <div className="bg-[#FFE4BA] text-black rounded-full px-4 py-2 mb-6 inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="currentColor"
              />
              <path
                d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Earn & Grow 10x
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Become an <span className="font-bold">Interviewer</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Join our community of freelance interviewers at Intervue. Gain
            exposure beyond your workspace and exercise the power of your
            knowledge and freedom
          </p>
          <a href="/login/interviewer">
            <button className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition-colors">
              Login
            </button>
          </a>
        </div>

        {/* Companies Card */}
        <div className="flex flex-col items-center text-center px-8 pt-8 md:pt-0">
          <div className="bg-[#DCFFE7] text-black rounded-full px-4 py-2 mb-6 inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Save 90% of hiring bandwidth
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            For <span className="font-bold">Companies</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Conduct interviews asynchronously on Intervue's platform by vetted
            interviewers. A detailed report of the candidate's performance is
            available within 5 minutes
          </p>
          <a href="/login">
            <button className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition-colors">
              Login
            </button>
          </a>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Need help?</p>
            <a href="#" className="text-black font-semibold hover:underline">
              Contact Sales
            </a>
          </div>
        </div>

        {/* Candidates Card */}
        <div className="flex flex-col items-center text-center px-8 pt-8 md:pt-0">
          <div className="bg-[#E5EDFF] text-black rounded-full px-4 py-2 mb-6 inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Mock interviews
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            For <span className="font-bold">Candidates</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Get actionable feedback of your interview from industry experts and
            share it with <span className="font-semibold">400+</span> actively
            hiring brands
          </p>
          <a href="/login/candidate">
            <button className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition-colors">
              Login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessAccount;
