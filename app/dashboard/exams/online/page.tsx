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

type OnlineExam = { id: string; name: string; subject: string; date: string; link: string }

const initialRows: OnlineExam[] = [
  { id: "OE-01", name: "Weekly Quiz", subject: "Math", date: "2024-07-05", link: "https://example.com/exam/1" },
]

export default function OnlineExamsPage() {
  const [rows, setRows] = useState<OnlineExam[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<OnlineExam | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q || r.name.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Online Exams", value: rows.length },
    { label: "Subjects", value: new Set(rows.map((r) => r.subject)).size },
  ]

  const onAdd = () => {
    setEditing({ id: "", name: "", subject: "", date: new Date().toISOString().slice(0, 10), link: "" })
    setOpen(true)
  }
  const onEdit = (r: OnlineExam) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `OE-${Math.floor(10 + Math.random() * 90)}`
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
  const onExport = () => downloadCsv("exams_online.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: OnlineExam[] = rowsCsv.map((r) => ({
      id: r.id || `OE-${Math.floor(10 + Math.random() * 90)}`,
      name: r.name || "",
      subject: r.subject || "",
      date: r.date || new Date().toISOString().slice(0, 10),
      link: r.link || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="Exams (Online)" description="Manage online exams and access links" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell className="truncate max-w-[260px]">
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {r.link}
                  </a>
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
            <DialogTitle>{editing?.id ? "Edit Online Exam" : "Add Online Exam"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="oeid">Exam ID</Label>
              <Input
                id="oeid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="oename">Name</Label>
              <Input
                id="oename"
                value={editing?.name ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="oesub">Subject</Label>
              <Input
                id="oesub"
                value={editing?.subject ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, subject: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="oedate">Date</Label>
              <Input
                id="oedate"
                type="date"
                value={editing?.date ?? new Date().toISOString().slice(0, 10)}
                onChange={(e) => setEditing((p) => (p ? { ...p, date: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="oelink">Link</Label>
              <Input
                id="oelink"
                value={editing?.link ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, link: e.target.value } : p))}
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
