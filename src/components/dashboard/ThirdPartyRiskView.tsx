import React, { useState } from 'react';
import { SAMPLE_VENDORS, VendorRiskRecord } from '../../data/mockSecurityData';
import { X } from 'lucide-react';

export const ThirdPartyRiskView: React.FC = () => {
  const [vendors, setVendors] = useState<VendorRiskRecord[]>(SAMPLE_VENDORS);
  const [search, setSearch] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<VendorRiskRecord | null>(null);

  const filtered = vendors.filter((v) =>
    !search ||
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.serviceCategory.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = (id: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, soc2Status: 'Current (Valid)', lastAssessmentDate: 'Today' } : v))
    );
    if (selectedVendor && selectedVendor.id === id) {
      setSelectedVendor({ ...selectedVendor, soc2Status: 'Current (Valid)', lastAssessmentDate: 'Today' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Third-Party & Vendor Security Portfolio</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            SaaS dependencies, security attestation status, and external signal monitoring.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>{vendor.id}</span>
                <span className={vendor.criticality === 'Tier 1' ? 'text-amber-700 font-bold' : 'text-slate-600'}>
                  {vendor.criticality} Dependency
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{vendor.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{vendor.serviceCategory}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">SOC 2 Type II:</span>
                  <span className={`font-mono text-[11px] ${
                    vendor.soc2Status === 'Current (Valid)' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'
                  }`}>
                    {vendor.soc2Status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">ISO 27001:</span>
                  <span className="font-mono text-[11px] text-slate-800 font-medium">
                    {vendor.iso27001Status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Threat Exposure Signal:</span>
                  <span className={`font-mono text-[11px] font-bold ${
                    vendor.publicExposureSignal === 'Low Risk' ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {vendor.publicExposureSignal}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 font-mono">Reviewed: {vendor.lastAssessmentDate}</span>
              <button
                onClick={() => setSelectedVendor(vendor)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-blue-600 font-semibold text-xs rounded transition-colors"
              >
                Inspect Audit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Audit Inspection Modal */}
      {selectedVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-xl p-6 text-slate-900 space-y-5">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-blue-600 font-semibold uppercase">Vendor Security Audit Record</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedVendor.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedVendor.serviceCategory}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 font-mono">Audit Cadence:</span>
                <span className="text-slate-900 font-semibold">Annual Recertification</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-mono">Next Formal Review:</span>
                <span className="font-mono text-amber-700 font-bold">{selectedVendor.nextReviewDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-mono">Current Attestation:</span>
                <span className="text-slate-900 font-bold">{selectedVendor.soc2Status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase">Vendor Threat Intelligence Feed:</h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                No active compromise indicators or leaked service credentials detected across monitored external threat feeds for {selectedVendor.name}.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              {selectedVendor.soc2Status !== 'Current (Valid)' ? (
                <button
                  onClick={() => handleUpdateStatus(selectedVendor.id)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded transition-colors"
                >
                  Mark Questionnaire Approved
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-700 font-bold">✓ Compliance Status Verified</span>
              )}
              <button
                onClick={() => setSelectedVendor(null)}
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
