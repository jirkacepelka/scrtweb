---
tags: [decision]
status: accepted
date: 2026-10-26
---

# ADR-005 Navigation structure

**Context.** The first version grouped the header as "Use SCRT · Ecosystem · Build" plus Roadmap and Blog. As pages were added (Foundation, Grants, Community, Brand assets, Secret 2.0) and Secret prepared to open infrastructure roles to operators, the groups no longer matched how visitors think about the site.

**Decision.** The header has, in this order: **Use SCRT · Build · Provide · About**, then **Blog** as a plain link.

| Group    | Contains                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Use SCRT | Get SCRT, Wallets, Staking, Secret Bridge (featured: Secret Dashboard)                                      |
| Build    | Builders, Secret 2.0, Grants, Documentation, GitHub (featured: Builders)                                    |
| Provide  | Validators, Confidential machines, Storage. **Hidden** until its page exists                                |
| About    | Ecosystem, SCRT (the token page), Roadmap, Secret Foundation, Community, Brand assets (featured: Ecosystem) |

The footer is generated from the same groups, so header and footer never drift apart.

**Consequences.**

- One source: `navGroups` in `src/config/site.ts`. A group with `hidden: true` is skipped in the header, mobile menu and footer.
- The token page appears twice on purpose: as "Get SCRT" under Use SCRT (linking to `/scrt#get-scrt`) and as "SCRT" under About (the page itself).
- To open Provide: build `/provide` (sections `#validators`, `#machines`, `#storage`), then remove `hidden`.
- Supersedes the earlier "Use SCRT · Ecosystem · Build" structure and its "keep to three groups" rule.
