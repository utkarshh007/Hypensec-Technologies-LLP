import React, { useState } from 'react';
import { HYPENSEC_SERVICES } from '../../data/mockSecurityData';
import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { ServiceCategoryId } from './Navbar';

interface ServicesViewProps {
  selectedServiceId?: ServiceCategoryId;
  onSelectService?: (serviceId: ServiceCategoryId) => void;
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  selectedServiceId: externalServiceId,
  onSelectService,
  onOpenConsultation
}) => {
  const [internalServiceId, setInternalServiceId] = useState<string>(HYPENSEC_SERVICES[0].id);
  const activeServiceId = externalServiceId || internalServiceId;

  const handleSelect = (id: string) => {
    setInternalServiceId(id);
    if (onSelectService) {
      onSelectService(id as ServiceCategoryId);
    }
  };

  const selectedService = HYPENSEC_SERVICES.find((s) => s.id === activeServiceId) || HYPENSEC_SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-14">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-3 tracking-wider uppercase">
          <span>Specialized Security Services</span>
          <span aria-hidden="true">·</span>
          <span>Methodology Grounded</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-[#1f1f1f] leading-[1.15]">
          Targeted Security Services for Complex Environments
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          From hands-on penetration testing to cloud architecture hardening and GRC alignment, HypenSec delivers rigorous technical evaluations with practical, engineering-ready remediation guidance.
        </p>
      </div>

      {/* Services Exploration Layout: Interactive Tabs & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Service Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono text-slate-500 font-medium uppercase tracking-wider block mb-2">
            Select a Service to Inspect Scope
          </span>
          {HYPENSEC_SERVICES.map((service, index) => {
            const isSelected = selectedService.id === service.id;
            return (
              <button
                key={service.id}
                onClick={() => handleSelect(service.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'surface-tri-wash border-blue-600 ring-2 ring-blue-500/15 shadow-tri-md text-slate-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 shadow-tri-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">0{index + 1}. {service.category}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-base font-normal tracking-[-0.015em] mt-1.5 text-[#1f1f1f]">{service.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {service.shortSummary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Service Specification */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-6 shadow-tri-lg">
          <div className="border-b border-slate-200 pb-5">
            <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
              {selectedService.category} · Detailed Specification
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#1f1f1f] mt-1">
              {selectedService.title}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {selectedService.shortSummary}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-amber-700 uppercase tracking-wider font-bold">
              The Organizational Problem Addressed
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
              {selectedService.problem}
            </div>
          </div>

          {/* What HypenSec Does */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-blue-600 uppercase tracking-wider font-bold">
              What HypenSec Does (Technical Methodology)
            </h4>
            <div className="space-y-2">
              {selectedService.whatHypenSecDoes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What the Customer Receives */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-emerald-700 uppercase tracking-wider font-bold">
              What You Receive & Can Expect
            </h4>
            <div className="space-y-2">
              {selectedService.whatCustomerReceives.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal Fit & Action CTA */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600 max-w-sm">
              <span className="font-bold text-slate-900">Ideal for: </span>
              {selectedService.idealFor}
            </div>
            <button
              onClick={() => onOpenConsultation(selectedService.title)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
            >
              <span>Scope This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
