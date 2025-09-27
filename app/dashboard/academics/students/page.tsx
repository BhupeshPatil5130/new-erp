"use client"

import * as React from "react"
import { GraduationCap, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ModuleShell, type ModuleColumn } from "@/components/module-shell"
import { exportToCsv, parseCsv } from "@/lib/csv"

type Status = "Active" | "Inactive"

type StudentRecord = {
  id: string
  name: string
  class: string
  section: string
  roll: string
  status: Status
  guardian: string
}

const initialStudents: StudentRecord[] = [
  {
    id: "STU-1001",
    name: "Aadhya Sharma",
    class: "Play Group",
    section: "A",
    roll: "01",
    status: "Active",
    guardian: "Rahul Sharma",
  },
  {
    id: "STU-1002",
    name: "Vihaan Patel",
    class: "Nursery",
    section: "B",
    roll: "07",
    status: "Active",
    guardian: "Meera Patel",
  },
  {
    id: "STU-1003",
    name: "Anaya Rao",
    class: "LKG",
    section: "A",
    roll: "03",
    status: "Inactive",
    guardian: "Kiran Rao",
  },
]

export default function StudentsPage() {
  const [rows, setRows] = React.useState<StudentRecord[]>(initialStudents)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [classFilter, setClassFilter] = React.useState("all")

  const [editOpen, setEditOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState<StudentRecord>({
    id: "",
    name: "",
    class: "Play Group",
    section: "A",
    roll: "",
    status: "Active",
    guardian: "",
  })
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter((r) => {
      const matchesQ = !q || r.name.toLowerCase().includes(q) || r.roll.toLowerCase().includes(q)
      const matchesStatus = statusFilter === "all" || r.status.toLowerCase() === statusFilter
      const matchesClass = classFilter === "all" || r.class.toLowerCase() === classFilter
      return matchesQ && matchesStatus && matchesClass
    })
  }, [rows, search, statusFilter, classFilter])

  const columns: ModuleColumn<StudentRecord>[] = [
    { key: "name", header: "Student" },
    { key: "class", header: "Class" },
    { key: "section", header: "Section" },
    { key: "roll", header: "Roll" },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge variant={r.status === "Active" ? "default" : "secondary"}>{r.status}</Badge>,
    },
    { key: "guardian", header: "Guardian" },
    {
      key: "actions",
      header: "Actions",
      render: (_row, idx) => {
        const row = filtered[idx]
        return (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => openEdit(row.id)} aria-label={`Edit ${row.name}`}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-600"
              onClick={() => setDeleteId(row.id)}
              aria-label={`Delete ${row.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const openAdd = () => {
    setEditingId(null)
    setDraft({
      id: "",
      name: "",
      class: "Play Group",
      section: "A",
      roll: "",
      status: "Active",
      guardian: "",
    })
    setEditOpen(true)
  }

  const openEdit = (id: string) => {
    const row = rows.find((r) => r.id === id)
    if (!row) return
    setEditingId(id)
    setDraft(row)
    setEditOpen(true)
  }

  const saveRow = () => {
    if (!draft.name.trim()) return
    if (editingId === null) {
      const next: StudentRecord = { ...draft, id: `STU-${Date.now()}` }
      setRows((prev) => [next, ...prev])
    } else {
      setRows((prev) => prev.map((r) => (r.id === editingId ? { ...draft } : r)))
    }
    setEditOpen(false)
  }

  const deleteRow = () => {
    if (!deleteId) return
    setRows((prev) => prev.filter((r) => r.id !== deleteId))
    setDeleteId(null)
  }

  const handleExport = () => {
    exportToCsv<StudentRecord>(
      "students.csv",
      [
        { key: "id", header: "id" },
        { key: "name", header: "name" },
        { key: "class", header: "class" },
        { key: "section", header: "section" },
        { key: "roll", header: "roll" },
        { key: "status", header: "status" },
        { key: "guardian", header: "guardian" },
      ],
      filtered,
    )
  }

  const handleImport = (text: string) => {
    const items = parseCsv<Record<string, string>>(text).map((r) => {
      const status: Status = (r.status || "").toLowerCase() === "inactive" ? "Inactive" : "Active"
      const id = r.id && r.id.trim().length ? r.id : `STU-${cryptoRandomId()}`
      return {
        id,
        name: r.name || "",
        class: r.class || "Play Group",
        section: r.section || "A",
        roll: r.roll || "",
        status,
        guardian: r.guardian || "",
      } as StudentRecord
    })
    setRows((prev) => [...items, ...prev])
  }

  return (
    <>
      <ModuleShell<StudentRecord>
        title="Students"
        description="Manage student records, enrollment details, and guardians."
        icon={GraduationCap}
        kpis={[
          { label: "Total", value: rows.length },
          { label: "Active", value: rows.filter((r) => r.status === "Active").length },
          { label: "Inactive", value: rows.filter((r) => r.status === "Inactive").length },
        ]}
        toolbar={
          <ModuleShell.Toolbar
            search={search}
            onSearchChange={setSearch}
            placeholder="Search name or roll no."
            onExport={handleExport}
            onImport={handleImport}
            onAdd={openAdd}
            filters={[
              {
                label: "Status",
                key: "status",
                options: [
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ],
                onChange: setStatusFilter,
              },
              {
                label: "Class",
                key: "class",
                options: [
                  { label: "All", value: "all" },
                  { label: "Play Group", value: "play group" },
                  { label: "Nursery", value: "nursery" },
                  { label: "LKG", value: "lkg" },
                  { label: "UKG", value: "ukg" },
                ],
                onChange: setClassFilter,
              },
            ]}
          />
        }
        table={{
          columns,
          data: filtered,
          empty: "No students found.",
          rowKey: (r) => r.id,
        }}
      />

      {/* Add/Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Student" : "Add Student"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label htmlFor="class">Class</Label>
                <select
                  id="class"
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  value={draft.class}
                  onChange={(e) => setDraft((d) => ({ ...d, class: e.target.value }))}
                >
                  <option>Play Group</option>
                  <option>Nursery</option>
                  <option>LKG</option>
                  <option>UKG</option>
                </select>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={draft.section}
                  onChange={(e) => setDraft((d) => ({ ...d, section: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label htmlFor="roll">Roll</Label>
                <Input
                  id="roll"
                  value={draft.roll}
                  onChange={(e) => setDraft((d) => ({ ...d, roll: e.target.value }))}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  value={draft.status}
                  onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as Status }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="guardian">Guardian</Label>
              <Input
                id="guardian"
                value={draft.guardian}
                onChange={(e) => setDraft((d) => ({ ...d, guardian: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveRow}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this student?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={deleteRow}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return String(arr[0])
  }
  return String(Math.floor(Math.random() * 1e9))
}
