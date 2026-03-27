import { Outlet, Link } from '@tanstack/react-router'
import logo from '../../assets/logo.png'
import { useRouter } from '@tanstack/react-router'
import { User } from 'lucide-react'

export const Route = {
    component: StaffRootLayout,
}

export function StaffRootLayout() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;

    const isAuthPage = currentPath === '/staff/login'

    return (
        <div className="staff-root">
            <nav className="staff-navbar">
                <div className="staff-nav-brand">
                    <img src={logo} alt="logo" className="staff-nav-logo" />
                </div>
                {!isAuthPage && (
                    <Link to="/staff/profile" className="staff-profile-btn" title="Profile">
                        <User size={20} />
                    </Link>
                )}
            </nav>
            <div className="staff-content">
                <Outlet />
            </div>
        </div>
    )
}