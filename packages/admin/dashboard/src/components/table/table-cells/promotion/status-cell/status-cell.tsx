import { HttpTypes } from "@medusajs/types"
import { useTranslation } from "react-i18next"
import { PromotionStatus } from "../../../../../lib/promotions"
import { StatusCell as StatusCell_ } from "../../common/status-cell"

type PromotionCellProps = {
  promotion: HttpTypes.AdminPromotion
}
type StatusColors = "grey" | "orange" | "green" | "red" | "grey"
type StatusMap = Record<string, [StatusColors, string]>

export const StatusCell = ({ promotion }: PromotionCellProps) => {
  const { t } = useTranslation()

  const statusMap: StatusMap = {
    [PromotionStatus.ACTIVE]: ["orange", t("statuses.active")],
    [PromotionStatus.INACTIVE]: ["orange", t("statuses.inactive")],
    [PromotionStatus.DRAFT]: ["grey", t("statuses.draft")],
    [PromotionStatus.SCHEDULED]: ["orange", t("statuses.scheduled")],
    [PromotionStatus.EXPIRED]: ["red", t("statuses.expired")],
  }

  const [color, text] = statusMap[promotion.status!.toUpperCase()]

  return <StatusCell_ color={color}>{text}</StatusCell_>
}
