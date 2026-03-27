
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/staff-signup')({
  component: StaffSignup,
})

function StaffSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSignup = () => {
    e.preventDefault()
    console.log('Staff signup:', form)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Staff Signup</h2>

        <input
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  )
}