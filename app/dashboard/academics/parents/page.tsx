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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"

type Parent = {
  id: string
  name: string
  studentId: string
  phone: string
  email: string
  relation: string
}

const initialRows: Parent[] = [
  {
    id: "P-201",
    name: "Rohit Sharma",
    studentId: "STU-1001",
    phone: "9876100001",
    email: "rohit.s@example.com",
    relation: "Father",
  },
  {
    id: "P-202",
    name: "Neha Gupta",
    studentId: "STU-1003",
    phone: "9876100002",
    email: "neha.g@example.com",
    relation: "Mother",
  },
]

export default function ParentsPage() {
  const [rows, setRows] = useState<Parent[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Parent | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.relation.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Total Parents", value: rows.length },
    { label: "Unique Students", value: new Set(rows.map((r) => r.studentId)).size },
  ]

  const onAdd = () => {
    setEditing({ id: "", name: "", studentId: "", phone: "", email: "", relation: "" })
    setOpen(true)
  }
  const onEdit = (r: Parent) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `P-${Math.floor(200 + Math.random() * 900)}`
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
  const onExport = () => downloadCsv("parents.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: Parent[] = rowsCsv.map((r) => ({
      id: r.id || `P-${Math.floor(200 + Math.random() * 900)}`,
      name: r.name || "",
      studentId: r.studentId || "",
      phone: r.phone || "",
      email: r.email || "",
      relation: r.relation || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Parents" description="Manage parent contacts and relationships" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Relation</TableHead>
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
                <TableCell>{r.studentId}</TableCell>
                <TableCell>{r.relation}</TableCell>
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
                <TableCell colSpan={7} className="text-center text-muted-foreground">
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
            <DialogTitle>{editing?.id ? "Edit Parent" : "Add Parent"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="pid">Parent ID</Label>
              <Input
                id="pid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pname">Name</Label>
              <Input
                id="pname"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="psid">Student ID</Label>
              <Input
                id="psid"
                value={editing?.studentId ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, studentId: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prel">Relation</Label>
              <Input
                id="prel"
                value={editing?.relation ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, relation: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pphone">Phone</Label>
              <Input
                id="pphone"
                value={editing?.phone ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, phone: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="pemail">Email</Label>
              <Input
                id="pemail"
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
