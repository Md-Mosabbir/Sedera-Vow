import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { useParams } from "react-router-dom"
import OrderItems from "../components/OrderItems"
import ScrollArea from "../components/ScrollArea"
import { OrderItem } from "../types/Order"
import InfoLine from "../components/InfoLine"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Toast from "../components/Toast"
import { AxiosError } from "axios"

const OrderedItemViewer = ({ items }: { items: OrderItem }) => {
  return (
    <div>
      <article className="border rounded-3xl px-5 py-3 text-white">
        <h1 className="text-2xl font-bold">{items.name}</h1>
        <span className="font-semibold">{items._id} </span>
        <div className="flex justify-between gap-6 my-3">
          <div>
            <img src={items.imageUrl} alt={items.name} className="w-48 h-48" />
          </div>

          <div>
            <InfoLine title="Price: " value={`$${items.price}`} />
            <InfoLine title="Quantity: " value={items.quantity.toString()} />
            <InfoLine title="Subtotal: " value={`$${items.subtotal}`} />
          </div>
        </div>

        <p>Tier: {items.tier}</p>
      </article>
    </div>
  )
}

const OrderSteps = ({ status, id }: { status: string; id: string }) => {
  enum OrderStatus {
    Processing = 0,
    Shipped = 50,
    Delivered = 100,
  }

  const queryClient = useQueryClient()
  const getStatusStep = (status: string): number => {
    switch (status) {
      case "Processing":
        return OrderStatus.Processing
      case "Shipped":
        return OrderStatus.Shipped
      case "Delivered":
        return OrderStatus.Delivered
      default:
        return OrderStatus.Processing
    }
  }

  const [currentStep, setCurrentStep] = useState(getStatusStep(status))

  useEffect(() => {
    // Update currentStep when the status prop changes
    setCurrentStep(getStatusStep(status))
  }, [status])

  const processOrder = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/admin/order/${id}/process`,
        {},
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "order"])
      toast.success("Order processed successfully")
    },
    onError: (error: AxiosError) => {
      console.error(error)

      toast.error(error.response?.data?.message || "An error occurred")
    },
  })

  const shipOrder = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/admin/order/${id}/ship`,
        {},
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "order"])
      toast.success("Order shipped successfully")
    },
    onError: (error: AxiosError) => {
      console.error(error)

      toast.error(error.response?.data?.message || "An error occurred")
    },
  })

  const deliverOrder = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/admin/order/${id}/deliver`,
        {},
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "order"])
    },
    onError: (error: AxiosError) => {
      console.error(error)

      toast.error(error.response?.data?.message || "An error occurred")
    },
  })

  const cancelOrder = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/admin/order/${id}/cancel`,
        {},
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "order"])
    },
    onError: (error: AxiosError) => {
      console.log(error)

      toast.error(error.response?.data?.message || "An error occurred")
    },
  })

  const handleOrderStatus = async () => {
    if (currentStep === OrderStatus.Processing) {
      processOrder.mutate()
    } else if (currentStep === OrderStatus.Shipped) {
      shipOrder.mutate()
    } else if (currentStep === OrderStatus.Delivered) {
      deliverOrder.mutate()
    }
  }

  return (
    <div>
      <input
        type="range"
        disabled={
          processOrder.isPending ||
          shipOrder.isPending ||
          deliverOrder.isPending
        }
        min={0}
        max="100"
        value={currentStep}
        className={`range ${
          currentStep === OrderStatus.Shipped ? "range-warning" : "range-accent"
        }`}
        step="50"
        onChange={(e) => {
          ;(
            document.getElementById("my_modal_1") as HTMLDialogElement
          )?.showModal()
          setCurrentStep(parseInt(e.target.value))
        }}
      />

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Order Status</h3>
          <p className="py-4">Are you sure you want to proceed?</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded"
                onClick={async () => {
                  await handleOrderStatus()
                  ;(
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  )?.close()
                  setCurrentStep(getStatusStep(status))
                }}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  )?.close()
                }
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex w-full justify-between px-2 text-xs">
        <span>Processing</span>
        <span>Shipped</span>
        <span>Delivered</span>
      </div>

      <div className="my-5">
        <button
          disabled={status === "Delivered"}
          className="btn btn-warning w-full"
          onDoubleClick={() => {
            cancelOrder.mutate()
          }}
        >
          Cancel Order
        </button>
        <p className="text-center mt-1">Double click to cancel order</p>
      </div>
    </div>
  )
}

const SingleOrder = () => {
  const { id } = useParams<{ id: string }>()

  const order = useQuery({
    queryKey: ["admin", "order"],

    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/order/${id}`, {
        withCredentials: true,
      })

      return response.data
    },
  })

  const data = order.data
  console.log(data)

  if (order.isLoading) return <div>Loading...</div>
  return (
    <div>
      <h2 className="font-extrabold text-white text-4xl mb-3">Order Details</h2>
      <OrderItems {...data} />
      <ScrollArea className="my-11">
        <h2 className="font-extrabold text-white text-4xl mb-3">Products</h2>
        <div>
          {data.orderItems.map((item: OrderItem) => (
            <OrderedItemViewer key={item._id} items={item} />
          ))}
        </div>
      </ScrollArea>
      <OrderSteps status={data.orderStatus || "Processing"} id={id} />

      <div className="mb-32"></div>
    </div>
  )
}

export default SingleOrder
