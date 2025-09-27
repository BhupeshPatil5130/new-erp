"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function FinancialSummaryPage() {
  return (
    <Card className="border-0 shadow">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>Corporate-wide financial KPIs and summaries.</CardDescription>
      </CardHeader>
      <CardContent>Financial summary module placeholder.</CardContent>
    </Card>
  )
}
