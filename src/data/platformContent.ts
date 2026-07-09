export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ResearchStatus = 'Draft' | 'In Progress' | 'Published' | 'Archived';

export interface ContentMetadata {
  difficulty: Difficulty;
  industry: string;
  technology: string[];
  estimatedReadingTime: number;
  businessDomain: string;
  researchStatus: ResearchStatus;
  updatedDate: string;
  author: string;
  version: string;
  tags: string[];
}

export interface ResearchInvestigation {
  id: string;
  title: string;
  researchQuestion: string;
  background: string;
  businessProblem: string;
  industryContext: string;
  researchObjective: string;
  existingApproaches: string[];
  methodology: string;
  experimentDesign: string;
  implementation: string;
  dataset: string;
  benchmark: string;
  results: string[];
  limitations: string[];
  conclusion: string;
  futureWork: string[];
  references: string[];
  github: string;
  downloads: string;
  relatedResearch: string[];
  metadata: ContentMetadata;
}

export interface EngineeringProject {
  id: string;
  title: string;
  problemStatement: string;
  architectureDiagram: string;
  technologyStack: string[];
  implementationDetails: string;
  challenges: string[];
  lessonsLearned: string[];
  performanceMetrics: string[];
  costConsiderations: string[];
  securityConsiderations: string[];
  businessValue: string;
  roi: string;
  github: string;
  liveDemo: string;
  futureImprovements: string[];
  metadata: ContentMetadata;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  businessProblem: string;
  currentIndustryApproach: string;
  painPoints: string[];
  aiOpportunity: string;
  architecture: string;
  implementation: string;
  benefits: string[];
  risks: string[];
  estimatedRoi: string;
  recommendedSolution: string;
  metadata: ContentMetadata;
}

export interface BenchmarkStudy {
  id: string;
  title: string;
  category: string;
  environment: string;
  dataset: string;
  methodology: string;
  results: string[];
  charts: string[];
  finalRecommendation: string;
  metrics: string[];
  metadata: ContentMetadata;
}

export interface DecisionFramework {
  id: string;
  title: string;
  decisionTree: string[];
  businessConsiderations: string[];
  technicalConsiderations: string[];
  cost: string;
  complexity: string;
  recommendedArchitecture: string;
  whenNotToUse: string[];
  metadata: ContentMetadata;
}

export interface OpenSourceItem {
  id: string;
  title: string;
  kind: 'Repository' | 'Library' | 'Dataset' | 'Template' | 'Utility' | 'Research Tool';
  summary: string;
  link: string;
  metadata: ContentMetadata;
}

export interface ResourceItem {
  id: string;
  title: string;
  kind: 'Book' | 'GitHub Repository' | 'Research Paper' | 'Conference' | 'Dataset' | 'Benchmark' | 'Community' | 'Learning Path';
  summary: string;
  link: string;
  metadata: ContentMetadata;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  note: string;
  kind: 'Observation' | 'Experiment' | 'Failure' | 'Interesting Paper' | 'Future Topic' | 'Open Question';
  metadata: ContentMetadata;
}

export interface CmsEntry {
  id: string;
  contentType: 'Research' | 'Case Study' | 'Project' | 'Resource' | 'Benchmark' | 'Article';
  title: string;
  slug: string;
  summary: string;
  markdown: string;
  metadata: ContentMetadata;
  createdAt: string;
}

