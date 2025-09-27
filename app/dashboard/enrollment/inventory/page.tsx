"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Eye, Package, ShoppingCart, Edit, Trash, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock data for inventory items
const inventoryData = [
  {
    id: "INV001",
    name: "Physics Textbook",
    category: "Books",
    quantity: 45,
    price: "₹550",
    supplier: "Academic Publishers",
    lastUpdated: "2023-04-10",
    status: "In Stock",
    description: "Standard physics textbook for first-year students",
  },
  {
    id: "INV002",
    name: "Chemistry Lab Kit",
    category: "Lab Equipment",
    quantity: 20,
    price: "₹1,200",
    supplier: "Science Supplies Co.",
    lastUpdated: "2023-04-09",
    status: "In Stock",
    description: "Complete chemistry lab kit with all necessary equipment",
  },
  {
    id: "INV003",
    name: "Laptop",
    category: "Electronics",
    quantity: 5,
    price: "₹45,000",
    supplier: "Tech Solutions",
    lastUpdated: "2023-04-08",
    status: "Low Stock",
    description: "Core i5, 8GB RAM, 512GB SSD laptops for computer lab",
  },
  {
    id: "INV004",
    name: "Student ID Card Printer",
    category: "Equipment",
    quantity: 0,
    price: "₹25,000",
    supplier: "Office Supplies Ltd.",
    lastUpdated: "2023-04-07",
    status: "Out of Stock",
    description: "High-quality ID card printer with dual-sided printing capability",
  },
  {
    id: "INV005",
    name: "Whiteboard Markers",
    category: "Stationery",
    quantity: 150,
    price: "₹25",
    supplier: "Office Supplies Ltd.",
    lastUpdated: "2023-04-06",
    status: "In Stock",
    description: "Pack of 10 whiteboard markers in assorted colors",
  },
]

// Mock data for purchase orders
const purchaseOrderData = [
  {
    id: "PO001",
    supplier: "Academic Publishers",
    items: "Physics Textbook, Mathematics Textbook",
    quantity: "50, 30",
    totalAmount: "₹52,500",
    orderDate: "2023-04-05",
    expectedDelivery: "2023-04-20",
    status: "Pending",
    notes: "Urgent order for new semester",
  },
  {
    id: "PO002",
    supplier: "Science Supplies Co.",
    items: "Chemistry Lab Kit",
    quantity: "15",
    totalAmount: "₹18,000",
    orderDate: "2023-04-03",
    expectedDelivery: "2023-04-18",
    status: "Shipped",
    notes: "Shipping via express delivery",
  },
  {
    id: "PO003",
    supplier: "Tech Solutions",
    items: "Laptop, Projector",
    quantity: "10, 5",
    totalAmount: "₹575,000",
    orderDate: "2023-03-28",
    expectedDelivery: "2023-04-15",
    status: "Delivered",
    notes: "Order received in good condition",
  },
  {
    id: "PO004",
    supplier: "Office Supplies Ltd.",
    items: "Student ID Card Printer",
    quantity: "2",
    totalAmount: "₹50,000",
    orderDate: "2023-03-25",
    expectedDelivery: "2023-04-10",
    status: "Cancelled",
    notes: "Order cancelled due to budget constraints",
  },
]

// Category options
const categoryOptions = ["Books", "Lab Equipment", "Electronics", "Equipment", "Stationery", "Furniture", "Uniforms"]

// Supplier options
const supplierOptions = [
  "Academic Publishers",
  "Science Supplies Co.",
  "Tech Solutions",
  "Office Supplies Ltd.",
  "Furniture Mart",
  "Uniform Manufacturers",
]

export default function InventoryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredInventory, setFilteredInventory] = useState(inventoryData)
  const [filteredPO, setFilteredPO] = useState(purchaseOrderData)
  const [activeTab, setActiveTab] = useState("inventory")
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const [isViewItemDialogOpen, setIsViewItemDialogOpen] = useState(false)
  const [isDeleteItemDialogOpen, setIsDeleteItemDialogOpen] = useState(false)
  const [isAddPODialogOpen, setIsAddPODialogOpen] = useState(false)
  const [isEditPODialogOpen, setIsEditPODialogOpen] = useState(false)
  const [isViewPODialogOpen, setIsViewPODialogOpen] = useState(false)
  const [isDeletePODialogOpen, setIsDeletePODialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedPO, setSelectedPO] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    description: "",
  })
  const [newPO, setNewPO] = useState({
    supplier: "",
    items: "",
    quantity: "",
    totalAmount: "",
    expectedDelivery: "",
    notes: "",
  })

  const handleInventorySearch = () => {
    const filtered = inventoryData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredInventory(filtered)
  }

  const handlePOSearch = () => {
    const filtered = purchaseOrderData.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.items.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPO(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSearchTerm("")
  }

  const handleAddItem = async () => {
    // API call would go here
    // Example: await fetch('/api/inventory', { method: 'POST', body: JSON.stringify(newItem) })

    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to inventory successfully.`,
    })

    setIsAddItemDialogOpen(false)
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      price: "",
      supplier: "",
      description: "",
    })

    // In a real app, you would refresh the data from the API
  }

  const handleEditItem = async () => {
    // API call would go here
    // Example: await fetch(`/api/inventory/${selectedItem.id}`, { method: 'PUT', body: JSON.stringify(selectedItem) })

    toast({
      title: "Item Updated",
      description: `${selectedItem.name} has been updated successfully.`,
    })

    setIsEditItemDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDeleteItem = async () => {
    // API call would go here
    // Example: await fetch(`/api/inventory/${selectedItem.id}`, { method: 'DELETE' })

    toast({
      title: "Item Deleted",
      description: `${selectedItem.name} has been deleted from inventory.`,
    })

    setIsDeleteItemDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleAddPO = async () => {
    // API call would go here
    // Example: await fetch('/api/purchase-orders', { method: 'POST', body: JSON.stringify(newPO) })

    toast({
      title: "Purchase Order Created",
      description: `New purchase order for ${newPO.supplier} has been created successfully.`,
    })

    setIsAddPODialogOpen(false)
    setNewPO({
      supplier: "",
      items: "",
      quantity: "",
      totalAmount: "",
      expectedDelivery: "",
      notes: "",
    })

    // In a real app, you would refresh the data from the API
  }

  const handleEditPO = async () => {
    // API call would go here
    // Example: await fetch(`/api/purchase-orders/${selectedPO.id}`, { method: 'PUT', body: JSON.stringify(selectedPO) })

    toast({
      title: "Purchase Order Updated",
      description: `Purchase order ${selectedPO.id} has been updated successfully.`,
    })

    setIsEditPODialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDeletePO = async () => {
    // API call would go here
    // Example: await fetch(`/api/purchase-orders/${selectedPO.id}`, { method: 'DELETE' })

    toast({
      title: "Purchase Order Deleted",
      description: `Purchase order ${selectedPO.id} has been deleted.`,
    })

    setIsDeletePODialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const filterInventoryByCategory = (category: string) => {
    if (category === "all") {
      setFilteredInventory(inventoryData)
    } else {
      setFilteredInventory(inventoryData.filter((item) => item.category === category))
    }
  }

  const filterPOByStatus = (status: string) => {
    if (status === "all") {
      setFilteredPO(purchaseOrderData)
    } else {
      setFilteredPO(purchaseOrderData.filter((item) => item.status.toLowerCase() === status.toLowerCase()))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory & Purchase Orders</h1>
        <div className="flex gap-2">
          <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" /> Add Inventory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>Enter the details of the new inventory item. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input
                      id="item-name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-category">Category</Label>
                    <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                      <SelectTrigger id="item-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-quantity">Quantity</Label>
                    <Input
                      id="item-quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-price">Price (₹)</Label>
                    <Input
                      id="item-price"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-supplier">Supplier</Label>
                  <Select onValueChange={(value) => setNewItem({ ...newItem, supplier: value })}>
                    <SelectTrigger id="item-supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {supplierOptions.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-description">Description</Label>
                  <Textarea
                    id="item-description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Enter item description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Save Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddPODialogOpen} onOpenChange={setIsAddPODialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" /> Create Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
                <DialogDescription>Enter the details of the new purchase order. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="po-supplier">Supplier</Label>
                  <Select onValueChange={(value) => setNewPO({ ...newPO, supplier: value })}>
                    <SelectTrigger id="po-supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {supplierOptions.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="po-items">Items</Label>
                    <Textarea
                      id="po-items"
                      value={newPO.items}
                      onChange={(e) => setNewPO({ ...newPO, items: e.target.value })}
                      placeholder="Enter items (comma separated)"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="po-quantity">Quantities</Label>
                    <Textarea
                      id="po-quantity"
                      value={newPO.quantity}
                      onChange={(e) => setNewPO({ ...newPO, quantity: e.target.value })}
                      placeholder="Enter quantities (comma separated)"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="po-amount">Total Amount (₹)</Label>
                    <Input
                      id="po-amount"
                      value={newPO.totalAmount}
                      onChange={(e) => setNewPO({ ...newPO, totalAmount: e.target.value })}
                      placeholder="Enter total amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="po-delivery">Expected Delivery Date</Label>
                    <Input
                      id="po-delivery"
                      type="date"
                      value={newPO.expectedDelivery}
                      onChange={(e) => setNewPO({ ...newPO, expectedDelivery: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="po-notes">Notes</Label>
                  <Textarea
                    id="po-notes"
                    value={newPO.notes}
                    onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })}
                    placeholder="Enter any additional notes"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPODialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPO}>Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search inventory by name, ID, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button variant="outline" onClick={handleInventorySearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Select onValueChange={filterInventoryByCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage all inventory items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button onClick={() => setIsAddItemDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedItem(item)
                              setIsViewItemDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedItem(item)
                              setIsEditItemDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedItem(item)
                              setIsDeleteItemDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search purchase orders by ID, supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button variant="outline" onClick={handlePOSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Select onValueChange={filterPOByStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Manage all purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button onClick={() => setIsAddPODialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Create Order
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPO.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell>{po.id}</TableCell>
                      <TableCell>{po.supplier}</TableCell>
                      <TableCell>{po.items}</TableCell>
                      <TableCell>{po.quantity}</TableCell>
                      <TableCell>{po.totalAmount}</TableCell>
                      <TableCell>{po.orderDate}</TableCell>
                      <TableCell>{po.expectedDelivery}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            po.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : po.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : po.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {po.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedPO(po)
                              setIsViewPODialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {po.status === "Pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPO(po)
                                  setIsEditPODialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPO(po)
                                  setIsDeletePODialogOpen(true)
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Item Dialog */}
      <Dialog open={isViewItemDialogOpen} onOpenChange={setIsViewItemDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inventory Item Details</DialogTitle>
            <DialogDescription>Detailed information about the inventory item.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Item ID</h3>
                  <p>{selectedItem.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedItem.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p>{selectedItem.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                  <p>{selectedItem.quantity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p>{selectedItem.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                  <p>{selectedItem.supplier}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p>{selectedItem.lastUpdated}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p>{selectedItem.status}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>Update the details of the inventory item. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item-name">Item Name</Label>
                  <Input
                    id="edit-item-name"
                    value={selectedItem.name}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-item-category">Category</Label>
                  <Select onValueChange={(value) => setSelectedItem({ ...selectedItem, category: value })}>
                    <SelectTrigger id="edit-item-category">
                      <SelectValue placeholder={selectedItem.category} />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item-quantity">Quantity</Label>
                  <Input
                    id="edit-item-quantity"
                    type="number"
                    value={selectedItem.quantity}
                    onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-item-price">Price (₹)</Label>
                  <Input
                    id="edit-item-price"
                    value={selectedItem.price}
                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-supplier">Supplier</Label>
                <Select onValueChange={(value) => setSelectedItem({ ...selectedItem, supplier: value })}>
                  <SelectTrigger id="edit-item-supplier">
                    <SelectValue placeholder={selectedItem.supplier} />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierOptions.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-description">Description</Label>
                <Textarea
                  id="edit-item-description"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Item Dialog */}
      <Dialog open={isDeleteItemDialogOpen} onOpenChange={setIsDeleteItemDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Inventory Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Delete Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View PO Dialog */}
      <Dialog open={isViewPODialogOpen} onOpenChange={setIsViewPODialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
            <DialogDescription>Detailed information about the purchase order.</DialogDescription>
          </DialogHeader>
          {selectedPO && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">PO ID</h3>
                  <p>{selectedPO.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                  <p>{selectedPO.supplier}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Items</h3>
                  <p>{selectedPO.items}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                  <p>{selectedPO.quantity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p>{selectedPO.totalAmount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p>{selectedPO.orderDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Expected Delivery</h3>
                  <p>{selectedPO.expectedDelivery}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p>{selectedPO.status}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p>{selectedPO.notes}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit PO Dialog */}
      <Dialog open={isEditPODialogOpen} onOpenChange={setIsEditPODialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
            <DialogDescription>Update the details of the purchase order. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedPO && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-po-supplier">Supplier</Label>
                <Select onValueChange={(value) => setSelectedPO({ ...selectedPO, supplier: value })}>
                  <SelectTrigger id="edit-po-supplier">
                    <SelectValue placeholder={selectedPO.supplier} />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierOptions.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-po-items">Items</Label>
                <Input
                  id="edit-po-items"
                  value={selectedPO.items}
                  onChange={(e) => setSelectedPO({ ...selectedPO, items: e.target.value })}
                  placeholder="Enter items"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-po-quantity">Quantity</Label>
                  <Input
                    id="edit-po-quantity"
                    value={selectedPO.quantity}
                    onChange={(e) => setSelectedPO({ ...selectedPO, quantity: e.target.value })}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-po-total-amount">Total Amount (₹)</Label>
                  <Input
                    id="edit-po-total-amount"
                    value={selectedPO.totalAmount}
                    onChange={(e) => setSelectedPO({ ...selectedPO, totalAmount: e.target.value })}
                    placeholder="Enter total amount"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-po-expected-delivery">Expected Delivery</Label>
                <Input
                  id="edit-po-expected-delivery"
                  type="date"
                  value={selectedPO.expectedDelivery}
                  onChange={(e) => setSelectedPO({ ...selectedPO, expectedDelivery: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-po-notes">Notes</Label>
                <Textarea
                  id="edit-po-notes"
                  value={selectedPO.notes}
                  onChange={(e) => setSelectedPO({ ...selectedPO, notes: e.target.value })}
                  placeholder="Enter notes"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPODialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPO}>Update PO</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete PO Dialog */}
      <Dialog open={isDeletePODialogOpen} onOpenChange={setIsDeletePODialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Purchase Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete PO "{selectedPO?.id}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePODialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePO}>
              Delete PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
