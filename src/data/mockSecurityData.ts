import { SecurityAsset, SecurityFinding } from '../utils/securityRisk';

export const IS_SAMPLE_DEMO_DATA = true;

export interface ServiceDetail {
  id: string;
  category: string;
  title: string;
  shortSummary: string;
  problem: string;
  whatHypenSecDoes: string[];
  whatCustomerReceives: string[];
  idealFor: string;
}

export const HYPENSEC_SERVICES: ServiceDetail[] = [
  {
    id: 'vapt',
    category: 'Assessment & Validation',
    title: 'Vulnerability Assessment & Penetration Testing',
    shortSummary: 'Manual and automated testing across web applications, APIs, network perimeters, and internal environments.',
    problem: 'Automated scanners produce thousands of alerts with high false-positive rates, leaving security teams unsure which vulnerabilities an actual attacker could exploit.',
    whatHypenSecDoes: [
      'Conduct methodology-grounded manual penetration testing simulating realistic adversary techniques (OWASP Top 10, PTES).',
      'Chain multiple low-severity weaknesses to demonstrate real attack paths and data access risks.',
      'Perform authenticated and unauthenticated testing on REST/GraphQL APIs and microservices.',
      'Deliver re-testing validation after remediation to confirm fixes are effective.'
    ],
    whatCustomerReceives: [
      'Prioritized technical report categorized by real business impact (not just generic CVSS).',
      'Step-by-step reproducible proof-of-concept steps and sanitized evidence logs.',
      'Actionable remediation guidance tailored to your development stack.',
      'Executive debrief presentation summarizing risks in business language.'
    ],
    idealFor: 'Engineering and security leaders preparing for major releases, partner audits, or compliance milestones.'
  },
  {
    id: 'cloud-appsec',
    category: 'Cloud & Architecture',
    title: 'Cloud & Application Security Engineering',
    shortSummary: 'Hardening multi-cloud architectures (AWS, Azure, GCP), CI/CD pipelines, container workloads, and IAM boundaries.',
    problem: 'Cloud environments evolve faster than static policies can govern. Misconfigured storage buckets, excessive IAM permissions, and exposed secrets frequently create invisible backdoors.',
    whatHypenSecDoes: [
      'Review infrastructure-as-code (Terraform, CloudFormation) and Kubernetes configurations against security benchmarks.',
      'Audit Identity and Access Management (IAM) role boundaries, service principals, and least-privilege policies.',
      'Assess container images, secrets management workflows, and software supply chain components.',
      'Design defense-in-depth isolation controls between public services and core data stores.'
    ],
    whatCustomerReceives: [
      'Cloud posture assessment report with misconfigurations mapped to CIS benchmarks.',
      'Infrastructure-as-Code hardening patches and IAM boundary recommendations.',
      'Architectural security review diagram with identified blast-radius boundaries.',
      'Security guidance session with cloud engineering and DevOps leads.'
    ],
    idealFor: 'Cloud platform teams, DevOps organizations, and modern SaaS companies running distributed infrastructure.'
  },
  {
    id: 'threat-intel-easm',
    category: 'Surface & Intelligence',
    title: 'External Attack Surface & Threat Monitoring',
    shortSummary: 'Continuous reconnaissance to identify unmanaged internet-facing assets, leaked credentials, and external exposure.',
    problem: 'Shadow IT, acquisition assets, and temporary testing environments regularly slip outside IT inventory, becoming easy targets for automated scanners.',
    whatHypenSecDoes: [
      'Continuously map public DNS, certificates, open ports, and cloud services belonging to your organization.',
      'Identify expired SSL/TLS certificates, exposed management interfaces, and unprotected staging environments.',
      'Monitor open intelligence repositories and leak forums for leaked corporate credentials and source code references.',
      'Alert security teams when newly registered assets or changed attack vectors are discovered.'
    ],
    whatCustomerReceives: [
      'Live external asset inventory with asset ownership mapping and exposure classifications.',
      'Early-warning notifications for high-risk exposures (e.g. unauthenticated admin portals).',
      'Quarterly attack surface drift analysis comparing external posture over time.',
      'Direct integration feeds into your vulnerability management workflows.'
    ],
    idealFor: 'CISOs and SecOps teams needing visibility across distributed digital assets without installing heavy agents.'
  },
  {
    id: 'secops-incident-readiness',
    category: 'Operations & Defense',
    title: 'Security Operations & Incident Readiness',
    shortSummary: 'Tabletop simulations, incident response plan auditing, and detection engineering to minimize breach dwell time.',
    problem: 'Organizations often have written incident response plans that have never been tested under realistic operational stress, leading to chaos when a real security event occurs.',
    whatHypenSecDoes: [
      'Facilitate executive and technical tabletop exercises simulating ransomware, cloud compromise, or data extortion.',
      'Review SIEM/EDR log sources, correlation rules, and alerting thresholds to reduce alert fatigue.',
      'Audit incident response playbooks for practical clarity, communications protocol, and legal coordination.',
      'Identify detection blind spots across remote endpoints, SaaS accounts, and cloud control planes.'
    ],
    whatCustomerReceives: [
      'Incident readiness scorecard highlighting operational strengths and critical gaps.',
      'Refined incident response runbooks with explicit role responsibilities and escalation triggers.',
      'Detection engineering recommendations for existing monitoring tools (Splunk, Elastic, Sentinel).',
      'Executive debrief documenting readiness to board and insurance underwriters.'
    ],
    idealFor: 'Security directors, incident commanders, and risk committees seeking operational confidence before a crisis.'
  },
  {
    id: 'grc-compliance',
    category: 'Governance & Risk',
    title: 'Governance, Risk & Compliance (GRC) Support',
    shortSummary: 'Practical alignment with security standards (ISO 27001, SOC 2, NIST CSF) without excessive bureaucratic overhead.',
    problem: 'Compliance audits frequently turn into paper-pushing exercises that consume months of engineering time without genuinely making the organization more secure.',
    whatHypenSecDoes: [
      'Conduct structured gap assessments against industry frameworks (SOC 2 Type II, ISO/IEC 27001, NIST CSF 2.0).',
      'Draft and refine security policies that match how your engineers actually work.',
      'Help teams implement practical evidence collection mechanisms to eliminate audit crunch periods.',
      'Review vendor questionnaires and third-party risk management frameworks.'
    ],
    whatCustomerReceives: [
      'Framework gap matrix with prioritized remediation roadmap.',
      'Set of operationalized security policies ready for organizational adoption.',
      'Audit evidence collection guide and auditor communication preparation.',
      'Vendor risk assessment template and scoring methodology.'
    ],
    idealFor: 'Growth-stage companies preparing for first-time audits or enterprise vendor security reviews.'
  },
  {
    id: 'advisory-consulting',
    category: 'Strategic Advisory',
    title: 'Security Consulting & Virtual CISO Advisory',
    shortSummary: 'Executive guidance to design pragmatic security roadmaps, evaluate tool investments, and report to leadership.',
    problem: 'Growing organizations need senior security leadership to align risk with business strategy, but may not require or be ready for a full-time in-house executive.',
    whatHypenSecDoes: [
      'Partner with founders, CTOs, and boards to define a multi-year security roadmap aligned with company goals.',
      'Evaluate third-party security vendors, tooling redundancy, and budget allocation.',
      'Establish security metrics and reporting frameworks that non-technical board members understand.',
      'Support client negotiations regarding customer security requirements and data protection terms.'
    ],
    whatCustomerReceives: [
      'Quarterly security strategic roadmap and budget planning document.',
      'Executive and board-level risk presentation slides.',
      'Dedicated advisory cadence with senior security practitioners.',
      'Independent second opinion on major architecture and security tooling investments.'
    ],
    idealFor: 'Executive teams seeking senior strategic security perspective without full-time executive headcount.'
  }
];

