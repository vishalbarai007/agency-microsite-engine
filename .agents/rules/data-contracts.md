# Agent Rule: Data Contracts & Content Layer Isolation

## Objective
The agent must keep all business copy, links, imagery, and pricing isolated inside `src/data/` data files and strictly typed by interfaces in `src/types/dataContracts.ts`.

---

## Strict Implementation Rules

1. **No Hardcoded Copy in JSX**:
   - Never embed headlines, paragraphs, testimonials, or service descriptions directly inside React component files.
   - Always import arrays or objects from `@/data/*`.

2. **Strict Typing**:
   - Every file inside `src/data/` must explicitly type its exports using interfaces from `@/types/dataContracts`.
   - Any new section added to the website must first declare its data contract in `src/types/dataContracts.ts`.

3. **Fallback Assets**:
   - If client images are not provided, use high-resolution Unsplash CDN links with explicit query params (e.g. `?q=80&w=1200&auto=format`).
   - Never generate broken image paths or generic local references that do not exist in `public/`.
