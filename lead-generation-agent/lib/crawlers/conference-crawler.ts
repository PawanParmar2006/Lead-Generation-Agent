import type { Lead } from "../types"

export async function crawlConferences(keywords: string[]): Promise<Lead[]> {
  // Simulated conference attendee crawler
  // In production, this would scrape conference websites or use APIs

  const attendees = [
    {
      name: "Dr. Patricia Morrison",
      title: "VP of Preclinical Development",
      company: "Celgene (Bristol Myers Squibb)",
      hq: "Summit, NJ",
      conference: "SOT 2024",
    },
    {
      name: "Dr. Andrew Sullivan",
      title: "Head of Toxicology",
      company: "Takeda",
      hq: "Cambridge, MA",
      conference: "AACR 2024",
    },
    {
      name: "Dr. Nina Hoffmann",
      title: "Senior Director Safety Science",
      company: "Roche",
      hq: "Basel, Switzerland",
      conference: "SOT 2024",
    },
    {
      name: "Dr. Carlos Ramirez",
      title: "Director DMPK",
      company: "Gilead Sciences",
      hq: "Foster City, CA",
      conference: "ISSX 2024",
    },
  ]

  const leads: Lead[] = []

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i]
    const nameParts = attendee.name.split(" ")
    const firstName = nameParts[1].toLowerCase()
    const lastName = nameParts[2].toLowerCase()

    leads.push({
      id: `conference-${i}`,
      rank: 0,
      score: 0,
      name: attendee.name,
      title: attendee.title,
      company: attendee.company,
      personLocation: attendee.hq,
      companyHQ: attendee.hq,
      email: `${firstName}.${lastName}@${attendee.company.toLowerCase().split(" ")[0]}.com`,
      phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      linkedin: `https://linkedin.com/in/${firstName}-${lastName}`,
      dataSource: ["Conferences"],
      scoreBreakdown: {
        scientificIntent: 0,
        roleFit: 0,
        companyIntent: 0,
        technographic: 0,
        location: 0,
        total: 0,
      },
      lastActivity: `Attended ${attendee.conference}`,
    })
  }

  return leads
}
