-- ---------------------------------------------------------------------------
-- Seed data — copies the site's built-in default content into the database
-- so everything becomes editable from /admin.
--
-- Idempotent: ON CONFLICT DO NOTHING, so re-running never overwrites edits
-- you've made in the admin. Run db/schema.sql first (or let the app create
-- the tables), then run this.
--
-- NOTE: you can skip this file entirely — the "Seed from defaults" button in
-- /admin does the same thing, including the two starter blog posts.
-- ---------------------------------------------------------------------------

-- Site settings ---------------------------------------------------------------
INSERT INTO settings (id, data) VALUES ('site', $json$
{
  "name": "Mahin Mahadi Hassan",
  "shortName": "Mahin",
  "age": 22,
  "role": "Everything-Holic · Problem Solver",
  "tagline": "Together is better — making the world bigger, beautiful, and ensuring everyone has a right to smile.",
  "description": "The portfolio of Mahin Mahadi Hassan — a curiosity-driven navigator working across Global Supply Chain and Stock Trading, with roots in arts, photography and technology.",
  "url": "https://mahinmahdi.com",
  "location": "Mechelen, Belgium",
  "email": "mahination.be@gmail.com",
  "whatsapp": {
    "number": "32000000000",
    "presetMessage": "Hi Mahin! I found your portfolio and would love to connect."
  },
  "socials": {
    "linkedin": "https://www.linkedin.com/",
    "instagram": "https://www.instagram.com/",
    "github": "https://github.com/mahin4u"
  },
  "focuses": [
    {
      "title": "Global Supply Chain",
      "description": "Mapping the movement of goods across borders — systems thinking applied to logistics, operations and trade.",
      "accent": "electric",
      "icon": "route"
    },
    {
      "title": "Stock Trading",
      "description": "Full-time trading with a system-level lens: reading markets like machines, disciplined by data and probability.",
      "accent": "horizon",
      "icon": "chart"
    }
  ]
}
$json$::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Gallery ---------------------------------------------------------------------
INSERT INTO gallery (id, title, location, country, capture_date, src, ratio, accent, sort_order) VALUES
  ('dhaka-rooftop',   'Rooftop Transistors',  'Old Dhaka',    'Bangladesh', '2019-08-12', NULL, 'portrait',  'electric', 0),
  ('grand-place',     'Grand Place at Dusk',  'Brussels',     'Belgium',    '2023-11-03', NULL, 'landscape', 'horizon',  1),
  ('mechelen-market', 'Market Portraits',     'Mechelen',     'Belgium',    '2024-04-21', NULL, 'square',    'midnight', 2),
  ('bruges-canal',    'Canal Reflections',    'Bruges',       'Belgium',    '2024-06-09', NULL, 'portrait',  'horizon',  3),
  ('cox-bazar',       'The Longest Beach',    'Cox''s Bazar', 'Bangladesh', '2021-01-17', NULL, 'landscape', 'electric', 4),
  ('antwerp-station', 'Cathedral of Rails',   'Antwerp',      'Belgium',    '2024-02-14', NULL, 'portrait',  'midnight', 5),
  ('sundarbans',      'Into the Mangroves',   'Sundarbans',   'Bangladesh', '2020-12-05', NULL, 'square',    'horizon',  6),
  ('ghent-lights',    'River Lights',         'Ghent',        'Belgium',    '2024-09-28', NULL, 'landscape', 'electric', 7)
ON CONFLICT (id) DO NOTHING;

-- Story timeline ----------------------------------------------------------------
INSERT INTO milestones (id, year, title, place, flag, body, tags, accent, sort_order) VALUES
  ('milestone-0', '2016', 'The First ''Why?''', 'Bangladesh', '🇧🇩',
   'At 14, a boy takes apart transistors just to see what makes them tick. Every machine is a question — Why? What? How? — and curiosity becomes the family language.',
   ARRAY['Childhood','Machines','Curiosity'], 'electric', 0),
  ('milestone-1', '2018', 'The Academic Pivot', 'Bangladesh', '🇧🇩',
   'Studying Arts, he falls in love with learning itself. A camera becomes a second pair of eyes — working with top firms as a portrait photographer and reading light like data.',
   ARRAY['Arts','Photography','Craft'], 'horizon', 1),
  ('milestone-2', '2022', 'The Leap to Belgium', 'Belgium', '🇧🇪',
   'Relocating to study International Tourism & Leisure, then pivoting in Year 2 to Global Supply Chain — trading the classroom for the movement of goods across borders.',
   ARRAY['Relocation','Supply Chain','Global'], 'electric', 2),
  ('milestone-3', '2023', 'Founding Blink Media', 'Mechelen, Belgium', '🇧🇪',
   'Entrepreneurship in practice: launching Blink Media to scale branding and operations for local restaurants — turning creative instinct into systems that grow businesses.',
   ARRAY['Founder','Branding','Operations'], 'horizon', 3),
  ('milestone-4', 'Now', 'The Horizon', 'The Markets', '📈',
   'Full-time stock trading — applying system-level thinking to financial markets. The same 14-year-old question, aimed at charts instead of transistors.',
   ARRAY['Trading','Systems','Discipline'], 'electric', 4)
ON CONFLICT (id) DO NOTHING;

-- Blog posts: use the "Seed from defaults" button in /admin to import the two
-- starter MDX posts with their full content, or write new ones directly in
-- the admin. (Their markdown bodies are long, so they're not duplicated here.)
