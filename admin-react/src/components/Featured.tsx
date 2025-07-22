import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"

const Featured = ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
  const queryClient = useQueryClient()
  const toggleFeatureMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.put(
        `/admin/${id}/featured`,
        {},
        {
          withCredentials: true,
        },
      )
      return response.data
    },
    onError: (error) => {
      console.error("Toggle feature error:", error)
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["products"])
      //! TODO: 
      // queryClient.invalidateQueries(["product", id])

      console.log("Product featured successfully")
    },
  })

  return (
    <div className="ml-auto">
      <p>Featured </p>
      <br />
      <input
        type="checkbox"
        defaultChecked={isFeatured}
        disabled={toggleFeatureMutation.isPending}
        className="toggle toggle-success"
        onChange={() => {
          toggleFeatureMutation.mutate(id)
        }}
      />
    </div>
  )
}

export default Featured
