import MainLayout from '@/layout/MainLayout'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import PageNotFound from '@/pages/not-found/PageNotFound'
import StudentCourse from '@/pages/student-course/StudentCourse'

export const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: 'not-allowed',
    element: <Forbiden />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]

export const studentRoutes = [
  {
    path: '/courses',
    element: <MainLayout />,
    children: [{ index: true, element: <StudentCourse /> }],
  },
]
