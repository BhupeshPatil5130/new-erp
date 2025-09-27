"use client"

import { useMemo, useState } from "react"
import { ModuleShell } from "@/components/module-shell"
import { ModuleToolbar } from "@/components/module-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { arrayToCsv, downloadCsv } from "@/lib/csv"
import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Purchase = { id: string; item: string; qty: number; amount: number; date: string }

const initialRows: Purchase[] = [{ id: "FP-1", item: "Uniforms", qty: 50, amount: 15000, date: "2024-06-01" }]

export default function FranchisePurchasePage() {
  const [rows, setRows] = useState<Purchase[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Purchase | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter((r) => !q || r.item.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
  }, [rows, search])

  const kpis = [
    { label: "Total Orders", value: rows.length },
    { label: "Total Amount", value: `₹${rows.reduce((s, r) => s + (r.amount || 0), 0).toLocaleString()}` },
  ]

  const onAdd = () => {
    setEditing({ id: "", item: "", qty: 1, amount: 0, date: new Date().toISOString().slice(0, 10) })
    setOpen(true)
  }
  const onEdit = (r: Purchase) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `FP-${Math.floor(1 + Math.random() * 999)}`
    setRows((prev) => {
      const idx = prev.findIndex((p) => p.id === next.id)
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
  const onDelete = (id: string) => setRows((prev) => prev.filter((p) => p.id !== id))
  const onExport = () => downloadCsv("franchise_purchase.csv", arrayToCsv(rows))
  const onImport = (rowsCsv: Record<string, string>[]) => {
    const mapped: Purchase[] = rowsCsv.map((r) => ({
      id: r.id || `FP-${Math.floor(1 + Math.random() * 999)}`,
      item: r.item || "",
      qty: Number(r.qty || 1),
      amount: Number(r.amount || 0),
      date: r.date || new Date().toISOString().slice(0, 10),
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Franchise Purchase" description="Create and track franchise purchases" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.item}</TableCell>
                <TableCell className="text-right">{r.qty}</TableCell>
                <TableCell className="text-right">₹{r.amount.toLocaleString()}</TableCell>
                <TableCell>{r.date}</TableCell>
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
            ))}
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No results
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Purchase" : "Add Purchase"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="fpid">Order ID</Label>
              <Input
                id="fpid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fpitem">Item</Label>
              <Input
                id="fpitem"
                value={editing?.item ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, item: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fpqty">Qty</Label>
              <Input
                id="fpqty"
                type="number"
                value={editing?.qty ?? 1}
                onChange={(e) => setEditing((p) => (p ? { ...p, qty: Number(e.target.value) } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fpamt">Amount</Label>
              <Input
                id="fpamt"
                type="number"
                value={editing?.amount ?? 0}
                onChange={(e) => setEditing((p) => (p ? { ...p, amount: Number(e.target.value) } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="fpdate">Date</Label>
              <Input
                id="fpdate"
                type="date"
                value={editing?.date ?? new Date().toISOString().slice(0, 10)}
                onChange={(e) => setEditing((p) => (p ? { ...p, date: e.target.value } : p))}
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
