import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [savedNotification, setSavedNotification] = useState(false);

  const [members] = useState([
    { id: '1', name: 'Rachel Sterling', email: 'rachel.s@organization.com', role: 'CISO / Security Director', status: 'Active' },
    { id: '2', name: 'Marcus Brody', email: 'marcus.b@organization.com', role: 'DevOps / Platform Lead', status: 'Active' },
    { id: '3', name: 'Elena Rostova', email: 'elena.r@organization.com', role: 'Lead Application Security', status: 'Active' },
    { id: '4', name: 'David Vance', email: 'david.v@organization.com', role: 'Corporate IT Admin', status: 'Active' },
    { id: '5', name: 'External Auditor', email: 'audit-partner@advisory.com', role: 'Read-Only Compliance Reviewer', status: 'Active' }
  ]);

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    weeklyDigest: true,
    slaWarnings: true,
    assetDiscoveryNotice: false,
  });

  const handleSavePreferences = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-900">Organization & Platform Settings</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage tenant profile, role-based access control (RBAC), and alert preferences.
        </p>
      </div>

      {/* Organization Profile */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <h4 className="text-sm font-bold text-slate-900">Organization Profile</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Company / Tenant Name</label>
            <input
              type="text"
              readOnly
              value="HypenSec Technologies (Prototype Demo Environment)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Assigned Security Tier</label>
            <input
              type="text"
              readOnly
              value="Enterprise Continuous Monitoring"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Designated Security Contact</label>
            <input
              type="email"
              readOnly
              value="security-contact@hypensec.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Discovery Scope CIDRs / Domains</label>
            <input
              type="text"
              readOnly
              value="*.hypensec-demo.net, 198.51.100.0/24"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Team & Roles */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">Team Members & Permissions (RBAC)</h4>
          <span className="text-xs text-slate-500 font-mono">{members.length} Users Enrolled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Member</th>
                <th className="py-2.5 px-3">Assigned Role</th>
                <th className="py-2.5 px-3">Access Level</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900">{m.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{m.email}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-800">{m.role}</td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {m.role.includes('Reviewer') ? 'Read-Only' : 'Full Admin & Remediation'}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <h4 className="text-sm font-bold text-slate-900">Alert & Notification Routing</h4>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
            <div>
              <div className="font-bold text-slate-900">Critical Severity Instant Alerts</div>
              <div className="text-slate-600 text-[11px]">Send immediate email and webhook notifications when a Critical CVSS 9.0+ vulnerability is verified.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.criticalAlerts}
              onChange={(e) => setNotifications({ ...notifications, criticalAlerts: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
            <div>
              <div className="font-bold text-slate-900">Remediation SLA Escalation Warning</div>
              <div className="text-slate-600 text-[11px]">Notify assignees and security leadership 24 hours prior to SLA due date expiration.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.slaWarnings}
              onChange={(e) => setNotifications({ ...notifications, slaWarnings: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
            <div>
              <div className="font-bold text-slate-900">Weekly Executive Posture Briefing</div>
              <div className="text-slate-600 text-[11px]">Deliver summary email with calculated posture trend and open risk changes every Monday morning.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {savedNotification ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedNotification ? 'Preferences Saved' : 'Save Notification Preferences'}</span>
          </button>
          {savedNotification && (
            <span className="text-xs text-emerald-700 font-mono font-semibold">Updated successfully</span>
          )}
        </div>
      </div>
    </div>
  );
};
