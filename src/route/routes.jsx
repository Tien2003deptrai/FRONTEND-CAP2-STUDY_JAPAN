import AdminLayOut from '@/layout/AdminLayout'
import EditCourseLayout from '@/layout/EditCourseLayout'
import MainLayout from '@/layout/MainLayout'
import PracticeLayout from '@/layout/PracticeLayout'
import Course from '@/pages/admin/pages/Course/Course'
import MainDash from '@/pages/admin/pages/DashboardContent/Main'
import Student from '@/pages/admin/pages/Student/Student'
import Teacher from '@/pages/admin/pages/Teacher/Teacher'
import CourseDetail from '@/pages/details-course/DetailCoure'
import EditCourse from '@/pages/edit-course/EditCourse'
import EditGrammar from '@/pages/edit-course/EditGrammar'
import EditVocabulary from '@/pages/edit-course/EditVocabulary'
import CreateFlashcard from '@/pages/flashcard/CreateFlashcard'
import ManageDocument from '@/pages/flashcard/ManageDocument'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import ProfileUser from '@/pages/login/ProfileUser'
import NewCourse from '@/pages/new-course/NewCourse'
import PageNotFound from '@/pages/not-found/PageNotFound'
import Exam from '@/pages/Practice/Exam'
import Flashcard from '@/pages/Practice/Flashcard'
import Translate from '@/pages/Practice/Translate'
import Voice from '@/pages/Practice/Voice'
import StudentCourse from '@/pages/student-course/StudentCourse'
import TeacherCourse from '@/pages/teacher-course/TeacherCourse'
import { Navigate } from 'react-router-dom'

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
        children: [
            {
                index: true,
                element: <StudentCourse />,
            },
        ],
    },
    {
        path: '/courses/:courseId',
        element: <CourseDetail />,
    },
]
export const practiceRoutes = [
    {
        path: '/practice',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <PracticeLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="flashcard" replace />,
                    },
                    {
                        path: 'flashcard',
                        element: <Flashcard />,
                    },
                    {
                        path: 'voice',
                        element: <Voice />,
                    },
                    {
                        path: 'translate',
                        element: <Translate />,
                    },
                    {
                        path: 'exam',
                        element: <Exam />,
                    },
                ],
            },
        ],
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
                element: <NewCourse isEditMode={false} />,
            },
            {
                path: 'edit-course/:courseId',
                element: <NewCourse isEditMode={true} />,
            },
        ],
    },
    {
        path: '/teacher/edit/:courseId',
        element: <EditCourseLayout />,
        children: [
            { index: true, element: <EditCourse /> },
            { path: 'vocabulary', element: <EditVocabulary /> },
            { path: 'grammar', element: <EditGrammar /> },
        ],
    },
    {
        path: '/manage-document',
        element: <MainLayout />,
        children: [
            { index: true, element: <ManageDocument /> },
            {
                path: 'create-flashcard',
                element: <CreateFlashcard />,
            },
        ],
    },
]
