import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { server } from "../mcp"

export async function startStdioTransport() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  Bun.stderr.write("MCP Server is running over stdio\n")
}
