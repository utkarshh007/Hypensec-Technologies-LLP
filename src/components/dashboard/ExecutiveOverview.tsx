import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { SecurityFinding, SecurityAsset, calculatePostureScore } from '../../utils/securityRisk';

interface ExecutiveOverviewProps {
  findings: SecurityFinding[];
  assets: SecurityAsset[];
  onNavigateTab: (tabId: string) => void;
  onSelectFinding: (finding: SecurityFinding) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  findings,
  assets,
  onNavigateTab,
  onSelectFinding
}) => {
  const postureScore = calculatePostureScore(findings);
  const criticalCount = findings.filter(f => f.severity === 'critical' && f.status !== 'Remediated').length;
  const highCount = findings.filter(f => f.severity === 'high' && f.status !== 'Remediated').length;
  const publicAssetsCount = assets.filter(a => a.exposure === 'Public Internet').length;

  const topPriorities = findings
    .filter(f => f.status !== 'Remediated')
    .sort((a, b) => b.cvssScore - a.cvssScore)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards Strip (Tabular Figures) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Posture Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Security Posture Index</span>
            <span className="text-emerald-700 font-semibold">Target ≥ 85</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {postureScore}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+4 pts after recent patch cycles</span>
          </div>
        </div>

        {/* Critical & High Vulnerabilities */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Critical & High Exposure</span>
            <span className="text-rose-600 font-semibold">Action Required</span>
          </div>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-extrabold text-rose-600 font-mono tabular-nums">
              {criticalCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">Critical</span>
            <span className="text-2xl font-bold text-amber-600 font-mono tabular-nums ml-2">
              {highCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">High</span>
          </div>
          <div className="mt-2 text-xs text-slate-600">
            <span>Average SLA adherence: 92%</span>
          </div>
        </div>

        {/* Monitored Public Attack Surface */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Internet-Facing Assets</span>
            <span className="text-blue-600 font-semibold">Passive Recon</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {publicAssetsCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">of {assets.length} total mapped</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
            <span>AWS, Cloudflare & On-Prem ingress</span>
          </div>
        </div>

        {/* Open Remediation Tasks */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Remediation Workload</span>
            <span className="text-blue-600 font-semibold">In Progress</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {findings.filter(f => f.status === 'In Progress').length}
            </span>
            <span className="text-xs text-slate-500 font-mono">tasks assigned</span>
          </div>
          <div className="mt-2 text-xs text-slate-600">
            <span>Next review sprint: in 48 hours</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Action Queue & Asset Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Highest-Priority Risks Requiring Executive / Engineering Attention */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Highest-Priority Action Items</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ranked by real network exposure and exploit availability, not raw scanner volume.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('register')}
              className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View full register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topPriorities.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectFinding(item)}
                className="p-4 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase font-bold ${
                      item.severity === 'critical' ? 'text-rose-600' : 'text-amber-700'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs font-mono text-slate-600">{item.cveId || item.id}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs font-mono text-slate-700 tabular-nums font-semibold">CVSS {item.cvssScore}</span>
                    {item.exploitAvailable && (
                      <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-semibold">
                        Exploit Public
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{item.businessContext}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-slate-700 font-medium">{item.assignee.split(' (')[0]}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.status}</div>
                  </div>
                  <span className="px-2.5 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-medium rounded">
                    Inspect
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Environment & Exposure Breakdown */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">Environment Exposure</h3>
            <p className="text-xs text-slate-500 mt-0.5">Asset distribution by cloud host</p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Amazon Web Services (AWS)', count: 3, percentage: '38%' },
              { name: 'Cloudflare Edge CDN', count: 2, percentage: '25%' },
              { name: 'On-Premises Corporate DC', count: 2, percentage: '25%' },
              { name: 'Azure & Google Cloud', count: 1, percentage: '12%' },
            ].map((env) => (
              <div key={env.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">{env.name}</span>
                  <span className="font-mono text-slate-600 tabular-nums">{env.count} assets</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: env.percentage }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Recommended Next Action:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enforce SAML MFA on legacy perimeter VPN gateway (<span className="font-mono text-blue-600 font-semibold">AST-108</span>) to close the single critical external attack path.
            </p>
            <button
              onClick={() => onNavigateTab('remediation')}
              className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-medium rounded transition-colors"
            >
              View Remediation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
