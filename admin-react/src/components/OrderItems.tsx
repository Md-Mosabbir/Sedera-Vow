import { Order } from "../types/Order"
import InfoLine from "./InfoLine"

const OrderItems = ({
  _id,
  createdAt,
  orderStatus,
  paymentMethod,
  shippingAddress,
  phoneNumber,
  user,
  orderItems,
}: Order) => {
  return (
    <div>
      <article className="border py-2 text-white px-2 rounded-2xl">
        <div className="bg-sky-600 flex justify-between  py-3 px-2 rounded-xl">
          <InfoLine title="Order ID: " value={_id} />
          <InfoLine
            title="Date: "
            value={new Date(createdAt).toLocaleString()}
          />
        </div>
        <div className="my-3 py-2 flex justify-between border-b-2">
          <InfoLine
            title="Order Status: "
            value={orderStatus}
            spanClassName="bg-white text-lg font-bold text-black px-2 py-1 rounded-lg"
          />
          <InfoLine title="Payment Method: " value={paymentMethod} />
        </div>
        <div className="flex flex-col gap-3 border-b-2 pb-3">
          <div className="flex justify-between">
            <InfoLine
              title="Shipping Address: "
              value={shippingAddress.address}
            />
            <InfoLine title="City: " value={shippingAddress.city} />
          </div>

          <div className="flex justify-between">
            <InfoLine title="Country: " value={shippingAddress.postalCode} />
            <InfoLine title="Phone number: " value={phoneNumber} />
          </div>
        </div>

        <div className="flex justify-between gap-3 border-b-2 py-3">
          <InfoLine title="User: " value={user.username} />
          <InfoLine title="Email: " value={user.email} />
        </div>

        <div className="my-2">
          <InfoLine
            title="Number of items: "
            value={orderItems.length.toString()}
          />

          <p>
            <span></span> {}
          </p>
        </div>
      </article>
    </div>
  )
}

export default OrderItems
