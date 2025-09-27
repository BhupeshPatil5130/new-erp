"use client"

import { Card, CardContent } from "@/components/ui/card"

export type KpiItem = { label: string; value: string | number; hint?: string }

export function KpiCards({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((kpi, idx) => (
        <Card key={idx} className="border-0 bg-muted/30">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">{kpi.label}</div>
            <div className="text-lg font-semibold leading-tight">{kpi.value}</div>
            {kpi.hint && <div className="text-[10px] text-muted-foreground">{kpi.hint}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
