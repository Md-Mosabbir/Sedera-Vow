import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "../types/Signin"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuth } from "../context/authContext"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  })

  const { login } = useAuth()

  const signInMutation = useMutation({
    mutationFn: login,
    onError: (error: AxiosError) => {
      console.error("Sign-in error:", error)

      toast.error(error.response?.data?.message || "An error occurred")
    },
    onSuccess: () => {
      navigate("/")
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await signInMutation.mutate(data)
    } catch (error) {
      console.error("Sign-in failed:", error)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex flex-col gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Admin</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
                required
              />
              <p className="text-red-300">{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
                required
              />
              <p className="text-red-300">{errors.password?.message}</p>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover"></a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={signInMutation.isPending}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
