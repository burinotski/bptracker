import { useState, useEffect } from 'react'
import { Clock, ArrowUp, ArrowDown, Plus } from "phosphor-react"
import { getBPClassification } from '../utils/bpClassification'

function BPInput({ onSubmit }) {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  // Add this initialization for datetime
  const [datetime, setDatetime] = useState(() => {
    const now = new Date()
    // Format to YYYY-MM-DDThh:mm
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  })
  const [classification, setClassification] = useState(null)

  useEffect(() => {
    if (systolic && diastolic) {
      setClassification(getBPClassification(parseInt(systolic), parseInt(diastolic)))
    } else {
      setClassification(null)
    }
  }, [systolic, diastolic])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(systolic, diastolic, datetime)
    setSystolic('')
    setDiastolic('')
    const now = new Date()
    setDatetime(now.toISOString().slice(0, 16))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
  <label className="block text-sm font-light text-gray-300 mb-2 flex items-center gap-2">
    <Clock size={16} className="text-gray-400" />
    Date and Time
  </label>
  <input
    type="datetime-local"
    value={datetime}
    onChange={(e) => setDatetime(e.target.value)}
    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
               text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 
               transition-all duration-200"
    required
  />
</div>

<div className="grid md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-light text-gray-300 mb-2 flex items-center gap-2">
      <ArrowUp size={16} className="text-gray-400" />
      Systolic (top number)
    </label>
    <input
      type="number"
      value={systolic}
      onChange={(e) => setSystolic(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                 text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 
                 transition-all duration-200"
      placeholder="120"
      required
      min="70"
      max="200"
    />
  </div>

  <div>
    <label className="block text-sm font-light text-gray-300 mb-2 flex items-center gap-2">
      <ArrowDown size={16} className="text-gray-400" />
      Diastolic (bottom number)
    </label>
    <input
      type="number"
      value={diastolic}
      onChange={(e) => setDiastolic(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                 text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 
                 transition-all duration-200"
      placeholder="80"
      required
      min="40"
      max="130"
    />
  </div>
</div>

<button
  type="submit"
  className="w-full bg-blue-500 text-white font-medium py-3 px-4 
             rounded-lg transition-all duration-200 
             hover:bg-blue-600 hover:scale-[1.02] 
             flex items-center justify-center gap-2"
>
  <Plus size={20} weight="bold" />
  Add Reading
</button>
    </form>
  )
}

export default BPInput