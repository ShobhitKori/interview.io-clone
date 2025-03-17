"use client"

const LanguageSelector = ({ language, languages, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-300">
        Language:
      </label>
      <select
        id="language-select"
        value={language.name}
        onChange={(e) => {
          const selected = languages.find((lang) => lang.name === e.target.value)
          if (selected) onChange(selected)
        }}
        className="px-3 py-2 text-sm bg-[#343a40] border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector

