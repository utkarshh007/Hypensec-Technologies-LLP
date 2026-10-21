import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Lock, Mail, ExternalLink, Copy, Check, ArrowRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import {
  ORGANIZATION_EMAIL,
  validateConsultationForm,
  generateEmailContent,
  getMailtoUrl,
  getGmailWebUrl,
  getOutlookWebUrl,
  ConsultationFormData
} from '../../utils/consultation';

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
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState(initialInterest);
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Store last submitted details for display & mail links
  const [submittedData, setSubmittedData] = useState<(ConsultationFormData & { timestamp: string }) | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConsultationForm({
      name,
      email,
      company,
      phone,
      interest,
      message,
    });

    if (!validation.isValid) {
      setErrors(validation.errors as Record<string, string>);
      return;
    }

    setIsSubmitting(true);

    const submission = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim(),
      interest,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save to local storage for auditable record
    try {
      const existingHistory = JSON.parse(localStorage.getItem('hypensec_consultations') || '[]');
      existingHistory.unshift({
        ...submission,
        recipient: ORGANIZATION_EMAIL,
        id: `REQ-${Date.now()}`
      });
      localStorage.setItem('hypensec_consultations', JSON.stringify(existingHistory.slice(0, 20)));
    } catch {
      // LocalStorage error resilience
    }

    setSubmittedData(submission);

    // Trigger user mail client with pre-filled content
    try {
      const mailtoUrl = getMailtoUrl(submission);
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled smoothly
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleCopyDetails = () => {
    if (!submittedData) return;
    const { fullFormattedText } = generateEmailContent(submittedData);

    try {
      const textarea = document.createElement('textarea');
      textarea.value = fullFormattedText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      // Non-blocking fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setMessage('');
    setSubmittedData(null);
    setIsSubmitted(false);
    setErrors({});
  };

  const handleResetAndClose = () => {
    handleResetForm();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-900 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close consultation dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted && submittedData ? (
          <div className="py-2">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 id="consultation-modal-title" className="text-2xl font-bold text-slate-900">
                Consultation Request Prepared
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                Your consultation request has been prepared for dispatch to our organization inbox.
              </p>
            </div>

            {/* Target Mail Indicator */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider font-mono">
                    Official Organization Inbox
                  </div>
                  <div className="text-sm font-bold text-blue-700 font-mono">
                    {ORGANIZATION_EMAIL}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 bg-white border border-blue-200 text-blue-800 rounded-md font-semibold">
                Direct Recipient
              </span>
            </div>

            {/* Summary Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5 mb-5">
              <div className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono border-b border-slate-200 pb-2">
                Submission Summary
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">From / Contact</span>
                  <span className="font-semibold text-slate-800">{submittedData.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Sender Email</span>
                  <span className="font-semibold text-slate-800 truncate block">{submittedData.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Organization</span>
                  <span className="font-semibold text-slate-800">{submittedData.company}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Focus Area</span>
                  <span className="font-semibold text-slate-800 truncate block">{submittedData.interest}</span>
                </div>
              </div>
              <div className="pt-1 border-t border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Objective / Scope</span>
                <p className="text-slate-700 italic mt-0.5 line-clamp-2">
                  &ldquo;{submittedData.message}&rdquo;
                </p>
              </div>
            </div>

            {/* Mail Dispatch Quick Actions */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-slate-700">
                Send directly from your preferred email provider:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Default Mail Client */}
                <button
                  onClick={() => triggerMailto(submittedData)}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Mail App</span>
                </button>

                {/* Gmail Web */}
                <a
                  href={getGmailWebUrl(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors border border-slate-300"
                >
                  <span>Open in Gmail Web</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                {/* Outlook Web */}
                <a
                  href={getOutlookWebUrl(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors border border-slate-300"
                >
                  <span>Open in Outlook Web</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                {/* Copy Text */}
                <button
                  onClick={handleCopyDetails}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors border border-slate-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Email Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Engagement Next Steps */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Next Steps in Our Engagement Process:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 mt-1">
                <li>Advisory team review at <strong className="text-slate-800">connect@hypensec.com</strong> within 1 business day.</li>
                <li>Mutual Non-Disclosure Agreement (NDA) execution prior to sharing sensitive architectures.</li>
                <li>Scoping session with lead security engineer.</li>
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetForm}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Submit another request
              </button>
              <button
                onClick={handleResetAndClose}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
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
                Connect directly with our security engineers. Your consultation request will be dispatched directly to <strong className="text-slate-900 font-medium font-mono">{ORGANIZATION_EMAIL}</strong> from your mail.
              </p>
            </div>

            {/* Email Dispatch Notice */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg px-3.5 py-2.5 mb-4 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Delivers to official address: <span className="font-mono font-semibold text-slate-900">{ORGANIZATION_EMAIL}</span>
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-blue-100/70 text-blue-800 font-semibold rounded">
                Verified
              </span>
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

              {/* Email & Company in 2-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address <span className="text-rose-600">*</span>
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

              {/* Phone & Area of Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                  />
                </div>

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
                    <option value="Next-Gen Security & Resilience Product Suite">
                      Next-Gen Security & Resilience Product Suite (Trever, Webby, AXR, Zproxi, Moana)
                    </option>
                  </select>
                </div>
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
                <span>Information submitted is strictly confidential and protected under standard professional privacy practices.</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium text-sm rounded-lg transition-colors shadow-md group cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Preparing & Opening Mail Client...</span>
                  ) : (
                    <>
                      <span>Submit Request via Email to {ORGANIZATION_EMAIL}</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  Submits from your mail directly to our organization inbox at <span className="font-mono text-slate-700 font-semibold">{ORGANIZATION_EMAIL}</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