const baseMetadata = {
  author: 'Inventyfie Research Lab',
  version: '1.0.0',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Research', href: '#research' },
  { name: 'Engineering', href: '#engineering' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Benchmarks', href: '#benchmarks' },
  { name: 'Decision Frameworks', href: '#decision-frameworks' },
  { name: 'Research Library', href: '#research-library' },
  { name: 'Open Source', href: '#open-source' },
  { name: 'Resources', href: '#resources' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const RESEARCH_INVESTIGATIONS: ResearchInvestigation[] = [
  {
    id: 'rag-long-context',
    title: 'RAG vs Long-Context LLMs for Industrial Diagnostics',
    researchQuestion: 'For incident diagnosis workflows, when does RAG outperform long-context prompting?',
    background: 'Enterprises are rapidly adopting long-context models, but retrieval quality and cost behavior remain unclear at production scale.',
    businessProblem: 'Downtime triage teams need accurate root-cause summaries in under 90 seconds.',
    industryContext: 'Manufacturing and energy operators run mixed legacy and IoT systems with fragmented documentation.',
    researchObjective: 'Identify architecture thresholds where RAG delivers better quality-cost-latency than pure long-context prompting.',
    existingApproaches: [
      'Monolithic long-context prompts with no retrieval guardrails',
      'Keyword-based document retrieval with manual ranking',
      'Hybrid BM25 + dense retrieval with reranking',
    ],
    methodology: 'Controlled A/B benchmark across 4 retrieval strategies and 3 model families using identical prompts and evaluator rubrics.',
    experimentDesign: '500 incident records, 20 curated failure modes, blind human evaluation and automated factuality checks.',
    implementation: 'LangGraph orchestration, PgVector retrieval, evaluation harness in TypeScript and Python.',
    dataset: 'Inventyfie Incident Intelligence v2 (anonymized operational logs + maintenance manuals).',
    benchmark: 'Latency, answer grounding, hallucination rate, operational cost per 1k investigations.',
    results: [
      'Hybrid RAG reduced hallucination by 38% vs long-context baseline.',
      'Median latency improved from 11.2s to 7.6s with cache-aware retrieval.',
      'Cost dropped 27% under equivalent answer quality threshold.',
    ],
    limitations: [
      'Dataset emphasizes English technical documents.',
      'Night-shift workflow behavior still under-sampled.',
    ],
    conclusion: 'Hybrid retrieval with structured reranking is currently the most reliable production path for industrial diagnostics.',
    futureWork: [
      'Cross-lingual retrieval evaluation',
      'Adaptive chunking by document modality',
      'Human-in-the-loop confidence calibration',
    ],
    references: [
      'Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      'Kandpal et al., Large Language Models Struggle to Learn Long-Tail Knowledge',
    ],
    github: 'https://github.com/inventyfie/rag-diagnostics-benchmark',
    downloads: '/downloads/rag-long-context-whitepaper.pdf',
    relatedResearch: ['Agentic Evaluation in Production RAG', 'Vector Index Drift Analysis for Dynamic Knowledge Bases'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Manufacturing',
      technology: ['RAG', 'LLMs', 'LangGraph', 'PgVector'],
      estimatedReadingTime: 18,
      businessDomain: 'Operational Reliability',
      researchStatus: 'Published',
      updatedDate: '2026-07-05',
      tags: ['RAG', 'Long Context', 'Reliability', 'Industrial AI'],
    },
  },
  {
    id: 'agent-framework-eval',
    title: 'Agent Framework Evaluation Under Governance Constraints',
    researchQuestion: 'Which agent framework best balances tool reliability and governance visibility in enterprise flows?',
    background: 'Agent adoption has accelerated faster than enterprise governance standards.',
    businessProblem: 'Architecture teams need auditable, controllable automation before broad rollout.',
    industryContext: 'Finance and healthcare teams require deterministic fallback paths and traceability.',
    researchObjective: 'Compare orchestration reliability, observability depth, and policy enforcement friction.',
    existingApproaches: [
      'Prompt-only chained calls without state machine constraints',
      'Custom orchestration code per product team',
      'Framework-based orchestration with policy middleware',
    ],
    methodology: 'Scenario-driven evaluation across 12 enterprise workflows with failure injection.',
    experimentDesign: 'Measured tool retries, policy violations caught, and mean time to incident diagnosis.',
    implementation: 'Reference stacks in LangGraph, Semantic Kernel, and custom event-driven orchestration.',
    dataset: 'Synthetic enterprise tasks with regulated data handling policies.',
    benchmark: 'Task success, policy compliance, recovery time, developer complexity index.',
    results: [
      'State-machine-first orchestration reduced silent failure modes by 44%.',
      'Policy middleware coverage improved governance traceability by 2.1x.',
      'Initial implementation complexity increased but was offset in quarter two operations.',
    ],
    limitations: [
      'Limited multilingual workflows',
      'Cloud-provider managed agent runtimes excluded',
    ],
    conclusion: 'Frameworks with explicit state transitions and policy checkpoints offer the strongest enterprise readiness profile.',
    futureWork: ['Policy-as-code benchmark suite', 'Human override UX patterns', 'Cross-cloud portability tests'],
    references: ['NIST AI RMF 1.0', 'OWASP Top 10 for LLM Applications'],
    github: 'https://github.com/inventyfie/agent-governance-eval',
    downloads: '/downloads/agent-governance-report.pdf',
    relatedResearch: ['Failure Recovery Patterns for Agent Systems', 'Audit Logging Architecture for Tool-Using AI'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Finance',
      technology: ['AI Agents', 'LangGraph', 'Policy Engines'],
      estimatedReadingTime: 22,
      businessDomain: 'Risk and Governance',
      researchStatus: 'In Progress',
      updatedDate: '2026-07-01',
      tags: ['AI Agents', 'Governance', 'Compliance', 'Enterprise Architecture'],
    },
  },
];

export const ENGINEERING_PROJECTS: EngineeringProject[] = [
  {
    id: 'factory-copilot',
    title: 'Factory Copilot Platform',
    problemStatement: 'Plant engineers spend excessive time searching across SOPs, logs, and incident records.',
    architectureDiagram: 'Ingestion -> Knowledge Graph + Vector Store -> Retrieval Orchestrator -> Response + Action Toolkit',
    technologyStack: ['React', 'TypeScript', 'FastAPI', 'PgVector', 'Kafka', 'LangGraph'],
    implementationDetails: 'Built multi-tenant retrieval orchestration with role-aware tool invocation and signed audit trails.',
    challenges: ['Noisy OCR from legacy manuals', 'Tool timeout coordination', 'Operator trust calibration'],
    lessonsLearned: ['Chunking quality dominates retrieval quality', 'Tool observability must be first-class'],
    performanceMetrics: ['p95 latency: 8.1s', 'Grounded answer rate: 92%', 'Support ticket reduction: 31%'],
    costConsiderations: ['Model routing policy reduced spend by 24%', 'Batch indexing lowered ETL cost variance'],
    securityConsiderations: ['Row-level access controls', 'PII redaction before embedding', 'Audit-grade logs'],
    businessValue: 'Reduced troubleshooting cycle time and increased line availability.',
    roi: 'Estimated 4.2x annual ROI from avoided downtime and support overhead.',
    github: 'https://github.com/inventyfie/factory-copilot',
    liveDemo: 'https://inventyfie.com/demos/factory-copilot',
    futureImprovements: ['Multimodal diagram understanding', 'Predictive maintenance triggers'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Manufacturing',
      technology: ['RAG', 'Kafka', 'LangGraph', 'Vector Database'],
      estimatedReadingTime: 14,
      businessDomain: 'Industrial Operations',
      researchStatus: 'Published',
      updatedDate: '2026-06-26',
      tags: ['Production AI', 'Industrial Copilot', 'Architecture'],
    },
  },
  {
    id: 'claims-intelligence',
    title: 'Claims Intelligence Workflow Engine',
    problemStatement: 'Insurance claims analysis was slowed by fragmented document review and repetitive triage tasks.',
    architectureDiagram: 'Claim Intake -> OCR + Structuring -> Rules + LLM Scoring -> Human Review Queue -> Settlement API',
    technologyStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'OpenTelemetry', 'Cloud Functions'],
    implementationDetails: 'Implemented policy-aware decision pipeline with confidence thresholds and escalation queues.',
    challenges: ['Regulatory explainability constraints', 'False positive fraud flags', 'Legacy policy schema migration'],
    lessonsLearned: ['Deterministic layers reduce production risk', 'Evaluation datasets need legal edge cases'],
    performanceMetrics: ['Turnaround time improved 36%', 'Manual review load reduced 29%', 'Fraud precision +12pp'],
    costConsiderations: ['LLM batching controls spend spikes', 'Serverless scaling improved idle cost profile'],
    securityConsiderations: ['At-rest and in-transit encryption', 'PII masking and secure redaction pipeline'],
    businessValue: 'Faster claim handling with improved risk controls and customer satisfaction.',
    roi: 'Estimated 3.6x ROI over 12 months.',
    github: 'https://github.com/inventyfie/claims-intelligence',
    liveDemo: 'https://inventyfie.com/demos/claims-intelligence',
    futureImprovements: ['Counterfactual explainability cards', 'Adaptive policy simulation'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Insurance',
      technology: ['LLMs', 'Evaluation', 'Workflow Automation'],
      estimatedReadingTime: 13,
      businessDomain: 'Claims Operations',
      researchStatus: 'Published',
      updatedDate: '2026-06-20',
      tags: ['Insurance AI', 'Decision Automation', 'Risk'],
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'retail-demand-signal',
    title: 'Retail Demand Signal Intelligence',
    industry: 'Retail',
    businessProblem: 'Stock-outs and overstock cycles were eroding gross margin.',
    currentIndustryApproach: 'Traditional seasonal forecasting with limited external signal integration.',
    painPoints: ['Slow adaptation to regional trends', 'High manual forecasting overhead', 'Poor promotion uplift visibility'],
    aiOpportunity: 'Use multimodal demand modeling with market sentiment and logistics telemetry.',
    architecture: 'Event pipeline + feature store + forecasting ensemble + decision dashboard.',
    implementation: 'Pilot across 140 SKUs with weekly retraining and exception workflows.',
    benefits: ['Forecast error reduced 18%', 'Stock-out incidents reduced 24%', 'Promo planning confidence improved'],
    risks: ['Model drift during macro shocks', 'Data quality variance across store systems'],
    estimatedRoi: '2.9x in 9 months.',
    recommendedSolution: 'Hybrid statistical + ML forecasting with human override loops.',
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Retail',
      technology: ['Machine Learning', 'MLOps', 'Decision Science'],
      estimatedReadingTime: 11,
      businessDomain: 'Supply Chain',
      researchStatus: 'Published',
      updatedDate: '2026-06-28',
      tags: ['Forecasting', 'Retail AI', 'Case Study'],
    },
  },
  {
    id: 'hospital-capacity-planning',
    title: 'Hospital Capacity Planning Optimization',
    industry: 'Healthcare',
    businessProblem: 'Hospital utilization volatility caused scheduling bottlenecks and care delays.',
    currentIndustryApproach: 'Manual planning with lagging utilization reports.',
    painPoints: ['Late visibility into surge risk', 'Inconsistent departmental planning', 'Inefficient bed allocation'],
    aiOpportunity: 'Forecast demand risk windows and recommend resource allocations.',
    architecture: 'Streaming patient flow ingest + forecast service + optimization solver + operations dashboard.',
    implementation: '12-week pilot in emergency and surgical departments.',
    benefits: ['Bed turnover efficiency +15%', 'Surgery cancellation rate -11%', 'Nurse overtime -9%'],
    risks: ['Data governance complexity', 'Clinical adoption curve'],
    estimatedRoi: '3.1x in first year.',
    recommendedSolution: 'Phased decision support rollout with strict clinical governance.',
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Healthcare',
      technology: ['Optimization', 'Machine Learning', 'MLOps'],
      estimatedReadingTime: 12,
      businessDomain: 'Care Operations',
      researchStatus: 'In Progress',
      updatedDate: '2026-07-03',
      tags: ['Healthcare AI', 'Capacity Planning', 'Operations'],
    },
  },
];

export const BENCHMARK_STUDIES: BenchmarkStudy[] = [
  {
    id: 'embedding-models-2026',
    title: 'Embedding Models for Technical Knowledge Retrieval',
    category: 'Embedding Models',
    environment: '32 vCPU benchmark cluster, Postgres + PgVector, Node.js retrieval service.',
    dataset: '1.8M technical passages from manuals, SOPs, and architecture docs.',
    methodology: 'Evaluated retrieval precision, latency, memory usage, and monthly cost under realistic query load.',
    results: ['Model A best precision@10', 'Model B best latency consistency', 'Model C best cost-performance ratio'],
    charts: ['Precision vs Cost curve', 'Latency percentile chart', 'Memory utilization trend'],
    finalRecommendation: 'Use Model C for broad enterprise usage; upgrade to Model A for high-risk workflows.',
    metrics: ['Latency', 'Cost', 'Memory', 'Scalability', 'Accuracy', 'Hallucination Risk Proxy'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['Embeddings', 'Vector Databases', 'RAG'],
      estimatedReadingTime: 10,
      businessDomain: 'Knowledge Retrieval',
      researchStatus: 'Published',
      updatedDate: '2026-06-30',
      tags: ['Benchmark', 'Embeddings', 'RAG'],
    },
  },
  {
    id: 'rag-frameworks-2026',
    title: 'RAG Frameworks and Chunking Strategy Comparison',
    category: 'RAG Frameworks',
    environment: 'Kubernetes-based benchmark grid across two cloud providers.',
    dataset: 'Heterogeneous corpus: PDFs, logs, wiki pages, and code documentation.',
    methodology: 'Compared framework ergonomics and operational metrics under 50k/day query volume.',
    results: ['Framework X highest engineering velocity', 'Framework Y best observability', 'Semantic chunking improved answer grounding by 14%'],
    charts: ['Throughput heatmap', 'Hallucination score distribution', 'Cost per 10k queries'],
    finalRecommendation: 'Adopt Framework Y for enterprise observability; combine with adaptive chunking profiles by document type.',
    metrics: ['Latency', 'Accuracy', 'Hallucination', 'Scalability', 'Cost'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Cross-Industry',
      technology: ['RAG', 'LangGraph', 'Chunking'],
      estimatedReadingTime: 15,
      businessDomain: 'AI Platform Engineering',
      researchStatus: 'Published',
      updatedDate: '2026-07-02',
      tags: ['RAG', 'Chunking', 'Benchmark Center'],
    },
  },
];

export const DECISION_FRAMEWORKS: DecisionFramework[] = [
  {
    id: 'should-i-use-rag',
    title: 'Should I Use RAG?',
    decisionTree: [
      'Do you require responses grounded in evolving enterprise knowledge?',
      'Is stale or hallucinated output a business risk?',
      'Can you maintain document ingestion quality and retrieval observability?',
    ],
    businessConsiderations: ['Knowledge volatility', 'Compliance risk from incorrect responses', 'Support cost and response SLAs'],
    technicalConsiderations: ['Data pipeline maturity', 'Search relevance capabilities', 'Evaluation harness availability'],
    cost: 'Medium implementation cost; long-term savings through lower model context usage.',
    complexity: 'Moderate to high depending on ingestion and governance maturity.',
    recommendedArchitecture: 'Hybrid retrieval + reranker + guarded generation with evaluation-driven release checks.',
    whenNotToUse: ['Static knowledge with low update frequency', 'No ownership of source data quality', 'No monitoring budget'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['RAG', 'LLMs', 'Evaluation'],
      estimatedReadingTime: 9,
      businessDomain: 'Technology Strategy',
      researchStatus: 'Published',
      updatedDate: '2026-06-25',
      tags: ['Decision Framework', 'RAG', 'Architecture Guide'],
    },
  },
  {
    id: 'should-i-use-ai-agents',
    title: 'Should I Use AI Agents?',
    decisionTree: [
      'Does your workflow need multi-step tool execution?',
      'Can you define measurable success and rollback boundaries?',
      'Do you have governance and human override paths?',
    ],
    businessConsiderations: ['Operational leverage potential', 'Governance overhead', 'Failure blast radius'],
    technicalConsiderations: ['Tool reliability', 'State management', 'Tracing and policy enforcement'],
    cost: 'High initial engineering cost with potential large workflow automation upside.',
    complexity: 'High. Requires orchestration discipline and strong monitoring.',
    recommendedArchitecture: 'State-machine agent orchestration with policy middleware and confidence-gated approvals.',
    whenNotToUse: ['Single-step deterministic tasks', 'Low tolerance for automation uncertainty', 'No incident response readiness'],
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Cross-Industry',
      technology: ['AI Agents', 'LangGraph', 'Observability'],
      estimatedReadingTime: 10,
      businessDomain: 'Automation Strategy',
      researchStatus: 'Published',
      updatedDate: '2026-07-04',
      tags: ['AI Agents', 'Decision Intelligence', 'Enterprise AI'],
    },
  },
];

