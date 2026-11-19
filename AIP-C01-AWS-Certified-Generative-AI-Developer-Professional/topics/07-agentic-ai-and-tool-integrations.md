# 07 — Agentic AI and tool integrations

**Exam map:** Domain 2 · Task **2.1** · Skills **2.1.1–2.1.7**

## What it is

Building autonomous (and semi-autonomous) systems: Strands Agents, Agent Squad multi-agent routing, MCP tool access, ReAct/CoT orchestration, memory/state, safeguarded workflows, ensembles, and human-in-the-loop.

## Why it matters for AIP-C01

Domain 2 centerpiece. AIP-C01 explicitly calls out Strands, Agent Squad, MCP, Step Functions ReAct patterns, and AgentCore-class production hosting.

## Production implementation notes

- **Strands:** model-driven agent loop; tools as Python/TS functions or MCP; multi-agent patterns (swarm, graph, workflow, agents-as-tools). Pair with **AgentCore Runtime** for session-isolated microVMs, Identity, Memory, Observability.
- **Agent Squad:** intent classifier routes to specialized agents with shared conversation context—good for digital-team UX; not a managed AWS control plane.
- **MCP:** AgentCore Gateway converts Lambda/OpenAPI/Smithy into MCP tools with ingress/egress auth. Lambda for lightweight/stateless MCP servers; ECS for heavy tools.
- **Reasoning patterns:** Step Functions for explicit ReAct / CoT state machines when you need deterministic stops; Strands when you want FM-driven planning.
- **Safeguards:** timeouts, max tool iterations, IAM resource boundaries, circuit breakers, Guardrails on agent prompts/responses.
- **HITL:** Step Functions wait-for-task-token / Amplify UI approval for refunds, deletes, external sends.
- **Memory:** short-term session vs long-term AgentCore Memory; DynamoDB for custom state.

## AWS services

Amazon Bedrock AgentCore (Runtime, Gateway, Memory, Identity, Observability), Strands Agents SDK, Agent Squad, Amazon Bedrock Agents, AWS Step Functions, AWS Lambda, Amazon ECS, Amazon API Gateway, IAM, Amazon DynamoDB.

## Exam traps

- Unlimited tool loops (cost + runaway agency).
- MCP tools without authn/authz (confused deputy).
- Confusing Agent Squad (OSS router) with AgentCore (managed platform).
- Skipping HITL for high-impact side effects.

## Hands-on project ideas

1. Strands agent + AgentCore Gateway MCP tools (Lambda order lookup); deploy to AgentCore Runtime.
2. Agent Squad router: billing vs tech agents with shared session storage.
3. Step Functions ReAct with hard stop after N tool calls + human approval state.

## Research links

- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-agent-integration.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html
- https://aws.amazon.com/blogs/machine-learning/multi-agent-collaboration-patterns-with-strands-agents-and-amazon-nova/
