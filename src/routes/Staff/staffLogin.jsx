import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { User, Lock, Eye, EyeOff, LogIn, Briefcase } from 'lucide-react'
import logo from '../../assets/logo.png'

export const Route = {
    component: StaffloginPage,
}

export function StaffloginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }
        
        setIsLoading(true)
        
        try {
            console.log('Staff login:', formData)
            // TODO: Connect to backend authentication
            // Simulate successful login
            setTimeout(() => {
                router.navigate({ to: '/staff/staffdashboard' })
            }, 1000)
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="staff-auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {/* Header */}
                    <div className="auth-header staff-header">
                        <img src={logo} alt="Logo" className="auth-logo" />
                        <h1 className="auth-title">Staff Portal</h1>
                        <p className="auth-subtitle">Sign in to your staff account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">
                                <User size={16} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="staff@example.com"
                                required
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
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
                                    className={`form-input ${errors.password ? 'error' : ''}`}
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
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn staff-btn"
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
                            Need help? Contact your administrator
                        </p>
                        <div className="auth-links">
                            <Link to="/staff/signup" className="auth-link">
                                Create Account
                            </Link>
                            <span className="auth-link-separator">•</span>
                            <Link to="/staff/forgot-password" className="auth-link">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}