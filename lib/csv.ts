export type CsvColumn<T> = { key: keyof T | string; header: string }

function escapeCsv(val: unknown) {
  const s = val == null ? "" : String(val)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportToCsv<T>(filename: string, columns: CsvColumn<T>[], rows: T[]) {
  const header = columns.map((c) => escapeCsv(c.header)).join(",")
  const lines = rows.map((row) => columns.map((c) => escapeCsv((row as any)[c.key as any])).join(","))
  const csv = [header, ...lines].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Add the missing functions that are being imported
export function arrayToCsv<T extends Record<string, any>>(rows: T[], columns?: (keyof T)[]): string {
  if (rows.length === 0) return ""
  
  const keys = columns || Object.keys(rows[0]) as (keyof T)[]
  const headers = keys.map(key => String(key))
  const csvRows = rows.map(row => 
    keys.map(key => escapeCsv(row[key])).join(",")
  )
  
  return [headers.join(","), ...csvRows].join("\n")
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function parseCsv<T extends Record<string, string>>(text: string): T[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return []
  const headers = splitCsvLine(lines[0])
  const out: T[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i])
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? ""
    })
    out.push(obj as T)
  }
  return out
}

function splitCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}
