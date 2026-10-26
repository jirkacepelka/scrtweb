---
tags: [content, important]
---

# Privacy claims

Secret's privacy is real but has edges. The site must describe them accurately: users who assume everything is private are being misled by omission. Use this note whenever you write about privacy on the site, in the blog or in the [[Section components#PrivacySplit]] lists.

## Encrypted

- Smart contract state (what apps store)
- Contract inputs and outputs (execute and query payloads)
- Messages between contracts
- SNIP-20 (private token) balances and transfer amounts. Users see them with a viewing key or permit

## Public

- Native SCRT transfers between wallets (the bank module)
- Which address called which contract, and when
- Staking, delegations, rewards and governance votes
- Transaction fees and gas
- Contract addresses, code IDs, code hashes and admins

## Phrasing

| Don't write                       | Write                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------- |
| "Everything on Secret is private" | "Data inside Secret apps stays encrypted"                                       |
| "Untraceable transactions"        | "Private token balances and amounts are hidden"                                 |
| "Anonymous"                       | "Encrypted" / "private by default for app data"                                 |
| "Unhackable"                      | Don't. Privacy rests on secure hardware (TEEs); describe it, don't overclaim it |

To keep a balance private, users wrap SCRT into its SNIP-20 form (sSCRT) in the Secret Dashboard.

Source: Secret Network technical documentation, checked October 2026. If the protocol changes (for example the move away from dependence on Intel SGX), update this note first, then the site.
