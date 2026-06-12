"use client";

import { SkillCard } from "./components/SkillCard";

export function FrontendSkills() {
  // Mock Frontend Skill Files
  const skills = [
    {
      title: "Calendar Booking Prompt",
      filename: "calendar_booking.md",
      description: "Instructs agents to index schedules, query user availability, and confirm meetings.",
      category: "Scheduling",
      downloads: "14.2k",
      author: { name: "Cal.com Core", avatarBg: "bg-amber-100" },
      badge: { text: "Official", bgClass: "bg-amber-50 border border-amber-200/40", textClass: "text-amber-700" },
      markdownContent: `# Calendar Booking System Prompt

## Role & Persona
You are the calendar management assistant. Your task is to inspect user calendars, evaluate free time slots, and execute bookings cleanly.

## Instruction Schema
1. **Greet** the user and inquire about their availability.
2. **Present** available slots within business hours (Mon-Fri, 9:00 AM - 5:00 PM EST).
3. **Validate**timezone differences before selecting a final meeting slot.
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
\`\`\``
    },
    {
      title: "Chart Data Explorer Prompt",
      filename: "chart_visualizer.md",
      description: "Prompts agents to parse array coordinates and structure clean metrics visualizations.",
      category: "Analytics",
      downloads: "8.9k",
      author: { name: "Pixel Labs", avatarBg: "bg-blue-100" },
      badge: { text: "Popular", bgClass: "bg-blue-50 border border-blue-200/40", textClass: "text-blue-700" },
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
  \`\`\``
    },
    {
      title: "Markdown Previewer Prompt",
      filename: "markdown_editor.md",
      description: "Instructs agents to transcribe transcripts into clean, formatted markdown checklists.",
      category: "Workspace",
      downloads: "6.1k",
      author: { name: "Agentic Labs", avatarBg: "bg-purple-100" },
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
\`\`\``
    }
  ];

  return (
    <section className="py-24 bg-canvas border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-[11px] font-bold tracking-widest text-muted-soft uppercase">
            Frontend Skill Files
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-cal-sans-md text-ink mt-2">
            User Interface Prompt Templates
          </h2>
          <p className="text-sm md:text-base text-body mt-3 max-w-2xl leading-relaxed">
            Copy or download markdown skill files to instruct your AI agents on user interactions, scheduling flows, and formatting data visualization components.
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