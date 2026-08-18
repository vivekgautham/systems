export type SystemCategory =
  | "Databases"
  | "Distributed Systems"
  | "Message Brokers"
  | "Storage"
  | "Networking"
  | "Compute & Orchestration"
  | "Observability"
  | "Frameworks & Runtimes"
  | "Security";

export interface SystemItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: SystemCategory;
  languages: string[];
  license: string;
  websiteUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  architectureNotes?: string;
  keyFeatures?: string[];
  stars?: number;
  iconEmoji?: string;
  tags?: string[];
}
