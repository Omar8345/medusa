import { Buildings, Component, PencilSquare, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  Badge,
  clx,
  Container,
  createDataTableColumnHelper,
  createDataTableCommandHelper,
  createDataTableFilterHelper,
  DataTableAction,
  Tooltip,
  usePrompt,
} from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { CellContext } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../../../components/data-table"
import {
  useDeleteVariantLazy,
  useProductVariants,
} from "../../../../../hooks/api/products"
import { useDateFilterOptions } from "../../../../../hooks/filters/use-date-filter-options"
import { useDate } from "../../../../../hooks/use-date"
import { useQueryParams } from "../../../../../hooks/use-query-params"
import { PRODUCT_VARIANT_IDS_KEY } from "../../../common/constants"

type ProductVariantSectionProps = {
  product: HttpTypes.AdminProduct
}

const PAGE_SIZE = 10

export const ProductVariantSection = ({
  product,
}: ProductVariantSectionProps) => {
  const { t } = useTranslation()

  const { q, order, offset, created_at, updated_at } = useQueryParams([
    "offset",
    "q",
    "manage_inventory",
    "allow_backorder",
    "order",
    "created_at",
    "updated_at",
  ])

  const columns = useColumns(product)
  const filters = useFilters()
  const commands = useCommands()

  const { variants, count, isPending, isError, error } = useProductVariants(
    product.id,
    {
      q,
      order,
      offset: offset ? parseInt(offset) : undefined,
      limit: PAGE_SIZE,
      created_at: created_at ? JSON.parse(created_at) : undefined,
      updated_at: updated_at ? JSON.parse(updated_at) : undefined,
      fields: "*inventory_items.inventory.location_levels,+inventory_quantity",
    },
    {
      placeholderData: keepPreviousData,
    }
  )

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <DataTable
        data={variants}
        columns={columns}
        filters={filters}
        rowCount={count}
        getRowId={(row) => row.id}
        rowHref={(row) => `/products/${product.id}/variants/${row.id}`}
        pageSize={PAGE_SIZE}
        isLoading={isPending}
        heading={t("products.variants")}
        action={{
          label: t("actions.create"),
          to: `variants/create`,
        }}
        actionMenu={{
          groups: [
            {
              actions: [
                {
                  label: t("products.editPrices"),
                  to: `prices`,
                  icon: <PencilSquare />,
                },
                {
                  label: t("inventory.stock.action"),
                  to: `stock`,
                  icon: <Buildings />,
                },
              ],
            },
            {
              actions: [
                {
                  label: t("inventory.stock.action"),
                  to: `stock`,
                  icon: <Buildings />,
                },
              ],
            },
          ],
        }}
        commands={commands}
      />
    </Container>
  )
}

const columnHelper =
  createDataTableColumnHelper<HttpTypes.AdminProductVariant>()

