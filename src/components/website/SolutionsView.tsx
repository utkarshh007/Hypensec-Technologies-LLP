import React, { useState, useEffect } from 'react';
import { HYPENSEC_SOLUTIONS } from '../../data/mockSecurityData';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Lock,
  Radar,
  ShieldAlert,
  ScanSearch
} from 'lucide-react';
import { SolutionCategoryId } from './Navbar';

interface SolutionsViewProps {
  selectedCategoryId?: SolutionCategoryId;
  onSelectCategory?: (id: SolutionCategoryId) => void;
  onOpenConsultation: (solutionTitle?: string) => void;
}

interface SolutionPlatformItem {
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
}

interface SolutionCategoryGroup {
  id: SolutionCategoryId;
  indexLabel: string;
  title: string;
  shortTitle: string;
  summary: string;
  icon: React.FC<{ className?: string }>;
  items: SolutionPlatformItem[];
}

const SOLUTION_CATEGORIES: SolutionCategoryGroup[] = [
  {
    id: 'security-management',
    indexLabel: '01',
    title: 'Security Management & Audit Lifecycle',
    shortTitle: 'Security & Audit Lifecycle',
    summary:
      'Centralize security posture governance, continuous compliance evidence collection, and end-to-end audit lifecycle orchestration.',
    icon: FileCheck2,
    items: [
      {
        name: 'HyTree',
        tagline: 'Unified Security Governance & Audit Lifecycle Management',
        description:
          'Streamlines enterprise risk registers, control mapping across SOC 2, ISO 27001, and NIST frameworks, and automated audit evidence workflows.',
        capabilities: [
          'Continuous control monitoring & automated evidence indexing',
          'Multi-framework compliance mapping & gap tracking',
          'Executive audit readiness dashboards & remediation SLAs'
        ]
      }
    ]
  },
  {
    id: 'dlp-content',
    indexLabel: '02',
    title: 'Data Loss Prevention & Content Security',
    shortTitle: 'DLP & Content Security',
    summary:
      'Safeguard sensitive intellectual property, regulated PII, and enterprise content across endpoints, networks, email, and cloud channels.',
    icon: Lock,
    items: [
      {
        name: 'Digital Guardian DLP',
        tagline: 'Endpoint, Network & Cloud Data Protection',
        description:
          'Deep visibility and context-aware data loss prevention engineered to stop insider threats and external exfiltration of critical IP and regulated data.',
        capabilities: [
          'Kernel-level endpoint data lineage & exfiltration blocking',
          'Automated classification of PII, financial, and source code assets',
          'Cross-platform policy enforcement for Windows, macOS, and Linux'
        ]
      },
      {
        name: 'Forcepoint DLP',
        tagline: 'Risk-Adaptive Data Loss Prevention & Content Security',
        description:
          'Unified policy control and behavioral risk-adaptive protection across cloud applications, web, email, and endpoint channels.',
        capabilities: [
          'Single-policy orchestration across web, cloud, email, and endpoint',
          'Risk-adaptive enforcement based on user behavioral analytics',
          'Extensive pre-built regulatory compliance templates (GDPR, DPDP, HIPAA)'
        ]
      }
    ]
  },
  {
    id: 'edr-xdr',
    indexLabel: '03',
    title: 'Endpoint Detection & Response',
    shortTitle: 'Endpoint Detection (XDR)',
    summary:
      'Detect, investigate, and autonomously contain sophisticated ransomware, fileless malware, and lateral movement across enterprise endpoints and cloud workloads.',
    icon: Radar,
    items: [
      {
        name: 'Cortex XDR',
        tagline: 'Extended Detection & Response Across Endpoint, Network & Cloud',
        description:
          'Natively integrates endpoint, network, cloud, and identity telemetry to stop modern multi-vector attacks with AI-driven root cause analysis.',
        capabilities: [
          'Cross-data correlation uniting endpoint, firewall, and cloud logs',
          'Behavioral threat protection against ransomware and exploit chains',
          'Automated root-cause timeline reconstruction & surgical containment'
        ]
      },
      {
        name: 'SentinelOne Singularity XDR',
        tagline: 'Autonomous AI-Powered Endpoint Protection & Threat Hunting',
        description:
          'Delivers real-time autonomous behavioral prevention, Storyline™ attack telemetry correlation, and one-click ransomware rollback.',
        capabilities: [
          'Autonomous on-agent AI behavioral detection and response',
          'Patented Storyline™ context linking related processes and events',
          'Automated 1-click remediation and VSS shadow copy rollback'
        ]
      }
    ]
  },
  {
    id: 'vuln-pentest',
    indexLabel: '04',
    title: 'Vulnerability Management & Penetration Testing',
    shortTitle: 'Vulnerability & Pen Testing',
    summary:
      'Combine continuous vulnerability intelligence across hybrid infrastructure with real-world adversary simulation and exploit validation.',
    icon: ShieldAlert,
    items: [
      {
        name: 'Tenable Security Center',
        tagline: 'On-Premises Vulnerability Management & Risk Analytics',
        description:
          'Comprehensive on-premises vulnerability discovery, continuous configuration auditing, and risk-based prioritization for regulated and hybrid networks.',
        capabilities: [
          'Real-time vulnerability assessment powered by Nessus sensors',
          'Predictive Prioritization (VPR) combining CVE data with threat intel',
          'Customizable executive compliance & patch velocity dashboards'
        ]
      },
      {
        name: 'Tenable Vulnerability Management',
        tagline: 'Cloud-Delivered Continuous Exposure & Vulnerability Management',
        description:
          'Cloud-native platform providing unified visibility and continuous risk monitoring across IT, cloud workloads, containers, and remote assets.',
        capabilities: [
          'Agentless and agent-based scanning for dynamic cloud & remote fleets',
          'Continuous threat intelligence correlation for active zero-days',
          'Seamless ticketing integration with Jira and ServiceNow'
        ]
      },
      {
        name: 'Cobalt Strike',
        tagline: 'Adversary Simulation and Red Team Operations',
        description:
          'Industry-standard threat emulation software used by practitioner red teams to simulate quiet, long-term embedded advanced persistent actors.',
        capabilities: [
          'Malleable C2 profiles replicating real-world adversary TTPs',
          'Post-exploitation lateral movement & privilege escalation testing',
          'Comprehensive red-team activity logging for blue-team purple drills'
        ]
      },
      {
        name: 'Core Impact',
        tagline: 'Penetration Testing & Multi-Vector Exploit Validation',
        description:
          'Centralized penetration testing framework enabling security teams to safely exploit vulnerabilities across networks, endpoints, and applications.',
        capabilities: [
          'Commercial-grade certified exploit library updated continuously',
          'Multi-vector pivoting across network, web, and client-side targets',
          'Automated remediation re-testing and audit-ready validation reports'
        ]
      }
    ]
  },
  {
    id: 'appsec',
    indexLabel: '05',
    title: 'Application Security',
    shortTitle: 'Application Security (AppSec)',
    summary:
      'Secure the entire software development lifecycle (SDLC) from source code to production APIs using enterprise SAST, DAST, IAST, and practitioner testing suites.',
    icon: ScanSearch,
    items: [
      {
        name: 'HCL AppScan',
        tagline: 'Enterprise DAST, SAST & IAST Application Security Suite',
        description:
          'End-to-end application security testing suite delivering static, dynamic, and interactive analysis across web, mobile, and API portfolios.',
        capabilities: [
          'Unified SAST, DAST, and IAST scanning with AI noise reduction',
          'CI/CD pipeline integration for DevSecOps shift-left governance',
          'Detailed remediation advisories and regulatory compliance mapping'
        ]
      },
      {
        name: 'Micro Focus WebInspect',
        tagline: 'Dynamic Application Security Testing (DAST) for Complex Web Apps',
        description:
          'Automated dynamic testing engineered to crawl and assess modern single-page applications (SPAs), REST/GraphQL APIs, and complex authenticated workflows.',
        capabilities: [
          'Advanced macro recording for complex multi-step authentication',
          'Simultaneous crawl and audit for rapid dynamic vulnerability discovery',
          'Agent-assisted IAST correlation to pinpoint exact lines of code'
        ]
      },
      {
        name: 'Checkmarx',
        tagline: 'Static Application Security Testing (SAST), SCA & Supply Chain',
        description:
          'Cloud-native application security platform scanning source code, open-source dependencies, containers, and IaC templates prior to deployment.',
        capabilities: [
          'Incremental SAST scanning directly inside Git PR workflows',
          'Best-fix location analysis to remediate multiple dataflow paths at once',
          'Software Composition Analysis (SCA) for open-source exploitability'
        ]
      },
      {
        name: 'Invicti (formerly Netsparker)',
        tagline: 'Proof-Based Automated Web Application & API Vulnerability Scanning',
        description:
          'Enterprise DAST scanner featuring Proof-Based Scanning™ technology that automatically verifies exploitable vulnerabilities to eliminate false positives.',
        capabilities: [
          'Automated safe exploitation generating read-only proof of impact',
          'Discovery of shadow web assets and undocumented API endpoints',
          'Direct developer ticket routing with verified reproduction payloads'
        ]
      },
      {
        name: 'Burp Suite by PortSwigger',
        tagline: 'Practitioner-Grade Web Vulnerability Testing & Intercepting Proxy',
        description:
          'The definitive toolkit for manual penetration testers and AppSec engineers conducting deep business-logic, auth bypass, and API exploitation assessments.',
        capabilities: [
          'Full HTTP/HTTPS/WebSocket interception, manipulation, and fuzzing',
          'Active & passive vulnerability scanning engine with BApp extensions',
          'Out-of-band (OAST) blind vulnerability detection via Burp Collaborator'
        ]
      },
      {
        name: 'Acunetix',
        tagline: 'Automated Web Application Security Scanner',
        description:
          'High-speed automated DAST + IAST web security scanner detecting SQL Injection, XSS, SSRF, and over 7,000 web vulnerabilities across complex stacks.',
        capabilities: [
          'DeepScan crawler supporting JavaScript-heavy SPAs and HTML5',
          'AcuSensor IAST integration providing file & line-number precision',
          'Built-in OWASP Top 10, PCI DSS, and ISO 27001 compliance reports'
        ]
      },
      {
        name: 'OpenText Fortify (formerly Micro Focus Fortify)',
        tagline: 'Comprehensive SAST, DAST & Software Security Assurance Lifecycle',
        description:
          'Enterprise-scale static code analyzer (SCA) and dynamic testing platform supporting 30+ programming languages and centralized Software Security Center governance.',
        capabilities: [
          'Deep static code analysis across 30+ languages and frameworks',
          'IDE plugins for real-time developer security feedback while coding',
          'Centralized enterprise governance via Fortify Software Security Center'
        ]
      }
    ]
  }
];

