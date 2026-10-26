---
tags: [design, important]
---

# Style guardrails

What the site should feel like, in concrete do's and don'ts. Most of these come from design reviews with the site owner; the "Rejected" column records what was tried and turned down, so nobody brings it back by accident. Token values and component APIs are in [[Design System]].

## The feel

- **Professional, clean, readable.** A calm infrastructure site between aero.xyz (layout, air, panels) and akash.network (technical credibility). Not playful, not busy.
- **Simple for newcomers.** The first job of every page is to tell an ordinary person what they can do with SCRT.
- **Inspired, never copied.** Borrow a pattern's idea, then make it ours (numbers, hairlines, the dot grid, brand orange). If a part looks recognisably like another site, change it.

## Layout

| Do                                                                                              | Don't (rejected)                                                                       |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Homepage as a short hub: hero, Get started, Explore, Latest ([[ADR-006 Homepage as a hub]])     | A long homepage with every topic on it                                                 |
| Inner pages: rounded header panel, content on a sheet that overlaps it ([[Layouts#PageLayout]]) | A plain heading on the page background                                                 |
| Separate sections with `border-t border-line`                                                   | Full-width tinted bands or borders inside the page sheet (looked broken on `/staking`) |
| Group figures or small blocks in a rounded card inside the content width                        | Elements that run edge to edge across the rounded sheet                                |
| Hairline grids (`gap-px` on a `bg-line` grid) or a rounded `Card` for groups of items           | Three identical card grids in a row                                                    |
| Compact: the roadmap fits on one screen per track, collapsed by default                         | Tall pages that repeat the same information                                            |
| Titles are the page name only                                                                   | A line or eyebrow above page titles; a different heading than the nav label            |

## Header

| Do                                                                     | Don't (rejected)                                      |
| ---------------------------------------------------------------------- | ----------------------------------------------------- |
| Nav right after the logo, buttons on the right                         | Nav centred in the bar                                |
| Full-width dropdown sheet with a rounded bottom (Aero style)           | Floating popup menus                                  |
| Small type, icon tiles, one featured card                              | Large 2xl links and coloured squares (felt childish)  |
| Content pushed to the edges: intro and links left, featured card right | Content centred in the sheet, or stretched to fill it |
| Content slides sideways when moving between dropdowns                  | Closing one dropdown and opening the next             |
| Transparent bar with no line at the top of the page                    | A bar with a bottom line before the page scrolls      |

## Hero

| Do                                                                             | Don't (rejected)                                 |
| ------------------------------------------------------------------------------ | ------------------------------------------------ |
| Full-bleed, no rounded corners, not too tall                                   | A hero inside a rounded card                     |
| Real app icons orbiting slowly in one direction at constant speed              | Icons speeding up in corners, orbiting both ways |
| Icons shown as they are                                                        | Rings, borders, blur or reduced opacity on icons |
| Dot grid with an orange wave that reacts to the pointer                        | A smoke effect; an effect that only highlights   |
| Background only slightly lighter than the page, no bottom line                 | A clearly lighter hero; a line under it          |
| Partners as a scrolling strip bottom right, above the icons, behind a gradient | Partners that icons can cover                    |
| Gradient behind the headline so it stays readable                              | Text directly over moving icons                  |

## Panels and surfaces

- Panels (page headers, post headers, the closing CtaBand) have **no border**; they read as shapes because they are lighter (`bg-surface-2`) with an orange glow.
- Cards have a hairline border (`border-line`) and `bg-surface`. Never put a border on a panel, never drop the border on a card.
- One radius system: pills for buttons, `rounded-xl` for cards, the large panel radius only on panels.

## Content blocks

| Do                                                                                                                                | Don't (rejected)                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Small blog cards; "Keep reading" as compact rows                                                                                  | Large cards and a huge "Keep reading" block                            |
| Step switchers with numbers and an orange progress hairline ([[Section components#TabShowcase]])                                  | A pill progress bar with dots on a gradient stage (too close to Akash) |
| Roadmap components as compact cards without descriptions; detail in a large popup that shows related components as the same cards | Descriptions on every card; small pills for related items              |
| Real screenshots in `BrowserFrame`; data-driven panels (`ShowcaseCard`, `ArchDiagram`) filled from data files                     | Mock UI with invented entries                                          |
| Monochrome partner logos                                                                                                          | Coloured logo walls                                                    |

## Copy

- Plain English, short sentences, terms explained once. See [[Design System#Copy rules]].
- One label per intent: "Get SCRT" always means `/scrt#get-scrt`.
- Facts only from sources; figures with a date ([[ADR-008 Figures from the chain]]).
- No em dashes, no hype verbs, no overclaiming privacy ([[Privacy claims]]).

Related: [[Design System]], [[Working on this site]].
