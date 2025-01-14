import { LinkWorkflowInput } from "../../common"
import {
  CreateProductCategoryDTO,
  FilterableProductCategoryProps,
  UpdateProductCategoryDTO,
} from "../../product"

export interface CreateProductCategoriesWorkflowInput {
  product_categories: CreateProductCategoryDTO[]
}
export interface UpdateProductCategoriesWorkflowInput {
  selector: FilterableProductCategoryProps
  update: UpdateProductCategoryDTO
}

/**
 * The products to manage of a category.
 */
export interface BatchUpdateProductsOnCategoryWorkflowInput
  extends LinkWorkflowInput {}