export interface SolutionItem {
  id: string;
  title: string;
  problem: string;
  hypenSecApproach: string;
  practicalOutcome: string;
}

export const HYPENSEC_SOLUTIONS: SolutionItem[] = [
  {
    id: 'internet-exposure',
    title: 'Understanding Internet-Facing Exposure',
    problem: 'Distributed organizations struggle to track forgotten domains, unlinked cloud buckets, and legacy services exposed directly to the internet.',
    hypenSecApproach: 'HypenSec combines continuous external discovery with manual reconnaissance to map all external digital assets and evaluate real accessibility.',
    practicalOutcome: 'A continuously refreshed asset catalog and prioritized list of exposed services to shut down or place behind authentication.'
  },
  {
    id: 'securing-cloud',
    title: 'Securing Cloud Environments',
    problem: 'Multi-account AWS, Azure, and GCP setups often accumulate overly permissive IAM permissions and misconfigured security groups over time.',
    hypenSecApproach: 'We conduct architectural reviews of cloud configurations, evaluating identity blast radiuses, data storage encryption, and network segmentation.',
    practicalOutcome: 'Hardened cloud guardrails, verified least-privilege policies, and reduced attack surface without slowing down deployment velocities.'
  },
  {
    id: 'prioritizing-vulnerabilities',
    title: 'Prioritizing Vulnerabilities Effectively',
    problem: 'Vulnerability scanners flood teams with thousands of "high" and "critical" CVE alerts, leading to alert fatigue and paralysis.',
    hypenSecApproach: 'We contextualize vulnerability data by evaluating actual network reachability, asset business criticality, and active exploit availability.',
    practicalOutcome: 'Security and engineering focus on the 5-10% of vulnerabilities that pose immediate risk, with clear remediation SLAs.'
  },
  {
    id: 'third-party-risk',
    title: 'Assessing Third-Party & Vendor Risk',
    problem: 'SaaS vendors and sub-processors hold sensitive customer data, but static annual questionnaires fail to reflect continuous vendor posture.',
    hypenSecApproach: 'We evaluate vendor security documentation, public threat signals, and access permissions granted to third-party integrations.',
    practicalOutcome: 'Clear vendor risk tiering, standardized procurement review workflows, and proactive awareness of supply-chain exposure.'
  },
  {
    id: 'incident-readiness',
    title: 'Improving Incident Readiness',
    problem: 'Teams discover critical gaps in log retention, role delegation, and communication chains only during an active security incident.',
    hypenSecApproach: 'We run pragmatic tabletop exercises and review log telemetry to validate how quickly your team can detect, contain, and communicate an incident.',
    practicalOutcome: 'Battle-tested runbooks, confidence among technical responders and executives, and reduced business interruption during incidents.'
  },
  {
    id: 'compliance-preparation',
    title: 'Preparing for Security & Compliance Reviews',
    problem: 'Audit readiness often interrupts normal product engineering for quarters, causing frustration and delayed product roadmaps.',
    hypenSecApproach: 'We bridge the gap between compliance requirements (SOC 2, ISO 27001) and engineering practices, establishing sustainable control habits.',
    practicalOutcome: 'Successful audit outcomes, clean evidence collection workflows, and security practices that genuinely protect data rather than just check boxes.'
  }
];

