import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_VERIFICATION_PLACEHOLDERS } from '../../data/mockSecurityData';

interface AboutViewProps {
  onOpenConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenConsultation }) => {
  const principles = [
    {
      title: 'Evidence Over Assumptions',
      desc: 'We do not report theoretical vulnerabilities without establishing whether an attack vector is realistically reachable and exploitable in your specific operational context.'
    },
    {
      title: 'Clarity Over Panic',
      desc: 'We avoid alarmist headlines and inflated severity scores. Security leaders need sober risk context to make sound engineering and budget allocations.'
    },
    {
      title: 'Practical, Engineering-Ready Remediation',
      desc: 'Our work is not complete when a flaw is found. We partner with development and platform teams to design actionable fixes that preserve system reliability.'
    },
    {
      title: 'Continuous Rigor, Not Point-in-Time Illusions',
      desc: 'Modern cloud infrastructure changes continuously. We advocate combining recurring manual penetration testing with continuous passive attack surface visibility.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
          <span>About HypenSec Technologies</span>
          <span aria-hidden="true">·</span>
          <span>Mission & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
          Grounding Cybersecurity in Clarity, Rigor, and Practical Outcomes
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          HypenSec Technologies was founded on a simple premise: organizations do not lack security alerts—they lack the clarity and context required to act on the risks that actually matter.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-tri-md">
          <div>
            <span className="text-xs font-mono text-blue-600 font-medium uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1 mb-4">
              A Dedicated Security Partner for Continuous Resilience
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We serve as an external security ally to CISOs, security directors, and engineering leaders. We combine deep offensive penetration testing methodology with automated external reconnaissance to uncover blind spots before malicious actors exploit them.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe effective security does not hinder development velocity—it enables fast-moving organizations to deploy software and scale infrastructure with confidence.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dedicated technical engagement · Zero generic copy-paste reports</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-tri-md">
          <div>
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">Core Working Principles</span>
            <div className="mt-4 space-y-4">
              {principles.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-600">0{idx + 1}.</span>
                    <span>{p.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Placeholder & Operational Disclosure Section */}
      <div className="surface-tri-wash border border-slate-200/90 rounded-2xl p-6 lg:p-8 space-y-6 shadow-tri-lg">
        <div>
          <span className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Corporate Transparency & Verification Disclosure</span>
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Confirmed Information & Operational Boundaries
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            In compliance with strict factual integrity, HypenSec Technologies does not invent unverified historical accolades, arbitrary customer logos, or unconfirmed geographic branches on public marketing materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white/95 border border-slate-200/90 rounded-xl space-y-1 shadow-tri-sm">
            <div className="font-bold text-slate-900">Office & Service Locations:</div>
            <p className="text-slate-600">
              {COMPANY_VERIFICATION_PLACEHOLDERS.headquarters}
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              Engagements are conducted remotely across North America, Europe, and international time zones.
            </p>
          </div>

          <div className="p-4 bg-white/95 border border-slate-200/90 rounded-xl space-y-1 shadow-tri-sm">
            <div className="font-bold text-slate-900">Certifications & Standards:</div>
            <p className="text-slate-600">
              {COMPANY_VERIFICATION_PLACEHOLDERS.certificationsNotice}
            </p>
          </div>

          <div className="p-4 bg-white/95 border border-slate-200/90 rounded-xl space-y-1 shadow-tri-sm">
            <div className="font-bold text-slate-900">Client Confidentiality & References:</div>
            <p className="text-slate-600">
              {COMPANY_VERIFICATION_PLACEHOLDERS.clientReferencesNotice}
            </p>
          </div>

          <div className="p-4 bg-white/95 border border-slate-200/90 rounded-xl space-y-1 shadow-tri-sm">
            <div className="font-bold text-slate-900">Direct Contact & Operating Hours:</div>
            <p className="text-slate-600">
              {COMPANY_VERIFICATION_PLACEHOLDERS.contactEmail} · {COMPANY_VERIFICATION_PLACEHOLDERS.inquiryHours}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-all whitespace-nowrap shadow-tri-sm"
          >
            Request Official Scoping Brief
          </button>
        </div>
      </div>
    </div>
  );
};
