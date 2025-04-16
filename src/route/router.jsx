import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
    kanjiRoutes,
    practiceRoutes,
    publicRoutes,
    studentRoutes,
    teacherRoutes,
} from './routes'

const routes = [
    ...publicRoutes,
    ...studentRoutes,
    ...teacherRoutes,
    ...practiceRoutes,
    ...kanjiRoutes,
]

const router = createBrowserRouter(routes)

export default function Router() {
    return <RouterProvider router={router} />
}
