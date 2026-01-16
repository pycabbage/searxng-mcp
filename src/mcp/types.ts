import z from "zod"

export const inputSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe(
      "The search query. This string is passed to external search services. Thus, SearXNG supports syntax of each search service. For example, site:github.com SearXNG is a valid query for Google. However, if simply the query above is passed to any search engine which does not filter its results based on this syntax, you might not get the results you wanted."
    ),
  categories: z
    .string()
    .optional()
    .describe(
      "Comma separated list, specifies the active search categories. Default: all categories."
    ),
  engines: z
    .string()
    .optional()
    .describe(
      "Comma separated list, specifies the active search engines. Default: all engines."
    ),
  language: z.string().optional().describe("Code of the language."),
  page: z.number().min(1).default(1).describe("Search page number."),
  time_range: z
    .enum(["day", "month", "year"])
    .optional()
    .describe(
      "Time range of search for engines which support it. See if an engine supports time range search in the preferences page of an instance. Default: no time range."
    ),
})

export const outputSchema = z.object({})
