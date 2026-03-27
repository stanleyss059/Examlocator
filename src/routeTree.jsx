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
import { AdminManageUsersPage } from './routes/Staff/adminManageUsers'

import { AdminDashboardPage } from './routes/Admin/adminDashboard'
import { AdminStudPage } from './routes/Admin/adminstud' 
import { AdminStaffPage } from './routes/Admin/adminstaff'



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

studRootRoute.addChildren([
  studRedirectRoute,
  studLoginRoute,
  studDashboardRoute,
  studSignupRoute,
  studProfileRoute, 
])

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
  component: () => <Navigate to="login" replace />,
})

// "/admin" → "/admin/login"
const adminRedirectRoute = new Route({
  getParentRoute: () => adminRootRoute,
  path: '/',
  component: () => <Navigate to="login" replace />,
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
  ]),
  staffRootRoute.addChildren([
    staffRedirectRoute,
    staffdashboardRoute,
    assignNewExamRoute,
    editExamRoute,
  ]),
  adminRootRoute.addChildren([
    adminRedirectRoute,
    adminDashboardRoute,
    adminStudRoute,
    adminStaffRoute,
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

const studProfileRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'profile',
  component: ProfilePage,
})