export const RESEARCH_LIBRARY_CATEGORIES = [
  'Artificial Intelligence',
  'Machine Learning',
  'Generative AI',
  'RAG',
  'LLMs',
  'SLMs',
  'AI Agents',
  'LangGraph',
  'Big Data',
  'Apache Spark',
  'Kafka',
  'MLOps',
  'Evaluation',
  'Manufacturing AI',
  'Industrial AI',
  'Computer Vision',
  'Cloud',
  'Security',
  'Prompt Engineering',
  'Architecture',
  'Software Engineering',
  'Decision Science',
];

export const RESEARCH_JOURNAL: JournalEntry[] = [
  {
    id: 'journal-2026-07-06',
    date: '2026-07-06',
    title: 'Failure Log: Retrieval Drift After Taxonomy Change',
    note: 'A taxonomy update silently degraded recall in one domain. Monitoring detected quality drop after 72 hours; fixed by re-embedding and index partitioning.',
    kind: 'Failure',
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['RAG', 'Vector Database'],
      estimatedReadingTime: 4,
      businessDomain: 'AI Reliability',
      researchStatus: 'Published',
      updatedDate: '2026-07-06',
      tags: ['Failure Analysis', 'Index Drift'],
    },
  },
  {
    id: 'journal-2026-07-03',
    date: '2026-07-03',
    title: 'Open Question: Measuring Agent Recovery Quality',
    note: 'Current evaluation focuses on success/failure. Need benchmark dimensions for graceful degradation and user trust restoration after partial tool failures.',
    kind: 'Open Question',
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Cross-Industry',
      technology: ['AI Agents', 'Evaluation'],
      estimatedReadingTime: 3,
      businessDomain: 'Evaluation Science',
      researchStatus: 'In Progress',
      updatedDate: '2026-07-03',
      tags: ['Agent Evaluation', 'Open Research'],
    },
  },
];

