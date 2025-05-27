import MiniRPGGame from '@/components/MiniRPGGame/MiniRPGGame'
import MemoryCardGame from '@/components/practice/MemoryCardGame/MemoryCardGame'
import AdminLayOut from '@/layout/AdminLayout'
import EditCourseLayout from '@/layout/EditCourseLayout'
import KanjiLayout from '@/layout/KanjiLayout'
import MainLayout from '@/layout/MainLayout'
import ManageDocumentLayout from '@/layout/ManageDocumentLayout'
import PracticeLayout from '@/layout/PracticeLayout'
import ProfieLayout from '@/layout/ProfileLayout'
import AdminCourseDetail from '@/pages/admin/pages/Course/AdminCourseDetail'
import Course from '@/pages/admin/pages/Course/Course'
import CreateAccount from '@/pages/admin/pages/CreateAccount/CreateAccount'
import MainDash from '@/pages/admin/pages/DashboardContent/Main'
import Student from '@/pages/admin/pages/Student/Student'
import Teacher from '@/pages/admin/pages/Teacher/Teacher'
import CourseStudentTable from '@/pages/CourseStudentTable/CourseStudentTable'
import CourseDetail from '@/pages/details-course/DetailCoure'
import EditCourse from '@/pages/edit-course/EditCourse'
import EditGrammar from '@/pages/edit-course/EditGrammar'
import EditVocabulary from '@/pages/edit-course/EditVocabulary'
import EditExam from '@/pages/edit-exam/EditExam'
import EditListQuestion from '@/pages/edit-exam/EditListQuestion'
import EditQuestion from '@/pages/edit-exam/EditQuestion'
import EditFlashcard from '@/pages/EditFlashcard/EditFlashcard'
import Event from '@/pages/Event/Event'
import ExamReport from '@/pages/exam-report/ExamReport'
import ReportDetails from '@/pages/exam-report/report-details/ReportDetails'
import CreateFlashcard from '@/pages/flashcard/CreateFlashcard'
import FlashcardDetail from '@/pages/FlashcardDetail/FlashcardDetail'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import AddKanji from '@/pages/Kanji/AddKanji'
import Kanji from '@/pages/Kanji/Kanji'
import KanjiDetail from '@/pages/KanjiDetail/KanjiDetail'
import KanjiPage from '@/pages/KanjiPage/KanjiPage'
import KanjiStrokePractice from '@/pages/KanjiStrokePractice/KanjiStrokePractice'
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
import Renshuu from '@/pages/Practice/renshuu/Renshuu'
import Translate from '@/pages/Practice/Translate/Translate'
import VocabularyList from '@/pages/Practice/Vocabulary/Vocabulary'
import VocabularyDetail from '@/pages/Practice/VocabularyDetail/VocabularyDetail'
import Voice from '@/pages/Practice/Voice'
import StudentCourse from '@/pages/student-course/StudentCourse'
import TeacherCourse from '@/pages/teacher-course/TeacherCourse'
import AddVocabulary from '@/pages/Vocabulary/AddVocabulary'
import Vocabularies from '@/pages/Vocabulary/Vocabularies'
import { Navigate } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute' // Giả sử bạn đã export ProtectedRoute đúng như trên

// Public routes không cần bảo vệ
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
        path: 'not-allowed',
        element: <Forbiden />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]

// Admin routes, chỉ cho role ADMIN
export const adminRoutes = [
    {
        path: '/admin',
        element: (
            <ProtectedRoute
                element={<AdminLayOut />}
                allowedRoles={['admin']}
            />
        ),
        children: [
            {
                index: true,
                element: <Navigate to="students" replace />,
            },
            {
                path: 'main',
                element: <MainDash />,
            },
            {
                path: 'students',
                element: <Student />,
            },
            {
                path: 'teachers',
                element: <Teacher />,
            },
            {
                path: 'courses',
                element: <Course />,
            },
            {
                path: 'create-account',
                element: <CreateAccount />,
            },
            {
                path: 'courses/:courseId',
                element: <AdminCourseDetail />,
            },
            {
                path: 'new-course',
                element: <NewCourse isEditMode={false} />,
            },
            {
                path: 'edit/:courseId',
                element: <NewCourse isEditMode={true} />,
            },
        ],
    },
]

