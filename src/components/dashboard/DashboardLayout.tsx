import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import {
  BarChart3,
  Layers,
  AlertTriangle,
  Workflow,
  ShieldCheck,
  FileText,
  Settings,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { ExecutiveOverview } from './ExecutiveOverview';
import { AttackSurfaceView } from './AttackSurfaceView';
import { RiskRegisterView } from './RiskRegisterView';
import { RemediationView } from './RemediationView';
import { ThirdPartyRiskView } from './ThirdPartyRiskView';
import { ReportsView } from './ReportsView';
import { SettingsView } from './SettingsView';
import {
  SAMPLE_ASSETS,
  INITIAL_FINDINGS,
  INITIAL_REMEDIATION_TASKS,
  RemediationTask
} from '../../data/mockSecurityData';
import { SecurityFinding } from '../../utils/securityRisk';

interface DashboardLayoutProps {
  onExitToWebsite: () => void;
  onOpenConsultation: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onExitToWebsite,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userRole, setUserRole] = useState<'CISO' | 'SecOps Lead' | 'GRC Auditor'>('CISO');
  
  // Dynamic SaaS State
  const [findings, setFindings] = useState<SecurityFinding[]>(INITIAL_FINDINGS);
  const [assets] = useState(SAMPLE_ASSETS);
  const [tasks, setTasks] = useState<RemediationTask[]>(INITIAL_REMEDIATION_TASKS);
  const [selectedFinding, setSelectedFinding] = useState<SecurityFinding | null>(null);

  const handleUpdateFindingStatus = (id: string, newStatus: SecurityFinding['status']) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    );
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: RemediationTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddTask = (newTask: Omit<RemediationTask, 'id'>) => {
    const id = `REM-${300 + tasks.length + 1}`;
    setTasks((prev) => [...prev, { ...newTask, id }]);
  };

  const handleCreateRemediationFromFinding = (finding: SecurityFinding) => {
    const newTask: Omit<RemediationTask, 'id'> = {
      findingId: finding.id,
      title: `Remediate ${finding.title}`,
      severity: finding.severity === 'informational' ? 'low' : finding.severity,
      assignee: finding.assignee.split(' (')[0] || 'Unassigned Lead',
      dueDate: '2026-10-30',
      status: 'Backlog',
      notes: `Generated from Risk Register. Priority advice: ${finding.remediationAdvice}`
    };
    handleAddTask(newTask);
    setActiveTab('remediation');
  };

  const navMenuItems = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'surface', label: 'Attack Surface (EASM)', icon: Layers },
    { id: 'register', label: 'Risk Register', icon: AlertTriangle },
    { id: 'remediation', label: 'Remediation Workflow', icon: Workflow },
    { id: 'third-party', label: 'Third-Party Risk', icon: ShieldCheck },
    { id: 'reports', label: 'Reports Studio', icon: FileText },
    { id: 'settings', label: 'Settings & Scope', icon: Settings },
  ];

  const currentTabLabel = navMenuItems.find((i) => i.id === activeTab)?.label || 'Overview';

  return (
    <div className="min-h-screen theme-aura-canvas text-slate-900 flex flex-col relative">
      {/* Top Demo Banner */}
      <div className="surface-tri-wash border-b border-slate-200/90 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-700 relative z-20 shadow-tri-sm">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded uppercase">
            Platform Prototype Demo
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Interactive SaaS Risk Workspace loaded with realistic sample environment data.
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Persona lens selector */}
          <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
            <span className="text-slate-500">Role Lens:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as any)}
              className="bg-white border border-slate-300 text-blue-700 font-semibold px-2 py-0.5 rounded text-xs focus:outline-none"
            >
              <option value="CISO">CISO / Executive</option>
              <option value="SecOps Lead">SecOps Engineer</option>
              <option value="GRC Auditor">GRC / Compliance Lead</option>
            </select>
          </div>

          <button
            onClick={onExitToWebsite}
            className="text-xs text-slate-700 hover:text-blue-600 px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-blue-400 transition-colors flex items-center gap-1 font-mono font-medium shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Workspace Sidebar */}
        <aside className="w-full lg:w-64 bg-white/90 backdrop-blur-md border-r border-slate-200/90 flex flex-col justify-between shrink-0 text-slate-700">
          <div>
            {/* Brand Header */}
            <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
              <Logo size="sm" showSubtitle={true} />
            </div>

            {/* Sidebar Navigation */}
            <nav aria-label="Console Navigation" className="p-3 space-y-1">
              <div className="px-3 py-2 text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                Platform Modules
              </div>
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedFinding(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-tri-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Widget: Request Live Engagement */}
          <div className="p-4 border border-slate-200/90 surface-tri-wash m-3 rounded-xl text-xs space-y-2 shadow-tri-sm">
            <div className="text-slate-900 font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Need Manual Validation?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Pair this platform with HypenSec penetration testing and cloud security engineering.
            </p>
            <button
              onClick={onOpenConsultation}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded transition-colors text-center"
            >
              Book Security Consultation
            </button>
          </div>
        </aside>

        {/* Workspace Main Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Contextual Top Header */}
          <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between gap-4">
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">Platform</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">HypenSec Demo Tenant</span>
              <span className="text-slate-400">/</span>
              <span className="text-blue-600 font-bold">{currentTabLabel}</span>
            </div>

            {/* Quick User Avatar & Scope Badge */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-600">
                <span>Active Role: <strong className="text-slate-900 font-semibold">{userRole}</strong></span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 font-mono">
                {userRole.charAt(0)}
              </div>
            </div>
          </header>

          {/* Viewport Content */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {activeTab === 'overview' && (
              <ExecutiveOverview
                findings={findings}
                assets={assets}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onSelectFinding={(f) => {
                  setSelectedFinding(f);
                  setActiveTab('register');
                }}
              />
            )}

            {activeTab === 'surface' && (
              <AttackSurfaceView
                assets={assets}
                findings={findings}
                onSelectFinding={(f) => {
                  setSelectedFinding(f);
                  setActiveTab('register');
                }}
              />
            )}

            {activeTab === 'register' && (
              <RiskRegisterView
                findings={findings}
                onUpdateFindingStatus={handleUpdateFindingStatus}
                selectedFindingFromParent={selectedFinding}
                onClearSelectedFinding={() => setSelectedFinding(null)}
                onCreateRemediationTask={handleCreateRemediationFromFinding}
              />
            )}

            {activeTab === 'remediation' && (
              <RemediationView
                tasks={tasks}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onAddTask={handleAddTask}
              />
            )}

            {activeTab === 'third-party' && (
              <ThirdPartyRiskView />
            )}

            {activeTab === 'reports' && (
              <ReportsView findings={findings} />
            )}

            {activeTab === 'settings' && (
              <SettingsView />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
