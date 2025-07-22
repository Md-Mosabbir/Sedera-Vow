import { createContext, useContext, useState } from "react"
import { Admin } from "../types/Admin"
import axiosInstance from "../utils/axiosInstance"
import { z } from "zod"
import { signInSchema } from "../types/Signin"

type AuthContextType = {
  admin: Admin | null
  login: (data: z.infer<typeof signInSchema>) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)

  const login = async (data: z.infer<typeof signInSchema>) => {
    const response = await axiosInstance.post("/users/sign-in", data, {
      withCredentials: true,
    })

    setAdmin(response.data)
  }

  const logout = async () => {
    await axiosInstance.post("/users/logout")
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
