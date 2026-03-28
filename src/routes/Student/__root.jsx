import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useRouter } from '@tanstack/react-router'
import logo from '../../assets/logo.png'
import { User, LogOut } from 'lucide-react'

export const Route = {
    component: StudRootLayout,
}

export function StudRootLayout() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const isAuthPage = currentPath === '/student/login' || currentPath === '/student/signup'

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }

    const handleLogout = () => {
        console.log('Logging out...')
        router.navigate({ to: '/student/login' })
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="stud-root">
            {!isAuthPage && (
                <nav className="student-navbar">
                    <div className="student-nav-brand">
                        <img src={logo} alt="logo" className="student-nav-logo" />
                    </div>
                    <div className="student-nav-profile" ref={dropdownRef}>
                        <button 
                            className="student-profile-btn" 
                            title="Profile"
                            onClick={toggleProfileDropdown}
                        >
                            <User size={20} />
                        </button>
                        
                        {isProfileDropdownOpen && (
                            <div className="profile-dropdown">
                                {/* Section 1: Profile Info */}
                                <div className="profile-dropdown-header student-header">
                                    <div className="profile-avatar">
                                        <User size={32} />
                                    </div>
                                    <div className="profile-info">
                                        <span className="profile-name">Student User</span>
                                        <span className="profile-role">Student</span>
                                    </div>
                                </div>
                                
                                <div className="profile-dropdown-divider" />
                                
                                {/* Section 2: Actions */}
                                <div className="profile-dropdown-actions">
                                    <Link to="/student/profile" className="profile-dropdown-item">
                                        <User size={16} />
                                        <span>View Profile</span>
                                    </Link>
                                    <button className="profile-dropdown-item logout" onClick={handleLogout}>
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            )}
            <div className="student-content">
                <Outlet />
            </div>
        </div>
    )
}