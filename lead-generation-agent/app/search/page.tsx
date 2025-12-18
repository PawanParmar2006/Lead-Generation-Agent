"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Search, Loader2 } from "lucide-react"
import Link from "next/link"

const DATA_SOURCES = [
  { id: "linkedin", name: "LinkedIn / Sales Navigator", enabled: true },
  { id: "pubmed", name: "PubMed / Google Scholar", enabled: true },
  { id: "conferences", name: "Conference Attendees (SOT, AACR, ISSX)", enabled: true },
  { id: "funding", name: "Funding Databases (Crunchbase, PitchBook)", enabled: true },
  { id: "grants", name: "Grant Databases (NIH RePORTER, CORDIS)", enabled: true },
]

const EXAMPLE_JOB_TITLES = [
  "Director of Toxicology",
  "Head of Preclinical Safety",
  "VP Safety Assessment",
  "Director of Safety Pharmacology",
  "Head of DMPK",
  "Senior Scientist Toxicology",
]

const EXAMPLE_KEYWORDS = [
  "Drug-Induced Liver Injury",
  "DILI",
  "3D cell culture",
  "Hepatic spheroids",
  "Organ-on-chip",
  "In vitro models",
  "NAMs",
  "Investigative Toxicology",
]

const INNOVATION_HUBS = [
  "Boston/Cambridge, MA",
  "San Francisco Bay Area, CA",
  "San Diego, CA",
  "Basel, Switzerland",
  "UK Golden Triangle",
  "Research Triangle Park, NC",
]

export default function SearchPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [jobTitles, setJobTitles] = useState<string[]>(["Director of Toxicology"])
  const [keywords, setKeywords] = useState<string[]>(["DILI", "3D cell culture"])
  const [locations, setLocations] = useState<string[]>(["Boston/Cambridge, MA"])
  const [selectedSources, setSelectedSources] = useState<string[]>(DATA_SOURCES.map((s) => s.id))
  const [currentJobTitle, setCurrentJobTitle] = useState("")
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [currentLocation, setCurrentLocation] = useState("")

  const addJobTitle = () => {
    if (currentJobTitle.trim() && !jobTitles.includes(currentJobTitle.trim())) {
      setJobTitles([...jobTitles, currentJobTitle.trim()])
      setCurrentJobTitle("")
    }
  }

  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()])
      setCurrentKeyword("")
    }
  }

  const addLocation = () => {
    if (currentLocation.trim() && !locations.includes(currentLocation.trim())) {
      setLocations([...locations, currentLocation.trim()])
      setCurrentLocation("")
    }
  }

  const removeJobTitle = (title: string) => {
    setJobTitles(jobTitles.filter((t) => t !== title))
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location))
  }

  const toggleSource = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      setSelectedSources(selectedSources.filter((s) => s !== sourceId))
    } else {
      setSelectedSources([...selectedSources, sourceId])
    }
  }

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store search criteria in session storage
    sessionStorage.setItem(
      "searchCriteria",
      JSON.stringify({
        jobTitles,
        keywords,
        locations,
        selectedSources,
      }),
    )

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">BioLeadGen</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">Configure Your Search</h1>
            <p className="text-lg text-muted-foreground">
              Define your target criteria to identify qualified leads for 3D in-vitro models.
            </p>
          </div>

          <div className="space-y-6">
            {/* Job Titles Card */}
            <Card>
              <CardHeader>
                <CardTitle>Target Job Titles</CardTitle>
                <CardDescription>
                  Specify the roles you want to target (e.g., Directors, VPs, Heads of departments)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter job title..."
                    value={currentJobTitle}
                    onChange={(e) => setCurrentJobTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addJobTitle()
                      }
                    }}
                  />
                  <Button onClick={addJobTitle}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobTitles.map((title) => (
                    <Badge key={title} variant="secondary" className="text-sm px-3 py-1">
                      {title}
                      <button onClick={() => removeJobTitle(title)} className="ml-2 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Quick add suggestions:</Label>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_JOB_TITLES.filter((t) => !jobTitles.includes(t)).map((title) => (
                      <Badge
                        key={title}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setJobTitles([...jobTitles, title])}
                      >
                        + {title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scientific Keywords Card */}
            <Card>
              <CardHeader>
                <CardTitle>Scientific Keywords</CardTitle>
                <CardDescription>
                  Keywords to search in publications, conference presentations, and profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter keyword..."
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addKeyword()
                      }
                    }}
                  />
                  <Button onClick={addKeyword}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-sm px-3 py-1">
                      {keyword}
                      <button onClick={() => removeKeyword(keyword)} className="ml-2 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Quick add suggestions:</Label>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_KEYWORDS.filter((k) => !keywords.includes(k)).map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setKeywords([...keywords, keyword])}
                      >
                        + {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Locations Card */}
            <Card>
              <CardHeader>
                <CardTitle>Target Locations</CardTitle>
                <CardDescription>Geographic regions or innovation hubs to focus on</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter location..."
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addLocation()
                      }
                    }}
                  />
                  <Button onClick={addLocation}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Badge key={location} variant="secondary" className="text-sm px-3 py-1">
                      {location}
                      <button onClick={() => removeLocation(location)} className="ml-2 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Innovation hubs:</Label>
                  <div className="flex flex-wrap gap-2">
                    {INNOVATION_HUBS.filter((l) => !locations.includes(l)).map((location) => (
                      <Badge
                        key={location}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setLocations([...locations, location])}
                      >
                        + {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources Card */}
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Select which databases and platforms to crawl</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {DATA_SOURCES.map((source) => (
                    <div key={source.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={source.id}
                        checked={selectedSources.includes(source.id)}
                        onCheckedChange={() => toggleSource(source.id)}
                      />
                      <Label htmlFor={source.id} className="text-sm font-normal cursor-pointer">
                        {source.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={isSearching || jobTitles.length === 0 || selectedSources.length === 0}
                className="min-w-[200px]"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Start Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
