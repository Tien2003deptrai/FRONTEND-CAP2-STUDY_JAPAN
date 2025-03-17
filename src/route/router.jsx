import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes, studentRoutes } from './routes'

const routes = [...publicRoutes, ...studentRoutes]

const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
