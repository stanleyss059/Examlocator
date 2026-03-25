import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from '@tanstack/react-router'

// Layouts
import { RootLayout } from './routes/__root'
import { StudRootLayout } from './routes/Student/__root'

// Pages
import { StudIndexPage } from './routes/Student/index'
import { StudDashboardPage } from './routes/Student/dashboard'
import { StudSignupPage } from './routes/Student/signUp'

// ----------------------
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

// "/student" → "/student/login"
const studRedirectRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: '/',
  component: () => <Navigate to="login" replace />,
})

// "/student/login"
const studLoginRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'login',
  component: StudIndexPage,
})

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