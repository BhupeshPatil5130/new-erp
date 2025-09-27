"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ModuleToolbar, type ModuleToolbarProps } from "./module-toolbar"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

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
  icon?: (props: { className?: string }) => ReactNode
  className?: string
  kpis?: KpiItem[]
  toolbar?: ReactNode
  table?: TableConfig<Row>
  children?: ReactNode
}

function KPICards({ items }: { items?: KpiItem[] }) {
  if (!items || items.length === 0) return null
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k) => (
        <Card key={k.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">{k.label}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold tabular-nums">{k.value}</div>
            {k.hint ? <div className="mt-1 text-xs text-muted-foreground">{k.hint}</div> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DataTable<Row = any>({ config }: { config: TableConfig<Row> }) {
  const { columns, data, empty = "No records found.", className, rowKey } = config
  return (
    <div className={cn("overflow-x-auto rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={String(c.key)} className={cn("whitespace-nowrap", c.className)}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={rowKey ? rowKey(row, idx) : idx}>
                {columns.map((c) => (
                  <TableCell key={String(c.key)} className={c.className}>
                    {c.render ? c.render(row, idx) : (row as any)[c.key as any]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export function ModuleShell<Row = unknown>(props: ModuleShellProps<Row>) {
  const { title, description, icon: Icon, kpis, toolbar, table, children, className } = props

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {Icon ? <Icon className="h-6 w-6 text-muted-foreground" /> : null}
          <div>
            <h1 className="text-xl font-semibold leading-none">{title}</h1>
            {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {toolbar ? <div className="flex-shrink-0">{toolbar}</div> : null}
      </div>
      {kpis ? <KPICards items={kpis} /> : null}
      {children ? <div>{children}</div> : null}
      {!children && table ? <DataTable config={table} /> : null}
    </div>
  )
}

// Convenience static property so consumers can do <ModuleShell.Toolbar />
ModuleShell.Toolbar = ModuleToolbar as unknown as (props: ModuleToolbarProps) => JSX.Element
export type { ModuleToolbarProps }
