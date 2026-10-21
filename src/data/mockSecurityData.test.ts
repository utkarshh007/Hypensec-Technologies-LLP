import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HYPENSEC_SERVICES,
  HYPENSEC_SOLUTIONS,
  HYPENSEC_RESOURCES,
  COMPANY_VERIFICATION_PLACEHOLDERS,
} from './mockSecurityData';

test('COMPANY_VERIFICATION_PLACEHOLDERS sets official contact email to connect@hypensec.com', () => {
  assert.equal(COMPANY_VERIFICATION_PLACEHOLDERS.contactEmail, 'connect@hypensec.com');
  assert.ok(COMPANY_VERIFICATION_PLACEHOLDERS.certificationsNotice);
  assert.ok(COMPANY_VERIFICATION_PLACEHOLDERS.clientReferencesNotice);
});

test('HYPENSEC_SERVICES provides 6 core specialized cybersecurity services with deliverables', () => {
  assert.equal(HYPENSEC_SERVICES.length, 6);

  for (const s of HYPENSEC_SERVICES) {
    assert.ok(s.id, 'Service must have an id');
    assert.ok(s.title, 'Service must have a title');
    assert.ok(s.shortSummary, 'Service must have a short summary');
    assert.ok(s.whatHypenSecDoes.length >= 2, 'Service must have whatHypenSecDoes steps');
    assert.ok(s.whatCustomerReceives.length >= 2, 'Service must have whatCustomerReceives deliverables');
  }
});

test('HYPENSEC_SOLUTIONS covers targeted risk solutions', () => {
  assert.equal(HYPENSEC_SOLUTIONS.length, 6);

  for (const sol of HYPENSEC_SOLUTIONS) {
    assert.ok(sol.id);
    assert.ok(sol.title);
    assert.ok(sol.problem);
    assert.ok(sol.hypenSecApproach);
    assert.ok(sol.practicalOutcome);
  }
});

test('HYPENSEC_RESOURCES contains comprehensive technical publications', () => {
  assert.ok(HYPENSEC_RESOURCES.length >= 4);

  for (const res of HYPENSEC_RESOURCES) {
    assert.ok(res.id);
    assert.ok(res.title);
    assert.ok(res.category);
    assert.ok(res.keyPoints.length >= 2);
  }
});
