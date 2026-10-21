import React, { useState } from 'react';
import { RemediationTask } from '../../data/mockSecurityData';
import { Plus, X } from 'lucide-react';

interface RemediationViewProps {
  tasks: RemediationTask[];
  onUpdateTaskStatus: (taskId: string, newStatus: RemediationTask['status']) => void;
  onAddTask: (task: Omit<RemediationTask, 'id'>) => void;
}

export const RemediationView: React.FC<RemediationViewProps> = ({
  tasks,
  onUpdateTaskStatus,
  onAddTask
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newFindingId, setNewFindingId] = useState('F-201');
  const [newSeverity, setNewSeverity] = useState<'critical' | 'high' | 'medium' | 'low'>('high');
  const [newAssignee, setNewAssignee] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const columns: RemediationTask['status'][] = ['Backlog', 'In Progress', 'Review', 'Remediated'];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAssignee.trim()) return;

    onAddTask({
      findingId: newFindingId,
      title: newTitle,
      severity: newSeverity,
      assignee: newAssignee,
      dueDate: newDueDate || '2026-11-05',
      status: 'Backlog',
      notes: newNotes || 'Pending initial triage and sprint assignment.'
    });

    setNewTitle('');
    setNewAssignee('');
    setNewNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Task CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Remediation Task Management</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Engineering remediation sprints, SLA targets, and verification tracking.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Remediation Task</span>
        </button>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col);
          return (
            <div key={col} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  {col}
                </span>
                <span className="text-xs font-mono text-slate-600 tabular-nums bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List in Column */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    No active tasks
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                          <span className="text-blue-600 font-bold">{task.id}</span>
                          <span className={`uppercase font-bold ${
                            task.severity === 'critical' ? 'text-rose-600' :
                            task.severity === 'high' ? 'text-amber-700' : 'text-slate-600'
                          }`}>
                            {task.severity}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h4>
                        <div className="text-[11px] text-slate-500 font-mono mt-1">
                          Ref: <span className="text-slate-700 font-semibold">{task.findingId}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {task.notes}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-600 truncate max-w-[100px]">{task.assignee}</span>
                        <span className="text-amber-700 font-semibold">{task.dueDate}</span>
                      </div>

                      {/* Quick Status Advance Control */}
                      <div className="pt-1 flex items-center justify-between gap-1 text-[11px]">
                        {col !== 'Backlog' && (
                          <button
                            onClick={() => {
                              const prevIdx = columns.indexOf(col) - 1;
                              if (prevIdx >= 0) onUpdateTaskStatus(task.id, columns[prevIdx]);
                            }}
                            className="text-[10px] text-slate-600 hover:text-slate-900 font-medium"
                          >
                            ← Back
                          </button>
                        )}
                        <div className="flex-1" />
                        {col !== 'Remediated' && (
                          <button
                            onClick={() => {
                              const nextIdx = columns.indexOf(col) + 1;
                              if (nextIdx < columns.length) onUpdateTaskStatus(task.id, columns[nextIdx]);
                            }}
                            className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold"
                          >
                            Advance →
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-xl p-6 text-slate-900">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Create Remediation Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Patch Spring Framework CVE-2026-3192 in API service"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Linked Finding ID</label>
                  <input
                    type="text"
                    value={newFindingId}
                    onChange={(e) => setNewFindingId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Assignee</label>
                  <input
                    type="text"
                    required
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    placeholder="e.g. Marcus Brody"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Target Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Technical Notes / PR Link</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Include repository PR links, deployment stages, or verification tests..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
