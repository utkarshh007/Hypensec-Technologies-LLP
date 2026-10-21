import React from 'react';
import { Logo } from '../brand/Logo';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenConsultation: () => void;
  onLaunchPlatform: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenConsultation,
  onLaunchPlatform
}) => {
  const [showDeploymentGuide, setShowDeploymentGuide] = React.useState(false);
  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-slate-200/80 text-slate-600 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showSubtitle={true} />
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              HypenSec Technologies provides specialized cybersecurity services and continuous risk prioritization technology—helping organizations uncover real exposure and strengthen resilience.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1 font-mono">
              <div>Inquiries: contact@hypensec.com</div>
              <div>Engagement Model: Mutual NDA · Remote & Global Delivery</div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-mono mb-3">
              Security Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Vulnerability Assessment & Pen Testing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Cloud & Application Security
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Attack Surface & Threat Monitoring
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  SecOps & Incident Readiness
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Governance, Risk & Compliance (GRC)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Virtual CISO & Security Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions Column */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-mono mb-3">
              Platform & Solutions
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onLaunchPlatform} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-left flex items-center gap-1">
                  <span>Launch Interactive Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('platform')} className="hover:text-blue-600 transition-colors text-left">
                  Continuous Risk Platform
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solutions')} className="hover:text-blue-600 transition-colors text-left">
                  External Attack Surface Visibility
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solutions')} className="hover:text-blue-600 transition-colors text-left">
                  Cloud & Kubernetes Hardening
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solutions')} className="hover:text-blue-600 transition-colors text-left">
                  Vulnerability Prioritization
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solutions')} className="hover:text-blue-600 transition-colors text-left">
                  Audit & Compliance Readiness
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Resources Column */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-mono mb-3">
              Resources & Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-blue-600 transition-colors text-left">
                  Specialized Security Services
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('resources')} className="hover:text-blue-600 transition-colors text-left">
                  Security Guides & Advisories
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-blue-600 transition-colors text-left">
                  About HypenSec Technologies
                </button>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-blue-600 transition-colors text-left">
                  Book Security Consultation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Compliance & Disclaimer notice */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-slate-700 font-medium">
              © {new Date().getFullYear()} HypenSec Technologies. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Notice: The interactive platform prototype uses deterministic sample data for demonstration purposes.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <button
              onClick={() => setShowDeploymentGuide(true)}
              className="text-blue-600 hover:text-blue-700 font-mono font-medium transition-colors underline underline-offset-2"
            >
              Production Handoff & SEO Guide
            </button>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Confidentiality & NDA</span>
          </div>
        </div>
      </div>

      {/* Production & SEO Handoff Checklist Modal */}
      {showDeploymentGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs text-slate-900"
        >
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Live Production Handoff</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">HypenSec Deployment Checklist</h3>
              </div>
              <button
                onClick={() => setShowDeploymentGuide(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When transitioning this application from prototype to live production at <code className="text-blue-600 font-mono font-semibold">hypensec.com</code>, provide the following confirmed details to replace initial placeholders:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">1. Corporate Registry & Official Addresses</div>
                <p className="text-slate-600">
                  Update <code className="text-blue-600 font-mono">COMPANY_VERIFICATION_PLACEHOLDERS.headquarters</code> with registered corporate headquarters and active regional delivery centers.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">2. Confirmed Accreditations & Member Badges</div>
                <p className="text-slate-600">
                  Insert verified testing credentials (e.g. CREST, OSCP, CISSP, ISO/IEC 27001 Lead Auditor) and specific formal certifications into the About and Service scope agreements.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">3. Verified Case Studies & Customer Proof</div>
                <p className="text-slate-600">
                  Add approved customer quotes and quantified ROI metrics once mutual consent and NDA clearances are executed.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">4. Google Search Console & Analytics IDs</div>
                <p className="text-slate-600">
                  Embed Google Search Console verification meta tag (<code className="text-blue-600 font-mono">google-site-verification</code>) in <code className="text-blue-600 font-mono">index.html</code> and configure privacy-first analytics.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">5. Continuous Threat Feed & Scanner API Connectors</div>
                <p className="text-slate-600">
                  Connect live attack surface sensor integrations in <code className="text-blue-600 font-mono">DashboardLayout.tsx</code> to your production backend API.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDeploymentGuide(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
              >
                Close Handoff Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
