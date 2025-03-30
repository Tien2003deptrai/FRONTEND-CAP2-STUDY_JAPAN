import { useAuthStore } from '@/store/useAuthStore'

const ProtectedRoute = ({ element, allowedRole }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated || user?.roles !== allowedRole) {
    return <Navigate to="/not-allowed" replace />
  }

  return element
}

export default ProtectedRoute
