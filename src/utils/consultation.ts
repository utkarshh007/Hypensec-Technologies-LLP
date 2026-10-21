export const ORGANIZATION_EMAIL = 'connect@hypensec.com';

export interface ConsultationFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  interest: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
}

export function validateConsultationForm(data: ConsultationFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.company || !data.company.trim()) {
    errors.company = 'Company / organization name is required';
  }

  if (!data.interest || !data.interest.trim()) {
    errors.interest = 'Please select a primary area of interest';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please provide a brief description of your environment or objective';
  } else if (data.message.trim().length < 15) {
    errors.message = 'Please share at least 15 characters describing your requirements';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateEmailContent(data: ConsultationFormData, targetEmail = ORGANIZATION_EMAIL): {
  subject: string;
  body: string;
  fullFormattedText: string;
} {
  const trimmedName = data.name.trim();
  const trimmedEmail = data.email.trim();
  const trimmedCompany = data.company.trim();
  const trimmedInterest = data.interest.trim();
  const trimmedMessage = data.message.trim();
  const trimmedPhone = data.phone?.trim();

  const subject = `[Security Consultation Request] ${trimmedInterest} - ${trimmedCompany} (${trimmedName})`;
  const body = `Dear HypenSec Security Advisory Team,

I would like to request a security consultation with HypenSec Technologies.

==================================================
CLIENT DETAILS:
==================================================
• Full Name: ${trimmedName}
• Sender Email: ${trimmedEmail}
• Company / Organization: ${trimmedCompany}
${trimmedPhone ? `• Phone / Contact: ${trimmedPhone}\n` : ''}• Primary Area of Interest: ${trimmedInterest}

==================================================
REQUIREMENTS & ENVIRONMENT OVERVIEW:
==================================================
${trimmedMessage}

==================================================
Target Recipient: ${targetEmail}
Request Dispatched via HypenSec Consultation Dispatcher
`;

  const fullFormattedText = `To: ${targetEmail}\nSubject: ${subject}\n\n${body}`;

  return { subject, body, fullFormattedText };
}

export function getMailtoUrl(data: ConsultationFormData, targetEmail = ORGANIZATION_EMAIL): string {
  const { subject, body } = generateEmailContent(data, targetEmail);
  return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getGmailWebUrl(data: ConsultationFormData, targetEmail = ORGANIZATION_EMAIL): string {
  const { subject, body } = generateEmailContent(data, targetEmail);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getOutlookWebUrl(data: ConsultationFormData, targetEmail = ORGANIZATION_EMAIL): string {
  const { subject, body } = generateEmailContent(data, targetEmail);
  return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(targetEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
