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

type Course = { id: string; title: string; category: string; lessons: number; link: string }

const initialRows: Course[] = [
  {
    id: "C-101",
    title: "Phonics Basics",
    category: "Language",
    lessons: 12,
    link: "https://example.com/course/phonics",
  },
  { id: "C-102", title: "Numbers 1-20", category: "Math", lessons: 10, link: "https://example.com/course/numbers" },
]

export default function LmsPage() {
  const [rows, setRows] = useState<Course[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Course | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Courses", value: rows.length },
    { label: "Categories", value: new Set(rows.map((r) => r.category)).size },
  ]

  const onAdd = () => {
    setEditing({ id: "", title: "", category: "", lessons: 1, link: "" })
    setOpen(true)
  }
  const onEdit = (r: Course) => {
    setEditing({ ...r })
    setOpen(true)
  }
  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id) next.id = `C-${Math.floor(100 + Math.random() * 900)}`
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
  const onExport = () => downloadCsv("lms_courses.csv", arrayToCsv(rows))
  const onImport = (text: string) => {
    const rowsCsv = parseCsv<Record<string, string>>(text)
    const mapped: Course[] = rowsCsv.map((r) => ({
      id: r.id || `C-${Math.floor(100 + Math.random() * 900)}`,
      title: r.title || "",
      category: r.category || "",
      lessons: Number(r.lessons || 1),
      link: r.link || "",
    }))
    setRows((prev) => [...prev, ...mapped.filter((m) => !prev.some((p) => p.id === m.id))])
  }

  return (
    <ModuleShell title="LMS" description="Manage courses and lessons" kpis={kpis}>
      <ModuleToolbar search={search} onSearchChange={setSearch} onAdd={onAdd} onExport={onExport} onImport={onImport} />
      <div className="p-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Lessons</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell className="text-right">{r.lessons}</TableCell>
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
            <DialogTitle>{editing?.id ? "Edit Course" : "Add Course"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cid">Course ID</Label>
              <Input
                id="cid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ctitle">Title</Label>
              <Input
                id="ctitle"
                value={editing?.title ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, title: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ccat">Category</Label>
              <Input
                id="ccat"
                value={editing?.category ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, category: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cless">Lessons</Label>
              <Input
                id="cless"
                type="number"
                value={editing?.lessons ?? 1}
                onChange={(e) => setEditing((p) => (p ? { ...p, lessons: Number(e.target.value) } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="clink">Link</Label>
              <Input
                id="clink"
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
