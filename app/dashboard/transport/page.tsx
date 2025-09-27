"use client"

import { useMemo, useState } from "react"
import { BusFront, Pencil, Trash2 } from "lucide-react"
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
import { ModuleShell, type Column } from "@/components/module-shell"
import { exportToCsv, parseCsv } from "@/lib/csv"

type RouteRow = {
  id: string
  route: string
  driver: string
  vehicle: string
  students: number
  status: "Active" | "Paused"
}

const initialRows: RouteRow[] = [
  { id: "R-01", route: "South Zone", driver: "Ajay Verma", vehicle: "MH12AB1234", students: 42, status: "Active" },
  { id: "R-02", route: "North Zone", driver: "N. Khan", vehicle: "MH12AB9876", students: 37, status: "Active" },
  { id: "R-03", route: "East Zone", driver: "S. Patel", vehicle: "MH12AB4567", students: 0, status: "Paused" },
]

export default function TransportPage() {
  const [rows, setRows] = useState<RouteRow[]>(initialRows)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [editOpen, setEditOpen] = useState(false)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [draft, setDraft] = useState<RouteRow>({
    id: "",
    route: "",
    driver: "",
    vehicle: "",
    students: 0,
    status: "Active",
  })

  const [deleteIdx, setDeleteIdx] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter((r) => {
      const matchesQ =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.route.toLowerCase().includes(q) ||
        r.driver.toLowerCase().includes(q) ||
        r.vehicle.toLowerCase().includes(q)
      const matchesStatus = statusFilter === "all" || r.status.toLowerCase() === statusFilter
      return matchesQ && matchesStatus
    })
  }, [rows, search, statusFilter])

  const columns: Column<RouteRow>[] = [
    { key: "id", header: "ID" },
    { key: "route", header: "Route" },
    { key: "driver", header: "Driver" },
    { key: "vehicle", header: "Vehicle" },
    { key: "students", header: "Students", align: "right" },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge variant={r.status === "Active" ? "default" : "secondary"}>{r.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_r, i) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setEditIdx(i)
              setDraft(rows[i])
              setEditOpen(true)
            }}
            aria-label="Edit"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setDeleteIdx(i)} aria-label="Delete" title="Delete">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ]

  const onSave = () => {
    if (editIdx === null) {
      const id = draft.id || `R-${Math.floor(100 + Math.random() * 900)}`
      setRows((prev) => [{ ...draft, id }, ...prev])
    } else {
      setRows((prev) => prev.map((r, i) => (i === editIdx ? { ...draft } : r)))
    }
    setEditOpen(false)
    setEditIdx(null)
    setDraft({ id: "", route: "", driver: "", vehicle: "", students: 0, status: "Active" })
  }

  const onExport = () =>
    exportToCsv<RouteRow>(
      "transport.csv",
      [
        { key: "id", header: "id" },
        { key: "route", header: "route" },
        { key: "driver", header: "driver" },
        { key: "vehicle", header: "vehicle" },
        { key: "students", header: "students" },
        { key: "status", header: "status" },
      ],
      filtered,
    )

  const onImport = (text: string) => {
    const parsed = parseCsv<Record<string, string>>(text)
    const mapped: RouteRow[] = parsed.map((r) => ({
      id: r.id || `R-${Math.floor(100 + Math.random() * 900)}`,
      route: r.route || "",
      driver: r.driver || "",
      vehicle: r.vehicle || "",
      students: Number(r.students || 0),
      status: (r.status || "").toLowerCase() === "paused" ? "Paused" : "Active",
    }))
    setRows((prev) => {
      const seen = new Set(prev.map((p) => p.id))
      const toAdd = mapped.filter((m) => !seen.has(m.id))
      return [...prev, ...toAdd]
    })
  }

  return (
    <>
      <ModuleShell
        title="Transport"
        description="Manage bus routes, vehicles, drivers and daily operations."
        icon={(p) => <BusFront {...p} />}
        kpis={[
          { label: "Active Routes", value: rows.filter((r) => r.status === "Active").length },
          { label: "Vehicles", value: new Set(rows.map((r) => r.vehicle)).size },
          { label: "Total Students", value: rows.reduce((s, r) => s + (r.students || 0), 0) },
        ]}
        toolbar={
          <ModuleShell.Toolbar
            search={search}
            onSearchChange={setSearch}
            placeholder="Search ID, route, driver, vehicle"
            onAdd={() => {
              setEditIdx(null)
              setDraft({ id: "", route: "", driver: "", vehicle: "", students: 0, status: "Active" })
              setEditOpen(true)
            }}
            onExport={onExport}
            onImport={onImport}
            filters={[
              {
                label: "Status",
                key: "status",
                value: statusFilter,
                options: [
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Paused", value: "paused" },
                ],
                onChange: setStatusFilter,
              },
            ]}
          />
        }
        table={{
          columns,
          data: filtered,
          empty: "No routes found. Click Add to create one.",
          rowKey: (r) => (r as RouteRow).id,
        }}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editIdx === null ? "Add Route" : "Edit Route"}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="id">ID</Label>
              <Input id="id" value={draft.id} onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                value={draft.route}
                onChange={(e) => setDraft((d) => ({ ...d, route: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="driver">Driver</Label>
              <Input
                id="driver"
                value={draft.driver}
                onChange={(e) => setDraft((d) => ({ ...d, driver: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input
                id="vehicle"
                value={draft.vehicle}
                onChange={(e) => setDraft((d) => ({ ...d, vehicle: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="students">Students</Label>
              <Input
                id="students"
                type="number"
                value={draft.students}
                onChange={(e) => setDraft((d) => ({ ...d, students: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={draft.status}
                onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as RouteRow["status"] }))}
              >
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={deleteIdx !== null} onOpenChange={(open) => !open && setDeleteIdx(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this route?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (deleteIdx !== null) {
                  setRows((prev) => prev.filter((_, i) => i !== deleteIdx))
                }
                setDeleteIdx(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
