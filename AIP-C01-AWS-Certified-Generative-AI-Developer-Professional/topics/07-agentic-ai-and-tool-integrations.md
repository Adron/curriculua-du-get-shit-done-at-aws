---
title: "07: Agentic AI and tool integrations"
---

# 07: Agentic AI and tool integrations

**Domain 2 · Task 2.1 · Skills 2.1.1-2.1.7**

Building autonomous (and semi-autonomous) systems: Strands Agents, Agent Squad multi-agent routing, MCP tool access, ReAct/CoT orchestration, memory and state, safeguarded workflows, ensembles, and human-in-the-loop.

This is the centerpiece of Domain 2. AIP-C01 explicitly calls out Strands, Agent Squad, MCP, Step Functions ReAct patterns, and AgentCore-class production hosting. It's also the part that's the most fun to build, and the easiest to build badly. **An agent with unlimited tool calls and an admin role isn't clever, it's an incident waiting for a date.**

## What to know

- **Strands:** a model-driven agent loop. Tools are Python/TS functions or MCP; multi-agent patterns include swarm, graph, workflow, and agents-as-tools. Pair it with **AgentCore Runtime** for session-isolated microVMs, Identity, Memory, and Observability.
- **Agent Squad:** an intent classifier routes to specialized agents with shared conversation context. Good for digital-team UX. It is *not* a managed AWS control plane.
- **MCP:** AgentCore Gateway converts Lambda/OpenAPI/Smithy into MCP tools with ingress/egress auth. Lambda for lightweight, stateless MCP servers; ECS for heavy tools.
- **Reasoning patterns:** Step Functions for explicit ReAct/CoT state machines when you need deterministic stops; Strands when you want FM-driven planning.
- **Safeguards:** timeouts, max tool iterations, IAM resource boundaries, circuit breakers, Guardrails on agent prompts and responses.
- **HITL:** Step Functions wait-for-task-token or an Amplify UI approval for refunds, deletes, and external sends.
- **Memory:** short-term session vs long-term AgentCore Memory; DynamoDB for custom state.

## AWS services in play

Amazon Bedrock AgentCore (Runtime, Gateway, Memory, Identity, Observability), Strands Agents SDK, Agent Squad, Amazon Bedrock Agents, AWS Step Functions, AWS Lambda, Amazon ECS, Amazon API Gateway, IAM, Amazon DynamoDB.

## Hands-on

1. Strands agent + AgentCore Gateway MCP tools (a Lambda order lookup), deployed to AgentCore Runtime. This is [B10](../../build.md#b10): swap "order lookup" for search posts, tag a draft via the B5 endpoint, and look up GitHub repos.
2. Agent Squad router: billing vs tech agents sharing session storage.
3. Step Functions ReAct with a hard stop after N tool calls and a human approval state.

## Exam traps

- Unlimited tool loops (cost plus runaway agency).
- MCP tools without authn/authz (confused deputy).
- Confusing Agent Squad (OSS router) with AgentCore (managed platform).
- Skipping HITL for high-impact side effects.

## Exam guide mapping

- **Task 2.1**, Skills 2.1.1-2.1.7: implement agentic AI solutions and tool integrations.

## Research links

- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-agent-integration.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html>
- <https://aws.amazon.com/blogs/machine-learning/multi-agent-collaboration-patterns-with-strands-agents-and-amazon-nova/>