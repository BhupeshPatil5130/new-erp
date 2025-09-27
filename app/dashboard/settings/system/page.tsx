"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Database,
  Shield,
  Mail,
  Server,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Network,
  AlertTriangle,
  Save,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react"
import { toast } from "sonner"

const systemStats = {
  cpu: 45,
  memory: 68,
  disk: 32,
  network: 89,
}

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-12-01T10:30:00Z",
    level: "INFO",
    message: "System backup completed successfully",
    component: "Backup Service",
  },
  {
    id: 2,
    timestamp: "2024-12-01T10:25:00Z",
    level: "WARNING",
    message: "High memory usage detected",
    component: "System Monitor",
  },
  {
    id: 3,
    timestamp: "2024-12-01T10:20:00Z",
    level: "ERROR",
    message: "Failed to connect to external API",
    component: "Integration Service",
  },
]

export default function SystemConfigurationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Suryadhi Learning ERP",
    systemVersion: "2.1.0",
    maintenanceMode: false,
    debugMode: false,

    // Database Settings
    dbHost: "localhost",
    dbPort: "5432",
    dbName: "suryadhi_erp",
    connectionPoolSize: "20",
    queryTimeout: "30",

    // Security Settings
    sessionTimeout: "30",
    passwordMinLength: "8",
    maxLoginAttempts: "5",
    twoFactorAuth: true,

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@suryadhilearning.com",
    smtpPassword: "••••••••",
    emailFromName: "Suryadhi Learning",

    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
    backupLocation: "/backups/",

    // Performance Settings
    cacheEnabled: true,
    cacheTimeout: "3600",
    compressionEnabled: true,
    cdnEnabled: false,
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success("System configuration saved successfully")
  }

  const handleTestConnection = async (type: string) => {
    setIsLoading(true)
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    toast.success(`${type} connection test successful`)
  }

  const handleBackupNow = async () => {
    setIsLoading(true)
    // Simulate backup
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
    toast.success("System backup completed successfully")
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "ERROR":
        return <Badge variant="destructive">Error</Badge>
      case "WARNING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        )
      case "INFO":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Info
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-600 mt-1">Manage system-wide settings and configurations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleTestConnection("System")}>
            <Network className="h-4 w-4 mr-2" />
            Test Connection
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.cpu}%</div>
            <Progress value={systemStats.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Memory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.memory}%</div>
            <Progress value={systemStats.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.disk}%</div>
            <Progress value={systemStats.disk} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.network}%</div>
            <Progress value={systemStats.network} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemVersion">System Version</Label>
                  <Input
                    id="systemVersion"
                    value={settings.systemVersion}
                    onChange={(e) => setSettings({ ...settings, systemVersion: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable to restrict system access during maintenance</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-gray-600">Enable detailed logging for troubleshooting</p>
                </div>
                <Switch
                  id="debugMode"
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, debugMode: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>Database connection and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input
                    id="dbHost"
                    value={settings.dbHost}
                    onChange={(e) => setSettings({ ...settings, dbHost: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbPort">Database Port</Label>
                  <Input
                    id="dbPort"
                    value={settings.dbPort}
                    onChange={(e) => setSettings({ ...settings, dbPort: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input
                    id="dbName"
                    value={settings.dbName}
                    onChange={(e) => setSettings({ ...settings, dbName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connectionPoolSize">Connection Pool Size</Label>
                  <Input
                    id="connectionPoolSize"
                    type="number"
                    value={settings.connectionPoolSize}
                    onChange={(e) => setSettings({ ...settings, connectionPoolSize: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="queryTimeout">Query Timeout (seconds)</Label>
                  <Input
                    id="queryTimeout"
                    type="number"
                    value={settings.queryTimeout}
                    onChange={(e) => setSettings({ ...settings, queryTimeout: e.target.value })}
                  />
                </div>
              </div>

              <Button variant="outline" onClick={() => handleTestConnection("Database")} disabled={isLoading}>
                <Database className="h-4 w-4 mr-2" />
                Test Database Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Authentication and security configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({ ...settings, maxLoginAttempts: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for all user accounts</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>SMTP settings for system emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFromName">From Name</Label>
                  <Input
                    id="emailFromName"
                    value={settings.emailFromName}
                    onChange={(e) => setSettings({ ...settings, emailFromName: e.target.value })}
                  />
                </div>
              </div>

              <Button variant="outline" onClick={() => handleTestConnection("Email")} disabled={isLoading}>
                <Mail className="h-4 w-4 mr-2" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Backup Configuration
              </CardTitle>
              <CardDescription>Automated backup settings and manual backup options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">Automatic Backup</Label>
                  <p className="text-sm text-gray-600">Enable scheduled automatic backups</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Retention Period (days)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    value={settings.backupRetention}
                    onChange={(e) => setSettings({ ...settings, backupRetention: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupLocation">Backup Location</Label>
                  <Input
                    id="backupLocation"
                    value={settings.backupLocation}
                    onChange={(e) => setSettings({ ...settings, backupLocation: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleBackupNow} disabled={isLoading}>
                  <Download className="h-4 w-4 mr-2" />
                  {isLoading ? "Creating Backup..." : "Backup Now"}
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Restore Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Logs
              </CardTitle>
              <CardDescription>Recent system events and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">{getLevelBadge(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{log.message}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                        <span>{log.component}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Logs
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
