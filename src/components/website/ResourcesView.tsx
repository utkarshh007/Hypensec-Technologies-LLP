import React, { useState } from 'react';
import { HYPENSEC_RESOURCES, ResourceItem } from '../../data/mockSecurityData';
import { ChevronRight } from 'lucide-react';

interface ResourcesViewProps {
  onOpenConsultation: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<ResourceItem | null>(null);

  const filteredResources = selectedCategory === 'all'
    ? HYPENSEC_RESOURCES
    : HYPENSEC_RESOURCES.filter((r) => r.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
          <span>Security Knowledge & Engineering Guides</span>
          <span aria-hidden="true">·</span>
          <span>Educational Resources</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
          Practical Security Insights & Technical Guides
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Technical briefs, architectural methodologies, and threat advisories created to help engineering and security teams make informed risk trade-offs.
        </p>
      </div>

      {/* Technical Articles & Guides List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Articles & Methodologies</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sample technical advisory publications and engineering guides.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/90 border border-slate-200 rounded-lg shadow-tri-sm">
            {['all', 'Methodology', 'Practical Guide', 'Advisory Brief', 'Threat Bulletin'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 shadow-tri-sm shadow-tri-hover"
            >
              <div>
                {/* Zero-Pill Unboxed Metadata with · separator */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                  <span className="text-blue-600 font-semibold">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.publishedDate}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-mono text-slate-500 font-semibold uppercase">Key Takeaways:</span>
                  {item.keyPoints.slice(0, 2).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(item)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Read Full Brief</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">Sample Content</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-xl p-6 sm:p-8 text-slate-900 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
              <span className="text-blue-600 font-semibold">{activeArticle.category}</span>
              <span>{activeArticle.readTime} · {activeArticle.publishedDate}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">{activeArticle.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              {activeArticle.summary}
            </p>

            <h4 className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mb-3">
              Core Architectural & Methodological Principles
            </h4>
            <div className="space-y-3 mb-6">
              {activeArticle.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                  <div className="w-5 h-5 rounded bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">
                    0{i + 1}
                  </div>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors"
              >
                Close Brief
              </button>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenConsultation();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
              >
                Consult on this Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
