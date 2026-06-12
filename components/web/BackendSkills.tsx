"use client";

import * as React from "react";
import { SkillCard } from "./components/SkillCard";

export function BackendSkills() {
  // Mock Backend Skill Files
  const skills = [
    {
      title: "Web Search Crawler Prompt",
      filename: "web_search_executor.md",
      description: "Instructs agents on how to construct secure queries, extract indices, and crawl search pages.",
      category: "Services",
      downloads: "21.5k",
      author: { name: "Indexers Corp", avatarBg: "bg-emerald-100" },
      badge: { text: "Official", bgClass: "bg-emerald-50 border border-emerald-200/40", textClass: "text-emerald-700" },
      markdownContent: `# Web Search Executor Prompt

## Role & Mission
You are a research crawler agent. Your purpose is to formulate clear queries, dispatch searches via indexers, and return relevant articles.

## Execution Pattern
1. **Formulate** query parameters from user instructions.
2. **Execute** index requests.
3. **Filter** results, removing duplicates and capturing secure HTTPS URLs.
4. **Compile** results in a clean, abbreviated reading format:
   - Title
   - URL path
   - Key sentence snippets

## Safety Constraints
- Do not crawl payment-wall directories or robots.txt restricted directories.`
    },
    {
      title: "SQL Runner Prompt",
      filename: "sql_runner.md",
      description: "Configures agents to execute secure read-only SQL queries and structure data schema tables.",
      category: "Database",
      downloads: "17.1k",
      author: { name: "Prisma Org", avatarBg: "bg-pink-100" },
      badge: { text: "Secure", bgClass: "bg-pink-50 border border-pink-200/40", textClass: "text-pink-700" },
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
\`\`\``
    },
    {
      title: "Gmail Dispatch Prompt",
      filename: "email_dispatcher.md",
      description: "Instructs agents to authenticate, construct SMTP notification drafts, and send alerts.",
      category: "Integrations",
      downloads: "11.4k",
      author: { name: "Google Inc", avatarBg: "bg-orange-100" },
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
\`\`\``
    }
  ];

  return (
    <section className="py-24 bg-surface-soft border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-[11px] font-bold tracking-widest text-muted-soft uppercase">
            Backend Skill Files
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-cal-sans-md text-ink mt-2">
            Logic & Integration Prompt Templates
          </h2>
          <p className="text-sm md:text-base text-body mt-3 max-w-2xl leading-relaxed">
            Copy or download markdown skill files to instruct your AI agents on running search queries, executing SQL operations, and drafting notifications.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <SkillCard
              key={idx}
              title={skill.title}
              filename={skill.filename}
              description={skill.description}
              category={skill.category}
              downloads={skill.downloads}
              markdownContent={skill.markdownContent}
              author={skill.author}
              badge={skill.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}