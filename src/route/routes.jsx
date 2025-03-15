import MainLayout from '@/layout/MainLayout'
import Forbiden from '@/pages/forbiden/Forbiden'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
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
  //   {
  //     path: 'register',
  //     element: <Register />,
  //   },
  {
    path: 'not-allowed',
    element: <Forbiden />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  // {
  //     path: 'reset-password',
  //     element: <MainLayout isFooter={false} isHeader={false} />,
  //     children: [
  //         {
  //             index: true,
  //             element: <ChangePassword />,
  //         },
  //     ],
  // },
]
