import type { Lead, Publication } from "../types"

export async function crawlPubMed(keywords: string[]): Promise<Lead[]> {
  // Simulated PubMed crawler
  // In production, this would use NCBI E-utilities API

  const authors = [
    { name: "Dr. Amanda Foster", title: "Principal Investigator", company: "Harvard Medical School", hq: "Boston, MA" },
    {
      name: "Dr. Kevin Zhang",
      title: "Associate Professor",
      company: "Stanford University",
      hq: "Stanford, CA",
    },
    { name: "Dr. Rachel Bennett", title: "Research Scientist", company: "Johns Hopkins", hq: "Baltimore, MD" },
    {
      name: "Dr. Thomas Mueller",
      title: "Senior Researcher",
      company: "University of Basel",
      hq: "Basel, Switzerland",
    },
    {
      name: "Dr. Sophia Patel",
      title: "Lab Director",
      company: "MIT Koch Institute",
      hq: "Cambridge, MA",
    },
  ]

  const samplePublications: Publication[] = [
    {
      title: "3D Hepatic Spheroids for Drug-Induced Liver Injury Prediction",
      journal: "Toxicological Sciences",
      year: 2024,
      keywords: ["DILI", "3D cell culture", "hepatotoxicity"],
    },
    {
      title: "Organ-on-Chip Models for Preclinical Safety Assessment",
      journal: "Nature Methods",
      year: 2023,
      keywords: ["organ-on-chip", "in vitro models", "safety pharmacology"],
    },
    {
      title: "Advanced In Vitro Models for Toxicology Testing",
      journal: "Frontiers in Toxicology",
      year: 2024,
      keywords: ["NAMs", "3D models", "toxicology"],
    },
  ]

  const leads: Lead[] = []

  for (let i = 0; i < authors.length; i++) {
    const author = authors[i]
    const firstName = author.name.split(" ")[1].toLowerCase()
    const lastName = author.name.split(" ")[2].toLowerCase()

    leads.push({
      id: `pubmed-${i}`,
      rank: 0,
      score: 0,
      name: author.name,
      title: author.title,
      company: author.company,
      personLocation: author.hq,
      companyHQ: author.hq,
      email: `${firstName}.${lastName}@${author.company.toLowerCase().replace(/\s+/g, "")}.edu`,
      phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      linkedin: `https://linkedin.com/in/${firstName}-${lastName}`,
      dataSource: ["PubMed"],
      recentPublications: [samplePublications[i % samplePublications.length]],
      scoreBreakdown: {
        scientificIntent: 0,
        roleFit: 0,
        companyIntent: 0,
        technographic: 0,
        location: 0,
        total: 0,
      },
      lastActivity: `Published ${2024 - i} months ago`,
    })
  }

  return leads
}