const useColumns = (product: HttpTypes.AdminProduct) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync } = useDeleteVariantLazy(product.id)
  const prompt = usePrompt()

  const handleDelete = useCallback(
    async (id: string, title: string) => {
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("products.deleteVariantWarning", {
          title,
        }),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel"),
      })

      if (!res) {
        return
      }

      await mutateAsync({ variantId: id })
    },
    [mutateAsync, prompt, t]
  )

  const optionColumns = useMemo(() => {
    if (!product?.options) {
      return []
    }

    return product.options.map((option) => {
      return columnHelper.display({
        id: option.id,
        header: option.title,
        cell: ({ row }) => {
          const variantOpt = row.original.options?.find(
            (opt) => opt.option_id === option.id
          )

          if (!variantOpt) {
            return <span className="text-ui-fg-muted">-</span>
          }

          return (
            <div className="flex items-center">
              <Tooltip content={variantOpt.value}>
                <Badge
                  size="2xsmall"
                  title={variantOpt.value}
                  className="inline-flex min-w-[20px] max-w-[140px] items-center justify-center overflow-hidden truncate"
                >
                  {variantOpt.value}
                </Badge>
              </Tooltip>
            </div>
          )
        },
      })
    })
  }, [product])

  const getActions = useCallback(
    (ctx: CellContext<HttpTypes.AdminProductVariant, unknown>) => {
      const variant = ctx.row.original as HttpTypes.AdminProductVariant & {
        inventory_items: { inventory: HttpTypes.AdminInventoryItem }[]
      }

      const mainActions: DataTableAction<HttpTypes.AdminProductVariant>[] = [
        {
          icon: <PencilSquare />,
          label: t("actions.edit"),
          onClick: (row) => {
            navigate(`edit-variant?variant_id=${row.row.original.id}`)
          },
        },
      ]

      const secondaryActions: DataTableAction<HttpTypes.AdminProductVariant>[] =
        [
          {
            icon: <Trash />,
            label: t("actions.delete"),
            onClick: () => handleDelete(variant.id, variant.title!),
          },
        ]

      const inventoryItemsCount = variant.inventory_items?.length || 0

      switch (inventoryItemsCount) {
        case 0:
          break
        case 1: {
          const inventoryItemLink = `/inventory/${
            variant.inventory_items![0].inventory.id
          }`

          mainActions.push({
            label: t("products.variant.inventory.actions.inventoryItems"),
            onClick: () => {
              navigate(inventoryItemLink)
            },
            icon: <Buildings />,
          })
          break
        }
        default: {
          const inventoryKitLink = `/inventory?${new URLSearchParams({
            id: variant.inventory_items!.map((i) => i.inventory.id).join(","),
          }).toString()}`

          mainActions.push({
            label: t("products.variant.inventory.actions.inventoryKit"),
            onClick: () => {
              navigate(inventoryKitLink)
            },
            icon: <Component />,
          })
        }
      }

      return [mainActions, secondaryActions]
    },
    [handleDelete, navigate, t]
  )

  const getInventory = useCallback(
    (variant: HttpTypes.AdminProductVariant) => {
      const castVariant = variant as HttpTypes.AdminProductVariant & {
        inventory_items: { inventory: HttpTypes.AdminInventoryItem }[]
      }
      const quantity = variant.inventory_quantity

      const inventoryItems = castVariant.inventory_items?.map(
        (i) => i.inventory
      )

      const hasInventoryKit = inventoryItems.length > 1

      const locations: Record<string, boolean> = {}

      inventoryItems.forEach((i) => {
        i.location_levels?.forEach((l) => {
          locations[l.id] = true
        })
      })

      const locationCount = Object.keys(locations).length

      const text = hasInventoryKit
        ? t("products.variant.tableItemAvailable", {
            availableCount: quantity,
          })
        : t("products.variant.tableItem", {
            availableCount: quantity,
            locationCount,
            count: locationCount,
          })

      return { text, hasInventoryKit, quantity }
    },
    [t]
  )

  return useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: t("fields.title"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
      }),
      columnHelper.accessor("sku", {
        header: t("fields.sku"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
      }),
      ...optionColumns,
      columnHelper.display({
        id: "inventory",
        header: t("fields.inventory"),
        cell: ({ row }) => {
          const { text, hasInventoryKit, quantity } = getInventory(row.original)

          return (
            <div className="flex h-full w-full items-center gap-2 overflow-hidden">
              {hasInventoryKit && <Component />}
              <span
                className={clx("truncate", {
                  "text-ui-fg-error": !quantity,
                })}
                title={text}
              >
                {text}
              </span>
            </div>
          )
        },
      }),
      columnHelper.action({
        actions: getActions,
      }),
    ]
  }, [t, optionColumns, getActions, getInventory])
}

const filterHelper =
  createDataTableFilterHelper<HttpTypes.AdminProductVariant>()

const useFilters = () => {
  const { t } = useTranslation()
  const { getFullDate } = useDate()
  const dateFilterOptions = useDateFilterOptions()

  return useMemo(() => {
    return [
      filterHelper.accessor("created_at", {
        type: "date",
        label: t("fields.createdAt"),
        format: "date",
        formatDateValue: (date) => getFullDate({ date }),
        rangeOptionStartLabel: t("filters.date.starting"),
        rangeOptionEndLabel: t("filters.date.ending"),
        rangeOptionLabel: t("filters.date.custom"),
        options: dateFilterOptions,
      }),
      filterHelper.accessor("updated_at", {
        type: "date",
        label: t("fields.updatedAt"),
        format: "date",
        rangeOptionStartLabel: t("filters.date.starting"),
        rangeOptionEndLabel: t("filters.date.ending"),
        rangeOptionLabel: t("filters.date.custom"),
        formatDateValue: (date) => getFullDate({ date }),
        options: dateFilterOptions,
      }),
    ]
  }, [t, dateFilterOptions, getFullDate])
}

const commandHelper = createDataTableCommandHelper()

const useCommands = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return [
    commandHelper.command({
      label: t("inventory.stock.action"),
      shortcut: "i",
      action: async (selection) => {
        navigate(
          `stock?${PRODUCT_VARIANT_IDS_KEY}=${Object.keys(selection).join(",")}`
        )
      },
    }),
  ]
}
