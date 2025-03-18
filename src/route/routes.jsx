import AdminLayOut from '@/layout/AdminLayout'
import MainLayout from '@/layout/MainLayout'
import Course from '@/pages/admin/Course/Course'
import MainDash from '@/pages/admin/DashboardContent/Main'
import Student from '@/pages/admin/Student/Student'
import Teacher from '@/pages/admin/Teacher/Teacher'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import ProfileUser from '@/pages/login/ProfileUser'
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
    path: 'login',
    element: <Login />,
  },
  {
    path: 'user/:userId',
    element: <ProfileUser />,
  },
  {
    path: 'not-allowed',
    element: <Forbiden />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },

  // Admin routes with AdminLayOut
  {
    path: '/admin',
    element: <AdminLayOut />,
    children: [
      {
        path: 'main', // Example of a dashboard page
        element: <MainDash />,
      },
      {
        path: 'students', // Example of a dashboard page
        element: <Student />,
      },
      {
        path: 'teachers', // Example of a dashboard page
        element: <Teacher />,
      },
      {
        path: 'courses', // Example of a dashboard page
        element: <Course />,
      },
      // Add more admin routes here if necessary
    ],
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
