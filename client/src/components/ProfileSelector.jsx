// import React from 'react'
// import { Search, X, ArrowRight } from 'lucide-react'

// const profiles = [
//   { id: 'frontend', name: 'Frontend', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/frontend.svg' },
//   { id: 'backend', name: 'Backend', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/backend.svg' },
//   { id: 'fullstack', name: 'Full Stack', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/fullstack.svg' },
//   { id: 'android', name: 'Android', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/android.svg' },
//   { id: 'datascience', name: 'Data Science', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-science.svg' },
//   { id: 'automationqa', name: 'Automation QA', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sdet.svg' },
//   { id: 'mlai', name: 'ML/AI', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ml-ai.svg' },
//   { id: 'flutter', name: 'Flutter', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/flutter.svg' },
//   { id: 'reactnative', name: 'React Native', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/react.svg' },
//   { id: 'aem', name: 'AEM', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/adobe-aem.svg' },
//   { id: 'businessintelligence', name: 'Business Intelligence', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/business-intelligence.svg' },
//   { id: 'dataengineering', name: 'Data Engineering', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-engineering.svg' },
//   { id: 'databaseadmin', name: 'Database administrator', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/database.svg' },
//   { id: 'drupal', name: 'Drupal developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/drupal.svg' },
//   { id: 'microsoftbusiness', name: 'Microsoft Business Apps', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/microsoft-business-app.svg' },
//   { id: 'projectmanager', name: 'Project Manager', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/project-manager.svg' },
//   { id: 'sap', name: 'SAP', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sap.svg' },
//   { id: 'salesforce', name: 'Salesforce developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/salesforce.svg' },
//   { id: 'scrummaster', name: 'Scrum Master', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/scrum.svg'},
//   { id: 'servicenow', name: 'ServiceNow Developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/service-now.svg' },
//   { id: 'sharepoint', name: 'Share Point', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sharepoint.svg' },
//   { id: 'siterelibilityengineer', name: 'Site Reliability Engineer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/site-reliability.svg' },
//   { id: 'ios', name: 'iOS', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ios.svg' },
// ]

// const Hero = () => {
//   return (
//     <div className="relative bg-white p-8 max-w-6xl mx-auto">
//       {/* <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
//         <X size={24} />
//       </button> */}
      
//       <div className="text-center mb-8">
//         <h1 className="text-4xl text-gray-900 mb-2">
//           Save your engineering <span className="font-bold">bandwidth</span>
//         </h1>
//         <p className="text-xl text-gray-600">
//           Outsource your interviews in just 2 simple steps
//         </p>
//       </div>

//       <div className="mb-12">
//         <div className="relative max-w-2xl mx-auto">
//           <input
//             type="text"
//             className="w-full py-3 pl-12 pr-4 text-gray-900 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//             placeholder="Search profile"
//           />
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-6 w-6 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-8 mb-12">
//         {profiles.map((profile) => (
//           <div key={profile.id} className="flex flex-col items-center cursor-pointer">
//             <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
//               <img src={profile.icon} alt={profile.name} className="w-8 h-8" />
//             </div>
//             <span className="text-sm text-center text-gray-600">{profile.name}</span>
//           </div>
//         ))}
//       </div>

//       <div className="text-center">
//         <button className="px-8 py-3 bg-black text-white rounded-full text-lg font-medium transition-colors duration-300">
//           Request now
//           <ArrowRight className="inline-block ml-2" size={20} />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Hero

'use client'

import { useState } from 'react'
import { Search, ArrowRight, Plus, X, Monitor, Layers } from 'lucide-react'

