import {
  AdditionalData,
  PromotionStatusValues,
} from "@medusajs/framework/types"
import { MedusaError, PromotionStatus } from "@medusajs/framework/utils"
import {
  WorkflowResponse,
  createHook,
  createStep,
  createWorkflow,
} from "@medusajs/framework/workflows-sdk"
import { updatePromotionsStep } from "../steps"

export type UpdatePromotionsStatusWorkflowInput = {
  promotionsData: {
    id: string
    status: PromotionStatusValues
  }[]
} & AdditionalData

export const updatePromotionsValidationStep = createStep(
  "update-promotions-validation",
  async function ({ promotionsData }: UpdatePromotionsStatusWorkflowInput) {
    for (const promotionData of promotionsData) {
      const allowedStatuses: PromotionStatusValues[] =
        Object.values(PromotionStatus)

      if (!allowedStatuses.includes(promotionData.status)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `promotion's status should be one of - ${allowedStatuses.join(", ")}`
        )
      }
    }
  }
)

export const updatePromotionsStatusWorkflowId = "update-promotions-status"
export const updatePromotionsStatusWorkflow = createWorkflow(
  updatePromotionsStatusWorkflowId,
  (input: UpdatePromotionsStatusWorkflowInput) => {
    updatePromotionsValidationStep(input)

    const updatedPromotions = updatePromotionsStep(input.promotionsData)

    const promotionStatusUpdated = createHook("promotionStatusUpdated", {
      promotions: updatedPromotions,
      additional_data: input.additional_data,
    })

    return new WorkflowResponse(updatedPromotions, {
      hooks: [promotionStatusUpdated],
    })
  }
)
