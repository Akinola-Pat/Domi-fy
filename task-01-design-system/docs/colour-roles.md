# Colour roles

STATUS: data tables below were generated from the tokens file and must be checked by you. The reasoning is yours to write.

## Roles, what each points at

| Role | Points at | Hex | Job |
|---|---|---|---|
| primary - light | primary blue - 40 | #3941f6 | (your words: what is this role's job?) |
| on-primary | primary blue - 100 | #ffffff | (your words: what is this role's job?) |
| primary container | primary blue - 90 | #e0e0ff | (your words: what is this role's job?) |
| on-primary container | primary blue - 10 | #00006f | (your words: what is this role's job?) |
| secondary | secondary gold - 40 | #715d00 | (your words: what is this role's job?) |
| on-secondary | secondary gold - 100 | #ffffff | (your words: what is this role's job?) |
| error | error - 40 | #ba1a1a | (your words: what is this role's job?) |
| on-error | error - 100 | #ffffff | (your words: what is this role's job?) |
| error container | error - 90 | #ffdad5 | (your words: what is this role's job?) |
| on-error container | error - 30 | #930009 | (your words: what is this role's job?) |
| success | tertiary green - 40 | #006e0c | (your words: what is this role's job?) |
| on-success | tertiary green - 100 | #ffffff | (your words: what is this role's job?) |
| warning state | warning - 40 | #914d00 | (your words: what is this role's job?) |
| on-warning state | warning - 100 | #ffffff | (your words: what is this role's job?) |
| surface | neutral - 98 | #fcf8fd | (your words: what is this role's job?) |
| on-surface | neutral - 10 | #1b1b1f | (your words: what is this role's job?) |
| surface variant | neutral variant - 90 | #e1e0f9 | (your words: what is this role's job?) |
| on-surface variant | neutral variant - 30 | #444559 | (your words: what is this role's job?) |
| surface container | neutral - 95 | #f3eff4 | (your words: what is this role's job?) |
| outline | neutral variant - 50 | #75758b | (your words: what is this role's job?) |
| outline variant | neutral variant - 80 | #c5c4dd | (your words: what is this role's job?) |
| inverse surface | neutral - 20 | #303034 | (your words: what is this role's job?) |
| inverse on-surface | neutral - 95 | #f3eff4 | (your words: what is this role's job?) |

## Contrast ratios (WCAG formula, computed from the hex values above)

| Foreground role | Background role | Colours | Ratio | Reading |
|---|---|---|---|---|
| on-primary | primary - light | #ffffff on #3941f6 | 6.44 | pass AA text |
| on-primary container | primary container | #00006f on #e0e0ff | 13.24 | pass AA text |
| on-secondary | secondary | #ffffff on #715d00 | 6.43 | pass AA text |
| on-error | error | #ffffff on #ba1a1a | 6.46 | pass AA text |
| on-error container | error container | #930009 on #ffdad5 | 7.24 | pass AA text |
| on-success | success | #ffffff on #006e0c | 6.49 | pass AA text |
| on-warning state | warning state | #ffffff on #914d00 | 6.43 | pass AA text |
| on-surface | surface | #1b1b1f on #fcf8fd | 16.34 | pass AA text |
| on-surface variant | surface variant | #444559 on #e1e0f9 | 7.24 | pass AA text |
| inverse on-surface | inverse surface | #f3eff4 on #303034 | 11.55 | pass AA text |
| primary - light | surface | #3941f6 on #fcf8fd | 6.13 | pass AA text |
| error | surface | #ba1a1a on #fcf8fd | 6.15 | pass AA text |
| success | surface | #006e0c on #fcf8fd | 6.18 | pass AA text |
| warning state | surface | #914d00 on #fcf8fd | 6.12 | pass AA text |
| outline | surface | #75758b on #fcf8fd | 4.28 | UI or decoration only |
| outline variant | surface | #c5c4dd on #fcf8fd | 1.62 | UI or decoration only |

## You write

- The threshold you chose and why.
- Any pair below it, and whether you fixed it or documented it as never used for text.
- Roles in the token file you do not use (dark, fixed, containers) and why they are excluded.
- The one place your role structure would change if you started again.
