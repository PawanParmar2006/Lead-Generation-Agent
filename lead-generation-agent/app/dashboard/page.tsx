"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Search, Download, Loader2, ExternalLink, Mail, Phone } from "lucide-react"
import type { Lead } from "@/lib/types"

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Get search criteria from session storage
        const criteriaStr = sessionStorage.getItem("searchCriteria")
        if (!criteriaStr) {
          // If no criteria, use default demo data
          await loadDemoData()
          return
        }

        const criteria = JSON.parse(criteriaStr)

        // Call the search API
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(criteria),
        })

        const data = await response.json()

        if (data.success) {
          setLeads(data.leads)
        } else {
          console.error("[v0] Failed to fetch leads:", data.error)
          await loadDemoData()
        }
      } catch (error) {
        console.error("[v0] Error fetching leads:", error)
        await loadDemoData()
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const loadDemoData = async () => {
    // Load demo data for testing
    const demoResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobTitles: ["Director of Toxicology", "Head of Preclinical Safety"],
        keywords: ["DILI", "3D cell culture"],
        locations: ["Boston/Cambridge, MA"],
        selectedSources: ["linkedin", "pubmed", "conferences", "funding", "grants"],
      }),
    })

    const demoData = await demoResponse.json()
    if (demoData.success) {
      setLeads(demoData.leads)
    }
  }

  // Filter leads based on search query
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) {
      return leads
    }

    const query = searchQuery.toLowerCase()
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.title.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.personLocation.toLowerCase().includes(query) ||
        lead.companyHQ.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query),
    )
  }, [leads, searchQuery])

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "Rank",
      "Score",
      "Name",
      "Title",
      "Company",
      "Person Location",
      "Company HQ",
      "Email",
      "Phone",
      "LinkedIn",
      "Data Sources",
      "Scientific Intent",
      "Role Fit",
      "Company Intent",
      "Technographic",
      "Location Score",
    ]

    const csvRows = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          lead.rank,
          lead.score,
          `"${lead.name}"`,
          `"${lead.title}"`,
          `"${lead.company}"`,
          `"${lead.personLocation}"`,
          `"${lead.companyHQ}"`,
          lead.email,
          lead.phone,
          lead.linkedin,
          `"${lead.dataSource.join(", ")}"`,
          lead.scoreBreakdown.scientificIntent,
          lead.scoreBreakdown.roleFit,
          lead.scoreBreakdown.companyIntent,
          lead.scoreBreakdown.technographic,
          lead.scoreBreakdown.location,
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `bioleadgen-leads-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-3"
    if (score >= 60) return "text-chart-2"
    if (score >= 40) return "text-chart-1"
    return "text-muted-foreground"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "outline"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Crawling data sources and ranking leads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">BioLeadGen</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/search">
              <Button variant="outline" className="bg-transparent">
                New Search
              </Button>
            </Link>
            <Button onClick={exportToCSV} disabled={filteredLeads.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-3xl">{leads.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>High Priority (80+)</CardDescription>
              <CardTitle className="text-3xl text-chart-3">{leads.filter((l) => l.score >= 80).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Score</CardDescription>
              <CardTitle className="text-3xl">
                {leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lead Dashboard</CardTitle>
                <CardDescription>{filteredLeads.length} leads ranked by propensity to buy</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, company, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              {searchQuery && (
                <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead className="w-20">Score</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>HQ</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="w-24">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No leads found. Try adjusting your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">#{lead.rank}</TableCell>
                        <TableCell>
                          <Badge variant={getScoreBadgeVariant(lead.score)} className={getScoreColor(lead.score)}>
                            {lead.score}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="text-sm">{lead.title}</TableCell>
                        <TableCell className="text-sm">{lead.company}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lead.personLocation}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lead.companyHQ}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <a href={`mailto:${lead.email}`} title="Email">
                              <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </a>
                            <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                              <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={selectedLead !== null} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedLead?.name}</DialogTitle>
            <DialogDescription>{selectedLead?.title}</DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6 py-4">
              {/* Score Breakdown */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Propensity Score Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Scientific Intent</span>
                    <span className={`font-semibold ${getScoreColor(selectedLead.scoreBreakdown.scientificIntent)}`}>
                      {selectedLead.scoreBreakdown.scientificIntent} / 40
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Role Fit</span>
                    <span className={`font-semibold ${getScoreColor(selectedLead.scoreBreakdown.roleFit)}`}>
                      {selectedLead.scoreBreakdown.roleFit} / 30
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Company Intent</span>
                    <span className={`font-semibold ${getScoreColor(selectedLead.scoreBreakdown.companyIntent)}`}>
                      {selectedLead.scoreBreakdown.companyIntent} / 20
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Technographic</span>
                    <span className={`font-semibold ${getScoreColor(selectedLead.scoreBreakdown.technographic)}`}>
                      {selectedLead.scoreBreakdown.technographic} / 15
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className={`font-semibold ${getScoreColor(selectedLead.scoreBreakdown.location)}`}>
                      {selectedLead.scoreBreakdown.location} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total Score</span>
                    <span className={`font-bold text-lg ${getScoreColor(selectedLead.score)}`}>
                      {selectedLead.score} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedLead.email}`} className="text-chart-1 hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={selectedLead.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chart-1 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Company & Location */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Company & Location</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium text-foreground">{selectedLead.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Person Location</span>
                    <span className="font-medium text-foreground">{selectedLead.personLocation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Company HQ</span>
                    <span className="font-medium text-foreground">{selectedLead.companyHQ}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              {(selectedLead.recentPublications || selectedLead.fundingInfo || selectedLead.lastActivity) && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">Recent Activity</h3>
                  <div className="space-y-3">
                    {selectedLead.recentPublications && (
                      <div className="text-sm">
                        <span className="font-medium text-foreground">Recent Publication:</span>
                        <p className="text-muted-foreground mt-1">{selectedLead.recentPublications[0].title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedLead.recentPublications[0].journal} ({selectedLead.recentPublications[0].year})
                        </p>
                      </div>
                    )}
                    {selectedLead.fundingInfo && (
                      <div className="text-sm">
                        <span className="font-medium text-foreground">Funding:</span>
                        <p className="text-muted-foreground mt-1">
                          {selectedLead.fundingInfo.stage} - {selectedLead.fundingInfo.amount}
                        </p>
                      </div>
                    )}
                    {selectedLead.lastActivity && (
                      <div className="text-sm">
                        <span className="font-medium text-foreground">Activity:</span>
                        <p className="text-muted-foreground mt-1">{selectedLead.lastActivity}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Data Sources */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Data Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.dataSource.map((source) => (
                    <Badge key={source} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
