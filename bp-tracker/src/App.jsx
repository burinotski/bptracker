import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Medications from './components/Medications';
import { useState, useEffect } from 'react'
import BPInput from './components/BPInput'
import BPChart from './components/BPChart'
import { getBPClassification } from './utils/bpClassification'
import { 
  Heart, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  ChartLine, 
  Trash,
  FirstAid,
  Gear,
  Plus,
  List,
  X
} from "phosphor-react";


function App() {
  // Initialize state from localStorage if exists, otherwise empty array
  const [readings, setReadings] = useState(() => {
    const savedReadings = localStorage.getItem('bpReadings')
    return savedReadings ? JSON.parse(savedReadings) : []
  });

  // Save to localStorage whenever readings change
  useEffect(() => {
    localStorage.setItem('bpReadings', JSON.stringify(readings))
  }, [readings]);

  const addReading = (systolic, diastolic, datetime) => {
    const newReading = {
      id: Date.now(),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      timestamp: new Date(datetime).toISOString(),
    };
    
    const updatedReadings = [...readings, newReading].sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    setReadings(updatedReadings);
  };

  const deleteReading = (readingId) => {
    setReadings(readings.filter(reading => reading.id !== readingId));
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 text-center">
            <Heart size={32} className="text-red-500 mx-auto mb-4" weight="fill" />
            <h1 className="text-5xl font-light tracking-tight text-gray-100 mb-3">
              Vida La Conza
            </h1>
            <p className="text-lg font-light text-gray-400 tracking-widest uppercase">
              Blood Pressure Tracker <span className="text-blue-400">v0.1</span>
            </p>
          </div>
        </header>

        <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
  <div className="max-w-7xl mx-auto px-4">


    {/* Mobile menu button */}
<div className="flex items-center justify-between md:hidden py-3">
  <div className="flex items-center">
    <Heart size={24} className="text-red-500" weight="fill" />
    {/* Only show the title when menu is open */}
    {isMenuOpen && (
      <span className="ml-2 text-gray-100 font-medium">Vida La Conza</span>
    )}
  </div>
  <button 
    onClick={() => setIsMenuOpen(!isMenuOpen)} 
    className="text-gray-400 hover:text-gray-100"
  >
    {isMenuOpen ? (
      <X size={24} weight="bold" />
    ) : (
      <List size={24} weight="bold" />
    )}
  </button>
</div>

    {/* Mobile menu */}
    <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => `
            ${isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}
            block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
          `}
          onClick={() => setIsMenuOpen(false)}
        >
          <Heart size={20} />
          BP Tracker
        </NavLink>

        <NavLink 
          to="/medications" 
          className={({ isActive }) => `
            ${isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}
            block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
          `}
          onClick={() => setIsMenuOpen(false)}
        >
          <FirstAid size={20} />
          Medications
        </NavLink>

        <NavLink 
          to="/trends" 
          className={({ isActive }) => `
            ${isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}
            block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
          `}
          onClick={() => setIsMenuOpen(false)}
        >
          <ChartLine size={20} />
          Trends
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `
            ${isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}
            block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
          `}
          onClick={() => setIsMenuOpen(false)}
        >
          <Gear size={20} />
          Settings
        </NavLink>
      </div>
    </div>

    {/* Desktop menu */}
    <div className="hidden md:flex items-center justify-center space-x-8">
      <NavLink to="/" className={({ isActive }) => `
        px-3 py-4 text-sm font-medium flex items-center gap-2
        transition-colors duration-200
        ${isActive 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-400 hover:text-gray-100'}
      `}>
        <Heart size={20} />
        BP Tracker
      </NavLink>

      <NavLink to="/medications" className={({ isActive }) => `
        px-3 py-4 text-sm font-medium flex items-center gap-2
        transition-colors duration-200
        ${isActive 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-400 hover:text-gray-100'}
      `}>
        <FirstAid size={20} />
        Medications
      </NavLink>

      <NavLink to="/trends" className={({ isActive }) => `
        px-3 py-4 text-sm font-medium flex items-center gap-2
        transition-colors duration-200
        ${isActive 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-400 hover:text-gray-100'}
      `}>
        <ChartLine size={20} />
        Trends
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => `
        px-3 py-4 text-sm font-medium flex items-center gap-2
        transition-colors duration-200
        ${isActive 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-400 hover:text-gray-100'}
      `}>
        <Gear size={20} />
        Settings
      </NavLink>
    </div>
  </div>
</nav>

        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto py-8 px-4">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-light mb-6 text-gray-100">Add New Reading</h2>
                  <BPInput onSubmit={addReading} />
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-light mb-4 text-gray-100">Recent Readings</h3>
                    <div className="space-y-3">
                      {readings.slice().reverse().map(reading => {
                        const classification = getBPClassification(reading.systolic, reading.diastolic);
                        return (
                          <div key={reading.id} 
                               className="flex items-center justify-between p-4 rounded-lg bg-gray-800/80 backdrop-blur-sm transition-all duration-200 hover:bg-gray-800"
                               style={{ borderLeftWidth: '3px', borderLeftColor: classification.color }}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="font-light text-xl text-gray-100">
                                  {reading.systolic}/{reading.diastolic}
                                </span>
                                <span className="text-sm px-3 py-1 rounded-full font-medium"
                                      style={{ backgroundColor: classification.color + '15', color: classification.color }}>
                                  {classification.label}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400 flex items-center gap-2 font-light">
                                <span>{new Date(reading.timestamp).toLocaleString('en-PH')}</span>
                                <span>•</span>
                                <span className="italic">{classification.description}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteReading(reading.id)}
                              className="text-gray-500 hover:text-red-400 transition-all duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-light mb-6 text-gray-100 flex items-center gap-2">
                    <ChartLine size={24} className="text-blue-400" />
                    BP Trends
                  </h2>
                  <BPChart readings={readings} />
                </div>
              </div>
            </main>
          } />
          
          <Route path="/medications" element={<Medications />} />

<Route path="/trends" element={
  <div className="max-w-7xl mx-auto py-8 px-4">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-light mb-6 text-gray-100 flex items-center gap-2">
        <ChartLine size={24} className="text-blue-400" />
        Trends
      </h2>
      <p className="text-gray-400">Trends page coming soon!</p>
    </div>
  </div>
} />

<Route path="/settings" element={
  <div className="max-w-7xl mx-auto py-8 px-4">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-light mb-6 text-gray-100 flex items-center gap-2">
        <Gear size={24} className="text-blue-400" />
        Settings
      </h2>
      <p className="text-gray-400">Settings page coming soon!</p>
    </div>
  </div>
} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App