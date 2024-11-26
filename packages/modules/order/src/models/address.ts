import { model } from "@medusajs/framework/utils"
import { Order } from "./order"

const CustomerIdIndex = "IDX_order_address_customer_id"

const _OrderAddress = model
  .define("OrderAddress", {
    id: model.id({ prefix: "ordaddr" }).primaryKey(),
    customer_id: model.text().nullable(),
    company: model.text().searchable().nullable(),
    first_name: model.text().searchable().nullable(),
    last_name: model.text().searchable().nullable(),
    address_1: model.text().searchable().nullable(),
    address_2: model.text().searchable().nullable(),
    city: model.text().searchable().nullable(),
    country_code: model.text().nullable(),
    province: model.text().searchable().nullable(),
    postal_code: model.text().searchable().nullable(),
    phone: model.text().searchable().nullable(),
    metadata: model.json().nullable(),
    order: model.hasMany<any /* <() => typeof Order> */>(() => Order, {
      mappedBy: "shipping_address",
    }),
  })
  .indexes([
    {
      name: CustomerIdIndex,
      on: ["customer_id"],
      unique: false,
    },
  ])

export const OrderAddress = _OrderAddress
