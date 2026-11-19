---
layout: default
title: "Workbook 02 — Model and FM development"
---

# Workbook 02 — Model and FM development

**Domain 2 (24%)** · Topics [04](../topics/04-modeling-approach-selection.md) · [05](../topics/05-train-fine-tune-customize-models.md) · [06](../topics/06-model-and-system-evaluation.md)

Builder focus: **select → train/customize → evaluate** with experiment tracking, gates, and GenAI-specific metrics — not “train until it looks good.”

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Choose traditional ML, managed AI APIs, Bedrock FMs, prompt-only, RAG, or fine-tune under cost/latency/interpretability constraints
- [ ] Run SageMaker built-in or script-mode training with AMT/HPO, early stopping, and distributed patterns
- [ ] Customize FMs via prompts, retrieval/embedding optimization, and fine-tune / adapter strategies
- [ ] Evaluate with MLflow, Bedrock evaluations, Prompt Management, NLP metrics, LLM-as-judge, and RAG monitoring
- [ ] Use shadow variants and baselines to prevent silent regressions

## 2. Prerequisites + time

| Item | Detail |
|---|---|
| Prerequisites | Workbook 01 or equivalent Domain 1 fluency; topics 04–06 read |
| Estimated time | **6–8 hours** (weeks 3–4) |
| Materials | SageMaker Studio/notebook or CLI; Bedrock model access; optional MLflow |

## 3. Activate prior knowledge

1. When is RAG preferred over fine-tuning for enterprise Q&A?
2. What does Automatic Model Tuning optimize, and why early stopping?
3. Name one GenAI metric that is **not** classic accuracy/AUC.

## 4. Concept refresh

| Topic | Refresh focus |
|---|---|
| [04 — Approach selection](../topics/04-modeling-approach-selection.md) | Decision tree; Bedrock FM criteria; RAG patterns; managed AI APIs |
| [05 — Train / fine-tune](../topics/05-train-fine-tune-customize-models.md) | Built-in vs script mode; AMT; distributed; overfitting / catastrophic forgetting; prompts; retrieval optimize |
| [06 — Evaluation](../topics/06-model-and-system-evaluation.md) | MLflow; Bedrock evals; Prompt Management; shadow; BLEU/ROUGE/BERTScore; LLM-as-judge; RAG monitoring |

**C02 GenAI callouts:** FM selection, fine-tune strategy ID, RAG architecture patterns, Prompt Management, Bedrock Model Evaluation, RAG retrieval accuracy monitoring.

## 5. Closed-book retrieval practice

**R1.** Decision tree: tabular labeled prediction vs OCR commodity vs grounded enterprise chat — which solution class each?

**R2.** Prompt vs RAG vs fine-tune — one “use when” and one “avoid when” each.

**R3.** Script mode essentials: what do you bring, where do inputs/outputs live, what artifact is produced?

**R4.** Data parallelism vs model parallelism — one sentence each.

**R5.** Catastrophic forgetting — signal and one mitigation for FM fine-tunes.

**R6.** Match: MLflow, Prompt Management, Model Monitor baseline, shadow variant — to purpose.

**R7.** When is LLM-as-judge useful, and what’s a risk?

## 6. Worked → guided → independent practice

### Worked example — “support assistant” approach selection

**Constraints:** Docs change weekly; need citations; p95 latency 3s; limited fine-tune budget.

**Worked decision:**

| Option | Verdict |
|---|---|
| Managed Comprehend alone | Reject — not generative Q&A with citations |
| Fine-tune only | Reject — knowledge churn weekly; fine-tune lag/cost |
| Prompt-only FM | Weak — no private grounding |
| **RAG on Bedrock KB + mid-size FM** | **Select** — weekly KB sync, citations, tunable retrieve+rerank |
| Giant FM without retrieval | Reject — cost/latency without grounding |

Training path for a companion **intent classifier** (route to agent vs FAQ): SageMaker script mode XGBoost/SKLearn → AMT on F1 → MLflow log → Registry. GenAI path: Prompt Management versions + Bedrock eval on golden set before promote.

### Guided practice

1. Latency SLO tight + steady high TPS on Bedrock → consider ______ Throughput, not only on-demand.
2. HPO objective should match ______ goal (e.g., AUC vs RMSE vs custom).
3. Shadow traffic evaluates a candidate ______ affecting users.
4. RAG monitoring should track empty retrieval rate and ______ / faithfulness, not only token count.

### Independent practice

Write a **model card–style one-pager** for either:

- (A) Churn model on SageMaker, or  
- (B) RAG assistant on Bedrock  