export const OPEN_SOURCE_ITEMS: OpenSourceItem[] = [
  {
    id: 'opensource-eval-harness',
    title: 'Inventyfie Eval Harness',
    kind: 'Research Tool',
    summary: 'Reusable framework for groundedness, factuality, and latency evaluation in LLM workflows.',
    link: 'https://github.com/inventyfie/eval-harness',
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['Evaluation', 'LLMs'],
      estimatedReadingTime: 6,
      businessDomain: 'AI Quality',
      researchStatus: 'Published',
      updatedDate: '2026-06-29',
      tags: ['Open Source', 'Evaluation'],
    },
  },
  {
    id: 'opensource-rag-template',
    title: 'Enterprise RAG Starter Template',
    kind: 'Template',
    summary: 'Production-ready starter for secure retrieval pipelines, policy checks, and observability.',
    link: 'https://github.com/inventyfie/enterprise-rag-template',
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['RAG', 'Security', 'MLOps'],
      estimatedReadingTime: 7,
      businessDomain: 'Platform Engineering',
      researchStatus: 'Published',
      updatedDate: '2026-07-01',
      tags: ['Open Source', 'Template', 'RAG'],
    },
  },
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'resource-genai-systems',
    title: 'Designing Generative AI Systems',
    kind: 'Book',
    summary: 'Practical architecture guidance for building robust LLM-powered systems in production.',
    link: 'https://www.oreilly.com/library/view/designing-generative-ai/9781098150491/',
    metadata: {
      ...baseMetadata,
      difficulty: 'Intermediate',
      industry: 'Cross-Industry',
      technology: ['Generative AI', 'Architecture'],
      estimatedReadingTime: 5,
      businessDomain: 'Engineering Enablement',
      researchStatus: 'Published',
      updatedDate: '2026-07-02',
      tags: ['Book', 'Architecture'],
    },
  },
  {
    id: 'resource-neurips',
    title: 'NeurIPS Conference Proceedings',
    kind: 'Conference',
    summary: 'Curated annual papers and trends relevant to practical AI engineering.',
    link: 'https://proceedings.neurips.cc/',
    metadata: {
      ...baseMetadata,
      difficulty: 'Advanced',
      industry: 'Cross-Industry',
      technology: ['Machine Learning', 'Research'],
      estimatedReadingTime: 5,
      businessDomain: 'Research Strategy',
      researchStatus: 'Published',
      updatedDate: '2026-06-22',
      tags: ['Conference', 'Research Papers'],
    },
  },
];

