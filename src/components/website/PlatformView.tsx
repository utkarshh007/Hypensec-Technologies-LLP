import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  AlertTriangle,
  FileText,
  Workflow,
  BarChart3,
  ChevronRight,
  Terminal,
  Bot,
  Cpu,
  ScanSearch,
  DatabaseZap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_ASSETS, INITIAL_FINDINGS, INITIAL_REMEDIATION_TASKS } from '../../data/mockSecurityData';
import { ProductSuiteId } from './Navbar';

interface PlatformViewProps {
  selectedProductId?: ProductSuiteId;
  onSelectProduct?: (id: ProductSuiteId) => void;
  onOpenConsultation: (topic?: string) => void;
}

interface ProductSuiteDetail {
  id: ProductSuiteId;
  name: string;
  subtitle: string;
  categoryBadge: string;
  summary: string;
  icon: React.FC<{ className?: string }>;
  metrics: { label: string; value: string; note: string }[];
  capabilities: string[];
  liveTelemetryTitle: string;
  liveTelemetryRows: { code: string; event: string; status: string; severity: 'critical' | 'high' | 'normal' }[];
}

const PRODUCT_SUITE_ITEMS: ProductSuiteDetail[] = [
  {
    id: 'trever-ttx',
    name: 'Trever TTX',
    subtitle: 'NextGen Table Top Simulator',
    categoryBadge: 'Incident & Crisis Readiness',
    summary:
      'Interactive multi-stakeholder cyber crisis and ransomware tabletop simulator. Replaces static slide decks with live branching attack injects, regulatory disclosure timers, and board-level decision telemetry.',
    icon: Terminal,
    metrics: [
      { label: 'Scenario Library', value: '45+ Injects', note: 'Ransomware, Cloud Breach, Supply Chain' },
      { label: 'Decision Latency', value: '-62%', note: 'Faster executive containment alignment' },
      { label: 'Compliance Alignment', value: 'NIST / CERT-In', note: 'Automated post-exercise audit report' }
    ],
    capabilities: [
      'Dynamic branching injects tailored to CISO, Legal, PR, and SecOps roles',
      'Real-time SLA pressure timers for 6-hour & 72-hour regulatory breach reporting',
      'Automated readiness gap scoring and executive after-action playbooks'
    ],
    liveTelemetryTitle: 'Active Simulation Run · Ransomware Double-Extortion Drill',
    liveTelemetryRows: [
      { code: 'INJECT-04', event: 'Exfiltration claim posted by threat actor; legal hold & ransom posture decision required', status: 'Awaiting CISO Sign-off', severity: 'critical' },
      { code: 'INJECT-03', event: 'Active Directory lateral movement isolated across Tier-1 production VLANs', status: 'Contained in 14m', severity: 'high' },
      { code: 'INJECT-01', event: 'SOC alert triage & regulatory notification draft initialized', status: 'Verified', severity: 'normal' }
    ]
  },
  {
    id: 'webby',
    name: 'Webby',
    subtitle: 'Agentic Ai QA Testing',
    categoryBadge: 'Autonomous Quality & Resilience',
    summary:
      'Self-driving AI QA agents that autonomously explore web applications, synthesize multi-step user journeys, detect DOM/API regressions, and validate edge-case business logic before production release.',
    icon: Bot,
    metrics: [
      { label: 'Test Maintenance', value: '-85%', note: 'Self-healing selectors on UI changes' },
      { label: 'Journey Coverage', value: '99.2%', note: 'Autonomous path & state exploration' },
      { label: 'CI/CD Execution', value: '< 4 mins', note: 'Parallel headless browser swarm' }
    ],
    capabilities: [
      'Zero-script autonomous discovery of checkout, auth, and RBAC user flows',
      'Self-healing DOM & API assertions that adapt automatically to frontend refactors',
      'Full trace capture with network HAR logs, console telemetry, and video replay'
    ],
    liveTelemetryTitle: 'Agentic QA Swarm · Production Release Candidate #408',
    liveTelemetryRows: [
      { code: 'QA-AGENT-12', event: 'Multi-tenant billing upgrade flow validated across 18 currency permutations', status: 'Passed (1.8s)', severity: 'normal' },
      { code: 'QA-AGENT-07', event: 'Detected unhandled 502 race condition on concurrent OAuth token refresh', status: 'Regression Flagged', severity: 'high' },
      { code: 'QA-AGENT-03', event: 'Auto-healed 4 updated checkout button selectors without pipeline failure', status: 'Self-Healed', severity: 'normal' }
    ]
  },
  {
    id: 'axr',
    name: 'AXR',
    subtitle: 'Autonomous Existential Resilience',
    categoryBadge: 'Self-Healing Cyber Continuity',
    summary:
      'Engineered to protect mission-critical enterprises against existential cyber events. AXR continuously enforces immutable recovery vaults, automated blast-radius quarantine, and zero-trust survivability.',
    icon: Cpu,
    metrics: [
      { label: 'Containment Speed', value: '< 800ms', note: 'Autonomous workload micro-isolation' },
      { label: 'Recovery Assurance', value: '100% Immutable', note: 'Air-gapped cryptographic state snapshots' },
      { label: 'Blast Radius', value: 'Zero Lateral', note: 'Automated identity & east-west circuit breaker' }
    ],
    capabilities: [
      'Autonomous circuit-breakers that sever compromised IAM roles and east-west segments',
      'Cryptographically verified clean-room recovery orchestration for Tier-0 assets',
      'Continuous existential risk modeling across cloud, identity, and DNS control planes'
    ],
    liveTelemetryTitle: 'AXR Continuity Engine · Tier-0 Infrastructure Guard',
    liveTelemetryRows: [
      { code: 'AXR-SHIELD-01', event: 'Anomalous mass KMS key deletion attempt blocked via autonomous policy lock', status: 'Quarantined', severity: 'critical' },
      { code: 'AXR-VAULT-09', event: 'Immutable Golden Snapshot verified for Core Ledger & Identity Provider', status: 'RPO < 30 sec', severity: 'normal' },
      { code: 'AXR-MESH-04', event: 'East-west zero-trust segmentation policy enforced across 340 nodes', status: 'Active Guard', severity: 'normal' }
    ]
  },
  {
    id: 'zproxi',
    name: 'Zproxi',
    subtitle: 'Agentic Ai Security Scanner',
    categoryBadge: 'Autonomous Offensive DAST & API Security',
    summary:
      'Next-generation agentic offensive scanner that thinks like a human penetration tester—chaining authentication flows, fuzzing GraphQL/REST APIs, and generating verified Proof-of-Concept (PoC) exploits with zero false positives.',
    icon: ScanSearch,
    metrics: [
      { label: 'False Positive Rate', value: '< 0.5%', note: 'Every finding backed by live PoC replay' },
      { label: 'Business Logic Depth', value: 'Multi-Step', note: 'IDOR, BOLA, & auth bypass chaining' },
      { label: 'Scan Cadence', value: 'Continuous', note: 'Triggered on every PR & staging deploy' }
    ],
    capabilities: [
      'Stateful agentic fuzzing for BOLA/IDOR, broken authentication, and SSRF chains',
      'Automated cURL & HTTP request/response Proof-of-Concept generation for developers',
      'Native coverage for REST, GraphQL, WebSockets, and modern SPA architectures'
    ],
    liveTelemetryTitle: 'Zproxi Offensive Agent · API & Web Surface Assessment',
    liveTelemetryRows: [
      { code: 'ZPX-POC-91', event: 'Verified BOLA privilege escalation on /api/v2/org-billing via cross-tenant JWT replay', status: 'PoC Verified', severity: 'critical' },
      { code: 'ZPX-POC-84', event: 'GraphQL batching rate-limit bypass discovered on authentication endpoint', status: 'High Priority', severity: 'high' },
      { code: 'ZPX-SCAN-19', event: '142 endpoints fuzzed; 38 unexploitable scanner warnings suppressed automatically', status: 'Noise Filtered', severity: 'normal' }
    ]
  },
  {
    id: 'moana-dpdp',
    name: 'Moana DPDP Scanner',
    subtitle: 'Digital Personal Data Protection & Privacy Compliance',
    categoryBadge: 'Data Governance & DPDP Act Readiness',
    summary:
      'Purpose-built automated scanner for the Digital Personal Data Protection (DPDP) Act and global privacy frameworks. Discovers shadow PII across databases, S3 buckets, and APIs while auditing consent lifecycle compliance.',
    icon: DatabaseZap,
    metrics: [
      { label: 'PII Classification', value: '98.7% Precision', note: 'Aadhaar, PAN, financial & health identifiers' },
      { label: 'Consent Audit', value: 'Real-Time', note: 'Tracks Data Principal withdrawal & erasure SLAs' },
      { label: 'Regulatory Mapping', value: 'DPDP / GDPR', note: 'Automated Data Fiduciary audit artifacts' }
    ],
    capabilities: [
      'Agentless discovery of unencrypted Personal Data across SQL/NoSQL stores, logs, and object storage',
      'Automated verification of Data Principal consent notices, purpose limitation, and erasure workflows',
      'One-click Data Protection Impact Assessment (DPIA) and Fiduciary readiness reporting'
    ],
    liveTelemetryTitle: 'Moana DPDP Compliance Engine · Data Fiduciary Audit Stream',
    liveTelemetryRows: [
      { code: 'DPDP-SEC-08', event: 'Unmasked customer PII detected in staging S3 bucket (ap-south-1) lacking encryption', status: 'Violation Flagged', severity: 'critical' },
      { code: 'DPDP-CNS-14', event: 'Data Principal erasure workflow verified across 6 downstream microservices', status: 'SLA Compliant', severity: 'normal' },
      { code: 'DPDP-MAP-02', event: 'Cross-border data transfer inventory updated for 12 third-party processors', status: 'Indexed', severity: 'normal' }
    ]
  }
];