Include: approach rationale, train/customize steps, eval metrics, promote gate, and IaC/experiment tracking hooks (MLflow / Prompt Management / eval job).

## 7. Scenario / decision exercises

**S1.** Product wants “fine-tune Claude on our PDF dump.” Docs update daily; answers must cite sources. What do you recommend and why?

**S2.** Training loss falls; validation rises. Training set is small. Top three mitigations?

**S3.** Two Bedrock prompts in Prompt Management. How do you compare fairly before production?

**S4.** Team only watches GPU util during fine-tune. What GenAI failure modes do they miss?

**S5.** Need OCR of invoices into fields with minimal ML ops. ML custom model or managed service?

## 8. Hands-on labs

### Lab A — SageMaker train/tune

- [ ] Script-mode or built-in training job on a small tabular set; log metrics
- [ ] Launch a small AMT job with early stopping; note winning hyperparameters
- [ ] Register the model (Model Registry and/or MLflow)

### Lab B — Bedrock customize / eval

- [ ] Same prompt on two FMs; record latency, tokens, qualitative quality
- [ ] Create two Prompt Management versions; run Bedrock Model Evaluation or a fixed golden set
- [ ] (Optional) Retrieve-only KB call; tweak top-k / filters; score faithfulness manually

### Lab C — Paper fallback

- [ ] Decision table: ML vs managed AI vs prompt vs RAG vs fine-tune for three fictional product asks
- [ ] Sketch eval gate: metric thresholds → pass/fail → Registry/Prompt promote
- [ ] List overfit / forgetting mitigations you would encode as pipeline checks

## 9. Misconceptions / traps

- [ ] Fine-tuning when RAG is the knowledge problem
- [ ] Bigger FM always better (retrieval quality often dominates)
- [ ] HPO on the wrong objective metric
- [ ] No early stopping → burned budget on bad trials
- [ ] Evaluating GenAI only with BLEU when task is open-ended (need human / LLM-judge / task success)
- [ ] Promoting prompts without versioning
- [ ] Ignoring train/serve skew and data leakage in splits
- [ ] Shadow vs A/B confused (shadow copies traffic; A/B splits users)

## 10. Reflection

1. Where do you still default to “just fine-tune” incorrectly?
2. What’s your personal promote gate for FM/prompt changes?
3. Which eval method will you practice again before the exam?

## 11. Mastery checklist

- [ ] Can defend approach selection with cost/latency/grounding arguments
- [ ] Can outline script mode + AMT + distributed choice
- [ ] Can explain prompt / RAG / fine-tune tradeoffs
- [ ] Can pick ML vs GenAI eval metrics and tracking tools
- [ ] Punch list Domain 2 items checked after lab or paper exercise

## 12. Answer key

**Activate**

1. Knowledge changes often; need grounding/citations — RAG (or RAG + light prompt), not fine-tune-alone.  
2. Hyperparameters vs an objective metric; early stopping kills non-improving trials to save cost.  
3. e.g., ROUGE/BLEU/BERTScore, faithfulness, LLM-as-judge score, retrieval hit rate.

**Retrieval**

**R1.** Traditional ML; Textract (managed); RAG (+ FM).  
**R2.** Prompt: fast iteration / avoid private knowledge need. RAG: changing docs+citations / avoid tiny static style-only. Fine-tune: stable style/format / avoid daily knowledge churn.  
**R3.** Bring `train.py` (+ deps); channels on S3; hyperparameters; output `model.tar.gz`.  
**R4.** Data parallel = shard data; model parallel = shard model across devices.  
**R5.** New task skill rises, old capability drops — mix replay data, lower LR, adapters/LoRA-style, eval on old+new sets.  
**R6.** MLflow = experiment params/metrics/artifacts; Prompt Management = version prompts; baseline = drift reference; shadow = candidate gets copied prod traffic.  
**R7.** Scalable qualitative scoring; risk = judge bias/inconsistency — calibrate with human samples.

**Guided**

1. Provisioned  
2. business / product  
3. without  
4. citation presence (or faithfulness / groundedness)

**Scenarios**

**S1.** RAG + KB refresh pipeline; optional light prompt/style fine-tune later — not fine-tune-on-PDFs as knowledge store.  
**S2.** More data/augment; regularization/dropout/weight decay; simpler model; early stop; reduce epochs; fix leakage.  
**S3.** Fixed golden set; Bedrock eval / side-by-side; same model+params; version in Prompt Management; human sample.  
**S4.** Hallucination, forgetting, prompt regression, retrieval miss, toxicity/Guardrail rate, token cost.  
**S5.** Managed Textract (unless exotic custom layout justifies custom model).
