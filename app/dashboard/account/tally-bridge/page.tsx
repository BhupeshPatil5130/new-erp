"use client"

import { useState } from "react"
import { ModuleShell } from "@/components/module-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TallyBridgePage() {
  const [enabled, setEnabled] = useState(true)
  const [host, setHost] = useState("http://localhost:9000")
  const [company, setCompany] = useState("Suryadhi Learning Pvt")
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle")
  const [lastSync, setLastSync] = useState<string>("Never")

  const connect = async () => {
    setStatus("connecting")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("connected")
  }

  const sync = async () => {
    setStatus("connecting")
    await new Promise((r) => setTimeout(r, 1000))
    setLastSync(new Date().toLocaleString())
    setStatus("connected")
  }

  return (
    <ModuleShell title="Tally Bridge" description="Connect and sync with Tally for payments and ledgers">
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
              <Label htmlFor="enabled">Enable Tally Bridge</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="host">Tally Host</Label>
                <Input id="host" value={host} onChange={(e) => setHost(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button disabled={!enabled || status === "connecting"} onClick={connect}>
                {status === "connecting" ? "Connecting..." : "Connect"}
              </Button>
              <Button variant="outline" disabled={!enabled || status !== "connected"} onClick={sync}>
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              Status:{" "}
              <span
                className={
                  status === "connected"
                    ? "text-green-600"
                    : status === "error"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }
              >
                {status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Host: {host}</div>
            <div className="text-sm text-muted-foreground">Company: {company}</div>
            <div className="text-sm">Last Sync: {lastSync}</div>
          </CardContent>
        </Card>
      </div>
    </ModuleShell>
  )
}