export const SolutionsView: React.FC<SolutionsViewProps> = ({
  selectedCategoryId = 'security-management',
  onSelectCategory,
  onOpenConsultation
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<SolutionCategoryId>(selectedCategoryId);

  useEffect(() => {
    if (selectedCategoryId) {
      setActiveCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleCategorySelect = (id: SolutionCategoryId) => {
    setActiveCategoryId(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const activeCategory =
    SOLUTION_CATEGORIES.find((cat) => cat.id === activeCategoryId) || SOLUTION_CATEGORIES[0];
  const ActiveIcon = activeCategory.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
          <span>Enterprise Solutions Portfolio</span>
          <span aria-hidden="true">·</span>
          <span>5 Specialized Domains</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
          Security Solutions & Technology Ecosystem
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          HypenSec deploys, integrates, and operates industry-leading platforms across audit lifecycle management, data loss prevention, XDR, vulnerability management, and application security.
        </p>
      </div>

      {/* 5 Solution Categories Selector & Interactive Directory */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SOLUTION_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-600 ring-2 ring-blue-600/15 shadow-tri-md'
                    : 'bg-white/85 hover:bg-white border-slate-200/90 hover:border-blue-300 shadow-tri-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold">
                      Category {cat.indexLabel}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    {cat.title}
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>
                    {cat.items.length} {cat.items.length === 1 ? 'Solution' : 'Solutions'}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Solution Category Detail Showcase */}
        <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-tri-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold uppercase">
                <ActiveIcon className="w-4 h-4" />
                <span>Solution Domain {activeCategory.indexLabel}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1f1f1f]">
                {activeCategory.title}
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {activeCategory.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenConsultation(activeCategory.title)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-tri-sm shrink-0"
            >
              Consult on {activeCategory.shortTitle}
            </button>
          </div>

          <div
            className={`grid grid-cols-1 ${
              activeCategory.items.length === 1 ? 'lg:grid-cols-1' : 'md:grid-cols-2'
            } gap-5`}
          >
            {activeCategory.items.map((platform) => (
              <div
                key={platform.name}
                className="surface-tri-wash border border-slate-200/90 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-tri-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {platform.name}
                      </h3>
                      <div className="text-xs font-mono text-blue-600 font-medium mt-0.5">
                        {platform.tagline}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 shrink-0">
                      Supported Solution
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {platform.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-200/70">
                    {platform.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Deployment, Tuning & Managed Operations
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${platform.name} (${activeCategory.title})`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <span>Request Scoping</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge-Driven Strategic Outcomes Grid */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-1">
            Strategic Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1f1f1f]">
            Solving High-Impact Operational Challenges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HYPENSEC_SOLUTIONS.map((sol, index) => (
            <div
              key={sol.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between space-y-6 hover:border-blue-300 shadow-tri-sm shadow-tri-hover"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                  <span>Outcome 0{index + 1}</span>
                </div>
                <h3 className="text-xl font-normal tracking-[-0.015em] text-[#1f1f1f] mb-4 leading-snug">
                  {sol.title}
                </h3>

                {/* The Challenge */}
                <div className="space-y-1 mb-4">
                  <span className="text-xs font-mono text-amber-700 uppercase tracking-wider font-bold">
                    The Problem
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/90 border border-slate-200/80 rounded-lg p-3">
                    {sol.problem}
                  </p>
                </div>

                {/* HypenSec Approach */}
                <div className="space-y-1 mb-4">
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-bold">
                    HypenSec Approach
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sol.hypenSecApproach}
                  </p>
                </div>

                {/* Practical Outcome */}
                <div className="space-y-1 pt-3 border-t border-slate-100">
                  <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Practical Outcome</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {sol.practicalOutcome}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Pragmatic, scoped engagement</span>
                <button
                  onClick={() => onOpenConsultation(sol.title)}
                  className="text-xs px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-blue-700 font-semibold rounded transition-colors flex items-center gap-1"
                >
                  <span>Discuss Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Realistic Boundaries Disclaimer */}
      <div className="surface-tri-wash border border-slate-200/90 rounded-2xl p-5 text-xs text-slate-600 leading-relaxed flex items-start gap-3 shadow-tri-sm">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-900 font-bold">Security Integrity Statement: </span>
          HypenSec helps organizations significantly improve resilience and reduce attack vectors. We do not make reckless claims that any technology or service guarantees 100% security or prevents every possible breach. Security is a continuous operational discipline.
        </div>
      </div>
    </div>
  );
};
