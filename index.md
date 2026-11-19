---
title: curriculum-2027
---

# AWS AI certs, the 2027 run

I'm taking three AWS AI certifications before mid-2027, in order: **AI Practitioner**, then **Machine Learning Engineer – Associate**, then **Generative AI Developer – Professional**. This site is my study path for all three, out in the open. Topic notes, punch lists, workbooks, and one project I'm building the whole way through.

If you're on the same path, take whatever's useful. That's why it's public.

<div class="progress-box" markdown="0">
  <div class="hdr">$ progress --topics</div>
  <div data-progress="/AIF-C01-AWS-Certified-AI-Practitioner/topics/" data-total="14" data-label="aif-c01"></div>
  <div data-progress="/MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/" data-total="12" data-label="mla-c02"></div>
  <div data-progress="/AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/" data-total="20" data-label="aip-c01"></div>
</div>

## The path

```
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │   AIF-C01    │ ───▶ │   MLA-C02    │ ───▶ │   AIP-C01    │
  │ foundational │      │  associate   │      │ professional │
  │  2-3 weeks   │      │  6-8 weeks   │      │  8-10 weeks  │
  └──────────────┘      └──────────────┘      └──────────────┘
   vocabulary            pipelines             production GenAI
```

| # | Certification | Exam | Level | Cost | Study pack |
|---|---|---|---|---|---|
| 1 | [AWS Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/) | AIF-C01 | Foundational | $100 | [aif-c01/](AIF-C01-AWS-Certified-AI-Practitioner/) |
| 2 | [AWS Certified Machine Learning Engineer – Associate](https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/) | MLA-C02 | Associate | $150 ($75 beta) | [mla-c02/](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/) |
| 3 | [AWS Certified Generative AI Developer – Professional](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/) | AIP-C01 | Professional | $300 | [aip-c01/](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/) |

**Don't skip the order.** Each one stacks on the last: concepts, then pipelines, then production GenAI. It's also how AWS suggests progressing after AI Practitioner. And there's a practical bonus: passing MLA auto-recertifies AIF.

**Not on this path:** Cloud Practitioner, Solutions Architect, Developer Associate, CloudOps, AI Business Strategist. All useful. This run is just the three AI exams.

## Timeline

Figure ~5-8 hours a week of focused study plus hands-on. If you already ship Bedrock or SageMaker work, you'll go faster.

| Phase | Cert | Duration | I'm done when... |
|---|---|---|---|
| 1 | [AIF-C01](AIF-C01-AWS-Certified-AI-Practitioner/) | 2-3 weeks | Official practice exam ≥80%. I can explain FM vs traditional ML, RAG, responsible AI, and the core AWS AI services without notes. |
| 2 | [MLA-C02](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/) | 6-8 weeks | I can prep data, train and tune, deploy, and monitor ML and FM workloads on SageMaker and Bedrock. Practice exam ≥80%. |
| 3 | [AIP-C01](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/) | 8-10 weeks | I can design, secure, optimize, and troubleshoot production GenAI (RAG, agents, evals) and defend every choice. Practice exam ≥80%. |

Call it **4-5 months end to end**. Compress Phase 1 if GenAI vocabulary is already second nature. Do *not* compress Phase 3. Production depth is the whole point of that one.

## How each study pack works

Every cert folder has the same layout:

| Piece | What it's for |
|---|---|
| **README** | Exam snapshot, domain weights, the study plan, and a progress tracker |
| **PUNCH-LIST** | Every exam topic as a checkbox, grouped by domain, linked to its note |
| **topics/** | One note per punch-list item: what to know, AWS services, hands-on, exam traps, research links |
| **workbooks/** | Active practice: closed-book retrieval, scenarios, labs, mastery checklists, answer keys at the end |

The loop I run for each cert:

1. Read the README and the official exam guide.
2. Skim every topic note once, fast.
3. Work the workbooks domain by domain. Closed-book first, answer key last.
4. Do the matching [build milestones](build.md). This is where it actually sticks.
5. Check off the punch list only when I can teach the topic back.
6. Skill Builder practice, then the official practice exam. Book the real thing only at a steady ≥80%.

## The build

Reading about RAG doesn't make you good at RAG. So I'm building one thing across all three certs: **[Ask Composite Code](build.md)**, a RAG assistant and eventually an agent over 15+ years of my own blog posts. It starts as a Knowledge Base in the console for AIF and ends as a production API with an agent, guardrails, evals, and CI/CD for AIP. Twelve milestones, B1 through B12, each wired to the topics it exercises.

## Keeping it

Passing is one thing. Still knowing it six months later, when MLA assumes everything from AIF, is another. The [retention toolkit](retention.html) is for that: daily [spaced-repetition review](review.html) over every topic note, with a keep-warm mode for certs I've already passed, plus the other tools that hold onto judgment, not just facts.

## Habits that apply across the board

- **Official sources first.** Exam guides, Skill Builder prep plans, official practice exams. Third-party dumps are a liability, not a shortcut.
- **Hands-on after AIF.** Console plus IaC (CDK, Terraform, or CloudFormation) for MLA and AIP. Reading alone won't hold.
- **Book on evidence.** Schedule through Pearson VUE once the practice exam is consistently ≥80%, not when you've "finished the course."
- **Recertification.** Each cert is good for 3 years. MLA renews AIF automatically, one more reason to go in order.

## Official links

| Resource | Link |
|---|---|
| AI Practitioner | <https://aws.amazon.com/certification/certified-ai-practitioner/> |
| ML Engineer – Associate | <https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/> |
| Generative AI Developer – Professional | <https://aws.amazon.com/certification/certified-generative-ai-developer-professional/> |
| All exam guides | <https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html> |
| AWS Skill Builder | <https://skillbuilder.aws/> |
| Schedule exams (Pearson VUE) | <https://www.pearsonvue.com/us/en/amazon.html> |
| This repo | <https://github.com/Adron/curriculum-2027> |