export interface ResourceItem {
  id: string;
  category: 'Advisory Brief' | 'Practical Guide' | 'Methodology' | 'Threat Bulletin';
  title: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  keyPoints: string[];
}

export const HYPENSEC_RESOURCES: ResourceItem[] = [
  {
    id: 'res-prioritization-framework',
    category: 'Methodology',
    title: 'Contextual Vulnerability Prioritization: Beyond Raw CVSS',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    summary: 'Why treating CVSS 8.0+ as an automatic 48-hour emergency leads to developer burnout, and how to factor network exposure and asset criticality into real triage.',
    keyPoints: [
      'CVSS measures intrinsic severity, not environmental exploitability in your specific architecture.',
      'A CVSS 9.8 vulnerability on an isolated internal development sandbox poses less immediate risk than a CVSS 7.2 flaw on a public auth gateway.',
      'Building an asset tiering matrix allows engineering to focus on realistic attack paths.'
    ]
  },
  {
    id: 'res-cloud-iam-hardening',
    category: 'Practical Guide',
    title: 'Pragmatic Cloud IAM Hardening for Growing Engineering Teams',
    readTime: '8 min read',
    publishedDate: 'September 2026',
    summary: 'A step-by-step approach to identifying unused permissions, enforcing service-to-service boundary controls, and pruning legacy administrator access.',
    keyPoints: [
      'How to use access advisor logs to safely remove unused permissions without breaking production services.',
      'Implementing permission boundaries and scoped assume-role policies for CI/CD runners.',
      'Securing cross-account access and deprecating long-lived access keys.'
    ]
  },
  {
    id: 'res-incident-response-tabletop',
    category: 'Advisory Brief',
    title: 'Running High-Value Security Tabletop Exercises in 90 Minutes',
    readTime: '5 min read',
    publishedDate: 'August 2026',
    summary: 'A structured blueprint for security leaders to run realistic incident response simulations that engage both engineering and executive teams.',
    keyPoints: [
      'Selecting a realistic scenario (e.g. leaked API credential vs credential stuffing vs ransomware).',
      'Structuring the inject timeline to test decision-making under incomplete information.',
      'Capturing actionable post-exercise action items instead of generic feedback.'
    ]
  },
  {
    id: 'res-easm-hygiene',
    category: 'Threat Bulletin',
    title: 'External Attack Surface Hygiene: The Top 5 Shadow IT Blind Spots',
    readTime: '7 min read',
    publishedDate: 'July 2026',
    summary: 'Analysis of recurring external exposures discovered during external assessments, including forgotten staging subdomains and orphaned DNS pointers.',
    keyPoints: [
      'Subdomain takeovers caused by dangling DNS CNAME records pointing to decommissioned SaaS accounts.',
      'Staging and development APIs unintentionally routed through production Cloudflare or AWS routes.',
      'Exposed metrics endpoints (Prometheus, Actuator) lacking authentication.'
    ]
  }
];

