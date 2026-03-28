import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useRouter } from '@tanstack/react-router'
import { LayoutDashboard, Users, GraduationCap, User, FileText, LogOut } from 'lucide-react'
import logo from '../../assets/logo.png'

export const Route = {
    component: AdminRootLayout,
}

export function AdminRootLayout() {
    const router = useRouter()
    const currentPath = router.state.location.pathname
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const isAuthPage = currentPath === '/admin/login' || currentPath === '/admin/signup'

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logging out...')
        // Navigate to login page
        router.navigate({ to: '/admin/login' })
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

    const navItems = [
        { path: '/admin/adminDashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/adminstud', label: 'Students', icon: GraduationCap },
        { path: '/admin/adminstaff', label: 'Staff', icon: Users },
        { path: '/admin/requestApproval', label: 'Requests', icon: FileText },
    ]

    return (
        <div className="admin-root-layout">
            {/* Admin Navbar - only show on non-auth pages */}
            {!isAuthPage && (
                <nav className="admin-navbar">
                    <div className="admin-nav-brand">
                        <img src={logo} alt="logo" className="admin-nav-logo" />
                        <span>Admin Portal</span>
                    </div>
                    <div className="admin-nav-links">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = currentPath === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`admin-nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="admin-nav-profile" ref={dropdownRef}>
                        <button 
                            className="admin-profile-btn" 
                            title="Profile"
                            onClick={toggleProfileDropdown}
                        >
                            <User size={20} />
                        </button>
                        
                        {isProfileDropdownOpen && (
                            <div className="profile-dropdown">
                                {/* Section 1: Profile Info */}
                                <div className="profile-dropdown-header">
                                    <div className="profile-avatar">
                                        <User size={32} />
                                    </div>
                                    <div className="profile-info">
                                        <span className="profile-name">Admin User</span>
                                        <span className="profile-role">Administrator</span>
                                    </div>
                                </div>
                                
                                <div className="profile-dropdown-divider" />
                                
                                {/* Section 2: Actions */}
                                <div className="profile-dropdown-actions">
                                    <Link to="/admin/profile" className="profile-dropdown-item">
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
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}