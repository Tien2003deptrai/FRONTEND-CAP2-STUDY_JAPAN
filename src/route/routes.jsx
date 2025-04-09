import AdminLayOut from '@/layout/AdminLayout'
import EditCourseLayout from '@/layout/EditCourseLayout'
import MainLayout from '@/layout/MainLayout'
import ManageDocumentLayout from '@/layout/ManageDocumentLayout'
import PracticeLayout from '@/layout/PracticeLayout'
import AdminCourseDetail from '@/pages/admin/pages/Course/AdminCourseDetail'
import Course from '@/pages/admin/pages/Course/Course'
import MainDash from '@/pages/admin/pages/DashboardContent/Main'
import Student from '@/pages/admin/pages/Student/Student'
import Teacher from '@/pages/admin/pages/Teacher/Teacher'
import CourseDetail from '@/pages/details-course/DetailCoure'
import EditCourse from '@/pages/edit-course/EditCourse'
import EditGrammar from '@/pages/edit-course/EditGrammar'
import EditVocabulary from '@/pages/edit-course/EditVocabulary'
import EditExam from '@/pages/edit-exam/EditExam'
import EditQuestion from '@/pages/edit-exam/EditQuestion'
import CreateFlashcard from '@/pages/flashcard/CreateFlashcard'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import ProfileUser from '@/pages/login/ProfileUser'
import ManageExam from '@/pages/manage-document/ManageExam'
import ManageFlashcard from '@/pages/manage-document/ManageFlashcard'
import NewCourse from '@/pages/new-course/NewCourse'
import PageNotFound from '@/pages/not-found/PageNotFound'
import ExamDetailPage from '@/pages/Practice/Exam/examDetail'
import ExamDoingPage from '@/pages/Practice/Exam/examDoing'
import ExamList from '@/pages/Practice/Exam/examList'
import ExamResultPage from '@/pages/Practice/Exam/examResults'
import Deck from '@/pages/Practice/flashcard/Deck'
import Flashcard from '@/pages/Practice/flashcard/Flashcard'
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
                index: true, // Example of a dashboard page
                element: <Navigate to="students" replace />,
            },
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
            {
                path: 'courses/:courseId', // Example of a dashboard page
                element: <AdminCourseDetail />,
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
                    { path: 'flashcard', element: <Deck /> },
                    { path: 'flashcard/:deckId', element: <Flashcard /> },
                    { path: 'voice', element: <Voice /> },
                    { path: 'translate', element: <Translate /> },
                    {
                        path: 'exam',
                        children: [
                            {
                                index: true,
                                element: <ExamList />,
                            },
                            {
                                path: ':exam_id',
                                element: <ExamDetailPage />,
                            },
                            {
                                path: 'doing/:attemptId',
                                element: <ExamDoingPage />,
                            },
                            {
                                path: 'result/:attemptId',
                                element: <ExamResultPage />,
                            },
                        ],
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
            {
                path: '',
                element: <ManageDocumentLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="flashcard" replace />,
                    },
                    { path: 'flashcard', element: <ManageFlashcard /> },
                    {
                        path: 'flashcard/create-flashcard',
                        element: <CreateFlashcard />,
                    },
                    { path: 'exam', element: <ManageExam /> },
                    { path: 'exam/edit/:examId', element: <EditExam /> },
                    {
                        path: 'exam/edit/:examId/:questionId',
                        element: <EditQuestion />,
                    },
                ],
            },
        ],
    },
]