// SaaS Prototype Initial Mock Data (Clearly marked Sample Demo Data)
export const SAMPLE_ASSETS: SecurityAsset[] = [
  {
    id: 'AST-101',
    name: 'api.hypensec-demo.net',
    type: 'API Endpoint',
    environment: 'AWS',
    exposure: 'Public Internet',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Platform API Team',
    openFindingsCount: 2,
    lastScanned: '2 hours ago'
  },
  {
    id: 'AST-102',
    name: 'app.hypensec-demo.net',
    type: 'Web App',
    environment: 'Cloudflare',
    exposure: 'Public Internet',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Core Product Team',
    openFindingsCount: 1,
    lastScanned: '3 hours ago'
  },
  {
    id: 'AST-103',
    name: 'k8s-ingress-prod-east',
    type: 'Compute Instance',
    environment: 'AWS',
    exposure: 'Public Internet',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'DevOps / SRE',
    openFindingsCount: 2,
    lastScanned: '5 hours ago'
  },
  {
    id: 'AST-104',
    name: 'customer-data-backup-archive',
    type: 'Cloud Storage',
    environment: 'GCP',
    exposure: 'Internal VPC',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Data Engineering',
    openFindingsCount: 0,
    lastScanned: '1 day ago'
  },
  {
    id: 'AST-105',
    name: 'staging-auth-broker.internal',
    type: 'Identity Gateway',
    environment: 'Azure',
    exposure: 'Partner Extranet',
    criticality: 'Tier 2 - Business Operational',
    owner: 'Identity & Access Team',
    openFindingsCount: 2,
    lastScanned: '6 hours ago'
  },
  {
    id: 'AST-106',
    name: 'legacy-billing-portal.demo.net',
    type: 'Web App',
    environment: 'On-Prem',
    exposure: 'Public Internet',
    criticality: 'Tier 2 - Business Operational',
    owner: 'Finance Tech Team',
    openFindingsCount: 1,
    lastScanned: '12 hours ago'
  },
  {
    id: 'AST-107',
    name: 'analytics-warehouse-db',
    type: 'Compute Instance',
    environment: 'AWS',
    exposure: 'Internal VPC',
    criticality: 'Tier 2 - Business Operational',
    owner: 'BI & Analytics',
    openFindingsCount: 0,
    lastScanned: '2 days ago'
  },
  {
    id: 'AST-108',
    name: 'vpn-gateway-hq.demo.net',
    type: 'API Endpoint',
    environment: 'On-Prem',
    exposure: 'Public Internet',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Corporate IT',
    openFindingsCount: 1,
    lastScanned: '4 hours ago'
  }
];

