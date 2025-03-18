import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes, studentRoutes, teacherRoutes } from './routes'

const routes = [...publicRoutes, ...studentRoutes, ...teacherRoutes]

const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
