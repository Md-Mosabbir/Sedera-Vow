import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Authenticator = ({ children }: { children: React.ReactNode }) => {
  const { admin } = useAuth()

  if (!admin || !admin.role) {
    return <Navigate to="/auth" />
  }

  return <div>{children}</div>
}

export default Authenticator