export const INITIAL_FINDINGS: SecurityFinding[] = [
  {
    id: 'F-201',
    title: 'Exposed Management Interface without MFA',
    cveId: 'CWE-308',
    severity: 'critical',
    cvssScore: 9.4,
    assetId: 'AST-108',
    assetName: 'vpn-gateway-hq.demo.net',
    environment: 'On-Prem',
    discoveredDate: '2026-10-19T08:30:00Z',
    status: 'In Progress',
    assignee: 'David Vance (Corporate IT)',
    businessContext: 'Corporate perimeter gateway. Could allow unauthorized network lateral movement.',
    remediationAdvice: 'Enforce SAML 2.0 MFA authentication and restrict admin portal accessibility to dedicated management CIDRs.',
    exploitAvailable: true
  },
  {
    id: 'F-202',
    title: 'Unauthenticated Information Disclosure on GraphQL Endpoint',
    cveId: 'CVE-2026-3192',
    severity: 'high',
    cvssScore: 8.2,
    assetId: 'AST-101',
    assetName: 'api.hypensec-demo.net',
    environment: 'AWS',
    discoveredDate: '2026-10-18T14:15:00Z',
    status: 'Open',
    assignee: 'Elena Rostova (Platform API)',
    businessContext: 'Public API gateway servicing customer client queries; schema introspection reveals internal model structures.',
    remediationAdvice: 'Disable GraphQL schema introspection in production environments and enforce field-level query depth limits.',
    exploitAvailable: true
  },
  {
    id: 'F-203',
    title: 'Overly Permissive S3 Bucket ACL on Build Artifacts',
    cveId: 'CWE-732',
    severity: 'high',
    cvssScore: 7.8,
    assetId: 'AST-103',
    assetName: 'k8s-ingress-prod-east',
    environment: 'AWS',
    discoveredDate: '2026-10-17T09:00:00Z',
    status: 'In Progress',
    assignee: 'Marcus Brody (DevOps)',
    businessContext: 'Contains continuous delivery build bundles and compiled binary artifacts.',
    remediationAdvice: 'Enable AWS S3 Block Public Access at the account level and apply a strict bucket policy restricting access to the deployment IAM role.',
    exploitAvailable: false
  },
  {
    id: 'F-204',
    title: 'Missing Content-Security-Policy (CSP) Directives',
    cveId: 'CWE-1021',
    severity: 'medium',
    cvssScore: 5.4,
    assetId: 'AST-102',
    assetName: 'app.hypensec-demo.net',
    environment: 'Cloudflare',
    discoveredDate: '2026-10-15T11:20:00Z',
    status: 'Open',
    assignee: 'Sarah Lin (Core Product)',
    businessContext: 'Frontend portal UI for enterprise tenants.',
    remediationAdvice: 'Deploy strict Content-Security-Policy header via Cloudflare Edge Worker with script-src self and nonces.',
    exploitAvailable: false
  },
  {
    id: 'F-205',
    title: 'Deprecated TLS 1.0/1.1 Protocols Supported on Legacy Gateway',
    cveId: 'CWE-326',
    severity: 'medium',
    cvssScore: 4.8,
    assetId: 'AST-106',
    assetName: 'legacy-billing-portal.demo.net',
    environment: 'On-Prem',
    discoveredDate: '2026-10-14T16:45:00Z',
    status: 'Review',
    assignee: 'David Vance (Corporate IT)',
    businessContext: 'Legacy billing support interface scheduled for migration.',
    remediationAdvice: 'Configure reverse proxy to enforce TLS 1.2 minimum and disable 3DES/RC4 cipher suites.',
    exploitAvailable: false
  },
  {
    id: 'F-206',
    title: 'Missing HTTP Strict Transport Security (HSTS) Preload',
    cveId: 'CWE-319',
    severity: 'low',
    cvssScore: 3.1,
    assetId: 'AST-105',
    assetName: 'staging-auth-broker.internal',
    environment: 'Azure',
    discoveredDate: '2026-10-12T10:00:00Z',
    status: 'Accepted Risk',
    assignee: 'Identity Team Lead',
    businessContext: 'Internal testing hostname not accessed by general consumer browsers.',
    remediationAdvice: 'Add max-age=31536000; includeSubDomains directive to response headers.',
    exploitAvailable: false
  }
];

export interface RemediationTask {
  id: string;
  findingId: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  status: 'Backlog' | 'In Progress' | 'Review' | 'Remediated';
  notes: string;
}

