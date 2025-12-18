import type { Lead, SearchCriteria } from "../types"

// Scoring weights as defined in requirements
const WEIGHTS = {
  SCIENTIFIC_INTENT: 40, // Published DILI paper in last 2 years
  ROLE_FIT: 30, // Title contains key toxicology/safety terms
  COMPANY_INTENT: 20, // Recent funding (Series A/B or public)
  TECHNOGRAPHIC: 15, // Uses in vitro tech or NAMs
  LOCATION: 10, // Located in innovation hub
}

// Innovation hubs for location scoring
const INNOVATION_HUBS = [
  "Boston",
  "Cambridge",
  "MA",
  "Bay Area",
  "San Francisco",
  "San Diego",
  "Basel",
  "UK",
  "Cambridge, UK",
  "Research Triangle",
  "NC",
]

// High-value job title keywords
const HIGH_VALUE_TITLES = [
  "Director",
  "VP",
  "Vice President",
  "Head",
  "Chief",
  "Principal",
  "Senior Director",
  "Toxicology",
  "Safety",
  "Preclinical",
  "Pharmacology",
  "DMPK",
]

// Scientific keywords indicating active research in relevant areas
const SCIENTIFIC_KEYWORDS = [
  "DILI",
  "Drug-Induced Liver Injury",
  "3D cell culture",
  "Hepatic",
  "spheroids",
  "Organ-on-chip",
  "In vitro",
  "NAMs",
  "Toxicology",
]

// Technology indicators
const TECH_INDICATORS = ["3D models", "in vitro", "organ-on-chip", "spheroid", "NAMs", "microphysiological"]

