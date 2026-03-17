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

type Visitor = { id: string; name: string; purpose: string; inTime: string; outTime?: string }

const initialRows: Visitor[] = [
  {
    id: "V-1001",
    name: "Anita Desai",
    purpose: "Meeting Principal",
    inTime: "2024-06-10 10:00",
    outTime: "2024-06-10 10:30",
  },
]

export default function VisitorsPage() {
  const [rows, setRows] = useState<Visitor[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Visitor | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q || r.name.toLowerCase().includes(q) || r.purpose.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Visitors Today", value: rows.length },
    { label: "Checked Out", value: rows.filter((r) => !!r.outTime).length },
  ]

  const onAdd = () => {
    setEditing({ id: "", name: "", purpose: "", inTime: new Date().toISOString().slice(0, 16).replace("T", " ") })
    setOpen(true)
  }
  const onEdit = (r: Visitor) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `V-${Math.floor(1000 + Math.random() * 9000)}`
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
  const onExport = () => downloadCsv("visitors.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: Visitor[] = rowsCsv.map((r) => ({
      id: r.id || `V-${Math.floor(1000 + Math.random() * 9000)}`,
      name: r.name || "",
      purpose: r.purpose || "",
      inTime: r.inTime || new Date().toISOString().slice(0, 16).replace("T", " "),
      outTime: r.outTime || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Visitor Management" description="Track visitor entries and exits" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>In</TableHead>
              <TableHead>Out</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.purpose}</TableCell>
                <TableCell>{r.inTime}</TableCell>
                <TableCell>{r.outTime || "-"}</TableCell>
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
            <DialogTitle>{editing?.id ? "Edit Visitor" : "Add Visitor"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="vid">Visitor ID</Label>
              <Input
                id="vid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vname">Name</Label>
              <Input
                id="vname"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="vpurpose">Purpose</Label>
              <Input
                id="vpurpose"
                value={editing?.purpose ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, purpose: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vin">In Time</Label>
              <Input
                id="vin"
                value={editing?.inTime ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, inTime: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vout">Out Time</Label>
              <Input
                id="vout"
                value={editing?.outTime ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, outTime: e.target.value } : p))}
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
