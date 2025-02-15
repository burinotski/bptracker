import { FirstAid, Plus, Clock, Calendar } from "phosphor-react";

function Medications() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-2xl font-light mb-6 text-gray-100 flex items-center gap-2">
          <FirstAid size={24} className="text-blue-400" />
          Medication Tracker
        </h2>

        {/* Add Medication Form */}
        <div className="mb-8">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Medication name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                         text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                            text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  Frequency
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                            text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Daily</option>
                  <option>Twice daily</option>
                  <option>Weekly</option>
                  <option>As needed</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500/90 backdrop-blur-sm text-white font-medium py-3 px-4 
                         rounded-lg transition-all duration-200 
                         hover:bg-blue-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20
                         flex items-center justify-center gap-2
                         border border-blue-400/20"
            >
              <Plus size={20} weight="bold" />
              Add Medication
            </button>
          </form>
        </div>

        {/* Medications List */}
        <div className="space-y-4">
          <h3 className="text-xl font-light text-gray-100">Current Medications</h3>
          {/* Add your medications list here */}
        </div>
      </div>
    </div>
  )
}

export default Medications;