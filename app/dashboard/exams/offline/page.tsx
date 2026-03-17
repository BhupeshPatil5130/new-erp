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

type Exam = { id: string; name: string; class: string; date: string; room: string }

const initialRows: Exam[] = [
  { id: "EX-01", name: "Midterm", class: "LKG", date: "2024-06-15", room: "A101" },
  { id: "EX-02", name: "Final", class: "UKG", date: "2024-12-10", room: "B203" },
]

export default function OfflineExamsPage() {
  const [rows, setRows] = useState<Exam[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Exam | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q || r.name.toLowerCase().includes(q) || r.class.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Total Exams", value: rows.length },
    { label: "Classes", value: new Set(rows.map((r) => r.class)).size },
  ]

  const onAdd = () => {
    setEditing({ id: "", name: "", class: "", date: new Date().toISOString().slice(0, 10), room: "" })
    setOpen(true)
  }
  const onEdit = (r: Exam) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `EX-${Math.floor(10 + Math.random() * 90)}`
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
  const onExport = () => downloadCsv("exams_offline.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: Exam[] = rowsCsv.map((r) => ({
      id: r.id || `EX-${Math.floor(10 + Math.random() * 90)}`,
      name: r.name || "",
      class: r.class || "",
      date: r.date || new Date().toISOString().slice(0, 10),
      room: r.room || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Exams (Offline)" description="Manage offline exams schedule and rooms" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Room</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.class}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.room}</TableCell>
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
            <DialogTitle>{editing?.id ? "Edit Exam" : "Add Exam"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="eid">Exam ID</Label>
              <Input
                id="eid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ename">Name</Label>
              <Input
                id="ename"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="eclass">Class</Label>
              <Input
                id="eclass"
                value={editing?.class ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, class: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edate">Date</Label>
              <Input
                id="edate"
                type="date"
                value={editing?.date ?? new Date().toISOString().slice(0, 10)}
                onChange={(e) => setEditing((p) => (p ? { ...p, date: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="eroom">Room</Label>
              <Input
                id="eroom"
                value={editing?.room ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, room: e.target.value } : p))}
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
