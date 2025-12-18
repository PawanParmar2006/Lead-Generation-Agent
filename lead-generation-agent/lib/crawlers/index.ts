import { crawlLinkedIn } from "./linkedin-crawler"
import { crawlPubMed } from "./pubmed-crawler"
import { crawlConferences } from "./conference-crawler"
import { crawlFundingDatabases } from "./funding-crawler"
import { crawlGrantDatabases } from "./grant-crawler"
import type { SearchCriteria, Lead } from "../types"

export async function crawlAllSources(criteria: SearchCriteria): Promise<Lead[]> {
  const allLeads: Lead[] = []
  const { jobTitles, keywords, locations, selectedSources } = criteria

  // Execute crawlers in parallel based on selected sources
  const crawlerPromises: Promise<Lead[]>[] = []

  if (selectedSources.includes("linkedin")) {
    crawlerPromises.push(crawlLinkedIn(jobTitles, locations, keywords))
  }

  if (selectedSources.includes("pubmed")) {
    crawlerPromises.push(crawlPubMed(keywords))
  }

  if (selectedSources.includes("conferences")) {
    crawlerPromises.push(crawlConferences(keywords))
  }

  if (selectedSources.includes("grants")) {
    crawlerPromises.push(crawlGrantDatabases(keywords))
  }

  // Wait for all crawlers to complete
  const results = await Promise.all(crawlerPromises)

  // Flatten results
  for (const result of results) {
    allLeads.push(...result)
  }

  // If funding source is selected, enrich all leads with funding data
  if (selectedSources.includes("funding")) {
    const fundingData = await crawlFundingDatabases()

    for (const lead of allLeads) {
      const funding = fundingData.get(lead.company)
      if (funding) {
        lead.fundingInfo = funding
      }
    }
  }

  return allLeads
}
