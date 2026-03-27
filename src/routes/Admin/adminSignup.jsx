// routes/auth/admin-signup.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/admin-signup')({
  component: AdminSignup,
})

function AdminSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSignup = (e) => {
    e.preventDefault()
    console.log('Admin signup:', form)

    // TODO: connect backend
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          Create Admin Account
        </button>
      </form>
    </div>
  )
}