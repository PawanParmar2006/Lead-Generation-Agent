import type { Lead } from "../types"

export async function crawlLinkedIn(jobTitles: string[], locations: string[], keywords: string[]): Promise<Lead[]> {
  // Simulated LinkedIn crawler
  // In production, this would use LinkedIn API or a service like Proxycurl

  const sampleNames = [
    "Sarah Johnson",
    "Michael Chen",
    "Emily Rodriguez",
    "David Kim",
    "Jennifer Martinez",
    "Robert Anderson",
    "Lisa Thompson",
    "James Wilson",
    "Maria Garcia",
    "Christopher Lee",
  ]

  const companies = [
    { name: "Vertex Pharmaceuticals", hq: "Boston, MA" },
    { name: "Genentech", hq: "South San Francisco, CA" },
    { name: "Novartis", hq: "Basel, Switzerland" },
    { name: "Pfizer", hq: "New York, NY" },
    { name: "Moderna", hq: "Cambridge, MA" },
    { name: "AstraZeneca", hq: "Cambridge, UK" },
    { name: "BioMarin", hq: "San Rafael, CA" },
    { name: "Regeneron", hq: "Tarrytown, NY" },
  ]

  const leads: Lead[] = []

  for (let i = 0; i < 15; i++) {
    const name = sampleNames[i % sampleNames.length]
    const company = companies[i % companies.length]
    const title = jobTitles[i % jobTitles.length]
    const personLocation = locations[i % locations.length] || "Remote, USA"
    const firstName = name.split(" ")[0].toLowerCase()
    const lastName = name.split(" ")[1].toLowerCase()

    leads.push({
      id: `linkedin-${i}`,
      rank: 0, // Will be calculated later
      score: 0, // Will be calculated later
      name,
      title,
      company: company.name,
      personLocation,
      companyHQ: company.hq,
      email: `${firstName}.${lastName}@${company.name.toLowerCase().replace(/\s+/g, "")}.com`,
      phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      linkedin: `https://linkedin.com/in/${firstName}-${lastName}`,
      dataSource: ["LinkedIn"],
      scoreBreakdown: {
        scientificIntent: 0,
        roleFit: 0,
        companyIntent: 0,
        technographic: 0,
        location: 0,
        total: 0,
      },
    })
  }

  return leads
}