// Teacher routes, chỉ cho role TEACHER
export const teacherRoutes = [
    {
        path: '/teacher',
        element: (
            <ProtectedRoute
                element={<MainLayout />}
                allowedRoles={['teacher']}
            />
        ),
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
        element: (
            <ProtectedRoute
                element={<EditCourseLayout />}
                allowedRoles={['teacher']}
            />
        ),
        children: [
            { index: true, element: <EditCourse /> },
            { path: 'vocabulary', element: <EditVocabulary /> },
            { path: 'grammar', element: <EditGrammar /> },
            {
                path: 'question/:lessonId/:renshuuId',
                element: <EditQuestion isRevisionMode={true} />,
            },
            {
                path: 'students',
                element: <CourseStudentTable />,
            },
        ],
    },

    {
        path: '/manage-document',
        element: (
            <ProtectedRoute
                element={<MainLayout isFooter={false} />}
                allowedRoles={['teacher']}
            />
        ),
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
                    {
                        path: 'flashcard/edit/:deckId',
                        element: <EditFlashcard />,
                    },
                    {
                        path: 'flashcard/study/:deckId',
                        element: <FlashcardDetail />,
                    },
                    { path: 'exam', element: <ManageExam /> },
                    { path: 'exam/edit/:examId', element: <EditExam /> },
                    {
                        path: 'exam/edit/:examId/report',
                        element: <ExamReport />,
                    },
                    {
                        path: 'exam/edit/:examId/report/:studentId',
                        element: <ReportDetails />,
                    },
                    {
                        path: 'exam/edit/:examId/:questionId',
                        element: <EditQuestion />,
                    },
                    { path: 'vocab', element: <Vocabularies /> },
                    {
                        path: 'vocab/create-vocab',
                        element: <AddVocabulary />,
                    },
                    {
                        path: 'vocab/study/:id',
                        element: <VocabularyDetail />,
                    },
                    {
                        path: 'vocab/edit/:id',
                        element: <EditFlashcard />,
                    },
                    { path: 'kanji', element: <Kanji /> },
                    {
                        path: 'kanji/create-kanji',
                        element: <AddKanji />,
                    },
                ],
            },
            {
                path: 'exam/edit/:examId/questions',
                element: <EditListQuestion />,
            },
        ],
    },
]

// Student routes, chỉ cho role STUDENT
export const studentRoutes = [
    {
        path: '/courses',
        element: (
            <ProtectedRoute
                element={<MainLayout />}
                allowedRoles={['student']}
            />
        ),
        children: [
            {
                index: true,
                element: <StudentCourse />,
            },
        ],
    },
    {
        path: '/courses/:courseId',
        element: (
            <ProtectedRoute
                element={<CourseDetail />}
                allowedRoles={['student']}
            />
        ),
    },
]

// Profile routes, mọi user đã đăng nhập đều có thể truy cập, bạn có thể mở rộng kiểm soát roles nếu cần
export const profileRoutes = [
    {
        path: '/profile',
        element: (
            <ProtectedRoute
                element={<ProfieLayout />}
                allowedRoles={['admin', 'teacher', 'student']}
            />
        ),
        children: [
            {
                index: true,
                element: <ProfileUser />,
            },
        ],
    },
]

// Kanji routes, nếu muốn bảo vệ, bạn có thể thêm ProtectedRoute hoặc để public tùy yêu cầu
export const kanjiRoutes = [
    {
        path: '/kanji',
        element: <KanjiLayout />,
        children: [
            {
                index: true,
                element: <KanjiPage />,
            },
            {
                path: '/kanji/:kanjiId',
                element: <KanjiDetail />,
            },
            {
                path: '/kanji/:kanjiId/stroke-practice',
                element: <KanjiStrokePractice />,
            },
        ],
    },
]

// Event routes
export const eventRoutes = [
    {
        path: '/event',
        element: <KanjiLayout />,
        children: [
            {
                index: true,
                element: <Event />,
            },
        ],
    },
]

// Practice routes, tùy bạn có thể add role protection nếu muốn
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
                    { path: 'vocabulary', element: <VocabularyList /> },
                    { path: 'vocabulary/:id', element: <VocabularyDetail /> },

                    { path: 'memory', element: <MemoryCardGame /> },
                    { path: 'mini-rpg', element: <MiniRPGGame /> },

                    { path: 'voice', element: <Voice /> },
                    { path: 'renshuu', element: <Renshuu /> },
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
                            // {
                            //     path: 'doing/:attemptId',
                            //     element: <ExamDoingPage />,
                            // },
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
    {
        path: 'practice/exam/doing/:exam_id',
        element: <ExamDoingPage />,
    },
]
