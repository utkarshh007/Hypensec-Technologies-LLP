import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ORGANIZATION_EMAIL,
  validateConsultationForm,
  generateEmailContent,
  getMailtoUrl,
  getGmailWebUrl,
  getOutlookWebUrl,
} from './consultation';

test('validateConsultationForm rejects completely empty form', () => {
  const result = validateConsultationForm({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Full name is required');
  assert.equal(result.errors.email, 'Email address is required');
  assert.equal(result.errors.company, 'Company / organization name is required');
  assert.equal(result.errors.interest, 'Please select a primary area of interest');
  assert.equal(result.errors.message, 'Please provide a brief description of your environment or objective');
});

test('validateConsultationForm detects invalid email formats', () => {
  const invalidEmails = ['notanemail', 'user@', '@domain.com', 'user@domain', 'user with space@domain.com'];

  for (const badEmail of invalidEmails) {
    const res = validateConsultationForm({
      name: 'John Doe',
      email: badEmail,
      company: 'Acme Security',
      interest: 'Vulnerability Assessment and Penetration Testing',
      message: 'This is a valid long description over 15 characters.',
    });
    assert.equal(res.isValid, false, `Expected ${badEmail} to be rejected`);
    assert.equal(res.errors.email, 'Please provide a valid email address');
  }
});

test('validateConsultationForm requires at least 15 characters for message', () => {
  const res = validateConsultationForm({
    name: 'Sarah Connor',
    email: 'sarah@skynet.defense',
    company: 'Resistance Ops',
    interest: 'Cloud and Application Security',
    message: 'Too short',
  });

  assert.equal(res.isValid, false);
  assert.equal(res.errors.message, 'Please share at least 15 characters describing your requirements');
});

test('validateConsultationForm succeeds with valid inputs', () => {
  const res = validateConsultationForm({
    name: 'Devon Miller',
    email: 'devon@millerfin.com',
    company: 'Miller Financial',
    phone: '+1 555-019-2834',
    interest: 'Vulnerability Assessment and Penetration Testing',
    message: 'We require an external penetration testing engagement for our AWS and Kubernetes infrastructure.',
  });

  assert.equal(res.isValid, true);
  assert.deepEqual(res.errors, {});
});

test('generateEmailContent formats subject and body correctly with target recipient', () => {
  const data = {
    name: 'Elena Rostova',
    email: 'elena@novafinance.org',
    company: 'Nova Finance Group',
    phone: '+44 20 7946 0912',
    interest: 'Cloud and Application Security Engineering',
    message: 'Requesting cloud posture review and Kubernetes IAM boundary hardening.',
  };

  const { subject, body, fullFormattedText } = generateEmailContent(data);

  assert.equal(ORGANIZATION_EMAIL, 'connect@hypensec.com');
  assert.ok(subject.includes('[Security Consultation Request]'));
  assert.ok(subject.includes('Cloud and Application Security Engineering'));
  assert.ok(subject.includes('Nova Finance Group'));
  assert.ok(subject.includes('Elena Rostova'));

  assert.ok(body.includes('• Full Name: Elena Rostova'));
  assert.ok(body.includes('• Sender Email: elena@novafinance.org'));
  assert.ok(body.includes('• Company / Organization: Nova Finance Group'));
  assert.ok(body.includes('• Phone / Contact: +44 20 7946 0912'));
  assert.ok(body.includes('• Primary Area of Interest: Cloud and Application Security Engineering'));
  assert.ok(body.includes('Target Recipient: connect@hypensec.com'));
  assert.ok(body.includes(data.message));

  assert.ok(fullFormattedText.startsWith('To: connect@hypensec.com'));
  assert.ok(fullFormattedText.includes(`Subject: ${subject}`));
});

test('generateEmailContent omits phone line if phone is empty or whitespace', () => {
  const data = {
    name: 'David Vance',
    email: 'david@vancecorp.io',
    company: 'Vance Corp',
    phone: '   ',
    interest: 'VAPT',
    message: 'Need full external penetration test for upcoming audit.',
  };

  const { body } = generateEmailContent(data);
  assert.ok(!body.includes('• Phone / Contact:'));
});

test('getMailtoUrl generates valid mailto uri with connect@hypensec.com', () => {
  const data = {
    name: 'Alex Vance',
    email: 'alex@vance.io',
    company: 'Vance Labs',
    interest: 'Threat Monitoring',
    message: 'Continuous monitoring inquiry for 15 public subdomains.',
  };

  const url = getMailtoUrl(data);
  assert.ok(url.startsWith('mailto:connect@hypensec.com?subject='));
  assert.ok(url.includes('&body='));
  assert.ok(url.includes(encodeURIComponent('Alex Vance')));
});

test('getGmailWebUrl and getOutlookWebUrl generate valid provider links', () => {
  const data = {
    name: 'Alex Vance',
    email: 'alex@vance.io',
    company: 'Vance Labs',
    interest: 'Threat Monitoring',
    message: 'Continuous monitoring inquiry for 15 public subdomains.',
  };

  const gmailUrl = getGmailWebUrl(data);
  assert.ok(gmailUrl.startsWith('https://mail.google.com/mail/?view=cm&fs=1&to=connect%40hypensec.com'));

  const outlookUrl = getOutlookWebUrl(data);
  assert.ok(outlookUrl.startsWith('https://outlook.office.com/mail/deeplink/compose?to=connect%40hypensec.com'));
});
