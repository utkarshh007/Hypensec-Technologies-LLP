import React, { useState } from 'react';
import { SecurityAsset, SecurityFinding } from '../../utils/securityRisk';
import { Search, ShieldAlert, X } from 'lucide-react';

interface AttackSurfaceViewProps {
  assets: SecurityAsset[];
  findings: SecurityFinding[];
  onSelectFinding: (finding: SecurityFinding) => void;
}

export const AttackSurfaceView: React.FC<AttackSurfaceViewProps> = ({
  assets,
  findings,
  onSelectFinding
}) => {
  const [search, setSearch] = useState('');
  const [selectedEnv, setSelectedEnv] = useState<string>('all');
  const [selectedExposure, setSelectedExposure] = useState<string>('all');
  const [inspectedAsset, setInspectedAsset] = useState<SecurityAsset | null>(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = !search ||
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.owner.toLowerCase().includes(search.toLowerCase()) ||
      asset.type.toLowerCase().includes(search.toLowerCase());

    const matchesEnv = selectedEnv === 'all' || asset.environment.toLowerCase() === selectedEnv.toLowerCase();
    const matchesExposure = selectedExposure === 'all' || asset.exposure.toLowerCase() === selectedExposure.toLowerCase();

    return matchesSearch && matchesEnv && matchesExposure;
  });

  const getAssetFindings = (assetId: string) => {
    return findings.filter((f) => f.assetId === assetId);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search & Multi-segment Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets by hostname, type, or owner..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Environment Selector */}
          <select
            value={selectedEnv}
            onChange={(e) => setSelectedEnv(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Environments</option>
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="gcp">GCP</option>
            <option value="cloudflare">Cloudflare</option>
            <option value="on-prem">On-Premises</option>
          </select>

          {/* Exposure Selector */}
          <select
            value={selectedExposure}
            onChange={(e) => setSelectedExposure(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Exposures</option>
            <option value="public internet">Public Internet</option>
            <option value="internal vpc">Internal VPC</option>
            <option value="partner extranet">Partner Extranet</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-600">
            Showing <span className="text-slate-900 font-bold tabular-nums">{filteredAssets.length}</span> of <span className="tabular-nums">{assets.length}</span> cataloged assets
          </div>
          <span className="text-[11px] font-mono text-slate-500">Autonomous Sensor Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Asset / Hostname</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Environment</th>
                <th className="py-3 px-4">Exposure Level</th>
                <th className="py-3 px-4">Criticality Tier</th>
                <th className="py-3 px-4">Open Risks</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No assets matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    onClick={() => setInspectedAsset(asset)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono text-blue-600 font-bold">{asset.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{asset.id}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{asset.type}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-slate-700">{asset.environment}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono text-[11px] ${
                        asset.exposure === 'Public Internet' ? 'text-amber-700 font-semibold' : 'text-slate-600'
                      }`}>
                        {asset.exposure}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-mono text-[11px]">
                      {asset.criticality.split(' - ')[0]}
                    </td>
                    <td className="py-3 px-4">
                      {asset.openFindingsCount > 0 ? (
                        <span className="inline-flex items-center gap-1 font-mono text-rose-600 font-bold tabular-nums">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{asset.openFindingsCount} finding{asset.openFindingsCount > 1 ? 's' : ''}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-slate-500">None detected</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{asset.owner}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedAsset(asset);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-medium text-xs rounded transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Inspection Drawer / Modal */}
      {inspectedAsset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl bg-white border border-slate-200 shadow-2xl rounded-xl p-6 text-slate-900 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setInspectedAsset(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Asset Specification</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-mono">{inspectedAsset.name}</h3>
              <p className="text-xs text-slate-500 mt-1">ID: {inspectedAsset.id} · Scanned {inspectedAsset.lastScanned}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs mb-6">
              <div>
                <span className="text-slate-500 font-mono block">Environment:</span>
                <span className="text-slate-900 font-bold">{inspectedAsset.environment}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Asset Type:</span>
                <span className="text-slate-900 font-bold">{inspectedAsset.type}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Network Exposure:</span>
                <span className={inspectedAsset.exposure === 'Public Internet' ? 'text-amber-700 font-bold' : 'text-slate-900 font-bold'}>
                  {inspectedAsset.exposure}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Criticality Tier:</span>
                <span className="text-slate-900 font-bold">{inspectedAsset.criticality}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-mono block">Designated Engineering Owner:</span>
                <span className="text-slate-900 font-bold">{inspectedAsset.owner}</span>
              </div>
            </div>

            {/* Correlated Findings */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase mb-2">
                Correlated Vulnerabilities & Findings ({getAssetFindings(inspectedAsset.id).length})
              </h4>
              <div className="space-y-2">
                {getAssetFindings(inspectedAsset.id).length === 0 ? (
                  <p className="text-xs text-slate-500 p-3 bg-slate-50 rounded border border-slate-200">
                    No active vulnerabilities currently associated with this asset.
                  </p>
                ) : (
                  getAssetFindings(inspectedAsset.id).map((f) => (
                    <div
                      key={f.id}
                      onClick={() => {
                        setInspectedAsset(null);
                        onSelectFinding(f);
                      }}
                      className="p-3 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-mono font-bold uppercase text-[10px] ${
                          f.severity === 'critical' ? 'text-rose-600' : 'text-amber-700'
                        }`}>
                          {f.severity} · CVSS {f.cvssScore}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{f.status}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">{f.title}</div>
                      <div className="text-[11px] text-slate-600 mt-1 line-clamp-1">{f.businessContext}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setInspectedAsset(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
