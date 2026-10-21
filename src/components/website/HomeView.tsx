import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Shield,
  Users,
  Building2,
  Terminal
} from 'lucide-react';
import {
  AttackSurfaceMeshDiagram,
  MethodologyPipelineVisual
} from '../brand/VisualDiagrams';
import { CustomerLogoCarousel } from './CustomerLogoCarousel';
import {
  HYPENSEC_SERVICES,
  HYPENSEC_SOLUTIONS,
  INITIAL_FINDINGS
} from '../../data/mockSecurityData';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onOpenConsultation: (interest?: string) => void;
  onLaunchPlatform: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenConsultation,
  onLaunchPlatform
}) => {
  const [activeOfferingTab, setActiveOfferingTab] = useState<'services' | 'solutions'>('services');
  const [selectedPreviewFindingId, setSelectedPreviewFindingId] = useState<string>(INITIAL_FINDINGS[0].id);

  const selectedPreviewFinding =
    INITIAL_FINDINGS.find((f) => f.id === selectedPreviewFindingId) || INITIAL_FINDINGS[0];

  const stakeholderCards = [
    {
      role: 'CISOs & Security Leadership',
      icon: Shield,
      summary: 'Translate noisy vulnerability telemetry into defensible board-level risk priorities and clear remediation velocity metrics.',
      focus: 'Posture Governance · Board Reporting'
    },
    {
      role: 'SecOps & Vulnerability Teams',
      icon: Terminal,
      summary: 'Suppress unexploitable scanner noise with manual PoC validation and continuous passive attack surface discovery.',
      focus: 'Zero False Positives · Attack Surface'
    },
    {
      role: 'Cloud & Platform Engineering',
      icon: Building2,
      summary: 'Receive stack-specific Terraform, Kubernetes, and IAM policy guardrails with direct practitioner debriefs.',
      focus: 'Cloud Hardening · Developer-Ready Fixes'
    },
    {
      role: 'Risk, Compliance & GRC Teams',
      icon: Users,
      summary: 'Map technical assessments, penetration test evidence, and vendor posture directly to SOC 2, ISO 27001, and NIST CSF.',
      focus: 'Audit Evidence · Third-Party Risk'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-20 lg:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-4 tracking-wider uppercase">
            <span>Cybersecurity Services</span>
            <span aria-hidden="true">·</span>
            <span>Continuous Risk Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.12] text-balance">
            Identify, Prioritize, and Reduce Real Cyber Risk
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            HypenSec Technologies combines practitioner-led penetration testing and cloud security engineering with a continuous risk platform—helping your team uncover external exposure, cut through scanner alert fatigue, and remediate what actually matters.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onSelectTab('services')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-tri-sm"
            >
              <span>Explore Security Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onLaunchPlatform}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-blue-50/50 text-slate-800 border border-slate-300 hover:border-blue-300 font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs"
            >
              <span>Launch Interactive Platform Demo</span>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Key Value Checkpoints */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Manual PoC-Validated Assessments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Contextual CVSS + Exposure Triage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>SOC 2, ISO 27001 & NIST CSF Aligned</span>
            </div>
          </div>
        </div>

        {/* Interactive Hero Diagram */}
        <AttackSurfaceMeshDiagram />
      </section>

      {/* 1B. CUSTOMER LOGO CAROUSEL */}
      <CustomerLogoCarousel
        variant="home"
        onViewAllCustomers={() => onSelectTab('customers')}
        onSelectCustomerAction={(customer) =>
          onOpenConsultation(`${customer.name} — ${customer.engagementFocus}`)
        }
      />

      {/* 2. CORE SERVICES & SOLUTIONS SWITCHER */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
              Comprehensive Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
              Specialized Security Services & Challenge-Driven Solutions
            </h2>
          </div>

          {/* Toggle Pill */}
          <div className="inline-flex p-1 bg-white/90 border border-slate-200 rounded-xl shadow-tri-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveOfferingTab('services')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeOfferingTab === 'services'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Specialized Security Services ({HYPENSEC_SERVICES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveOfferingTab('solutions')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeOfferingTab === 'solutions'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Targeted Risk Solutions ({HYPENSEC_SOLUTIONS.length})
            </button>
          </div>
        </div>

        {activeOfferingTab === 'services' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HYPENSEC_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 shadow-tri-sm shadow-tri-hover"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span className="text-blue-600 font-semibold">0{index + 1}. {service.category}</span>
                  </div>
                  <h3 className="text-lg font-normal tracking-[-0.015em] text-[#1f1f1f] mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.shortSummary}
                  </p>
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Key Deliverables:</span>
                    {service.whatCustomerReceives.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectTab('services')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Inspect Full Scope</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(service.title)}
                    className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HYPENSEC_SOLUTIONS.map((sol, index) => (
              <div
                key={sol.id}
                className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 shadow-tri-sm shadow-tri-hover"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-blue-600 font-semibold">
                    Solution 0{index + 1}
                  </div>
                  <h3 className="text-xl font-normal tracking-[-0.015em] text-[#1f1f1f]">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Challenge: </strong>
                    {sol.problem}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-blue-700">HypenSec Approach: </strong>
                    {sol.hypenSecApproach}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectTab('solutions')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Explore Solution Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(sol.title)}
                    className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded transition-colors"
                  >
                    Discuss Scope
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. INTERACTIVE SAAS PLATFORM TEASER */}
      <section className="surface-tri-wash border border-slate-200/90 rounded-2xl p-6 lg:p-10 shadow-tri-lg space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b border-slate-200/80 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
              Why HypenSec: Services + Technology Working Together
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
              From Static Audit PDFs to a Living Risk Register
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Traditional security engagements end with a static spreadsheet. HypenSec pairs hands-on assessments with a continuous risk platform prototype that tracks external assets, correlates CVSS with business context, and guides engineering remediation.
            </p>
          </div>
          <button
            type="button"
            onClick={onLaunchPlatform}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-tri-sm self-start lg:self-auto"
          >
            <span>Open Full Interactive Prototype</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Finding Selector */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono text-slate-500 font-semibold uppercase mb-2">
              Select a Sample Finding to Inspect Contextual Triage:
            </div>
            {INITIAL_FINDINGS.slice(0, 4).map((finding) => {
              const isSelected = finding.id === selectedPreviewFinding.id;
              return (
                <button
                  key={finding.id}
                  type="button"
                  onClick={() => setSelectedPreviewFindingId(finding.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white border-blue-600 ring-2 ring-blue-500/15 shadow-tri-md'
                      : 'bg-white/80 border-slate-200/90 hover:border-blue-300 shadow-tri-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={finding.severity === 'critical' ? 'text-rose-600 font-bold uppercase' : 'text-amber-700 font-bold uppercase'}>
                      {finding.severity} · CVSS {finding.cvssScore}
                    </span>
                    <span className="text-slate-500">{finding.id}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">{finding.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">{finding.assetName}</div>
                </button>
              );
            })}
          </div>

          {/* Right: Finding Context & Guided Remediation Preview */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-tri-md space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
                  <span>{selectedPreviewFinding.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPreviewFinding.cveId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPreviewFinding.category}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedPreviewFinding.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                Status: {selectedPreviewFinding.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="font-mono text-[11px] text-amber-700 font-bold uppercase">Business & Exposure Context</div>
                <p className="text-slate-700 leading-relaxed">{selectedPreviewFinding.businessContext}</p>
              </div>
              <div className="p-3.5 bg-blue-50/50 border border-blue-200/80 rounded-xl space-y-1">
                <div className="font-mono text-[11px] text-blue-700 font-bold uppercase">Engineering Remediation Guidance</div>
                <p className="text-slate-700 leading-relaxed">{selectedPreviewFinding.remediationAdvice}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-mono">
              <span>Assigned Owner: <strong className="text-slate-800">{selectedPreviewFinding.assignee}</strong></span>
              <button
                type="button"
                onClick={() => onSelectTab('platform')}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <span>Explore Platform Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4-STEP METHODOLOGY */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
              Disciplined Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
              How HypenSec Operates: Discover, Assess, Prioritize, Remediate
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Aligned with OWASP, PTES, NIST CSF & CIS</span>
        </div>

        <MethodologyPipelineVisual />
      </section>

      {/* 5. BUILT FOR TECHNICAL & EXECUTIVE STAKEHOLDERS */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
              Customers & Stakeholders
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
              Built for Security Leaders and Engineering Teams
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('services')}
            className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Explore Security Services & Scopes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stakeholderCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-tri-sm shadow-tri-hover"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{card.role}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.summary}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-mono text-blue-600 font-semibold">
                  {card.focus}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="surface-tri-wash border border-slate-200/90 rounded-2xl p-8 lg:p-12 text-center shadow-tri-lg">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-blue-600 font-semibold uppercase">
            <span>Confidentiality-First Engagement</span>
            <span aria-hidden="true">·</span>
            <span>Mutual NDA Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.02em] text-[#1f1f1f] text-balance">
            Strengthen Your Security Posture with Clarity and Rigor
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Whether you need an independent penetration test for an upcoming enterprise audit, a cloud IAM architecture review, or continuous external attack surface visibility, our team is ready to scope your requirements.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all shadow-tri-sm whitespace-nowrap"
            >
              Book a Security Consultation
            </button>
            <button
              type="button"
              onClick={onLaunchPlatform}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-blue-50/50 text-slate-800 border border-slate-300 font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Explore Platform Prototype</span>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
