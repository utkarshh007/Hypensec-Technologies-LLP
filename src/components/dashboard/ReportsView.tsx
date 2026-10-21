import React, { useState } from 'react';
import { FileText, Download, CheckCircle, X } from 'lucide-react';
import { calculatePostureScore, SecurityFinding } from '../../utils/securityRisk';

interface ReportsViewProps {
  findings: SecurityFinding[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ findings }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [dateRange, setDateRange] = useState('last-30');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any | null>(null);
  const [downloadToast, setDownloadToast] = useState(false);

  const postureScore = calculatePostureScore(findings);

  const templates = [
    {
      id: 'executive',
      title: 'Executive Posture Brief',
      format: 'PDF',
      desc: 'High-level synthesis of external exposure, posture index trends, and open critical risks tailored for board and C-level audiences.'
    },
    {
      id: 'vapt',
      title: 'Technical Penetration Testing Deliverable',
      format: 'PDF & JSON',
      desc: 'Exhaustive vulnerability dossiers, reproduction steps, HTTP request/response proofs, and engineering fix advisories.'
    },
    {
      id: 'easm',
      title: 'External Attack Surface Delta Report',
      format: 'CSV & PDF',
      desc: 'Catalog of newly discovered subdomains, certificates, open ports, and decommissioned assets over the reporting cycle.'
    },
    {
      id: 'grc',
      title: 'SOC 2 & ISO 27001 Audit Evidence Packet',
      format: 'ZIP (Evidence Bundle)',
      desc: 'Remediation timelines, SLA compliance records, and vulnerability re-test verification stamps for third-party auditors.'
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        title: templates.find(t => t.id === selectedTemplate)?.title,
        dateGenerated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        postureScore,
        activeFindingsCount: findings.filter(f => f.status !== 'Remediated').length,
        criticalCount: findings.filter(f => f.severity === 'critical' && f.status !== 'Remediated').length,
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-900">Security & Compliance Report Generation</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate formal audit, executive, or technical reporting packages. Demo interface.
        </p>
      </div>

      {downloadToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center justify-between">
          <span>Simulated report export completed successfully.</span>
          <button onClick={() => setDownloadToast(false)} className="text-emerald-700 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Template Selector */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider block">
            Select Report Template
          </span>

          <div className="space-y-3">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600 ring-1 ring-blue-600/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      {tpl.title}
                    </h4>
                    <span className="text-[10px] font-mono text-blue-700 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {tpl.format}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{tpl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Configuration & Trigger */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-2xs">
          <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider block">
            Report Parameters
          </span>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Audit Timeframe</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="last-7">Last 7 Days (Sprint Review)</option>
                <option value="last-30">Last 30 Days (Monthly Posture)</option>
                <option value="last-90">Last Quarter (Q3 2026 Audit Period)</option>
                <option value="ytd">Year-to-Date (Cumulative)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Classification Notice</label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600 font-mono text-[11px]">
                CONFIDENTIAL — STRICTLY FOR AUTHORIZED CLIENT STAKEHOLDERS
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {isGenerating ? (
                  <span>Synthesizing Report Metrics...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Compile & Preview Deliverable</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Report Preview Modal */}
      {generatedReport && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl bg-white border border-slate-200 shadow-2xl rounded-xl p-6 text-slate-900 space-y-5">
            <button
              onClick={() => setGeneratedReport(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold mb-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Compilation Complete · Demo Preview</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{generatedReport.title}</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">Generated: {generatedReport.dateGenerated}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-600">Recorded Posture Index:</span>
                <span className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                  {generatedReport.postureScore} / 100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Unresolved Findings:</span>
                <span className="font-mono text-slate-900 tabular-nums font-bold">
                  {generatedReport.activeFindingsCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Critical SLA Items:</span>
                <span className="font-mono text-rose-600 tabular-nums font-bold">
                  {generatedReport.criticalCount}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This preview reflects current live application state. In the production deployment, reports are signed with cryptographic checksums and stored securely.
            </p>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setGeneratedReport(null);
                  setDownloadToast(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sample Export</span>
              </button>
              <button
                onClick={() => setGeneratedReport(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
