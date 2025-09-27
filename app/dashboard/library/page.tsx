"use client"

import { DialogClose } from "@/components/ui/dialog"

import { useMemo, useState } from "react"
import { EllipsisVertical, BookOpen } from "lucide-react"
import { ModuleShell } from "@/components/module-shell"
import { ModuleToolbar } from "@/components/module-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { arrayToCsv, downloadCsv, parseCsv } from "@/lib/csv"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type BookRow = { id: string; title: string; author: string; isbn: string; copies: number }

const initialRows: BookRow[] = [
  { id: "B-001", title: "The Little Prince", author: "Antoine de Saint‑Exupéry", isbn: "9780156012195", copies: 5 },
  { id: "B-002", title: "Charlotte's Web", author: "E. B. White", isbn: "9780064400558", copies: 3 },
]

export default function LibraryPage() {
  const [rows, setRows] = useState<BookRow[]>(initialRows)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<BookRow | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return rows.filter(
      (r) =>
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.isbn.toLowerCase().includes(q),
    )
  }, [rows, search])

  const kpis = [
    { label: "Titles", value: rows.length },
    { label: "Total Copies", value: rows.reduce((s, r) => s + (r.copies || 0), 0) },
  ]

  const onAdd = () => {
    setEditing({ id: "", title: "", author: "", isbn: "", copies: 1 })
    setOpen(true)
  }

  const onEdit = (r: BookRow) => {
    setEditing({ ...r })
    setOpen(true)
  }

  const onSave = () => {
    if (!editing) return
    const next = { ...editing }
    if (!next.id)
      next.id = `B-${Math.floor(1 + Math.random() * 999)
        .toString()
        .padStart(3, "0")}`
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

  const onExport = () => {
    const csv = arrayToCsv(rows, ["id", "title", "author", "isbn", "copies"])
    downloadCsv("library.csv", csv)
  }

  const onImport = (text: string) => {
    const records = parseCsv(text)
    const mapped: BookRow[] = records.map((r) => ({
      id:
        r.id ||
        `B-${Math.floor(1 + Math.random() * 999)
          .toString()
          .padStart(3, "0")}`,
      title: r.title || "",
      author: r.author || "",
      isbn: r.isbn || "",
      copies: Number(r.copies || 1),
    }))
    setRows((prev) => {
      const existingIds = new Set(prev.map((p) => p.id))
      const unique = mapped.filter((m) => !existingIds.has(m.id))
      return [...prev, ...unique]
    })
  }

  return (
    <div className="p-4">
      <ModuleShell
        title="Library"
        description="Manage books, authors and copies"
        icon={(props) => <BookOpen {...props} />}
        kpis={kpis}
        toolbar={
          <ModuleToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={onAdd}
            onExport={onExport}
            onImport={onImport}
          />
        }
      >
        <div className="p-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Copies</TableHead>
                <TableHead className="w-10 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{r.author}</TableCell>
                  <TableCell className="truncate max-w-[240px]">{r.isbn}</TableCell>
                  <TableCell className="text-right">{r.copies}</TableCell>
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
      </ModuleShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Book" : "Add Book"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="bid">Book ID</Label>
              <Input
                id="bid"
                value={editing?.id ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, id: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="btitle">Title</Label>
              <Input
                id="btitle"
                value={editing?.title ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, title: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bauthor">Author</Label>
              <Input
                id="bauthor"
                value={editing?.author ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, author: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="bisbn">ISBN</Label>
              <Input
                id="bisbn"
                value={editing?.isbn ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, isbn: e.target.value } : p))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bcopies">Copies</Label>
              <Input
                id="bcopies"
                type="number"
                value={editing?.copies ?? 1}
                onChange={(e) => setEditing((p) => (p ? { ...p, copies: Number(e.target.value) } : p))}
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
    </div>
  )
}
