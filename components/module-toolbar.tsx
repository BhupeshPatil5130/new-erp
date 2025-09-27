"use client"

import type React from "react"

import { useRef } from "react"
import { Plus, Upload, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type FilterOption = { label: string; value: string }
export type ToolbarFilter = {
  label: string
  key: string
  options: FilterOption[]
  onChange?: (value: string) => void
}

export type ModuleToolbarProps = {
  className?: string
  search?: string
  onSearchChange?: (value: string) => void
  placeholder?: string
  filters?: ToolbarFilter[]
  onAdd?: () => void
  addLabel?: string
  onExport?: () => void
  onImport?: (text: string) => void
}

export function ModuleToolbar(props: ModuleToolbarProps) {
  const {
    className,
    search = "",
    onSearchChange,
    placeholder = "Search...",
    filters = [],
    onAdd,
    addLabel = "Add",
    onExport,
    onImport,
  } = props

  const fileRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileRef.current?.click()
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    onImport?.(text)
    e.target.value = ""
  }

  return (
    <div className={cn("w-full rounded-md border bg-background p-3", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={placeholder}
              className="h-9 pl-8"
            />
          </div>

          {filters.length > 0 ? (
            <div className="hidden items-center gap-2 md:flex">
              {filters.map((f) => (
                <div key={f.key} className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    onValueChange={(v) => f.onChange?.(v)} 
                    defaultValue={f.options && f.options.length > 0 ? f.options[0]?.value : undefined}
                  >
                    <SelectTrigger className="h-9 w-[160px]">
                      <SelectValue placeholder={f.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options && f.options.length > 0 ? (
                        f.options.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))
                      ) : null}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {onImport ? (
            <>
              <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileChange} />
              <Button variant="outline" size="sm" onClick={handleImportClick}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </>
          ) : null}

          {onExport ? (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          ) : null}

          {onAdd ? (
            <Button size="sm" onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" />
              {addLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