export function calculateLeadScore(lead: Lead, criteria: SearchCriteria): Lead {
  let scientificIntentScore = 0
  let roleFitScore = 0
  let companyIntentScore = 0
  let technographicScore = 0
  let locationScore = 0

  // 1. SCIENTIFIC INTENT (0-40 points)
  // Check if lead has recent publications with relevant keywords
  if (lead.recentPublications && lead.recentPublications.length > 0) {
    const recentPub = lead.recentPublications[0]
    const currentYear = new Date().getFullYear()

    // Full points for publication in last 2 years
    if (recentPub.year >= currentYear - 2) {
      // Check if publication keywords match our scientific keywords
      const matchedKeywords = recentPub.keywords.filter((kw) =>
        SCIENTIFIC_KEYWORDS.some((sk) => kw.toLowerCase().includes(sk.toLowerCase())),
      )

      if (matchedKeywords.length > 0) {
        scientificIntentScore = WEIGHTS.SCIENTIFIC_INTENT
      } else {
        // Partial points for recent publication without perfect keyword match
        scientificIntentScore = WEIGHTS.SCIENTIFIC_INTENT * 0.5
      }
    } else {
      // Reduced points for older publications
      scientificIntentScore = WEIGHTS.SCIENTIFIC_INTENT * 0.3
    }
  }

  // Bonus points if from PubMed source
  if (lead.dataSource.includes("PubMed")) {
    scientificIntentScore = Math.min(scientificIntentScore + 10, WEIGHTS.SCIENTIFIC_INTENT)
  }

  // 2. ROLE FIT (0-30 points)
  // Check if title contains high-value keywords
  const titleLower = lead.title.toLowerCase()
  const matchedTitleKeywords = HIGH_VALUE_TITLES.filter((keyword) => titleLower.includes(keyword.toLowerCase()))

  if (matchedTitleKeywords.length >= 3) {
    roleFitScore = WEIGHTS.ROLE_FIT
  } else if (matchedTitleKeywords.length === 2) {
    roleFitScore = WEIGHTS.ROLE_FIT * 0.8
  } else if (matchedTitleKeywords.length === 1) {
    roleFitScore = WEIGHTS.ROLE_FIT * 0.5
  } else {
    roleFitScore = WEIGHTS.ROLE_FIT * 0.2
  }

  // 3. COMPANY INTENT (0-20 points)
  // Check funding status
  if (lead.fundingInfo) {
    const stage = lead.fundingInfo.stage.toLowerCase()
    const amount = lead.fundingInfo.amount

    if (stage.includes("series a") || stage.includes("series b")) {
      companyIntentScore = WEIGHTS.COMPANY_INTENT
    } else if (stage.includes("series c") || stage.includes("series d")) {
      companyIntentScore = WEIGHTS.COMPANY_INTENT * 0.8
    } else if (stage.includes("public") || stage.includes("nasdaq") || stage.includes("nyse")) {
      companyIntentScore = WEIGHTS.COMPANY_INTENT * 0.7
    } else if (stage.includes("grant") || stage.includes("nih") || stage.includes("r01")) {
      // Academic grants indicate budget for research
      companyIntentScore = WEIGHTS.COMPANY_INTENT * 0.6
    } else {
      companyIntentScore = WEIGHTS.COMPANY_INTENT * 0.3
    }

    // Bonus for recent funding
    if (lead.fundingInfo.date) {
      const fundingYear = Number.parseInt(lead.fundingInfo.date.split("-")[0])
      const currentYear = new Date().getFullYear()
      if (fundingYear >= currentYear - 1) {
        companyIntentScore = Math.min(companyIntentScore + 5, WEIGHTS.COMPANY_INTENT)
      }
    }
  }

  // 4. TECHNOGRAPHIC (0-15 points)
  // Check if company/person already uses similar technology
  const companyLower = lead.company.toLowerCase()
  const activityLower = lead.lastActivity?.toLowerCase() || ""

  // Check for tech indicators in company description or recent activity
  const matchedTech = TECH_INDICATORS.filter(
    (tech) => companyLower.includes(tech.toLowerCase()) || activityLower.includes(tech.toLowerCase()),
  )

  if (matchedTech.length > 0) {
    technographicScore = WEIGHTS.TECHNOGRAPHIC
  } else {
    // Give partial points for biotech/pharma companies
    if (
      companyLower.includes("bio") ||
      companyLower.includes("pharma") ||
      companyLower.includes("therapeutics") ||
      companyLower.includes("medical")
    ) {
      technographicScore = WEIGHTS.TECHNOGRAPHIC * 0.4
    }
  }

  // Bonus for attending conferences (shows active interest)
  if (lead.dataSource.includes("Conferences")) {
    technographicScore = Math.min(technographicScore + 5, WEIGHTS.TECHNOGRAPHIC)
  }

  // 5. LOCATION (0-10 points)
  // Check if in innovation hub
  const personLocationLower = lead.personLocation.toLowerCase()
  const companyHQLower = lead.companyHQ.toLowerCase()

  const inInnovationHub = INNOVATION_HUBS.some(
    (hub) => personLocationLower.includes(hub.toLowerCase()) || companyHQLower.includes(hub.toLowerCase()),
  )

  if (inInnovationHub) {
    locationScore = WEIGHTS.LOCATION
  } else if (personLocationLower.includes("ca") || personLocationLower.includes("ny")) {
    // Partial points for being in CA or NY
    locationScore = WEIGHTS.LOCATION * 0.5
  } else {
    locationScore = WEIGHTS.LOCATION * 0.2
  }

  // Calculate total score
  const totalScore = Math.round(
    scientificIntentScore + roleFitScore + companyIntentScore + technographicScore + locationScore,
  )

  // Update lead with score breakdown
  lead.scoreBreakdown = {
    scientificIntent: Math.round(scientificIntentScore),
    roleFit: Math.round(roleFitScore),
    companyIntent: Math.round(companyIntentScore),
    technographic: Math.round(technographicScore),
    location: Math.round(locationScore),
    total: totalScore,
  }

  lead.score = totalScore

  return lead
}

export function rankLeads(leads: Lead[], criteria: SearchCriteria): Lead[] {
  // Calculate scores for all leads
  const scoredLeads = leads.map((lead) => calculateLeadScore(lead, criteria))

  // Sort by score descending
  scoredLeads.sort((a, b) => b.score - a.score)

  // Assign ranks
  scoredLeads.forEach((lead, index) => {
    lead.rank = index + 1
  })

  return scoredLeads
}
