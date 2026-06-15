import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  try {
    await prisma.skill.deleteMany();

    const prompts = [
  {
    name: "React Component Generator",
    slug: "react-component-generator",
    description:
      "Generates reusable React components following modern best practices and accessibility standards.",
    category: "frontend",
    downloads: 18420,
    authorId: "react-core",
    authorName: "React Core",
    markdownContent: "# React Component Generator Prompt\n\nGenerate clean, reusable React components using TypeScript, proper props interfaces, and accessibility best practices."
  },
  {
    name: "UI Design Assistant",
    slug: "ui-design-assistant",
    description:
      "Creates modern UI layouts, design systems, and responsive interfaces.",
    category: "frontend",
    downloads: 15670,
    authorId: "design-core",
    authorName: "Design Core",
    markdownContent: "# UI Design Assistant Prompt\n\nDesign visually appealing and responsive user interfaces with consistent spacing, typography, and color systems."
  },
  {
    name: "Tailwind Styling Expert",
    slug: "tailwind-styling-expert",
    description:
      "Converts designs into production-ready Tailwind CSS implementations.",
    category: "frontend",
    downloads: 21340,
    authorId: "tailwind-core",
    authorName: "Tailwind Core",
    markdownContent: "# Tailwind Styling Expert Prompt\n\nGenerate maintainable Tailwind CSS classes while avoiding unnecessary complexity."
  },
  {
    name: "Frontend Performance Analyzer",
    slug: "frontend-performance-analyzer",
    description:
      "Optimizes bundle sizes, rendering performance, and Core Web Vitals.",
    category: "frontend",
    downloads: 11230,
    authorId: "perf-core",
    authorName: "Performance Core",
    markdownContent: "# Frontend Performance Analyzer Prompt\n\nAnalyze frontend code and suggest performance optimizations for rendering and loading speed."
  },
  {
    name: "Accessibility Review Agent",
    slug: "accessibility-review-agent",
    description:
      "Audits web applications for accessibility compliance and usability improvements.",
    category: "frontend",
    downloads: 9750,
    authorId: "a11y-core",
    authorName: "Accessibility Core",
    markdownContent: "# Accessibility Review Agent Prompt\n\nReview interfaces for WCAG compliance and provide actionable accessibility recommendations."
  },
  {
    name: "REST API Builder",
    slug: "rest-api-builder",
    description:
      "Designs scalable REST APIs with proper resource structures and validation.",
    category: "backend",
    downloads: 24120,
    authorId: "api-core",
    authorName: "API Core",
    markdownContent: "# REST API Builder Prompt\n\nCreate secure and scalable REST APIs with proper request validation and error handling."
  },
  {
    name: "Database Schema Architect",
    slug: "database-schema-architect",
    description:
      "Designs normalized database schemas optimized for performance and scalability.",
    category: "backend",
    downloads: 19860,
    authorId: "db-core",
    authorName: "Database Core",
    markdownContent: "# Database Schema Architect Prompt\n\nDesign efficient database schemas with relationships, indexes, and constraints."
  },
  {
    name: "Authentication Service Agent",
    slug: "authentication-service-agent",
    description:
      "Implements secure authentication and authorization systems for applications.",
    category: "backend",
    downloads: 22350,
    authorId: "auth-core",
    authorName: "Auth Core",
    markdownContent: "# Authentication Service Agent Prompt\n\nImplement secure login, session management, RBAC, and authentication workflows."
  },
  {
    name: "Microservice Architect",
    slug: "microservice-architect",
    description:
      "Designs distributed backend systems with service communication patterns.",
    category: "backend",
    downloads: 14590,
    authorId: "micro-core",
    authorName: "Microservices Core",
    markdownContent: "# Microservice Architect Prompt\n\nDesign scalable microservice architectures with fault tolerance and observability."
  },
  {
    name: "Background Job Processor",
    slug: "background-job-processor",
    description:
      "Creates reliable asynchronous job processing workflows and queue systems.",
    category: "backend",
    downloads: 12780,
    authorId: "queue-core",
    authorName: "Queue Core",
    markdownContent: "# Background Job Processor Prompt\n\nDesign background job systems with retries, monitoring, and failure recovery strategies."
  }
];

    await prisma.skill.createMany({
      data: prompts
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
