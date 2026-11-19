# curriculum-2027

My path through three AWS AI certifications before mid-2027: **AIF-C01 → MLA-C02 → AIP-C01**.

**Read it as a site:** <https://adron.github.io/curriculum-2027/>. Hacker theme, progress tracking, the works. The site home is [index.md](index.md).

| # | Study pack | Exam | Level |
|---|---|---|---|
| 1 | [AIF-C01-AWS-Certified-AI-Practitioner](AIF-C01-AWS-Certified-AI-Practitioner/) | AIF-C01 | Foundational |
| 2 | [MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/) | MLA-C02 | Associate |
| 3 | [AIP-C01-AWS-Certified-Generative-AI-Developer-Professional](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/) | AIP-C01 | Professional |

Each pack has a `README.md`, a `PUNCH-LIST.md`, `topics/` notes, and `workbooks/`. The running project that ties all three together is in [build.md](build.md).

## Running the site locally

```sh
bundle install
bundle exec jekyll serve
# http://localhost:4000/curriculum-2027/
```

The theme is custom (no remote theme): `_layouts/default.html`, `assets/css/hacker.css`, and `assets/js/term.js`. Checkboxes on punch lists and topics save to your browser's localStorage.
