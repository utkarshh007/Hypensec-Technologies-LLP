import React, { useState } from 'react';
import { SecurityFinding, filterFindings } from '../../utils/securityRisk';
import { Search, X, ArrowRight } from 'lucide-react';

interface RiskRegisterViewProps {
  findings: SecurityFinding[];
  onUpdateFindingStatus: (id: string, newStatus: SecurityFinding['status']) => void;
  selectedFindingFromParent?: SecurityFinding | null;
  onClearSelectedFinding?: () => void;
  onCreateRemediationTask: (finding: SecurityFinding) => void;
}

export const RiskRegisterView: React.FC<RiskRegisterViewProps> = ({
  findings,
  onUpdateFindingStatus,
  selectedFindingFromParent,
  onClearSelectedFinding,
  onCreateRemediationTask
}) => {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeModalFinding, setActiveModalFinding] = useState<SecurityFinding | null>(selectedFindingFromParent || null);

  React.useEffect(() => {
    if (selectedFindingFromParent) {
      setActiveModalFinding(selectedFindingFromParent);
    }
  }, [selectedFindingFromParent]);

  const filtered = filterFindings(findings, search, severityFilter).filter(f => {
    if (statusFilter === 'all') return true;
    return f.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleCloseModal = () => {
    setActiveModalFinding(null);
    if (onClearSelectedFinding) onClearSelectedFinding();
  };

  const handleStatusChange = (status: SecurityFinding['status']) => {
    if (activeModalFinding) {
      onUpdateFindingStatus(activeModalFinding.id, status);
      setActiveModalFinding({ ...activeModalFinding, status });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search findings by CVE, title, host, or assignee..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Severity selector */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Status selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="review">Review</option>
            <option value="remediated">Remediated</option>
            <option value="accepted risk">Accepted Risk</option>
          </select>
        </div>
      </div>

      {/* Findings Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-600">
            Displaying <span className="text-slate-900 font-bold tabular-nums">{filtered.length}</span> security records
          </span>
          <span className="text-[11px] font-mono text-slate-500">Contextual CVSS Ranking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Severity / Score</th>
                <th className="py-3 px-4">Vulnerability Finding</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">Environment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No findings matched your filter parameters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setActiveModalFinding(item)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className={`text-[10px] uppercase font-bold ${
                          item.severity === 'critical' ? 'text-rose-600' :
                          item.severity === 'high' ? 'text-amber-700' :
                          item.severity === 'medium' ? 'text-blue-600' : 'text-slate-600'
                        }`}>
                          {item.severity}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-900 tabular-nums font-bold">{item.cvssScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {item.cveId || item.id}
                        {item.exploitAvailable && (
                          <span className="ml-2 text-rose-600 font-semibold">· Exploit Available</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">{item.assetName}</td>
                    <td className="py-3 px-4 text-slate-600">{item.environment}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                        item.status === 'Remediated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        item.status === 'Review' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        item.status === 'Accepted Risk' ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.assignee.split(' (')[0]}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalFinding(item);
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

      {/* Finding Detail & Status Management Modal */}
      {activeModalFinding && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-xl p-6 sm:p-8 text-slate-900 max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono mb-1">
                <span className={`uppercase font-bold ${
                  activeModalFinding.severity === 'critical' ? 'text-rose-600' : 'text-amber-700'
                }`}>
                  {activeModalFinding.severity} Priority
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-mono">CVSS {activeModalFinding.cvssScore}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">{activeModalFinding.cveId || activeModalFinding.id}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug">{activeModalFinding.title}</h3>
            </div>

            {/* Structured Details Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div>
                <span className="text-slate-500 font-mono block">Target Host:</span>
                <span className="font-mono text-blue-600 font-bold">{activeModalFinding.assetName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Environment:</span>
                <span className="text-slate-900 font-bold">{activeModalFinding.environment}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Owner:</span>
                <span className="text-slate-900 font-bold">{activeModalFinding.assignee}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono block">Status:</span>
                <span className="text-slate-900 font-bold">{activeModalFinding.status}</span>
              </div>
            </div>

            {/* Business Context */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-amber-700 uppercase tracking-wider font-bold">
                Business & Operational Risk Context
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {activeModalFinding.businessContext}
              </p>
            </div>

            {/* Tailored Remediation Advice */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-blue-600 uppercase tracking-wider font-bold">
                Prescriptive Engineering Remediation
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {activeModalFinding.remediationAdvice}
              </p>
            </div>

            {/* Interactive Status Changer (Updates Real State) */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider">
                Update Workflow Status:
              </h4>
              <div className="flex flex-wrap gap-2">
                {(['Open', 'In Progress', 'Review', 'Remediated', 'Accepted Risk'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeModalFinding.status === status
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  onCreateRemediationTask(activeModalFinding);
                  handleCloseModal();
                }}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Link to Remediation Task Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded transition-colors"
              >
                Close Finding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
