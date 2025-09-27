import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export type KpiItem = {
  label: string
  value: string | number
  hint?: string
}

export type Column<Row> = {
  key: keyof Row | string
  header: string
  className?: string
  render?: (row: Row, index: number) => ReactNode
  align?: "left" | "center" | "right"
}

export type TableConfig<Row> = {
  columns: Column<Row>[]
  data: Row[]
  empty?: string
  className?: string
  rowKey?: (row: Row, index: number) => string | number
}

export type ModuleShellProps<Row = unknown> = {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
  kpis?: KpiItem[]
  toolbar?: ReactNode
  table?: TableConfig<Row>
  children?: ReactNode
}