export const INITIAL_REMEDIATION_TASKS: RemediationTask[] = [
  {
    id: 'REM-301',
    findingId: 'F-201',
    title: 'Enforce SAML 2.0 MFA on VPN Gateway',
    severity: 'critical',
    assignee: 'David Vance',
    dueDate: '2026-10-23',
    status: 'In Progress',
    notes: 'Configuring Azure AD enterprise application connector and conditional access policy.'
  },
  {
    id: 'REM-302',
    findingId: 'F-202',
    title: 'Disable GraphQL Schema Introspection in Production',
    severity: 'high',
    assignee: 'Elena Rostova',
    dueDate: '2026-10-25',
    status: 'Backlog',
    notes: 'PR ready in Apollo server repo; waiting for QA automated regression suite run.'
  },
  {
    id: 'REM-303',
    findingId: 'F-203',
    title: 'Apply S3 Account-Level Block Public Access',
    severity: 'high',
    assignee: 'Marcus Brody',
    dueDate: '2026-10-24',
    status: 'In Progress',
    notes: 'Terraform script verified in staging account; applying to production VPC.'
  },
  {
    id: 'REM-304',
    findingId: 'F-205',
    title: 'Migrate Nginx TLS Ciphers on Billing Gateway',
    severity: 'medium',
    assignee: 'David Vance',
    dueDate: '2026-11-02',
    status: 'Review',
    notes: 'Deployed configuration to edge proxy; SSL Labs score upgraded to A.'
  }
];

export interface VendorRiskRecord {
  id: string;
  name: string;
  serviceCategory: string;
  criticality: 'Tier 1' | 'Tier 2' | 'Tier 3';
  soc2Status: 'Current (Valid)' | 'Pending Renewal' | 'Not Provided';
  iso27001Status: 'Certified' | 'Not Certified';
  publicExposureSignal: 'Low Risk' | 'Medium Attention' | 'Elevated Signal';
  lastAssessmentDate: string;
  nextReviewDate: string;
}

export const SAMPLE_VENDORS: VendorRiskRecord[] = [
  {
    id: 'VND-01',
    name: 'Cloudflare Inc.',
    serviceCategory: 'DNS, CDN & Edge Security',
    criticality: 'Tier 1',
    soc2Status: 'Current (Valid)',
    iso27001Status: 'Certified',
    publicExposureSignal: 'Low Risk',
    lastAssessmentDate: '2026-08-15',
    nextReviewDate: '2027-08-15'
  },
  {
    id: 'VND-02',
    name: 'Okta Identity Cloud',
    serviceCategory: 'IAM & Single Sign-On',
    criticality: 'Tier 1',
    soc2Status: 'Current (Valid)',
    iso27001Status: 'Certified',
    publicExposureSignal: 'Low Risk',
    lastAssessmentDate: '2026-09-01',
    nextReviewDate: '2027-09-01'
  },
  {
    id: 'VND-03',
    name: 'Datadog Platform',
    serviceCategory: 'Observability & APM',
    criticality: 'Tier 2',
    soc2Status: 'Current (Valid)',
    iso27001Status: 'Certified',
    publicExposureSignal: 'Low Risk',
    lastAssessmentDate: '2026-06-20',
    nextReviewDate: '2027-06-20'
  },
  {
    id: 'VND-04',
    name: 'Stripe Payments',
    serviceCategory: 'Payment Processing',
    criticality: 'Tier 1',
    soc2Status: 'Current (Valid)',
    iso27001Status: 'Certified',
    publicExposureSignal: 'Low Risk',
    lastAssessmentDate: '2026-07-10',
    nextReviewDate: '2027-07-10'
  },
  {
    id: 'VND-05',
    name: 'External Marketing Analytics Partner',
    serviceCategory: 'Customer Attribution',
    criticality: 'Tier 3',
    soc2Status: 'Pending Renewal',
    iso27001Status: 'Not Certified',
    publicExposureSignal: 'Medium Attention',
    lastAssessmentDate: '2025-11-12',
    nextReviewDate: '2026-11-12'
  }
];

export const COMPANY_VERIFICATION_PLACEHOLDERS = {
  headquarters: '[Verified Office Location - Configured by HypenSec Administration]',
  foundedYear: '[Year - Confirmed during client onboarding]',
  certificationsNotice: 'HypenSec operates to industry testing standards (PTES, OWASP, NIST). Specific formal accreditations will be provided directly in client engagement proposals upon verified scope agreement.',
  clientReferencesNotice: 'Client logos, case studies, and reference contacts are available upon mutual NDA execution to respect organizational security confidentiality.',
  contactEmail: 'contact@hypensec.com',
  inquiryHours: 'Monday – Friday, Standard Business Operations (US & International Timezones)'
};

export interface PlatformPillar {
  id: string;
  code: string;
  suiteName: string;
  category: string;
  headline: string;
  summary: string;
  replacesTools: string[];
  capabilities: {
    title: string;
    detail: string;
    metricLabel: string;
  }[];
  telemetryPreview: {
    primaryStat: string;
    primaryLabel: string;
    secondaryStat: string;
    secondaryLabel: string;
    liveSignal: string;
    targetAsset: string;
    remediationAction: string;
  };
}

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    id: 'surface-grid',
    code: '01',
    suiteName: 'HypenSec SurfaceGrid',
    category: 'Network & External Attack Surface',
    headline: 'Continuous Perimeter Discovery & Zero-Trust Ingress Validation',
    summary: 'Eliminate blind spots across distributed DNS zones, public IPv4/IPv6 ranges, API gateways, and unmanaged shadow cloud subdomains before automated scanners weaponize them.',
    replacesTools: ['Standalone EASM Scanners', 'SSL/DNS Trackers', 'Legacy Port Monitors'],
    capabilities: [
      {
        title: 'Agentless External Reconnaissance',
        detail: 'Maps internet-facing assets, certificates, and ephemeral cloud endpoints continuously without deploying host agents.',
        metricLabel: '100% External ASN Coverage'
      },
      {
        title: 'API & Edge Gateway Inspection',
        detail: 'Detects unauthenticated GraphQL introspection, exposed Swagger schemas, and misconfigured CDN origin routes.',
        metricLabel: '< 15m Drift Detection'
      },
      {
        title: 'Identity & VPN Perimeter Hardening',
        detail: 'Audits remote access gateways, SAML/OIDC brokers, and management interfaces for missing MFA and weak ciphers.',
        metricLabel: 'Zero Unverified Ingress'
      }
    ],
    telemetryPreview: {
      primaryStat: '142',
      primaryLabel: 'External Assets Continuously Indexed',
      secondaryStat: '3',
      secondaryLabel: 'Unauthenticated Ingress Vectors Flagged',
      liveSignal: 'CWE-308 · Exposed VPN Admin Portal without Enforced SAML MFA',
      targetAsset: 'vpn-gateway-hq.demo.net (Public Internet · Tier 1)',
      remediationAction: 'Restrict management CIDR & enforce hardware-backed SAML 2.0 MFA'
    }
  },
  {
    id: 'cloud-guard',
    code: '02',
    suiteName: 'HypenSec CloudGuard',
    category: 'Code-to-Cloud & Application Security',
    headline: 'Multi-Cloud Posture, IAM Blast-Radius Control & Container Hardening',
    summary: 'Secure infrastructure from Terraform commits to production AWS, Azure, and GCP runtime environments—preventing IAM privilege escalation and storage exposure.',
    replacesTools: ['Fragmented CSPM Point Tools', 'Static IaC Linters', 'Disconnected Container Scanners'],
    capabilities: [
      {
        title: 'Cloud Identity Entitlement Analysis (CIEM)',
        detail: 'Visualizes cross-account assume-role chains, overprivileged service principals, and dormant admin credentials.',
        metricLabel: '64% IAM Privilege Reduction'
      },
      {
        title: 'Infrastructure-as-Code Guardrails',
        detail: 'Validates Terraform, CloudFormation, and Kubernetes manifests against CIS Benchmarks prior to deployment.',
        metricLabel: 'Pre-Commit Policy Enforcement'
      },
      {
        title: 'Storage & Data Boundary Protection',
        detail: 'Continuously verifies S3, GCS, and Azure Blob ACLs, KMS encryption keys, and public access blocks.',
        metricLabel: 'Continuous CIS Alignment'
      }
    ],
    telemetryPreview: {
      primaryStat: '98.4%',
      primaryLabel: 'Multi-Cloud CIS Benchmark Compliance',
      secondaryStat: '2',
      secondaryLabel: 'Cross-Account IAM Escalation Paths Blocked',
      liveSignal: 'CWE-732 · Overly Permissive S3 Bucket ACL on Production Build Artifacts',
      targetAsset: 'k8s-ingress-prod-east (AWS Production · Tier 1)',
      remediationAction: 'Apply AWS Account-Level Public Access Block & Least-Privilege Role Policy'
    }
  },
  {
    id: 'nexus-ops',
    code: '03',
    suiteName: 'HypenSec NexusOps',
    category: 'Autonomous SecOps & Exposure Triage',
    headline: 'Contextual Risk Prioritization & SLA-Driven Remediation Workflows',
    summary: 'Replace 10,000 disconnected CVE alerts with unified attack-path correlation. NexusOps weighs internet reachability, asset criticality, and active exploit telemetry.',
    replacesTools: ['Siloed Vulnerability Spreadsheets', 'Manual Triage Queues', 'Static GRC Trackers'],
    capabilities: [
      {
        title: 'Multi-Factor Contextual Risk Scoring',
        detail: 'Combines base CVSS with real network exposure, Tier 1–3 business criticality, and active exploit availability.',
        metricLabel: '86% Alert Noise Eliminated'
      },
      {
        title: 'Attack-Path Graph Correlation',
        detail: 'Chains together seemingly low-severity misconfigurations that combine into high-impact lateral movement paths.',
        metricLabel: 'End-to-End Blast Radius'
      },
      {
        title: 'Automated Engineering SLA Routing',
        detail: 'Assigns validated fixes directly to infrastructure owners with 48-hour critical SLA tracking and retest verification.',
        metricLabel: '3.8d Mean Time to Remediate'
      }
    ],
    telemetryPreview: {
      primaryStat: '86%',
      primaryLabel: 'Reduction in Unactionable Scanner Noise',
      secondaryStat: '3.8d',
      secondaryLabel: 'Average Critical Vulnerability Resolution',
      liveSignal: 'CVE-2026-3192 · Chained GraphQL Schema Leak + Overprivileged Execution Role',
      targetAsset: 'api.hypensec-demo.net (AWS API Gateway · Tier 1)',
      remediationAction: 'Disable production introspection & scope Lambda execution role permissions'
    }
  },
  {
    id: 'threat-lab',
    code: '04',
    suiteName: 'HypenSec ThreatLab',
    category: 'Adversary Research, Pen Testing & Incident Readiness',
    headline: 'Practitioner-Led Offensive Validation & Executive Breach Readiness',
    summary: 'Technology alone cannot spot complex business-logic flaws. Our senior offensive researchers conduct manual penetration testing, red-team exercises, and tabletop simulations.',
    replacesTools: ['Generic Checklist Audits', 'Copy-Paste Pentest PDFs', 'Untested IR Binder Plans'],
    capabilities: [
      {
        title: 'Manual Adversarial Penetration Testing',
        detail: 'Deep business-logic, authentication bypass, and chained API exploitation grounded in OWASP and PTES methodologies.',
        metricLabel: 'Zero False-Positive Guarantee'
      },
      {
        title: 'Executive & Technical Tabletop Exercises',
        detail: '90-minute live breach simulations testing ransomware containment, cloud extortion response, and legal escalation.',
        metricLabel: 'Battle-Tested Runbooks'
      },
      {
        title: 'Virtual CISO & Audit Attestation',
        detail: 'Board-level risk reporting, SOC 2 / ISO 27001 gap engineering, and formal customer procurement attestation letters.',
        metricLabel: 'Audit-Ready Evidence'
      }
    ],
    telemetryPreview: {
      primaryStat: '100%',
      primaryLabel: 'Findings Backed by Reproducible PoC Evidence',
      secondaryStat: '48h',
      secondaryLabel: 'Complimentary Patch Retesting Turnaround',
      liveSignal: 'ADV-2026-09 · Multi-Tenant IDOR & Token Replay Validated During Manual Audit',
      targetAsset: 'app.hypensec-demo.net (Enterprise Tenant Portal · Tier 1)',
      remediationAction: 'Enforce tenant-scoped JWT claims & cryptographic nonce validation'
    }
  }
];