const profiles = [
  { id: 'frontend', name: 'Frontend', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/frontend.svg' },
  { id: 'backend', name: 'Backend', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/backend.svg' },
  { id: 'fullstack', name: 'Full Stack', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/fullstack.svg' },
  { id: 'android', name: 'Android', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/android.svg' },
  { id: 'datascience', name: 'Data Science', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-science.svg' },
  { id: 'automationqa', name: 'Automation QA', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sdet.svg' },
  { id: 'mlai', name: 'ML/AI', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ml-ai.svg' },
  { id: 'flutter', name: 'Flutter', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/flutter.svg' },
  { id: 'reactnative', name: 'React Native', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/react.svg' },
  { id: 'aem', name: 'AEM', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/adobe-aem.svg' },
  { id: 'businessintelligence', name: 'Business Intelligence', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/business-intelligence.svg' },
  { id: 'dataengineering', name: 'Data Engineering', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/data-engineering.svg' },
  { id: 'databaseadmin', name: 'Database administrator', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/database.svg' },
  { id: 'drupal', name: 'Drupal developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/drupal.svg' },
  { id: 'microsoftbusiness', name: 'Microsoft Business Apps', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/microsoft-business-app.svg' },
  { id: 'projectmanager', name: 'Project Manager', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/project-manager.svg' },
  { id: 'sap', name: 'SAP', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sap.svg' },
  { id: 'salesforce', name: 'Salesforce developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/salesforce.svg' },
  { id: 'scrummaster', name: 'Scrum Master', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/scrum.svg'},
  { id: 'servicenow', name: 'ServiceNow Developer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/service-now.svg' },
  { id: 'sharepoint', name: 'Share Point', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/sharepoint.svg' },
  { id: 'siterelibilityengineer', name: 'Site Reliability Engineer', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/site-reliability.svg' },
  { id: 'ios', name: 'iOS', icon: 'https://dersyb7nfifdf.cloudfront.net/dev/32/homepage-icons/ios.svg' },
]

function ProfileSelector() {
  const [selectedType, setSelectedType] = useState('organisations')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllProfiles, setShowAllProfiles] = useState(false)

  const initialCategories = [
    { id: 'frontend', label: 'Frontend', icon: profiles[0].icon },
    { id: 'backend', label: 'Backend', icon: profiles[1].icon },
    { id: 'fullstack', label: 'Full Stack', icon: profiles[2].icon  },
    { id: 'android', label: 'Android', icon: profiles[3].icon  },
  ]

  const allCategories = [
    // Row 1
    { id: 'frontend', label: 'Frontend', icon: profiles[0].icon },
    { id: 'backend', label: 'Backend', icon: profiles[1].icon },
    { id: 'fullstack', label: 'Full Stack', icon: profiles[2].icon  },
    { id: 'android', label: 'Android', icon: profiles[3].icon  },
    { id: 'datascience', label: 'Data Science', icon: profiles[4].icon },
    // Row 2
    { id: 'automationqa', label: 'Automation QA', icon: profiles[5].icon },
    { id: 'mlai', label: 'ML/AI', icon: profiles[6].icon },
    { id: 'flutter', label: 'Flutter', icon: profiles[7].icon },
    { id: 'reactnative', label: 'React Native', icon: profiles[8].icon },
    { id: 'aem', label: 'AEM', icon: profiles[9].icon },
    // Row 3
    { id: 'bi', label: 'Business Intelligence', icon: profiles[10].icon },
    { id: 'dataeng', label: 'Data Engineering', icon: profiles[11].icon },
    { id: 'dba', label: 'Database administrator', icon: profiles[12].icon },
    { id: 'drupal', label: 'Drupal developer', icon: profiles[13].icon },
    { id: 'msapps', label: 'Microsoft Business Apps', icon: profiles[14].icon },
    // Row 4
    { id: 'pm', label: 'Project Manager', icon: profiles[15].icon },
    { id: 'sap', label: 'SAP', icon: profiles[16].icon },
    { id: 'salesforce', label: 'Salesforce developer', icon: profiles[17].icon },
    { id: 'scrum', label: 'Scrum Master', icon: profiles[18].icon },
    { id: 'servicenow', label: 'ServiceNow Developer', icon: profiles[19].icon },
    // Row 5
    { id: 'sharepoint', label: 'SharePoint', icon: profiles[20].icon },
    { id: 'sre', label: 'Site reliability engineer', icon: profiles[21].icon },
    { id: 'ios', label: 'iOS', icon: profiles[22].icon },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
      {/* Profile Type Toggle */}
      {/* <div className="inline-flex p-1 bg-black rounded-full mb-12">
        <button
          onClick={() => setSelectedType('organisations')}
          className={`flex items-center px-6 py-3 rounded-full text-sm transition-colors ${
            selectedType === 'organisations'
              ? 'bg-white text-black'
              : 'text-white hover:text-gray-200'
          }`}
        >
          <span className="mr-2">✓</span>
          For Organisations
          <span className="text-xs ml-2 opacity-60">Outsource your interviews to us</span>
        </button>
        <button
          onClick={() => setSelectedType('candidates')}
          className={`flex items-center px-6 py-3 rounded-full text-sm transition-colors ${
            selectedType === 'candidates'
              ? 'bg-white text-black'
              : 'text-white hover:text-gray-200'
          }`}
        >
          For Candidates
          <span className="text-xs ml-2 opacity-60">Practice with top tech experts</span>
        </button>
      </div> */}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl  mb-3">
          Save your engineering <span className="font-bold">bandwidth</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Outsource your interviews in just 2 simple steps
        </p>

        {/* Search Input */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search profile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-12 py-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Initial Category Icons */}
        {!showAllProfiles && (
          <div className="flex justify-center gap-12 mb-12">
            {initialCategories.map(({ id, label, icon }) => (
              <button
                key={id}
                className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={icon}></img>
                </div>
                <span className="text-sm">{label}</span>
              </button>
            ))}
            <button
              onClick={() => setShowAllProfiles(true)}
              className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm">view all</span>
            </button>
          </div>
        )}

        {/* Request Button */}
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
          Request now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* All Profiles Modal */}
      {showAllProfiles && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="justify-center mb-8">
              <h1 className="text-4xl  mb-3">
                Save your engineering <span className="font-bold">bandwidth</span>
              </h1>
              <p className="text-gray-600 mb-8">
                Outsource your interviews in just 2 simple steps
              </p>
              <button
                onClick={() => setShowAllProfiles(false)}
                className="absolute top-10 right-20 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative mb-12 w-1/2 mx-auto place-items-center">
              <input
                type="text"
                placeholder="Search profile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-4 bg-gray-100 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 w-1/2 mx-auto place-items-center">
              {allCategories.map(({ id, label, icon}) => (
                <button
                  key={id}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                    <img src={icon} className="w-12 h-12 text-gray-600" />
                  </div>
                  <span className="text-sm text-center text-gray-700">{label}</span>
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
          Request now
          <ArrowRight className="w-4 h-4" />
        </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSelector