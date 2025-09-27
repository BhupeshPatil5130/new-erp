"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Settings,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Key,
  Webhook,
  MessageSquare,
  Video,
  BarChart3,
  CreditCard,
  Cloud,
  Shield,
} from "lucide-react"
import { toast } from "sonner"
import { getIntegrations, updateIntegration, testIntegration } from "@/lib/api-service"

const integrationCategories = [
  {
    id: "payment",
    name: "Payment Gateways",
    description: "Process payments and manage transactions",
    icon: CreditCard,
    color: "text-green-600",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email, SMS, and messaging services",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    description: "Track performance and generate insights",
    icon: BarChart3,
    color: "text-purple-600",
  },
  {
    id: "storage",
    name: "Cloud Storage",
    description: "File storage and document management",
    icon: Cloud,
    color: "text-orange-600",
  },
  {
    id: "video",
    name: "Video Conferencing",
    description: "Online meetings and virtual classrooms",
    icon: Video,
    color: "text-red-600",
  },
  {
    id: "security",
    name: "Security & Authentication",
    description: "User authentication and security services",
    icon: Shield,
    color: "text-indigo-600",
  },
]

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true)
  const [integrations, setIntegrations] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [testingIntegration, setTestingIntegration] = useState<string | null>(null)

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      const response = await getIntegrations()
      if (response.success) {
        setIntegrations(response.data)
      }
    } catch (error) {
      toast.error("Failed to load integrations")
    } finally {
      setLoading(false)
    }
  }

  const mockIntegrations = [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Payment gateway for online fee collection",
      category: "payment",
      status: "connected",
      lastSync: "2024-01-15T10:30:00Z",
      icon: "💳",
      config: {
        apiKey: "rzp_test_****",
        webhookUrl: "https://api.suryadhi.com/webhook/razorpay",
        merchantId: "MERCHANT123",
      },
      features: ["Online Payments", "Recurring Payments", "Refunds", "Webhooks"],
      webhooks: [
        { event: "payment.captured", url: "https://api.suryadhi.com/webhook/payment-captured", status: "active" },
        { event: "payment.failed", url: "https://api.suryadhi.com/webhook/payment-failed", status: "active" },
      ],
    },
    {
      id: "twilio",
      name: "Twilio",
      description: "SMS and WhatsApp messaging service",
      category: "communication",
      status: "connected",
      lastSync: "2024-01-15T09:15:00Z",
      icon: "📱",
      config: {
        accountSid: "AC****",
        authToken: "****",
        phoneNumber: "+1234567890",
      },
      features: ["SMS", "WhatsApp", "Voice Calls", "Verification"],
      webhooks: [
        { event: "message.delivered", url: "https://api.suryadhi.com/webhook/sms-delivered", status: "active" },
      ],
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Email delivery and marketing platform",
      category: "communication",
      status: "connected",
      lastSync: "2024-01-15T08:45:00Z",
      icon: "📧",
      config: {
        apiKey: "SG.****",
        fromEmail: "noreply@suryadhilearning.com",
        fromName: "Suryadhi Learning",
      },
      features: ["Transactional Emails", "Marketing Campaigns", "Templates", "Analytics"],
      webhooks: [
        { event: "delivered", url: "https://api.suryadhi.com/webhook/email-delivered", status: "active" },
        { event: "opened", url: "https://api.suryadhi.com/webhook/email-opened", status: "active" },
      ],
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Web analytics and user behavior tracking",
      category: "analytics",
      status: "connected",
      lastSync: "2024-01-15T07:30:00Z",
      icon: "📊",
      config: {
        trackingId: "GA-****",
        propertyId: "12345678",
      },
      features: ["User Tracking", "Event Analytics", "Conversion Tracking", "Custom Reports"],
      webhooks: [],
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Cloud storage for documents and files",
      category: "storage",
      status: "disconnected",
      lastSync: null,
      icon: "☁️",
      config: {},
      features: ["File Storage", "Document Sharing", "Backup", "Collaboration"],
      webhooks: [],
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Video conferencing for online classes",
      category: "video",
      status: "connected",
      lastSync: "2024-01-15T06:00:00Z",
      icon: "🎥",
      config: {
        apiKey: "ZOOM_****",
        apiSecret: "****",
        accountId: "ACCOUNT123",
      },
      features: ["Video Meetings", "Webinars", "Recording", "Screen Sharing"],
      webhooks: [
        { event: "meeting.started", url: "https://api.suryadhi.com/webhook/meeting-started", status: "active" },
        { event: "meeting.ended", url: "https://api.suryadhi.com/webhook/meeting-ended", status: "active" },
      ],
    },
    {
      id: "auth0",
      name: "Auth0",
      description: "Identity and access management platform",
      category: "security",
      status: "disconnected",
      lastSync: null,
      icon: "🔐",
      config: {},
      features: ["Single Sign-On", "Multi-factor Auth", "User Management", "Social Login"],
      webhooks: [],
    },
  ]

  const handleConnect = async (integrationId: string) => {
    try {
      const response = await updateIntegration(integrationId, { status: "connected" })
      if (response.success) {
        setIntegrations(integrations.map((int) => (int.id === integrationId ? { ...int, status: "connected" } : int)))
        toast.success("Integration connected successfully")
      }
    } catch (error) {
      toast.error("Failed to connect integration")
    }
  }

  const handleDisconnect = async (integrationId: string) => {
    try {
      const response = await updateIntegration(integrationId, { status: "disconnected" })
      if (response.success) {
        setIntegrations(
          integrations.map((int) => (int.id === integrationId ? { ...int, status: "disconnected" } : int)),
        )
        toast.success("Integration disconnected successfully")
      }
    } catch (error) {
      toast.error("Failed to disconnect integration")
    }
  }

  const handleTestConnection = async (integrationId: string) => {
    setTestingIntegration(integrationId)
    try {
      const response = await testIntegration(integrationId)
      if (response.success) {
        toast.success("Connection test successful")
      } else {
        toast.error("Connection test failed")
      }
    } catch (error) {
      toast.error("Connection test failed")
    } finally {
      setTestingIntegration(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "error":
        return <Badge className="bg-yellow-100 text-yellow-800">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredIntegrations =
    selectedCategory === "all" ? mockIntegrations : mockIntegrations.filter((int) => int.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect and manage third-party services and APIs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadIntegrations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All Categories
        </Button>
        {integrationCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className={`h-4 w-4 ${category.color}`} />
            {category.name}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Integration Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Integrations</p>
                    <p className="text-2xl font-bold text-primary-900 mt-1">{mockIntegrations.length}</p>
                  </div>
                  <Zap className="h-8 w-8 text-primary-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Connected</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {mockIntegrations.filter((int) => int.status === "connected").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Disconnected</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {mockIntegrations.filter((int) => int.status === "disconnected").length}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Webhooks</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {mockIntegrations.reduce((sum, int) => sum + int.webhooks.length, 0)}
                    </p>
                  </div>
                  <Webhook className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">{integration.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    {getStatusBadge(integration.status)}
                  </div>

                  {integration.lastSync && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="text-sm">{new Date(integration.lastSync).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-600">Features</span>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {integration.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{integration.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {integration.status === "connected" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(integration.id)}
                          disabled={testingIntegration === integration.id}
                        >
                          {testingIntegration === integration.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-1"></div>
                          ) : (
                            <Zap className="h-3 w-3 mr-1" />
                          )}
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnect(integration.id)}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnect(integration.id)} className="w-full">
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Management
              </CardTitle>
              <CardDescription>Manage webhook endpoints for real-time event notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Integration</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Endpoint URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIntegrations
                      .filter((int) => int.webhooks.length > 0)
                      .flatMap((integration) =>
                        integration.webhooks.map((webhook) => ({
                          ...webhook,
                          integrationName: integration.name,
                          integrationIcon: integration.icon,
                        })),
                      )
                      .map((webhook, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{webhook.integrationIcon}</span>
                              <span className="font-medium">{webhook.integrationName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{webhook.event}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{webhook.url}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                webhook.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {webhook.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key Management
              </CardTitle>
              <CardDescription>Manage API keys and authentication credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockIntegrations
                  .filter((int) => Object.keys(int.config).length > 0)
                  .map((integration) => (
                    <div key={integration.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{integration.icon}</span>
                          <div>
                            <h3 className="font-semibold">{integration.name}</h3>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(integration.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(integration.config).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <Label htmlFor={`${integration.id}-${key}`} className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <Input
                              id={`${integration.id}-${key}`}
                              type={
                                key.toLowerCase().includes("secret") ||
                                key.toLowerCase().includes("token") ||
                                key.toLowerCase().includes("password")
                                  ? "password"
                                  : "text"
                              }
                              value={value as string}
                              readOnly
                              className="font-mono text-sm"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Configuration
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate Keys
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
