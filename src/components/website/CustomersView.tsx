import React, { useState } from 'react';
import {
  Shield,
  Users,
  Building2,
  Lock,
  CheckCircle2,
  ArrowRight,
  Layers,
  Server,
  FileCheck,
  Terminal,
  Briefcase
} from 'lucide-react';
import { COMPANY_VERIFICATION_PLACEHOLDERS } from '../../data/mockSecurityData';
import { CustomerLogoCarousel } from './CustomerLogoCarousel';

interface CustomersViewProps {
  onOpenConsultation: (topic?: string) => void;
  onLaunchPlatform?: () => void;
  onSelectTab: (tab: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  onOpenConsultation,
  onSelectTab
}) => {
  const [selectedStakeholder, setSelectedStakeholder] = useState<number>(0);

  const stakeholderGroups = [
    {
      role: 'CISOs & Security Leaders',
      icon: Shield,
      focus: 'Board-Ready Visibility & Strategic Risk Reduction',
      challenges: [
        'Translating thousands of technical scanner alerts into clear business risk priorities for executive leadership.',
        'Validating whether security investments actually reduce exploitable attack paths across distributed teams.',
        'Establishing a defensible, repeatable security roadmap without slowing down product delivery.'
      ],
      howHypenSecHelps: [
        'Delivers contextual risk scoring that weighs internet exposure and asset criticality over raw CVSS numbers.',
        'Provides executive posture briefings and clear remediation velocity metrics for board reporting.',
        'Pairs automated surface discovery with senior advisory support to guide pragmatic resource allocation.'
      ],
      recommendedPath: 'Virtual CISO Advisory & Continuous Risk Platform'
    },
    {
      role: 'SecOps & Vulnerability Teams',
      icon: Terminal,
      focus: 'Eliminating False Positives & Accelerating Triage',
      challenges: [
        'Spending cycles chasing unexploitable scanner noise while shadow IT subdomains go unnoticed.',
        'Lack of reproducible proof-of-concept evidence to convince engineering teams to prioritize security patches.',
        'Fragmented tracking between external reconnaissance tools and internal ticketing workflows.'
      ],
      howHypenSecHelps: [
        'Validates findings through manual penetration testing and chained exploit analysis to eliminate false alarms.',
        'Monitors external DNS, certificates, and public cloud perimeters continuously without requiring agents.',
        'Provides reproducible HTTP/API evidence and structured remediation tasks mapped to SLA targets.'
      ],
      recommendedPath: 'Vulnerability Assessment, Pen Testing & EASM'
    },
    {
      role: 'Cloud & Platform Engineering',
      icon: Server,
      focus: 'Architecture Hardening Without Deployment Friction',
      challenges: [
        'Multi-cloud IAM permission drift, exposed storage buckets, and Kubernetes ingress misconfigurations.',
        'Generic security audit PDFs that offer theoretical advice instead of stack-specific Infrastructure-as-Code fixes.',
        'Balancing rapid CI/CD release velocity with strict least-privilege isolation boundaries.'
      ],
      howHypenSecHelps: [
        'Audits AWS, Azure, GCP, and Kubernetes architectures against CIS benchmarks and real-world lateral movement paths.',
        'Delivers actionable Terraform, CloudFormation, and IAM policy recommendations tailored to your stack.',
        'Includes collaborative engineering debriefs and re-testing verification once patches are deployed.'
      ],
      recommendedPath: 'Cloud & Application Security Engineering'
    },
    {
      role: 'Risk, Compliance & GRC Teams',
      icon: FileCheck,
      focus: 'Audit Readiness & Third-Party Risk Governance',
      challenges: [
        'Months of disruptive evidence collection ahead of SOC 2 Type II, ISO 27001, or customer security reviews.',
        'Evaluating third-party SaaS vendors and sub-processors beyond static annual spreadsheets.',
        'Maintaining continuous control verification across changing infrastructure.'
      ],
      howHypenSecHelps: [
        'Maps technical assessments, penetration test reports, and remediation logs directly to SOC 2, ISO 27001, and NIST controls.',
        'Centralizes vendor security attestation tracking alongside external threat exposure signals.',
        'Generates clean auditor-ready evidence packages and formal gap remediation roadmaps.'
      ],
      recommendedPath: 'GRC Support & Third-Party Risk Management'
    }
  ];

  const industrySectors = [
    {
      sector: 'B2B SaaS & Cloud-Native Platforms',
      summary: 'Supporting fast-shipping software organizations with continuous API penetration testing, multi-tenant isolation reviews, and enterprise customer security questionnaire readiness.',
      priorities: 'API Security · Multi-Tenant IAM · SOC 2 / ISO 27001 Alignment'
    },
    {
      sector: 'Financial Services & FinTech',
      summary: 'Helping regulated technology providers validate perimeter resilience, harden payment and identity gateways, and conduct realistic incident response tabletop exercises.',
      priorities: 'Adversarial Pen Testing · Identity Gateways · Incident Readiness'
    },
    {
      sector: 'Healthcare & Data-Intensive Enterprises',
      summary: 'Assisting organizations managing sensitive records to discover shadow cloud storage, enforce strict encryption and access boundaries, and evaluate third-party vendor risk.',
      priorities: 'Cloud Posture · Data Boundary Isolation · Vendor Risk Governance'
    },
    {
      sector: 'Digital Commerce & Distributed Infrastructure',
      summary: 'Mapping sprawling external attack surfaces across regional domains, CDN edge workers, and legacy on-premises portals to prevent unauthorized access.',
      priorities: 'External Attack Surface Monitoring · Web AppSec · Perimeter Hygiene'
    }
  ];

  const engagementBlueprints = [
    {
      id: 'ENG-01',
      sectorLabel: 'Enterprise B2B SaaS Organization (Sample Engagement Blueprint)',
      scope: 'Application & API Penetration Testing + SOC 2 Readiness',
      challenge: 'Needed independent manual validation of a multi-tenant GraphQL API and AWS microservice environment prior to an enterprise customer audit.',
      approach: 'Conducted authenticated and unauthenticated penetration testing, identified object-level authorization gaps, and provided stack-specific remediation guidance with full re-testing verification.',
      deliverable: 'Verified Technical Penetration Report + Executive Attestation Letter for Customer Procurement'
    },
    {
      id: 'ENG-02',
      sectorLabel: 'Multi-Cloud Technology Provider (Sample Engagement Blueprint)',
      scope: 'External Attack Surface Discovery & Cloud IAM Hardening',
      challenge: 'Rapid infrastructure growth across AWS and Cloudflare left security leadership uncertain about orphaned staging subdomains and overprivileged CI/CD service roles.',
      approach: 'Cataloged external DNS and cloud endpoints, audited IAM assume-role chains, and prioritized high-exposure misconfigurations into structured engineering sprints.',
      deliverable: 'Complete External Asset Inventory + Hardened IAM Policy Guardrails'
    },
    {
      id: 'ENG-03',
      sectorLabel: 'Regulated Operations Team (Sample Engagement Blueprint)',
      scope: 'Incident Response Tabletop & Detection Engineering Review',
      challenge: 'Written incident response plans had not been tested against modern credential compromise or cloud control-plane extortion scenarios.',
      approach: 'Facilitated a 90-minute executive and technical tabletop exercise, audited SIEM alert fidelity, and refined escalation runbooks with clear role ownership.',
      deliverable: 'Updated Incident Response Playbooks + Detection Coverage Gap Matrix'
    }
  ];

  const activeGroup = stakeholderGroups[selectedStakeholder];
  const ActiveIcon = activeGroup.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
          <span>Customers & Stakeholders</span>
          <span aria-hidden="true">·</span>
          <span>Enterprise & Regulated Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
          Built for Security Leaders, Practitioners, and High-Trust Organizations
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          HypenSec partners with enterprise conglomerates, financial institutions, and AI-native platforms that require technical depth for their engineering teams and defensible risk context for executive decision-makers.
        </p>
      </div>

      {/* Customer Logo Carousel */}
      <CustomerLogoCarousel
        variant="customers"
        onSelectCustomerAction={(customer) =>
          onOpenConsultation(`Reference & Scope Inquiry: ${customer.name} (${customer.engagementFocus})`)
        }
      />

      {/* Section 1: Interactive Stakeholder Value Matrix */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200/80 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Role-Specific Outcomes</span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">Who We Partner With Inside Your Organization</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Select a team profile below</span>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stakeholderGroups.map((group, idx) => {
            const Icon = group.icon;
            const isSelected = selectedStakeholder === idx;
            return (
              <button
                key={group.role}
                onClick={() => setSelectedStakeholder(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'surface-tri-wash border-blue-600 ring-2 ring-blue-500/15 shadow-tri-md text-slate-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 shadow-tri-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{group.role}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{group.focus}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stakeholder Detail Card */}
        <div className="surface-tri-wash border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-tri-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-600 text-white shadow-tri-sm">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Stakeholder Profile</span>
                <h3 className="text-xl font-bold text-slate-900">{activeGroup.role}</h3>
              </div>
            </div>
            <button
              onClick={() => onOpenConsultation(activeGroup.recommendedPath)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 self-start md:self-auto shadow-tri-sm"
            >
              <span>Consult for {activeGroup.role.split(' ')[0]} Needs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-tri-sm">
              <h4 className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider">
                Common Operational Challenges
              </h4>
              <ul className="space-y-2.5">
                {activeGroup.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-tri-sm">
              <h4 className="text-xs font-mono text-blue-700 font-bold uppercase tracking-wider">
                How HypenSec Delivers Value
              </h4>
              <ul className="space-y-2.5">
                {activeGroup.howHypenSecHelps.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Industry Sectors */}
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-4">
          <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Industry Alignment</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Environments & Sectors We Support</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industrySectors.map((item) => (
            <div
              key={item.sector}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-blue-300 shadow-tri-sm shadow-tri-hover"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Sector Focus</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.sector}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-blue-700 font-semibold">
                {item.priorities}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Representative Engagement Blueprints & NDA Reference Policy */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Engagement Architecture</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Representative Engagement Blueprints</h2>
            <p className="text-xs text-slate-500 mt-1">
              Illustrative engagement structures showing how HypenSec scopes and delivers work.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('services')}
            className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View Full Service Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {engagementBlueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-tri-sm shadow-tri-hover"
            >
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-blue-600 font-semibold">
                  {bp.sectorLabel}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{bp.scope}</h3>
                <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800">Context: </span>
                    {bp.challenge}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Execution: </span>
                    {bp.approach}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Primary Deliverable</div>
                <div className="text-xs font-semibold text-emerald-700 mt-0.5">{bp.deliverable}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Strict Client Confidentiality & Verified Reference Briefings */}
      <div className="surface-tri-wash border border-slate-200/90 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-tri-md">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold uppercase">
            <Lock className="w-4 h-4" />
            <span>Client Confidentiality & Mutual NDA Reference Briefings</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Request Sanitized Sample Deliverables & Peer CISO Reference Calls
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {COMPANY_VERIFICATION_PLACEHOLDERS.clientReferencesNotice} Organizations evaluating HypenSec can request anonymized penetration testing reports, DPDP compliance blueprints, or direct reference introductions during formal scoping.
          </p>
        </div>
        <button
          onClick={() => onOpenConsultation('Customer Reference & Sample Deliverable Request')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all shadow-tri-sm shrink-0"
        >
          Request Sample Report & References
        </button>
      </div>
    </div>
  );
};
