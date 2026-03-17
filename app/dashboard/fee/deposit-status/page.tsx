"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, Download } from "lucide-react"

// Mock data for deposit status
const depositData = [
  {
    id: "DEP001",
    studentId: "STU1001",
    name: "John Smith",
    amount: "₹25,000",
    date: "2023-04-10",
    paymentMode: "Online",
    transactionId: "TXN78945612",
    status: "Completed",
  },
  {
    id: "DEP002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    amount: "₹20,000",
    date: "2023-04-09",
    paymentMode: "Cheque",
    transactionId: "CHQ123456",
    status: "Pending",
  },
  {
    id: "DEP003",
    studentId: "STU1003",
    name: "Michael Brown",
    amount: "₹15,000",
    date: "2023-04-08",
    paymentMode: "Cash",
    transactionId: "CSH78945614",
    status: "Completed",
  },
  {
    id: "DEP004",
    studentId: "STU1004",
    name: "Emily Davis",
    amount: "₹30,000",
    date: "2023-04-07",
    paymentMode: "Online",
    transactionId: "TXN78945615",
    status: "Failed",
  },
  {
    id: "DEP005",
    studentId: "STU1005",
    name: "David Wilson",
    amount: "₹18,000",
    date: "2023-04-06",
    paymentMode: "Cash",
    transactionId: "CSH78945616",
    status: "Completed",
  },
]

export default function DepositStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(depositData)

  const handleSearch = () => {
    const filtered = depositData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Deposit Status</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter deposit records by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex gap-2 items-center">
                <Input id="date-from" type="date" />
                <span>to</span>
                <Input id="date-to" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-mode">Payment Mode</Label>
              <Select>
                <SelectTrigger id="payment-mode">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Deposit Records</CardTitle>
          <CardDescription>View and manage all deposit records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
          <div className="rounded-md border min-w-[700px]">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deposit ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell>{deposit.id}</TableCell>
                  <TableCell>{deposit.studentId}</TableCell>
                  <TableCell>{deposit.name}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell>{deposit.date}</TableCell>
                  <TableCell>{deposit.paymentMode}</TableCell>
                  <TableCell>{deposit.transactionId}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        deposit.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : deposit.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {deposit.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
