import MainLayout from '@/layout/MainLayout'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import NewCourse from '@/pages/new-course/NewCourse'
import PageNotFound from '@/pages/not-found/PageNotFound'
import StudentCourse from '@/pages/student-course/StudentCourse'
import TeacherCourse from '@/pages/teacher-course/TeacherCourse'

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

export const teacherRoutes = [
  {
    path: '/teacher',
    element: <MainLayout />,
    children: [
      { index: true, element: <TeacherCourse /> },
      {
        path: 'new-course',
        element: <NewCourse />,
      },
    ],
  },
]
