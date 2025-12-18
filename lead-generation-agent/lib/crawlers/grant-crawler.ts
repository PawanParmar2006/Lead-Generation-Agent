import type { Lead } from "../types"

export async function crawlGrantDatabases(keywords: string[]): Promise<Lead[]> {
  // Simulated grant database crawler
  // In production, this would use NIH RePORTER API, CORDIS API, etc.

  const grantRecipients = [
    {
      name: "Dr. Elizabeth Hartman",
      title: "Professor of Pharmacology",
      company: "University of Pennsylvania",
      hq: "Philadelphia, PA",
      grant: "R01 - NIH",
      amount: "$2.4M",
    },
    {
      name: "Dr. Marcus Chen",
      title: "Associate Professor",
      company: "UCSF",
      hq: "San Francisco, CA",
      grant: "R01 - NIEHS",
      amount: "$3.1M",
    },
    {
      name: "Dr. Julia Fernandez",
      title: "Research Director",
      company: "Duke University",
      hq: "Durham, NC",
      grant: "U01 - NCATS",
      amount: "$1.8M",
    },
  ]

  const leads: Lead[] = []

  for (let i = 0; i < grantRecipients.length; i++) {
    const recipient = grantRecipients[i]
    const nameParts = recipient.name.split(" ")
    const firstName = nameParts[1].toLowerCase()
    const lastName = nameParts[2].toLowerCase()

    leads.push({
      id: `grant-${i}`,
      rank: 0,
      score: 0,
      name: recipient.name,
      title: recipient.title,
      company: recipient.company,
      personLocation: recipient.hq,
      companyHQ: recipient.hq,
      email: `${firstName}.${lastName}@${recipient.company.toLowerCase().split(" ").pop()}.edu`,
      phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      linkedin: `https://linkedin.com/in/${firstName}-${lastName}`,
      dataSource: ["Grants"],
      scoreBreakdown: {
        scientificIntent: 0,
        roleFit: 0,
        companyIntent: 0,
        technographic: 0,
        location: 0,
        total: 0,
      },
      fundingInfo: {
        stage: recipient.grant,
        amount: recipient.amount,
        date: "2023-09",
      },
      lastActivity: `Received ${recipient.grant} grant`,
    })
  }

  return leads
}
