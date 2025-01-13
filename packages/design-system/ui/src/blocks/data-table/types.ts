import type {
  AccessorFn,
  AccessorFnColumnDef,
  AccessorKeyColumnDef,
  CellContext,
  ColumnSort,
  DeepKeys,
  DeepValue,
  DisplayColumnDef,
  IdentifiedColumnDef,
  PaginationState,
  RowSelectionState,
} from "@tanstack/react-table"

export type DataTableAction<TData> = {
  label: string
  onClick: (ctx: CellContext<TData, unknown>) => void
  icon?: React.ReactNode
}

export interface DataTableActionColumnDef<TData>
  extends Pick<DisplayColumnDef<TData>, "meta"> {
  actions:
    | DataTableAction<TData>[]
    | DataTableAction<TData>[][]
    | ((
        ctx: CellContext<TData, unknown>
      ) => DataTableAction<TData>[] | DataTableAction<TData>[][])
}

export interface DataTableSelectColumnDef<TData>
  extends Pick<DisplayColumnDef<TData>, "cell" | "header"> {}

export type SortableColumnDef = {
  sortLabel?: string
  sortAscLabel?: string
  sortDescLabel?: string
}

export type SortableColumnDefMeta = {
  ___sortMetaData?: SortableColumnDef
}

export type ActionColumnDefMeta<TData> = {
  ___actions?:
    | DataTableAction<TData>[]
    | DataTableAction<TData>[][]
    | ((ctx: CellContext<TData, unknown>) => DataTableAction<TData>[])
}

export type DataTableColumnSizing = {
  /**
   * The maximum size of the column.
   */
  maxSize?: number
  /**
   * The minimum size of the column.
   */
  minSize?: number
  /**
   * The size of the column.
   */
}

export interface DataTableColumnDef extends DataTableColumnSizing {
  /**
   * Whether the column is sortable.
   * @default false
   */
  enableSorting?: boolean
}

export interface DataTableDisplayColumnDef extends DataTableColumnSizing {
  id: string
}

export interface DataTableColumnHelper<TData> {
  accessor: <
    TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
    TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
      ? TReturn
      : TAccessor extends DeepKeys<TData>
      ? DeepValue<TData, TAccessor>
      : never
  >(
    accessor: TAccessor,
    column: TAccessor extends AccessorFn<TData>
      ? Pick<DisplayColumnDef<TData, TValue>, "meta" | "header" | "cell"> &
          DataTableColumnDef &
          SortableColumnDef
      : Pick<
          IdentifiedColumnDef<TData, TValue>,
          "id" | "meta" | "header" | "cell"
        > &
          DataTableColumnDef &
          SortableColumnDef
  ) => TAccessor extends AccessorFn<TData>
    ? AccessorFnColumnDef<TData, TValue>
    : AccessorKeyColumnDef<TData, TValue>
  display: (
    column: Pick<DisplayColumnDef<TData>, "meta" | "header" | "cell"> &
      DataTableDisplayColumnDef
  ) => DisplayColumnDef<TData, unknown>
  action: (
    props: DataTableActionColumnDef<TData>
  ) => DisplayColumnDef<TData, unknown>
  select: (
    props?: DataTableSelectColumnDef<TData>
  ) => DisplayColumnDef<TData, unknown>
}

export interface DataTableSortingState extends ColumnSort {}
export interface DataTableRowSelectionState extends RowSelectionState {}
export interface DataTablePaginationState extends PaginationState {}
export type DataTableFilteringState<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  [K in keyof T]: T[K]
}

export type FilterType = "radio" | "select" | "date"
export type FilterOption<T = string> = {
  label: string
  value: T
}

interface BaseFilterProps {
  type: FilterType
  label: string
}

export interface RadioFilterProps extends BaseFilterProps {
  type: "radio"
  options: FilterOption[]
}

export interface SelectFilterProps extends BaseFilterProps {
  type: "select"
  options: FilterOption[]
}

export interface DateFilterProps extends BaseFilterProps {
  type: "date"
  /**
   * The format of the date.
   * @default "date"
   */
  format?: "date" | "date-time"
  rangeOptionLabel?: string
  rangeOptionStartLabel?: string
  rangeOptionEndLabel?: string
  disableRangeOption?: boolean
  formatDateValue?: (value: Date) => string
  options: FilterOption<DataTableDateComparisonOperator>[]
}

export type DataTableFilterProps =
  | RadioFilterProps
  | SelectFilterProps
  | DateFilterProps

export type DataTableFilter<
  T extends DataTableFilterProps = DataTableFilterProps
> = T & {
  id: string
}

export enum DataTableEmptyState {
  EMPTY = "EMPTY",
  FILTERED_EMPTY = "FILTERED_EMPTY",
  POPULATED = "POPULATED",
}

export type DataTableDateComparisonOperator = {
  /**
   * The filtered date must be greater than or equal to this value.
   */
  $gte?: string
  /**
   * The filtered date must be less than or equal to this value.
   */
  $lte?: string
  /**
   * The filtered date must be less than this value.
   */
  $lt?: string
  /**
   * The filtered date must be greater than this value.
   */
  $gt?: string
}

type CommandAction = (
  selection: DataTableRowSelectionState
) => void | Promise<void>

export interface DataTableCommand {
  label: string
  action: CommandAction
  shortcut: string
}

export type DataTableEmptyStateContent = {
  heading?: string
  description?: string
  custom?: React.ReactNode
}

export type DataTableEmptyStateProps = {
  filtered?: DataTableEmptyStateContent
  empty?: DataTableEmptyStateContent
}
