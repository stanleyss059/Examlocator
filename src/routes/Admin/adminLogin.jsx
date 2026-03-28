// routes/auth/admin-login.tsx
import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import logo from '../../assets/logo.png'

export const Route = {
  component: AdminLogin,
}

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      console.log('Admin login:', formData)
      // TODO: Connect to backend authentication
      // Simulate successful login
      setTimeout(() => {
        router.navigate({ to: '/admin/adminDashboard' })
      }, 1000)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <img src={logo} alt="Logo" className="auth-logo" />
            <h1 className="auth-title">Admin Portal</h1>
            <p className="auth-subtitle">Sign in to your admin account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an admin account?{' '}
              <Link to="/admin/signup" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin