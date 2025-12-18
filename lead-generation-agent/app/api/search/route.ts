import { NextResponse } from "next/server"
import { crawlAllSources } from "@/lib/crawlers"
import { rankLeads } from "@/lib/scoring"
import type { SearchCriteria } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const criteria: SearchCriteria = await request.json()

    // Crawl all selected data sources
    const rawLeads = await crawlAllSources(criteria)

    // Apply scoring and ranking algorithm
    const rankedLeads = rankLeads(rawLeads, criteria)

    return NextResponse.json({
      success: true,
      leads: rankedLeads,
      count: rankedLeads.length,
      criteria,
    })
  } catch (error) {
    console.error("[v0] Search API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process search request",
      },
      { status: 500 },
    )
  }
}
