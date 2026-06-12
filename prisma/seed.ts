import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  try {
    await prisma.skill.deleteMany();

    const sampleData = [
      {
        id: "calendar-booking",
        name: "Calendar Booking Prompt",
        description:
          "Instructs agents to inspect schedules, query availability, and book meetings.",
        category: "Scheduling",
        downloads: 14200,
        authorId: "cal-core",
        markdownContent: `# Calendar Booking System Prompt

## Role & Persona
You are the calendar management assistant. Your task is to inspect user calendars, evaluate free time slots, and execute bookings cleanly.

## Instruction Schema
1. **Greet** the user and inquire about their availability.
2. **Present** available slots within business hours (Mon-Fri, 9:00 AM - 5:00 PM EST).
3. **Validate** timezone differences before selecting a final meeting slot.
4. **Output** the meeting details in JSON format for the calendar API.

## Tools & API Parameters
\`\`\`json
{
  "name": "calendar_booking",
  "description": "Book a calendar meeting",
  "parameters": {
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "attendees": ["email@domain.com"]
  }
}
\`\`\``,
      },
      {
        id: "web-search",
        name: "Web Search Crawler Prompt",
        description:
          "Instructs agents on how to construct secure queries, extract indices, and crawl search pages.",
        category: "Services",
        downloads: 21500,
        authorId: "indexers-corp",
        markdownContent: `# Web Search Executor Prompt

## Role & Mission
You are a research crawler agent. Your purpose is to formulate queries, dispatch searches via indexers, and return relevant articles.

## Execution Pattern
1. **Formulate** query parameters from user instructions.
2. **Execute** index requests.
3. **Filter** results, removing duplicates and capturing secure HTTPS URLs.
4. **Compile** results in a clean, abbreviated reading format:
   - Title
   - URL path
   - Key sentence snippets

## Safety Constraints
- Do not crawl payment-wall directories or robots.txt restricted directories.`,
      },
      {
        id: "sql-runner",
        name: "SQL Runner Prompt",
        description:
          "Configures agents to execute secure read-only SQL queries and structure data schema tables.",
        category: "Database",
        downloads: 17100,
        authorId: "prisma-org",
        markdownContent: `# SQL Database Executor Prompt

## Objective
Act as a database agent interface. Receive natural language requests, translate them to read-only SQL queries, run executions, and return results.

## Safe Query Boundaries
- **Strictly Read-Only**: Reject requests containing INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, or CREATE.
- **Limits**: Append a \`LIMIT 50\` clause to all compiled queries.
- **Form**: Return data as arrays of key-value JSON schema objects.

## Tool Interface
\`\`\`sql
SELECT id, name, status FROM agents LIMIT 2;
\`\`\``,
      },
      {
        id: "email-dispatcher",
        name: "Gmail Dispatch Prompt",
        description:
          "Instructs agents to authenticate, construct SMTP notification drafts, and send alerts.",
        category: "Integrations",
        downloads: 11400,
        authorId: "google-inc",
        markdownContent: `# SMTP Email Dispatcher Prompt

## Purpose
Interact with automated SMTP and Gmail APIs to structure, write, and transmit system notification emails.

## Form & Layout
- **Recipients**: Validate that the target recipient address format is valid.
- **Subject line**: Prepend all notification headers with \`[Agent System Alert]\`.
- **Layout**: Keep body text short, concise, and structured with list points.

## Draft Example
\`\`\`
To: lead@domain.com
Subject: [Agent System Alert] DeepMind Skill Run Completed
Body:
- Process completed.
- Check logs at skill-base.
\`\`\``,
      },
      {
        id: "chart-explorer",
        name: "Chart Data Explorer Prompt",
        description:
          "Prompts agents to parse array coordinates and structure clean metrics visualizations.",
        category: "Analytics",
        downloads: 8900,
        authorId: "pixel-labs",
        markdownContent: `# Chart Visualizer System Prompt

## Objective
Convert raw lists of coordinates and numbers into structured JSON parameters compatible with charting widgets (Bar, Line, Pie).

## Input Format
- Input data can be a CSV list or an array of key-value pairs.

## Rules & Formatting
- Standardize all values to monthly metrics.
- Output the dataset in the following structured shape:
  \`\`\`json
  {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "datasets": [
      { "label": "Telemetry", "data": [30, 45, 60, 50, 75, 90] }
    ]
  }
  \`\`\``,
      },
      {
        id: "markdown-formatter",
        name: "Markdown Previewer Prompt",
        description:
          "Instructs agents to transcribe transcripts into clean, formatted markdown checklists.",
        category: "Workspace",
        downloads: 6100,
        authorId: "agentic-labs",
        markdownContent: `# Markdown Preview Editor System Prompt

## Objective
Act as an inline document workspace compiler. Convert conversational task notes and logs into structured markdown guides.

## Syntax Guidelines
1. **Headings**: Use \`###\` for section labels.
2. **Checklists**: Mark finished tasks with \`- [x]\` and unfinished items with \`- [ ]\`.
3. **Spacing**: Add double line breaks between sections to avoid rendering collisions.

## Sample Output Shape
\`\`\`markdown
### Agent Task list
- [x] Initial codebase audit completed
- [ ] Deploy custom skill files to registry
\`\`\``,
      },
      {
        id: "vector-indexer",
        name: "Vector Embeddings Prompt",
        description:
          "Configures agents to index textual documents, generate embeddings, and search vector spaces.",
        category: "Services",
        downloads: 9400,
        authorId: "pinecone-dev",
        markdownContent: `# Vector Indexer Prompt

## Objective
Extract chunks from raw text, query OpenAI embedding models, and register embeddings to Pinecone databases.

## Execution Details
- Chunk text at 500-token boundaries with 50-token overlaps.
- Perform Cosine Similarity indexing on query targets.
- Output matches sorted by confidence score.`,
      },
      {
        id: "pdf-parser",
        name: "PDF Summarization Prompt",
        description:
          "Instructs agents to parse PDF structures, extract textual tokens, and compile TL;DR reports.",
        category: "Workspace",
        downloads: 13200,
        authorId: "adobe-developer",
        markdownContent: `# PDF Summarizer Prompt

## Role
You are a document compiler. Extract headings, main points, and lists from PDF files.

## Formatting Guidelines
- Highlight acronyms and key vocabulary.
- Produce a clean TL;DR summary at the top.
- Censure personal identification information (PII) like names or phone numbers.`,
      },
      {
        id: "slack-dispatcher",
        name: "Slack Dispatcher Prompt",
        description:
          "Instructs agents to format chat payloads, select Slack channels, and post messages.",
        category: "Integrations",
        downloads: 7300,
        authorId: "slack-dev",
        markdownContent: `# Slack Notification Dispatcher Prompt

## Objective
Structure and send chat notifications to Slack webhook channels.

## Formatting
- Use Slack block-kit markup configurations.
- Format links as \`<url|label>\`.
- Include code snippets inside single backticks.`,
      },
      {
        id: "openapi-runner",
        name: "OpenAPI Schema Prompt",
        description:
          "Configures agents to inspect swagger/OpenAPI schemas and execute valid API requests.",
        category: "Database",
        downloads: 10500,
        authorId: "swagger-team",
        markdownContent: `# OpenAPI Client Prompt

## Role
You are an API calling connector. Inspect standard swagger.json or openapi.yaml specs and construct client-side fetch calls.

## Guidelines
- Read security and authorization headers.
- Format payload data according to content-type templates.
- Handle errors and print raw JSON response codes.`,
      },
    ];

    await prisma.skill.createMany({
      data: sampleData,
    });

    console.log("Seeding completed successfully with 10 skills.");
  } catch (error) {
    console.error("Error seeding data", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
