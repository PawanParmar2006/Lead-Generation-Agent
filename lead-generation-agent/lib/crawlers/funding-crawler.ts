import type { FundingInfo } from "../types"

export async function crawlFundingDatabases(): Promise<Map<string, FundingInfo>> {
  // Simulated funding database crawler
  // In production, this would use Crunchbase API, PitchBook, etc.

  const fundingData = new Map<string, FundingInfo>()

  fundingData.set("Vertex Pharmaceuticals", {
    stage: "Public (NASDAQ: VRTX)",
    amount: "$12.5B market cap",
    date: "2024-01",
  })

  fundingData.set("Moderna", {
    stage: "Public (NASDAQ: MRNA)",
    amount: "$45B market cap",
    date: "2024-01",
  })

  fundingData.set("Genentech", {
    stage: "Subsidiary of Roche",
    amount: "Parent company funding",
    date: "Established",
  })

  fundingData.set("Novartis", {
    stage: "Public (NYSE: NVS)",
    amount: "$185B market cap",
    date: "2024-01",
  })

  fundingData.set("BioMarin", {
    stage: "Public (NASDAQ: BMRN)",
    amount: "$9.8B market cap",
    date: "2024-01",
  })

  fundingData.set("Regeneron", {
    stage: "Public (NASDAQ: REGN)",
    amount: "$95B market cap",
    date: "2024-01",
  })

  // Add some private companies with recent funding
  fundingData.set("Cerevel Therapeutics", {
    stage: "Series C",
    amount: "$250M",
    date: "2023-11",
  })

  fundingData.set("Kymera Therapeutics", {
    stage: "Public (NASDAQ: KYMR)",
    amount: "$1.2B market cap",
    date: "2024-01",
  })

  return fundingData
}
