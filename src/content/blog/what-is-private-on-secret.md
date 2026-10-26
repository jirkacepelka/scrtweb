---
title: "What is actually private on Secret Network"
description: "Secret encrypts smart contract data by default. Here is a plain list of what stays private, and what any observer can still see."
pubDate: 2026-10-12
tags: ["Privacy", "Learn"]
---

Secret Network is a blockchain where smart contracts run inside secure hardware enclaves. That means **the data apps work with stays encrypted**, even to the people who run the network. But privacy has edges, and it's better to know exactly where they are.

## Encrypted by default

- **Contract state.** What a contract stores, such as balances, bids or votes inside an app, is encrypted.
- **Contract inputs and outputs.** The messages you send to an app and the answers you get back.
- **Private token balances and amounts.** For SNIP-20 tokens (the private token standard on Secret), balances and transfer amounts are hidden. You see them with a viewing key or permit.

## Still public

- **Native SCRT transfers.** Sending plain SCRT from one wallet to another is visible, like on any Cosmos chain.
- **Staking and governance.** Delegations, rewards and votes are public.
- **Who called which contract, and when.** The content is hidden, but the fact that your address interacted with a contract is not.
- **Fees and gas.** Every transaction's fee is visible.

## Why this matters

"Built on Secret" does not mean "everything is invisible". It means the parts that matter most, your data inside apps and your private token balances, stay encrypted. To keep a balance private, wrap your SCRT into its private version (sSCRT) in the [Secret Dashboard](https://dash.scrt.network) before using it in apps.
