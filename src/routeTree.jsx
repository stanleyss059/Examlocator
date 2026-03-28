import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from '@tanstack/react-router'

import ProfilePage from './components/ProfilePage'

// Layouts
import { RootLayout } from './routes/__root'
import { StudRootLayout } from './routes/Student/__root'
import { StaffRootLayout } from './routes/Staff/__root'
import { AdminRootLayout } from './routes/Admin/__root'

// Pages
import { StudIndexPage } from './routes/Student/index'
import { StudDashboardPage } from './routes/Student/dashboard'
import { StudSignupPage } from './routes/Student/signUp'

import { StaffdashboardPage } from './routes/Staff/staffDashboard'
import { AssignNewExamPage } from './routes/Staff/assignNewExam'
import { EditExamPage } from './routes/Staff/editExam'
import { StaffloginPage } from './routes/Staff/staffLogin'
import StaffSignup from './routes/Staff/staffSignup'

import { AdminDashboardPage } from './routes/Admin/adminDashboard'
import { AdminStudPage } from './routes/Admin/adminstud' 
import { AdminStaffPage } from './routes/Admin/adminstaff'
import { RequestApprovalPage } from './routes/Admin/requestApproval'
import AdminLogin from './routes/Admin/adminLogin'
import AdminSignup from './routes/Admin/adminSignup'



// ---------------------
// ROOT ROUTE
// ----------------------
const rootRoute = new RootRoute({
  component: RootLayout,
})

// ----------------------
// ROOT INDEX REDIRECT
// ----------------------
// "/" → "/student"
const rootRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/student" replace />,
})

// ----------------------
// STUDENT ROUTES
// ----------------------

// Parent (/student)
const studRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/student',
  component: StudRootLayout,
})

// Parent (/Staff)
const staffRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/staff',
  component: StaffRootLayout,
})

// Parent (/Admin)
const adminRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminRootLayout,
})

// "/student" → "/student/login"
const studRedirectRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: '/',
  component: () => <Navigate to="login" replace />,
})
// "/staff" → "/staff/login"
const staffRedirectRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: '/',
  component: () => <Navigate to="/staff/login" replace />,
})

// "/staff/signup" → "/staff/signup"
const staffSignupRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'signup',
  component: StaffSignup,
})

// "/staff/login" → "/staff/login"
const staffLoginRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'login',
  component: StaffloginPage,
})

// "/admin" → "/admin/login"
const adminRedirectRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: '/',
  component: () => <Navigate to="/admin/login" replace />,
})

// "/student/login"
const studLoginRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'login',
  component: StudIndexPage,
})

// "/staff/staffDashboard"
const staffdashboardRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'staffdashboard',
  component: StaffdashboardPage,
})

// "/staff/assignNewExam"
const assignNewExamRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'assignNewExam',
  component: AssignNewExamPage,
})

// "/staff/editExam"
const editExamRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'editExam',
  component: EditExamPage,
})

// "/admin/adminDashboard"
const adminDashboardRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'adminDashboard',
  component: AdminDashboardPage,
})

// "/admin/adminstud"
const adminStudRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'adminstud',
  component: AdminStudPage,
})

// "/admin/adminstaff"
const adminStaffRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'adminstaff',
  component: AdminStaffPage,
})

// "/admin/requestApproval"
const requestApprovalRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'requestApproval',
  component: RequestApprovalPage,
})

// // "/staff/adminManageUsers"
// const adminManageUsersRoute = new Route({
//   getParentRoute: () => staffRootRoute,
//   path: 'adminManageUsers',
//   component: AdminManageUsersPage,
// })

const studDashboardRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'dashboard',
  component: StudDashboardPage,
})

const studSignupRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'signup',
  component: StudSignupPage,
})

const studProfileRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'profile',
  component: ProfilePage,
})

const staffProfileRoute = new Route({
  getParentRoute: () => staffRootRoute,
  path: 'profile',
  component: ProfilePage,
})

const adminProfileRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'profile',
  component: ProfilePage,
})

const adminLoginRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'login',
  component: AdminLogin,
})

const adminSignupRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: 'signup',
  component: AdminSignup,
})

// ----------------------
// ROUTE TREE
// ----------------------
export const routeTree = rootRoute.addChildren([
  rootRedirectRoute,
  
  studRootRoute.addChildren([
    studRedirectRoute,
    studLoginRoute,
    studDashboardRoute,
    studSignupRoute,
    studProfileRoute,
  ]),
  staffRootRoute.addChildren([
    staffRedirectRoute,
    staffdashboardRoute,
    assignNewExamRoute,
    editExamRoute,
    staffProfileRoute,
    staffSignupRoute,
    staffLoginRoute,
  ]),
  adminRootRoute.addChildren([
    adminRedirectRoute,
    adminDashboardRoute,
    adminStudRoute,
    adminStaffRoute,
    requestApprovalRoute,
    adminProfileRoute,
    adminLoginRoute,
    adminSignupRoute,
  ])
])

// ----------------------
// ROUTER
// ----------------------
export const router = new Router({
  routeTree,
})

export function AppRouter() {
  return <RouterProvider router={router} />
}