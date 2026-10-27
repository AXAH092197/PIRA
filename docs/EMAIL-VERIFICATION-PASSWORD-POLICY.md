# PIRA Email Verification and Password Policy — Draft Requirements
Date: 2026-10-27
Status: partially approved; repetition/sequence semantics need product-owner clarification.

## Email ownership and delivery
- Accept valid mailbox addresses at Gmail, Yahoo, Outlook, iCloud and business domains without restricting registration to an allowlist of providers.
- Validate syntax and domain mail-routing capability where feasible; do not treat MX lookup as proof of mailbox existence, ownership, security, or identity.
- Send a single-use expiring verification challenge to the address; activate only after successful server-side redemption.
- Protect challenges against replay, brute force, account enumeration, and leakage. Rate-limit sends and attempts.
- Use a reputable mail delivery service; configure SPF, DKIM, DMARC, TLS in transit, and safe sender/reply-to addresses for an owned PIRA domain. Never email passwords.
- Preserve the mandatory distinct verified email requirement for Personal vs Business accounts; no implicit cross-type linking.
- A verified mailbox is NOT proof of legal identity or business authority. Business affiliation requires separate verification and permissions.
- Email changes require verification of the new address, step-up authentication, uniqueness checks and appropriate notification/session controls.

## Password policy
Product owner specifies at least one uppercase letter and at least one special character. Treat "1+" as at least one, not exactly one.
- Proposed minimum length: 12 characters, with support for long passphrases, password managers and paste. Exact minimum pending confirmation.
- Reject known compromised/common passwords using privacy-preserving screening; use server-side throttling, MFA and secure hashing (e.g. Argon2id).
- Product owner requires no more than two of the same wording or number sequence. Exact interpretation is pending: does this prohibit 3 identical adjacent characters, 3 repeated words/substrings, or ascending/descending numeric sequences of length 3+? Do not enforce guessed semantics in production.
- Do not silently trim or transform password characters. Display clear, accessible validation errors and allow passphrases.

## Pending decisions
1. Define "no more than 2 of the same wording or number sequence" precisely, with examples of accepted/rejected passwords.
2. Confirm proposed 12-character minimum.
3. Confirm email verification code/link expiration and permitted resend cadence.

## Acceptance
Test major providers and custom business domains, invalid/missing MX without false assurance, expired/reused tokens, domain email changes, cross-type email collision, brute force, common-password rejection, Unicode handling and password-manager compatibility.

## Confirmed sequence semantics (2026-10-27)
Reject any 3+ identical adjacent characters (aaa, 111, !!!), any 3+ alphabetically consecutive ascending or descending letters (abc, cba, mno, zyx), and any 3+ numerically consecutive ascending or descending digits (123, 321, 987). Reject repeated words or character groups three times consecutively (CatCatCat, AbAbAb). Nonconsecutive combinations such as abd and 729 remain eligible under sequence rules. Apply across the entire password, case-insensitively for alphabetic sequence detection. Maintain at least one uppercase and one special character. Minimum 12 characters remains proposed rather than finally approved. Validate server-side and test edge cases, international characters and accidental rejection of long passphrases. Because rigid composition rules can reduce password usability, review against contemporary password-security standards before release, while preserving the product-owner decision.
