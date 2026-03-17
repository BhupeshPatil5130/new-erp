"use client"

import { useMemo, useState } from "react"
import { ModuleShell } from "@/components/module-shell"
import { ModuleToolbar } from "@/components/module-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { arrayToCsv, downloadCsv, parseCsv } from "@/lib/csv"
import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Teacher = {
  id: string
  name: string
  subject: string
  phone: string
  email: string
}

const initialRows: Teacher[] = [
  { id: "T-101", name: "Priya Mehta", subject: "Math", phone: "9876000001", email: "priya.mehta@example.com" },
  { id: "T-102", name: "Rahul Verma", subject: "English", phone: "9876000002", email: "rahul.verma@example.com" },
]

export default function TeachersPage() {
  const [rows, setRows] = useState<Teacher[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Teacher | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q || r.name.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Total Teachers", value: rows.length },
    { label: "Subjects", value: new Set(rows.map((r) => r.subject)).size },
  ]

  const onAdd = () => {
    setEditing({ id: "", name: "", subject: "", phone: "", email: "" })
    setOpen(true)
  }
  const onEdit = (r: Teacher) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `T-${Math.floor(100 + Math.random() * 900)}`
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
  const onExport = () => downloadCsv("teachers.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: Teacher[] = rowsCsv.map((r) => ({
      id: r.id || `T-${Math.floor(100 + Math.random() * 900)}`,
      name: r.name || "",
      subject: r.subject || "",
      phone: r.phone || "",
      email: r.email || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Teachers" description="Manage teachers and subjects" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell>{r.phone}</TableCell>
                <TableCell className="truncate max-w-[220px]">{r.email}</TableCell>
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
            <DialogTitle>{editing?.id ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="tid">Teacher ID</Label>
              <Input
                id="tid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tname">Name</Label>
              <Input
                id="tname"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tsub">Subject</Label>
              <Input
                id="tsub"
                value={editing?.subject ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, subject: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tphone">Phone</Label>
              <Input
                id="tphone"
                value={editing?.phone ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, phone: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="temail">Email</Label>
              <Input
                id="temail"
                type="email"
                value={editing?.email ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, email: e.target.value } : p))}
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
