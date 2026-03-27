import { Outlet, Link } from '@tanstack/react-router'
import logo from '../../assets/logo.png'
import { useRouter } from '@tanstack/react-router'
import { User } from 'lucide-react'

export const Route = {
    component: StudRootLayout,
}

export function StudRootLayout() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;

    const isAuthPage = currentPath === '/student/login' || currentPath === '/student/signup'

    return (
        <div className="stud-root">
            <nav className="student-navbar">
                <div className="student-nav-brand">
                    <img src={logo} alt="logo" className="student-nav-logo" />
                </div>
                {!isAuthPage && (
                    <Link to="/student/profile" className="student-profile-btn" title="Profile">
                        <User size={20} />
                    </Link>
                )}
            </nav>
            <div className="student-content">
                <Outlet />
            </div>
        </div>
    )
}