export const CASE_STUDY_INDUSTRIES = [
  'Manufacturing',
  'Healthcare',
  'Finance',
  'Retail',
  'Construction',
  'Energy',
  'Logistics',
  'Education',
  'Government',
  'Insurance',
  'Agriculture',
];

export const ABOUT_CONTENT = {
  mission: 'Inventyfie exists to publish practical AI engineering research that improves real technology decisions in production environments.',
  vision: 'Become the most trusted AI Engineering Research Institute for architects, managers, and enterprise engineering teams.',
  researchPrinciples: [
    'Evidence before opinion',
    'Reproducible methodology',
    'Operational realism over synthetic perfection',
    'Transparent limitations and uncertainty',
  ],
  engineeringPrinciples: [
    'Design for observability and failure recovery',
    'Security and governance by default',
    'Performance and cost measured continuously',
    'Decision quality is a product feature',
  ],
  publicationPhilosophy: 'Every publication must answer a practical question and provide implementation-grade guidance.',
  founderStory: 'Inventyfie began as a focused engineering effort to bridge the gap between AI hype and production reality through applied research.',
  roadmap: [
    'Q3: Interactive benchmark dashboards',
    'Q4: Semantic search and recommendation engine',
    'Q1: Community research submissions and annual report',
  ],
};

export const FUTURE_MODULES = [
  'Semantic Search',
  'AI Chat Assistant',
  'Research Recommendation Engine',
  'Interactive Decision Frameworks',
  'Community Contributions',
  'Research Submission Portal',
  'Newsletter',
  'Annual Reports',
  'Interactive Benchmarks',
];
