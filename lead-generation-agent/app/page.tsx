import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Database, TrendingUp, Users, Globe, FileText, DollarSign } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">BioLeadGen</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link href="/search">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Intelligent Lead Generation for <span className="text-chart-1">3D In-Vitro Models</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Discover, enrich, and prioritize qualified leads across LinkedIn, PubMed, conferences, and funding
            databases. Built for business development teams in life sciences.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="text-base">
                Launch Search
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Comprehensive Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-chart-1 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Professional Networks</h3>
                <p className="text-sm text-muted-foreground">
                  LinkedIn and Sales Navigator for identifying Directors of Toxicology, Heads of Preclinical Safety, and
                  key decision-makers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FileText className="h-8 w-8 text-chart-2 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Scientific Publications</h3>
                <p className="text-sm text-muted-foreground">
                  PubMed, Google Scholar, and bioRxiv for tracking recent papers on DILI, 3D cell culture, and hepatic
                  models.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-chart-3 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Conference Data</h3>
                <p className="text-sm text-muted-foreground">
                  SOT, AACR, ISSX attendee lists, exhibitors, and presenters actively researching new methodologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-chart-4 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Funding Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Crunchbase, PitchBook, and FierceBiotech for Series A/B funding rounds and budget availability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Database className="h-8 w-8 text-chart-5 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Grant Databases</h3>
                <p className="text-sm text-muted-foreground">
                  NIH RePORTER and CORDIS for academic and government-funded research on liver toxicity and 3D models.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-chart-1 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Contact Enrichment</h3>
                <p className="text-sm text-muted-foreground">
                  Business emails, phone numbers, and location intelligence to distinguish remote workers from HQ
                  locations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-chart-1 text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Identification</h3>
              <p className="text-muted-foreground">
                Define your target criteria: job titles, keywords, companies, and locations. The agent scans LinkedIn,
                PubMed, and conference lists to build your initial prospect list.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-chart-2 text-white flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Enrichment</h3>
              <p className="text-muted-foreground">
                For each identified person, the tool queries external databases to find contact information, funding
                status, publication history, and location data, distinguishing between remote work and company HQ.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-chart-3 text-white flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Ranking</h3>
              <p className="text-muted-foreground">
                A sophisticated propensity-to-buy scoring algorithm ranks leads from 0-100 based on role fit, company
                funding, scientific activity, technology stack, and location. Instantly prioritize your best prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Section */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Intelligent Propensity Scoring</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our ranking algorithm weighs multiple signals to surface the leads most likely to engage with your 3D
            in-vitro solutions.
          </p>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm font-medium text-foreground">Signal Category</span>
                    <span className="text-sm font-medium text-foreground">Weight</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Scientific Intent (Recent DILI papers)</span>
                    <span className="text-sm font-semibold text-chart-1">+40 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role Fit (Toxicology, Safety titles)</span>
                    <span className="text-sm font-semibold text-chart-2">+30 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Company Intent (Recent funding)</span>
                    <span className="text-sm font-semibold text-chart-3">+20 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Technographic (Uses in-vitro tech)</span>
                    <span className="text-sm font-semibold text-chart-4">+15 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location (Innovation hubs)</span>
                    <span className="text-sm font-semibold text-chart-5">+10 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Find Your Best Leads?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start crawling the web for qualified prospects in minutes. No setup required.
          </p>
          <Link href="/search">
            <Button size="lg" className="text-base">
              Launch Search Agent
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>BioLeadGen - Intelligent Lead Generation for 3D In-Vitro Model Solutions</p>
        </div>
      </footer>
    </div>
  )
}
