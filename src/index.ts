import { parseArgs } from "util"
import { startStdioTransport } from "./transport/stdio"

Error.stackTraceLimit = Bun.env["NODE_ENV"] === "development" ? 10 : 0

function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    if (
      !["", "/"].includes(parsedUrl.pathname) ||
      parsedUrl.search !== "" ||
      parsedUrl.hash !== "" ||
      !["http:", "https:"].includes(parsedUrl.protocol)
    ) {
      return false
    }
    return true
  } catch {
    return false
  }
}

async function cli() {
  const serverFromEnv = Bun.env["SEARXNG_SERVER"]
  const {
    values: { server },
  } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      server: {
        type: "string",
        short: "s",
        default: serverFromEnv,
      },
    },
    strict: true,
    allowPositionals: false,
  })
  if (!server) {
    throw new Error(
      "The --server option or SEARXNG_SERVER environment variable is required"
    )
  }
  if (!isValidUrl(server)) {
    throw new Error("The provided server URL is not valid")
  }

  await startStdioTransport()
}

if (import.meta.main) {
  await cli()
}
