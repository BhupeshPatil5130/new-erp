"use client"

import * as React from "react"
import { Camera, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ModuleShell } from "@/components/module-shell"
import { exportToCsv, parseCsv } from "@/lib/csv"

type CameraStatus = "Online" | "Offline"

type CCTVCamera = {
  id: string
  name: string
  zone: string
  status: CameraStatus
  lastActive: string
  enabled: boolean
  url: string
}

const initialCams: CCTVCamera[] = [
  {
    id: "CAM-1",
    name: "Gate Entrance",
    zone: "Main Gate",
    status: "Online",
    lastActive: "Just now",
    enabled: true,
    url: "/gate-entrance.png",
  },
  {
    id: "CAM-2",
    name: "Play Area",
    zone: "Block A",
    status: "Online",
    lastActive: "Just now",
    enabled: true,
    url: "/play-area.png",
  },
  {
    id: "CAM-3",
    name: "Corridor",
    zone: "Science Wing",
    status: "Offline",
    lastActive: "2h ago",
    enabled: false,
    url: "/corridor.png",
  },
  {
    id: "CAM-4",
    name: "Reception",
    zone: "Admin",
    status: "Online",
    lastActive: "5m ago",
    enabled: true,
    url: "/elegant-hotel-reception.png",
  },
]

export default function CCTVLivePage() {
  const [cams, setCams] = React.useState<CCTVCamera[]>(initialCams)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const [editOpen, setEditOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState<CCTVCamera>({
    id: "",
    name: "",
    zone: "",
    status: "Online",
    lastActive: "Just now",
    enabled: true,
    url: "/cctv-camera-placeholder.png",
  })

  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim()
    return cams.filter((c) => {
      const matchesQ = !q || c.name.toLowerCase().includes(q) || c.zone.toLowerCase().includes(q)
      const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter
      return matchesQ && matchesStatus
    })
  }, [cams, search, statusFilter])

  const onlineCount = cams.filter((c) => c.status === "Online").length
  const offlineCount = cams.filter((c) => c.status === "Offline").length

  const openAdd = () => {
    setEditingId(null)
    setDraft({
      id: "",
      name: "",
      zone: "",
      status: "Online",
      lastActive: "Just now",
      enabled: true,
      url: "/cctv-camera-placeholder.png",
    })
    setEditOpen(true)
  }

  const openEdit = (id: string) => {
    const cam = cams.find((c) => c.id === id)
    if (!cam) return
    setEditingId(id)
    setDraft(cam)
    setEditOpen(true)
  }

  const saveCam = () => {
    if (!draft.name.trim()) return
    if (editingId === null) {
      const newItem: CCTVCamera = { ...draft, id: `CAM-${randomId()}` }
      setCams((prev) => [newItem, ...prev])
    } else {
      setCams((prev) => prev.map((c) => (c.id === editingId ? { ...draft } : c)))
    }
    setEditOpen(false)
  }

  const deleteCam = () => {
    if (!deleteId) return
    setCams((prev) => prev.filter((c) => c.id !== deleteId))
    setDeleteId(null)
  }

  const toggleEnabled = (id: string, enabled: boolean) => {
    setCams((prev) => prev.map((c) => (c.id === id ? { ...c, enabled } : c)))
  }

  const handleExport = () => {
    exportToCsv<CCTVCamera>(
      "cctv-cameras.csv",
      [
        { key: "id", header: "id" },
        { key: "name", header: "name" },
        { key: "zone", header: "zone" },
        { key: "status", header: "status" },
        { key: "lastActive", header: "lastActive" },
      ],
      filtered,
    )
  }

  const handleImport = (text: string) => {
    const items = parseCsv<Record<string, string>>(text).map((r) => {
      const status: CameraStatus = (r.status || "").toLowerCase() === "offline" ? "Offline" : "Online"
      const id = r.id && r.id.trim().length ? r.id : `CAM-${randomId()}`
      return {
        id,
        name: r.name || "",
        zone: r.zone || "",
        status,
        lastActive: r.lastActive || "Just now",
        enabled: true,
        url: "/cctv-camera-placeholder.png",
      } as CCTVCamera
    })
    setCams((prev) => [...items, ...prev])
  }

  return (
    <>
      <ModuleShell
        title="CCTV Live"
        description="Monitor live streams, toggle availability, and manage camera endpoints."
        icon={Camera}
        kpis={[
          { label: "Cameras", value: cams.length },
          { label: "Online", value: onlineCount },
          { label: "Offline", value: offlineCount },
        ]}
        toolbar={
          <ModuleShell.Toolbar
            search={search}
            onSearchChange={setSearch}
            placeholder="Search camera or zone"
            onExport={handleExport}
            onImport={handleImport}
            onAdd={openAdd}
            filters={[
              {
                label: "Status",
                key: "status",
                options: [
                  { label: "All", value: "all" },
                  { label: "Online", value: "online" },
                  { label: "Offline", value: "offline" },
                ],
                onChange: setStatusFilter,
              },
            ]}
          />
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-lg border">
              <div className="flex items-center justify-between border-b px-3 py-2">
                <div className="space-y-0.5">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.zone}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={c.status === "Online" ? "default" : "secondary"}>{c.status}</Badge>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`switch-${c.id}`} className="text-xs text-muted-foreground">
                      {c.enabled ? "On" : "Off"}
                    </Label>
                    <Switch id={`switch-${c.id}`} checked={c.enabled} onCheckedChange={(v) => toggleEnabled(c.id, v)} />
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-muted">
                <img
                  src={c.url || "/placeholder.svg?height=360&width=640&query=cctv-stream"}
                  alt={c.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="text-xs text-muted-foreground">Last active: {c.lastActive}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(c.id)}>
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 bg-transparent"
                    onClick={() => setDeleteId(c.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" disabled={!c.enabled}>
                    Open
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 ? (
            <div className="col-span-full py-10 text-center text-sm text-muted-foreground">No cameras found.</div>
          ) : null}
        </div>
      </ModuleShell>

      {/* Add/Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Camera" : "Add Camera"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="zone">Zone</Label>
              <Input id="zone" value={draft.zone} onChange={(e) => setDraft((d) => ({ ...d, zone: e.target.value }))} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="h-9 rounded-md border bg-background px-3 text-sm"
                value={draft.status}
                onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as CameraStatus }))}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="lastActive">Last Active</Label>
              <Input
                id="lastActive"
                value={draft.lastActive}
                onChange={(e) => setDraft((d) => ({ ...d, lastActive: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="url">Stream Thumbnail URL</Label>
              <Input
                id="url"
                value={draft.url}
                onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
                placeholder="/cctv-camera-placeholder.png"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCam}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this camera?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={deleteCam}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function randomId() {
  try {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return String(arr[0])
  } catch {
    return String(Math.floor(Math.random() * 1e9))
  }
}
