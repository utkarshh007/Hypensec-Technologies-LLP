import React, { useState } from 'react';
import { X, CheckCircle, Send, ShieldCheck, Lock } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialInterest = 'Vulnerability Assessment and Penetration Testing'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState(initialInterest);
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid business email address';
    } else {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      if (domain && personalDomains.includes(domain)) {
        errs.email = 'Please use your corporate or organization work email address';
      }
    }

    if (!company.trim()) errs.company = 'Company / organization name is required';
    if (!interest) errs.interest = 'Please select a primary area of interest';
    if (!message.trim()) {
      errs.message = 'Please provide a brief description of your environment or objective';
    } else if (message.trim().length < 15) {
      errs.message = 'Please share at least 15 characters describing your requirements';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-2xl shadow-tri-lg p-6 md:p-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close consultation dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 id="consultation-modal-title" className="text-2xl font-bold text-slate-900 mb-2">
              Consultation Request Received
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Thank you for reaching out to HypenSec Technologies. A security advisor will review your requirements under confidentiality and get in touch within one business day.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 text-left mb-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Next Steps in Our Engagement Process:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 mt-2">
                <li>Non-Disclosure Agreement (NDA) mutual execution if required.</li>
                <li>Initial 30-minute scoping discussion on scope and asset targets.</li>
                <li>Customized proposal with explicit methodology and timelines.</li>
              </ul>
            </div>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Logo size="sm" showSubtitle={false} />
                <span className="text-xs text-slate-500 font-mono">· Security Engagement</span>
              </div>
              <h2 id="consultation-modal-title" className="text-2xl font-bold text-slate-900">
                Book a Security Consultation
              </h2>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Connect directly with a technical security specialist to evaluate your attack surface, assess vulnerabilities, or prepare for upcoming compliance reviews.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="e.g. Rachel Sterling"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                    errors.name ? 'border-rose-500' : 'border-slate-300 hover:border-slate-400'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Work Email & Company in 2-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="rachel@organization.com"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-slate-300 hover:border-slate-400'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      if (errors.company) setErrors((prev) => ({ ...prev, company: '' }));
                    }}
                    placeholder="Acme Financial Technologies"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.company ? 'border-rose-500' : 'border-slate-300 hover:border-slate-400'
                    }`}
                  />
                  {errors.company && <p className="text-xs text-rose-600 mt-1">{errors.company}</p>}
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label htmlFor="contact-interest" className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Area of Interest <span className="text-rose-600">*</span>
                </label>
                <select
                  id="contact-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                >
                  <option value="Vulnerability Assessment and Penetration Testing">
                    Vulnerability Assessment and Penetration Testing (VAPT)
                  </option>
                  <option value="Cloud and Application Security">
                    Cloud and Application Security Engineering
                  </option>
                  <option value="External Attack Surface & Threat Monitoring">
                    External Attack Surface & Threat Monitoring
                  </option>
                  <option value="Security Operations & Incident Readiness">
                    Security Operations & Incident Readiness (Tabletop / Playbooks)
                  </option>
                  <option value="Governance, Risk and Compliance (SOC 2, ISO 27001)">
                    Governance, Risk and Compliance (SOC 2, ISO 27001, NIST CSF)
                  </option>
                  <option value="Security Consulting and Virtual CISO Advisory">
                    Strategic Security Consulting / Virtual CISO Advisory
                  </option>
                  <option value="SaaS Platform Prototype Demonstration">
                    HypenSec Risk Platform Prototype Access
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Overview of Your Environment or Objective <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Outline your environment (e.g. AWS + Kubernetes, 4 web apps, API endpoints) and key goals or upcoming audit timelines."
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                    errors.message ? 'border-rose-500' : 'border-slate-300 hover:border-slate-400'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              {/* Privacy notice */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Information submitted is strictly confidential and protected by standard professional privacy practices.</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Validating & Sending Request...</span>
                  ) : (
                    <>
                      <span>Send Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
