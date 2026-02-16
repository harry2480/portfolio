'use client'

import React, { useState } from 'react'

const Floor05: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto h-full flex flex-col justify-center">
        <div className="border-2 border-white p-2 relative">
          {/* Ticket Design Shape */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full border-r-2 border-white" />
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full border-l-2 border-white" />
          
          <div className="border border-white/20 p-8 lg:p-12 bg-[#101010]">
            <h2 className="font-bebas text-6xl mb-2 text-brand-accent">RECEPTION</h2>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black border border-white/30 p-3 text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                placeholder="NAME"
                required
              />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-white/30 p-3 text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                placeholder="EMAIL"
                required
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black border border-white/30 p-3 text-white font-sans focus:outline-none focus:border-white/60 transition-colors resize-none"
                placeholder="MESSAGE"
                required
              />
              <button 
                type="submit"
                className="w-full bg-white text-black font-bebas text-xl py-4 hover:bg-brand-accent hover:text-white transition-colors cursor-pointer"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Floor05
