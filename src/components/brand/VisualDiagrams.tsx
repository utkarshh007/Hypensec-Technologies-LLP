import React, { useState } from 'react';
import { Globe, Layers, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const AttackSurfaceMeshDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(1);

  const nodes = [
    {
      id: 0,
      title: '1. Asset Discovery',
      icon: Globe,
      desc: 'Continuous passive reconnaissance across DNS, subdomains, cloud workloads, and public APIs.',
      metric: '142 Public Assets Mapped',
      detail: 'Identifies shadow IT, forgotten staging endpoints, and exposed infrastructure without requiring agent deployment.'
    },
    {
      id: 1,
      title: '2. Contextual Triage',
      icon: Layers,
      desc: 'Correlates CVEs with real network reachability, exploit maturity, and business asset tiering.',
      metric: '3 Critical Paths Isolated',
      detail: 'Filters out 85% of low-impact scanner noise by distinguishing internal development flaws from public Tier-1 risks.'
    },
    {
      id: 2,
      title: '3. Guided Remediation',
      icon: AlertTriangle,
      desc: 'Assigns clear engineering ownership, patch verification steps, and SLA tracking.',
      metric: '4.2d Mean Time to Fix',
      detail: 'Delivers developer-ready reproduction steps and configuration fixes rather than 400-page generic PDF dumps.'
    },
    {
      id: 3,
      title: '4. Continuous Assurance',
      icon: CheckCircle2,
      desc: 'Automated re-verification and executive posture reporting aligned to SOC 2, ISO 27001, and NIST.',
      metric: '100% Patch Retest Verified',
      detail: 'Confirms vulnerabilities remain closed across subsequent releases and generates board-ready compliance evidence.'
    }
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-tri-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
            Interactive Architecture Overview
          </span>
          <h3 className="text-xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
            Continuous Exposure & Risk Prioritization Loop
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Click any phase to inspect operational workflow
        </span>
      </div>

      {/* Interactive 4-Step Pipeline Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNode(node.id)}
              className={`p-4 rounded-xl text-left transition-all border relative ${
                isActive
                  ? 'surface-tri-wash border-blue-600 ring-2 ring-blue-500/15 shadow-tri-md'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-tri-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {index < nodes.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden lg:block" />
                )}
              </div>
              <div className="text-sm font-semibold text-slate-900">{node.title}</div>
              <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{node.desc}</div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-blue-600 font-semibold">
                {node.metric}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual SVG Telemetry Diagram + Active Node Detail */}
      <div className="surface-tri-wash border border-slate-200/80 rounded-xl p-5 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Vector Topology Diagram */}
          <div className="lg:col-span-7">
            <svg viewBox="0 0 540 200" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="meshBg" x1="0" y1="0" x2="540" y2="200" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#F0F9FF" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.65" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="70" y1="100" x2="470" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <rect width="540" height="200" rx="12" fill="url(#meshBg)" stroke="#E2E8F0" />

              {/* Connection conduits */}
              <path d="M 85 100 C 145 100, 155 55, 215 55 C 275 55, 295 100, 355 100 L 455 100" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M 85 100 C 145 100, 155 145, 215 145 C 275 145, 295 100, 355 100" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Node 1: Perimeter */}
              <circle cx="85" cy="100" r="24" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
              <circle cx="85" cy="100" r="10" fill="#DBEAFE" />
              <text x="85" y="142" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="600">External Surface</text>

              {/* Node 2A: Cloud/API */}
              <circle cx="215" cy="55" r="20" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
              <text x="215" y="59" textAnchor="middle" fill="#0369A1" fontSize="9" fontWeight="700">CVSS+Ctx</text>
              <text x="215" y="90" textAnchor="middle" fill="#334155" fontSize="9.5" fontWeight="600">Priority Path</text>

              {/* Node 2B: Filtered Noise */}
              <circle cx="215" cy="145" r="18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="215" y="148" textAnchor="middle" fill="#64748B" fontSize="8.5" fontWeight="500">Filtered</text>
              <text x="215" y="177" textAnchor="middle" fill="#64748B" fontSize="9">Low-Impact Noise</text>

              {/* Node 3: Triage Engine */}
              <rect x="325" y="76" width="64" height="48" rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
              <text x="357" y="98" textAnchor="middle" fill="#1D4ED8" fontSize="9.5" fontWeight="700">TRIAGE</text>
              <text x="357" y="111" textAnchor="middle" fill="#2563EB" fontSize="8.5" fontWeight="600">SLA Queue</text>

              {/* Node 4: Verified Posture */}
              <circle cx="455" cy="100" r="24" fill="#FFFFFF" stroke="#059669" strokeWidth="2.5" />
              <path d="M448 100 L453 105 L463 95" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="455" y="142" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="600">Verified Fix</text>
            </svg>
          </div>

          {/* Active Step Detail Readout */}
          <div className="lg:col-span-5 bg-white/95 border border-slate-200/90 rounded-xl p-5 shadow-tri-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-600 font-semibold uppercase">
                Active Stage Focus
              </span>
              <span className="text-xs font-mono text-slate-600 font-bold">
                {nodes[activeNode].metric}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {nodes[activeNode].title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {nodes[activeNode].detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MethodologyPipelineVisual: React.FC = () => {
  const steps = [
    {
      num: '01',
      phase: 'Discover',
      subtitle: 'Map External & Cloud Assets',
      points: ['Subdomain & DNS enumeration', 'Public API & cloud bucket indexing', 'Shadow IT & unmanaged host detection']
    },
    {
      num: '02',
      phase: 'Assess',
      subtitle: 'Validate Real Exploitability',
      points: ['Manual penetration testing (OWASP/PTES)', 'Cloud IAM & Kubernetes configuration review', 'Chained attack path verification']
    },
    {
      num: '03',
      phase: 'Prioritize',
      subtitle: 'Apply Business Context',
      points: ['CVSS weighted by internet exposure', 'Asset criticality tiering (Tier 1–3)', 'False-positive suppression before handoff']
    },
    {
      num: '04',
      phase: 'Remediate',
      subtitle: 'Verify & Sustain Posture',
      points: ['Stack-specific code & IaC guidance', 'Direct engineering debrief sessions', 'Complimentary re-testing & audit sign-off']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map((step) => (
        <div
          key={step.num}
          className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-tri-sm shadow-tri-hover"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span className="text-blue-600 font-bold">PHASE {step.num}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">Continuous Loop</span>
            </div>
            <h3 className="text-xl font-normal tracking-[-0.02em] text-[#1f1f1f]">
              {step.phase}
            </h3>
            <p className="text-xs font-semibold text-blue-600 mt-1 mb-4">
              {step.subtitle}
            </p>
            <ul className="space-y-2 border-t border-slate-100 pt-3">
              {step.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
