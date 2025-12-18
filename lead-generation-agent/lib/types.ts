export interface SearchCriteria {
  jobTitles: string[]
  keywords: string[]
  locations: string[]
  selectedSources: string[]
}

export interface Lead {
  id: string
  rank: number
  score: number
  name: string
  title: string
  company: string
  personLocation: string
  companyHQ: string
  email: string
  phone: string
  linkedin: string
  dataSource: string[]
  scoreBreakdown: ScoreBreakdown
  recentPublications?: Publication[]
  fundingInfo?: FundingInfo
  lastActivity?: string
}

export interface ScoreBreakdown {
  scientificIntent: number
  roleFit: number
  companyIntent: number
  technographic: number
  location: number
  total: number
}

export interface Publication {
  title: string
  journal: string
  year: number
  keywords: string[]
}

export interface FundingInfo {
  stage: string
  amount: string
  date: string
}
