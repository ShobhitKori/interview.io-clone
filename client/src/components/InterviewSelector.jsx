import React, { useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'

const options = [
  {
    id: 'organisations',
    title: 'For Organisations',
    subtitle: 'Outsource your interviews to us',
  },
  {
    id: 'candidates',
    title: 'For Candidates',
    subtitle: 'Practice with top tech experts',
    href: '/mock-interviews?selectProfile=true',
  },
]

const Selector = () => {
  const [selected, setSelected] = useState('organisations')

  const optionStyle = (isSelected) => ({ 
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    background: isSelected ? 'black' : 'transparent',
    color: isSelected ? 'white' : '#4a5568',
  })

  return (
    <div  className="flex w-1/2 mx-auto rounded-full p-1 bg-white shadow-md z-20 relative">
      {options.map((option) => (
        <div
          key={option.id}
          style={optionStyle(selected === option.id)}
          onClick={() => setSelected(option.id)}
        >
          <div className='flex center'>
            {selected === option.id ? (
              <CheckCircle2 size={17} style={{ marginRight: '8px' }} />
            ) : (
              <Circle size={17} style={{ marginRight: '8px' }} />
            )}
            <div>
              <div className='flex items-center text-sm font-medium'>
                <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>For&nbsp;</span>
                <span>{option.title.split(' ')[1]}</span>
              </div>
              <div sclassName= 'text-xs opacity-80'>{option.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Selector