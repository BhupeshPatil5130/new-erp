"use client"

import { useMemo, useState } from "react"
import { ModuleShell } from "@/components/module-shell"
import { ModuleToolbar } from "@/components/module-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { arrayToCsv, downloadCsv, parseCsv} from "@/lib/csv"
import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Campaign = { id: string; name: string; channel: string; budget: number; status: "draft" | "active" | "paused" }

const initialRows: Campaign[] = [
  { id: "AD-01", name: "Summer Admissions", channel: "Google Ads", budget: 50000, status: "active" },
  { id: "AD-02", name: "Referral Push", channel: "Facebook", budget: 20000, status: "paused" },
]

export default function BrandAdsPage() {
  const [rows, setRows] = useState<Campaign[]>(initialRows)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | Campaign["status"]>("all")
  const [editing, setEditing] = useState<Campaign | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!rows || rows.length === 0) return []
    
    const q = search.toLowerCase().trim()
    return rows.filter((r) => {
      if (!r) return false
      const matchesSearch =
        !q || r.name.toLowerCase().includes(q) || r.channel.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      const matchesFilter = filter === "all" ? true : r.status === filter
      return matchesSearch && matchesFilter
    })
  }, [rows, search, filter])

  const kpis = useMemo(() => {
    if (!rows || rows.length === 0) {
      return [
        { label: "Campaigns", value: 0 },
        { label: "Active", value: 0 },
        { label: "Budget", value: "₹0" },
      ]
    }
    
    return [
      { label: "Campaigns", value: rows.length },
      { label: "Active", value: rows.filter((r) => r && r.status === "active").length },
      { label: "Budget", value: `₹${rows.reduce((s, r) => s + (r?.budget || 0), 0).toLocaleString()}` },
    ]
  }, [rows])

  const onAdd = () => {
    setEditing({ id: "", name: "", channel: "", budget: 0, status: "draft" })
    setOpen(true)
  }
  
  const onEdit = (r: Campaign) => {
    if (!r) return
    setEditing({ ...r })
    setOpen(true)
  }
  
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `AD-${Math.floor(10 + Math.random() * 90)}`
    setRows((prev) => {
      if (!prev) return [next]
      const idx = prev.findIndex((p) => p && p.id === next.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = next
        return copy
      }
      return [next, ...prev]
    })
    setOpen(false)
    setEditing(null)
  }
  
  const onDelete = (id: string) => {
    if (!id) return
    setRows((prev) => {
      if (!prev) return []
      return prev.filter((p) => p && p.id !== id)
    })
  }
  
  const onExport = () => {
    if (!rows || rows.length === 0) return
    downloadCsv("brand_ads.csv", arrayToCsv(rows))
  }
  
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    if (!rowsCsv || rowsCsv.length === 0) return
    
    const mapped: Campaign[] = rowsCsv.map((r) => ({
      id: r.id || `AD-${Math.floor(10 + Math.random() * 90)}`,
      name: r.name || "",
      channel: r.channel || "",
      budget: Number(r.budget || 0),
      status: (r.status as Campaign["status"]) || "draft",
    }))
    
    setRows((prev) => {
      if (!prev) return mapped
      return [...prev, ...mapped.filter((m) => !prev.some((p) => p && p.id === m.id))]
    })
  }

  // Ensure we have valid data before rendering
  if (!rows || rows.length === 0) {
    return (
      <ModuleShell title="Ads Management" description="Create and manage brand ad campaigns" kpis={kpis}>
        <div className="p-6 text-center text-muted-foreground">
          No campaigns available. Click "Add Campaign" to get started.
        </div>
      </ModuleShell>
    )
  }

  return (
    <ModuleShell title="Ads Management" description="Create and manage brand ad campaigns" kpis={kpis}>
      <ModuleToolbar
        search={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Status",
            key: "status",
            options: [
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Paused", value: "paused" },
              { label: "Draft", value: "draft" },
            ],
            onChange: (v) => setFilter(v as typeof filter),
          },
        ]}
        onAdd={onAdd}
        onExport={onExport}
        onImport={onImport}
      />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered && filtered.length > 0 ? (
              filtered.map((r) => {
                if (!r) return null
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.channel}</TableCell>
                    <TableCell className="text-right">₹{r.budget.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "active" ? "default" : r.status === "paused" ? "secondary" : "outline"}>
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(r)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => onDelete(r.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Campaign" : "Add Campaign"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="adid">Campaign ID</Label>
              <Input
                id="adid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adname">Name</Label>
              <Input
                id="adname"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adch">Channel</Label>
              <Input
                id="adch"
                value={editing?.channel ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, channel: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adbud">Budget</Label>
              <Input
                id="adbud"
                type="number"
                value={editing?.budget ?? 0}
                onChange={(e) => setEditing((p) => (p ? { ...p, budget: Number(e.target.value) } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="adstat">Status (draft | active | paused)</Label>
              <Input
                id="adstat"
                value={editing?.status ?? "draft"}
                onChange={(e) =>
                  setEditing((p) => (p ? { ...p, status: (e.target.value as Campaign["status"]) || "draft" } : p))
                }
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModuleShell>
  )
}