export const PlatformView: React.FC<PlatformViewProps> = ({
  selectedProductId = 'trever-ttx',
  onSelectProduct,
  onOpenConsultation
}) => {
  const [activeProductId, setActiveProductId] = useState<ProductSuiteId>(selectedProductId);
  const [activeTab, setActiveTab] = useState<'overview' | 'surface' | 'register' | 'remediation' | 'reports'>('overview');

  React.useEffect(() => {
    if (selectedProductId) {
      setActiveProductId(selectedProductId);
    }
  }, [selectedProductId]);

  const handleProductSwitch = (id: ProductSuiteId) => {
    setActiveProductId(id);
    if (onSelectProduct) {
      onSelectProduct(id);
    }
  };

  const activeProduct = PRODUCT_SUITE_ITEMS.find((p) => p.id === activeProductId) || PRODUCT_SUITE_ITEMS[0];
  const ActiveProductIcon = activeProduct.icon;

  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'surface', label: 'Attack Surface & Assets', icon: Layers },
    { id: 'register', label: 'Risk Register & Findings', icon: AlertTriangle },
    { id: 'remediation', label: 'Remediation Workflow', icon: Workflow },
    { id: 'reports', label: 'Executive & Audit Reports', icon: FileText },
  ];

  const workflowPhases = [
    {
      phase: 'Phase 1',
      title: 'Autonomous Discovery',
      summary: 'Passively indexes domains, subdomains, API gateways, and cloud storage endpoints without agent overhead.'
    },
    {
      phase: 'Phase 2',
      title: 'Context Enrichment',
      summary: 'Classifies assets by business tier (Tier 1–3), production status, and network exposure reachability.'
    },
    {
      phase: 'Phase 3',
      title: 'Signal Prioritization',
      summary: 'Combines technical CVSS severity with real exploit availability to suppress low-impact scanner noise.'
    },
    {
      phase: 'Phase 4',
      title: 'Remediation & SLA',
      summary: 'Assigns clear engineering ownership, tracks remediation velocity, and generates compliance evidence.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-14">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
            <span>HypenSec Product Suite</span>
            <span aria-hidden="true">·</span>
            <span>Agentic AI & Autonomous Cyber Resilience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
            Next-Gen Security & Resilience Products
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Explore our specialized suite of autonomous security, resilience, QA, and privacy compliance products engineered for modern security and engineering teams.
          </p>
        </div>

        <button
          onClick={() => onOpenConsultation('Product Suite Architecture & Evaluation')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-tri-md shrink-0"
        >
          <span>Schedule Product Briefing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Products Interactive Selector & Spotlight */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRODUCT_SUITE_ITEMS.map((prod) => {
            const Icon = prod.icon;
            const isSelected = prod.id === activeProduct.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleProductSwitch(prod.id)}
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
                      Product
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {prod.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {prod.subtitle}
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-blue-600">
                  <span>{isSelected ? 'Viewing Product' : 'Inspect Specs'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Product Detail Panel */}
        <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-tri-lg space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold uppercase">
                <ActiveProductIcon className="w-4 h-4" />
                <span>{activeProduct.categoryBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1f1f1f]">
                {activeProduct.name} <span className="text-slate-500">({activeProduct.subtitle})</span>
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {activeProduct.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenConsultation(`${activeProduct.name} (${activeProduct.subtitle}) Product Demo`)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-tri-sm"
              >
                Request {activeProduct.name} Demo
              </button>
              <button
                type="button"
                onClick={() => onOpenConsultation(`${activeProduct.name} Technical Specifications & Architecture`)}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-mono rounded-lg transition-all"
              >
                Architecture Specs
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeProduct.metrics.map((m) => (
              <div key={m.label} className="surface-tri-wash border border-slate-200/80 rounded-xl p-4">
                <div className="text-xs font-mono text-slate-500 uppercase">{m.label}</div>
                <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{m.value}</div>
                <div className="text-xs text-slate-600 mt-1">{m.note}</div>
              </div>
            ))}
          </div>

          {/* Capabilities & Live Telemetry Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Core Capabilities
              </h3>
              <ul className="space-y-2.5">
                {activeProduct.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 bg-slate-50/90 border border-slate-200/90 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-mono font-semibold text-slate-800">
                  {activeProduct.liveTelemetryTitle}
                </span>
                <span className="text-[11px] font-mono text-blue-600 font-semibold">
                  Telemetry Stream
                </span>
              </div>
              <div className="space-y-2">
                {activeProduct.liveTelemetryRows.map((row) => (
                  <div
                    key={row.code}
                    className="bg-white border border-slate-200/90 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-blue-600 shrink-0 mt-0.5">
                        {row.code}
                      </span>
                      <span className="text-slate-700 leading-snug">{row.event}</span>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-semibold shrink-0 px-2 py-0.5 rounded border ${
                        row.severity === 'critical'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : row.severity === 'high'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Workflow Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {workflowPhases.map((item) => (
          <div key={item.phase} className="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-tri-sm shadow-tri-hover">
            <div className="text-xs font-mono text-blue-600 font-semibold uppercase mb-1">
              {item.phase}
            </div>
            <h3 className="text-lg font-normal tracking-[-0.015em] text-[#1f1f1f]">{item.title}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Platform Feature Showcase */}
      <div className="surface-tri-wash border border-slate-200/90 rounded-2xl overflow-hidden shadow-tri-lg">
        {/* Showcase Header & Tab Selector */}
        <div className="bg-white/90 backdrop-blur-xs px-6 py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Module Preview:</span>
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100/90 rounded-lg border border-slate-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            <span>Sample Demo Data</span>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 lg:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/95 border border-slate-200/90 rounded-xl p-4 shadow-tri-sm">
                  <div className="text-xs text-slate-500 font-mono">Posture Index</div>
                  <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-mono tabular-nums">74 / 100</div>
                  <div className="text-[11px] text-slate-500 mt-1">Normal risk threshold · 4 active findings</div>
                </div>
                <div className="bg-white/95 border border-slate-200/90 rounded-xl p-4 shadow-tri-sm">
                  <div className="text-xs text-slate-500 font-mono">Monitored Assets</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1 font-mono tabular-nums">{SAMPLE_ASSETS.length}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Multi-cloud, on-prem & APIs</div>
                </div>
                <div className="bg-white/95 border border-slate-200/90 rounded-xl p-4 shadow-tri-sm">
                  <div className="text-xs text-slate-500 font-mono">Critical Weaknesses</div>
                  <div className="text-3xl font-extrabold text-rose-600 mt-1 font-mono tabular-nums">1</div>
                  <div className="text-[11px] text-slate-500 mt-1">SLA Target: 48 hours</div>
                </div>
                <div className="bg-white/95 border border-slate-200/90 rounded-xl p-4 shadow-tri-sm">
                  <div className="text-xs text-slate-500 font-mono">Remediation Velocity</div>
                  <div className="text-3xl font-extrabold text-blue-600 mt-1 font-mono tabular-nums">3.8d</div>
                  <div className="text-[11px] text-slate-500 mt-1">Average time to close</div>
                </div>
              </div>

              <div className="bg-white/95 border border-slate-200/90 rounded-xl p-5 shadow-tri-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-900">Highest Priority Action Required</h4>
                  <span className="text-xs font-mono font-bold text-rose-600">Critical Priority</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900">VPN Perimeter Gateway: Exposed Management Portal (CWE-308)</div>
                  <p className="text-slate-600">
                    Direct public internet exposure on corporate ingress router lacking enforced SAML MFA authentication.
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-2">
                    <span>Owner: David Vance (Corporate IT)</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 font-semibold">Due in 2 days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'surface' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">External & Cloud Asset Inventory ({SAMPLE_ASSETS.length} Sample Records)</h4>
                <span className="text-xs text-slate-500 font-mono">Passive Reconnaissance Stream</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Asset Identifier</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Environment</th>
                      <th className="py-2.5 px-3">Exposure</th>
                      <th className="py-2.5 px-3">Criticality</th>
                      <th className="py-2.5 px-3">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {SAMPLE_ASSETS.slice(0, 5).map((asset) => (
                      <tr key={asset.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono text-blue-600 font-semibold">{asset.name}</td>
                        <td className="py-2 px-3 text-slate-700">{asset.type}</td>
                        <td className="py-2 px-3 text-slate-600">{asset.environment}</td>
                        <td className="py-2 px-3">
                          <span className={asset.exposure === 'Public Internet' ? 'text-amber-700 font-semibold' : 'text-slate-600'}>
                            {asset.exposure}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-700">{asset.criticality.split(' - ')[0]}</td>
                        <td className="py-2 px-3 text-slate-600">{asset.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Prioritized Risk Register ({INITIAL_FINDINGS.length} Findings)</h4>
                <span className="text-xs text-slate-500 font-mono">Contextual CVSS Ranking</span>
              </div>
              <div className="space-y-2">
                {INITIAL_FINDINGS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-3.5 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono uppercase font-bold ${
                          f.severity === 'critical' ? 'text-rose-600' : f.severity === 'high' ? 'text-amber-700' : 'text-blue-600'
                        }`}>
                          {f.severity}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs font-mono text-slate-600">{f.cveId}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs font-mono text-slate-700 tabular-nums">CVSS {f.cvssScore}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">{f.title}</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">{f.businessContext}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        {f.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'remediation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Active Remediation Pipeline</h4>
                <span className="text-xs text-slate-500 font-mono">SLA Tracking & Ownership</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {INITIAL_REMEDIATION_TASKS.map((task) => (
                  <div key={task.id} className="p-3.5 bg-white border border-slate-200 rounded-lg flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                        <span className="text-blue-600 font-semibold">{task.id}</span>
                        <span>{task.status}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h5>
                      <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">{task.notes}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                      <span>{task.assignee}</span>
                      <span className="text-amber-700 font-semibold">Due {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Executive & Compliance Reporting Studio</h4>
                <span className="text-xs text-slate-500 font-mono">Audit Ready Formats</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
                  <h5 className="text-xs font-bold text-slate-900 mb-1">Executive Posture Brief</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                    Concise, non-technical overview of digital exposure, posture trends, and strategic risk items for board meetings.
                  </p>
                  <span className="text-[10px] font-mono text-blue-600 font-semibold">PDF Format Available</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
                  <h5 className="text-xs font-bold text-slate-900 mb-1">Technical Penetration Audit</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                    Step-by-step reproduction scripts, CVE classifications, network pcaps, and developer patch verification logs.
                  </p>
                  <span className="text-[10px] font-mono text-blue-600 font-semibold">Markdown & PDF</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
                  <h5 className="text-xs font-bold text-slate-900 mb-1">SOC 2 / ISO Gap Summary</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                    Structured mapping of external assets and vulnerability remediation records directly against audit control objectives.
                  </p>
                  <span className="text-[10px] font-mono text-blue-600 font-semibold">CSV & Evidence Bundle</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar inside preview */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Need customized deployment specifications or technical scoping across these asset categories?
          </p>
          <button
            onClick={() => onOpenConsultation('Technical Architecture & Scoping Review')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>Request Technical Consultation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
