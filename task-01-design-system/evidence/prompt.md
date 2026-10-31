# Prompt Log

Evidence record of all prompts sent by the user to the agent for Domi-fy, recorded verbatim with timestamps.

---

## Prompt 1
- **Date/Time:** 2026-10-31T21:22:42+01:00
- **Purpose:** Task 1 token conversion script and CSS generation request

```markdown
You are a senior front-end engineer converting design tokens into CSS for a project called Domi-fy.

## Context (carry forward)
- Files to read first: follow-along.md (section 1 only), AGENTS.md, context/design-system.md, task-01-design-system/tokens/design-tokens.json. Treat them as the only source of truth. If two of them disagree, stop and ask.
- Plain CSS custom properties, light mode only. No Tailwind, no frameworks, no npm installs.
- The token file has sections: color (legacy, ignore), font, effect, primitives, colour roles, typography (duplicate of font, ignore).

## Deliverable (this session only)
A zero-dependency Node script (ES module) at task-01-design-system/scripts/build-tokens.mjs that reads the token file and writes task-01-design-system/css/tokens.css. Do nothing else in this session.

## Requirements
1. Primitives become --primitive-* variables holding 6-digit hex (drop the alpha suffix when it is ff). Follow the naming rules in context/design-system.md.
2. Roles listed in context/design-system.md become --color-* variables emitted as var(--primitive-*) references, never as copied hex. Interface code will use role variables only. Primitive variables may be referenced only inside the role definitions.
3. Type styles from the font section become --type-{style}-size, -line, -weight, -spacing, plus --font-family-base. Convert px to rem (divide by 16) for size and line height. Keep letter spacing in px.
4. Effects become --shadow-soft, --shadow-medium, --shadow-hard as comma-separated box-shadow lists.
5. Add a header comment to the CSS: generated file, do not edit by hand, with the source path.
6. The script exits non-zero and prints the names if any alias is unresolved or any variable name collides.

## Process
First produce an implementation plan as an Artifact and wait for my approval. After approving, run the script. After each step output: ✅ [what was completed].

## Allowed
Create the two files above. Run the script.

## Forbidden
Editing the token file or any file outside task-01-design-system/scripts and task-01-design-system/css. Building any screen or UI. Running git commands. Installing packages. Deleting files.

## Stop and ask before
Overwriting any existing file, making an assumption about a name or value not covered by the files above, or retrying a failed step more than twice.

## Verify
Run the script twice and confirm the second output is identical to the first. Print the counts of primitives, roles, type styles and shadows, and the number of unresolved aliases (expected 0).

## Final report
List every file created or changed, every assumption made, and the verification results. Then audit your work against Requirements and Forbidden and state any deviation.
```

---

## Prompt 2
- **Date/Time:** 2026-10-31T21:33:51+01:00
- **Purpose:** Approval of implementation plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/implementation-plan.md

The user has approved this document.
```

---

## Prompt 3
- **Date/Time:** 2026-10-31T21:55:53+01:00
- **Purpose:** Instruction to create and maintain prompt evidence file

```markdown
Create a prompt.md file where you store every prompt I send to you. Make it a part of the evidence folder
```

---

## Prompt 4
- **Date/Time:** 2026-10-31T22:06:51+01:00
- **Purpose:** Request to build initial static landlord dashboard screen without design system (`index.html`)

```markdown
You are a front-end developer building one static screen from scratch.

## Deliverable
One file: index.html in the current workspace folder (inline CSS, no JavaScript, no frameworks, no external files, fonts or images). Work only inside this folder.

## Screen: landlord dashboard (one static page)
Mobile first (375px wide), also correct at 1440px. Sample data only, no real people.
- Top bar: product name "Domi-fy" and landlord name "Adeyemi Properties".
- Page heading: "Portfolio overview".
- Three summary cards: "Expected this year" ₦5,500,000, "Collected" ₦1,800,000, "Outstanding" ₦3,700,000.
- Section heading: "Units".
- Three unit rows, each with unit name, tenant, amount and a status chip:
  Ikeja, Flat 2A | Mrs Okafor | ₦1,800,000 | Paid
  Yaba, Flat 5 | Mr Bello | ₦2,200,000 | Due in 12 days
  Surulere, Flat 1 | Ms Eze | ₦1,500,000 | Overdue 9 days
- A primary button "Invite tenant" and a text link "View receipts".
- A small caption: "Last updated 31 October 2026".

## Styling
Choose the colours, fonts, sizes, spacing and shadows yourself. The look should feel serious, secure and trustworthy, because housing and money are involved. Mobile first.

## Process
First output a short plan as an Artifact and wait for my approval. After approving, build the page. After each step output: ✅ [what was completed].

## Forbidden
Opening or reading any file outside this folder. Installing packages. Running git commands. Adding any section, feature or script not in the screen spec.

## Verify
Use the browser agent to check the page at 375px and 1440px. Fix any overflow or unreadable text.

## Final report
List the file created, the hex colours, fonts and font sizes you chose, and any assumptions.
```

---

## Prompt 5
- **Date/Time:** 2026-10-31T22:10:20+01:00
- **Purpose:** Approval of static dashboard plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/screen-without-system-plan.md

The user has approved this document.
```
