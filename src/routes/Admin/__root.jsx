import { Outlet, Link, useRouter } from '@tanstack/react-router'
import { LayoutDashboard, Users, GraduationCap } from 'lucide-react'
import logo from '../../assets/logo.png'

export const Route = {
    component: AdminRootLayout,
}

export function AdminRootLayout() {
    const router = useRouter()
    const currentPath = router.state.location.pathname

    const navItems = [
        { path: '/admin/adminDashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/adminstud', label: 'Students', icon: GraduationCap },
        { path: '/admin/adminstaff', label: 'Staff', icon: Users },
    ]

    return (
        <div className="admin-root-layout">
            {/* Admin Navbar */}
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
                <div className="admin-nav-profile">
                    <span>Admin</span>
                </div>
            </nav>
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}