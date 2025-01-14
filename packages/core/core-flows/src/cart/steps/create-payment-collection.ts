import {
  BigNumberInput,
  IPaymentModuleService,
} from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk"

/**
 * The details of the payment collections to create.
 */
export type CreatePaymentCollectionCartStepInput = {
  /**
   * The ID of the region that the payment collection belongs to.
   */
  region_id: string
  /**
   * The payment collection's curency code.
   */
  currency_code: string
  /**
   * The payment collection's amount.
   */
  amount: BigNumberInput
  /**
   * Custom key-value pairs to store in the payment collection.
   */
  metadata?: Record<string, unknown>
}[]

export const createPaymentCollectionsStepId = "create-payment-collections"
/**
 * This step creates payment collections in a cart.
 * 
 * @example
 * const data = createPaymentCollectionsStep([{
 *   "region_id": "region_123",
 *   "currency_code": "usd",
 *   "amount": 40
 * }])
 */
export const createPaymentCollectionsStep = createStep(
  createPaymentCollectionsStepId,
  async (data: CreatePaymentCollectionCartStepInput, { container }) => {
    const service = container.resolve<IPaymentModuleService>(Modules.PAYMENT)

    const created = await service.createPaymentCollections(data)

    return new StepResponse(
      created,
      created.map((collection) => collection.id)
    )
  },
  async (createdIds, { container }) => {
    if (!createdIds?.length) {
      return
    }

    const service = container.resolve<IPaymentModuleService>(Modules.PAYMENT)

    await service.deletePaymentCollections(createdIds)
  }
)
