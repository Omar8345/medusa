import { PromotionActions } from "@medusajs/framework/utils"
import {
  createHook,
  createWorkflow,
  parallelize,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useRemoteQueryStep } from "../../common"
import {
  createLineItemAdjustmentsStep,
  createShippingMethodAdjustmentsStep,
  getActionsToComputeFromPromotionsStep,
  getPromotionCodesToApply,
  prepareAdjustmentsFromPromotionActionsStep,
  removeLineItemAdjustmentsStep,
  removeShippingMethodAdjustmentsStep,
} from "../steps"
import { updateCartPromotionsStep } from "../steps/update-cart-promotions"
import { cartFieldsForRefreshSteps } from "../utils/fields"

export type UpdateCartPromotionsWorkflowInput = {
  cart_id: string
  promo_codes?: string[]
  action?:
    | PromotionActions.ADD
    | PromotionActions.REMOVE
    | PromotionActions.REPLACE
}

export const updateCartPromotionsWorkflowId = "update-cart-promotions"
/**
 * This workflow updates a cart's promotions.
 */
export const updateCartPromotionsWorkflow = createWorkflow(
  updateCartPromotionsWorkflowId,
  (input: WorkflowData<UpdateCartPromotionsWorkflowInput>) => {
    const cart = useRemoteQueryStep({
      entry_point: "cart",
      fields: cartFieldsForRefreshSteps,
      variables: { id: input.cart_id },
      list: false,
    })

    const validate = createHook("validate", {
      input,
      cart,
    })

    const promo_codes = transform({ input }, (data) => {
      return (data.input.promo_codes || []) as string[]
    })

    const action = transform({ input }, (data) => {
      return data.input.action || PromotionActions.ADD
    })

    const promotionCodesToApply = getPromotionCodesToApply({
      cart: cart,
      promo_codes,
      action: action as PromotionActions,
    })

    const actions = getActionsToComputeFromPromotionsStep({
      cart,
      promotionCodesToApply,
    })

    const {
      lineItemAdjustmentsToCreate,
      lineItemAdjustmentIdsToRemove,
      shippingMethodAdjustmentsToCreate,
      shippingMethodAdjustmentIdsToRemove,
      computedPromotionCodes,
    } = prepareAdjustmentsFromPromotionActionsStep({ actions })

    parallelize(
      removeLineItemAdjustmentsStep({ lineItemAdjustmentIdsToRemove }),
      removeShippingMethodAdjustmentsStep({
        shippingMethodAdjustmentIdsToRemove,
      }),
      createLineItemAdjustmentsStep({ lineItemAdjustmentsToCreate }),
      createShippingMethodAdjustmentsStep({
        shippingMethodAdjustmentsToCreate,
      }),
      updateCartPromotionsStep({
        id: input.cart_id,
        promo_codes: computedPromotionCodes,
        action: PromotionActions.REPLACE,
      })
    )

    return new WorkflowResponse(void 0, {
      hooks: [validate],
    })
  }
)
