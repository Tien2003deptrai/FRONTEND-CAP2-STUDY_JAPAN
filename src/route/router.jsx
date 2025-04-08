import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { practiceRoutes, publicRoutes, studentRoutes, teacherRoutes } from './routes'

const routes = [...publicRoutes, ...studentRoutes, ...teacherRoutes,...practiceRoutes]

const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
