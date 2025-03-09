import { useAuthStore } from '@/store/useAuthStore'
import { useLocation } from 'react-router-dom'

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  //   if (
  //     !isAuthenticated ||
  //     user?.roles.length === 0 ||
  //     !user?.roles.some((r) => allowedRoles.includes(r))
  //   ) {
  //     return (
  //       <Navigate
  //         to="/not-allowed"
  //         replace
  //         state={{ prevUrl: location.pathname }}
  //       />
  //     )
  //   }

  return element
}

export default ProtectedRoute
