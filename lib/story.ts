export interface Milestone {
  year: string;
  title: string;
  place: string;
  flag: string;
  body: string;
  tags: string[];
  accent: "electric" | "horizon";
}

export const milestones: Milestone[] = [
  {
    year: "2016",
    title: "The First 'Why?'",
    place: "Bangladesh",
    flag: "🇧🇩",
    body: "At 14, a boy takes apart transistors just to see what makes them tick. Every machine is a question — Why? What? How? — and curiosity becomes the family language.",
    tags: ["Childhood", "Machines", "Curiosity"],
    accent: "electric",
  },
  {
    year: "2018",
    title: "The Academic Pivot",
    place: "Bangladesh",
    flag: "🇧🇩",
    body: "Studying Arts, he falls in love with learning itself. A camera becomes a second pair of eyes — working with top firms as a portrait photographer and reading light like data.",
    tags: ["Arts", "Photography", "Craft"],
    accent: "horizon",
  },
  {
    year: "2022",
    title: "The Leap to Belgium",
    place: "Belgium",
    flag: "🇧🇪",
    body: "Relocating to study International Tourism & Leisure, then pivoting in Year 2 to Global Supply Chain — trading the classroom for the movement of goods across borders.",
    tags: ["Relocation", "Supply Chain", "Global"],
    accent: "electric",
  },
  {
    year: "2023",
    title: "Founding Blink Media",
    place: "Mechelen, Belgium",
    flag: "🇧🇪",
    body: "Entrepreneurship in practice: launching Blink Media to scale branding and operations for local restaurants — turning creative instinct into systems that grow businesses.",
    tags: ["Founder", "Branding", "Operations"],
    accent: "horizon",
  },
  {
    year: "Now",
    title: "The Horizon",
    place: "The Markets",
    flag: "📈",
    body: "Full-time stock trading — applying system-level thinking to financial markets. The same 14-year-old question, aimed at charts instead of transistors.",
    tags: ["Trading", "Systems", "Discipline"],
    accent: "electric",
  },
];
