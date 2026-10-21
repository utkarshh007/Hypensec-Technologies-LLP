import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateContextualRiskScore,
  getRemediationSlaDays,
  isFindingOverdue,
  calculatePostureScore,
  filterFindings,
  calculatePlatformConsolidationMetrics,
  SecurityFinding
} from './securityRisk';

test('calculateContextualRiskScore returns higher score for public internet and Tier 1 assets', () => {
  const publicScore = calculateContextualRiskScore({
    cvssScore: 8.5,
    exposure: 'Public Internet',
    criticality: 'Tier 1 - Mission Critical',
    exploitAvailable: true
  });

  const internalScore = calculateContextualRiskScore({
    cvssScore: 8.5,
    exposure: 'Internal VPC',
    criticality: 'Tier 3 - Internal Support',
    exploitAvailable: false
  });

  assert.ok(publicScore > internalScore, 'Public asset with active exploit must score significantly higher');
  assert.ok(publicScore <= 100, 'Score must not exceed 100');
  assert.ok(internalScore >= 1, 'Score must be at least 1');
});

test('getRemediationSlaDays returns appropriate days per severity', () => {
  assert.equal(getRemediationSlaDays('critical'), 2);
  assert.equal(getRemediationSlaDays('high'), 7);
  assert.equal(getRemediationSlaDays('medium'), 30);
  assert.equal(getRemediationSlaDays('low'), 90);
  assert.equal(getRemediationSlaDays('informational'), 180);
});

test('isFindingOverdue accurately identifies overdue items', () => {
  const discovered = '2026-10-01T00:00:00Z';
  // 5 days later: critical is overdue (SLA 2d), high is not overdue (SLA 7d)
  const checkDate = '2026-10-06T00:00:00Z';
  assert.equal(isFindingOverdue(discovered, 'critical', checkDate), true);
  assert.equal(isFindingOverdue(discovered, 'high', checkDate), false);
});

test('calculatePostureScore decreases with open critical vulnerabilities', () => {
  const cleanFindings: Pick<SecurityFinding, 'severity' | 'status'>[] = [
    { severity: 'critical', status: 'Remediated' },
    { severity: 'high', status: 'Accepted Risk' },
  ];
  assert.equal(calculatePostureScore(cleanFindings), 96);

  const riskyFindings: Pick<SecurityFinding, 'severity' | 'status'>[] = [
    { severity: 'critical', status: 'Open' },
    { severity: 'critical', status: 'In Progress' },
    { severity: 'high', status: 'Open' },
  ];
  const score = calculatePostureScore(riskyFindings);
  assert.ok(score < 90, 'Score should reflect severity deductions');
});

test('filterFindings filters accurately by severity and text search', () => {
  const findings: SecurityFinding[] = [
    {
      id: 'F-101',
      title: 'Remote Code Execution in API Gateway',
      cveId: 'CVE-2026-4421',
      severity: 'critical',
      cvssScore: 9.8,
      assetId: 'A-1',
      assetName: 'api.production.internal',
      environment: 'AWS',
      discoveredDate: '2026-10-10',
      status: 'Open',
      assignee: 'Alex Chen',
      businessContext: 'Core auth flow',
      remediationAdvice: 'Patch gateway immediately',
      exploitAvailable: true
    },
    {
      id: 'F-102',
      title: 'Missing HSTS header on documentation site',
      severity: 'low',
      cvssScore: 3.1,
      assetId: 'A-2',
      assetName: 'docs.public.net',
      environment: 'Cloudflare',
      discoveredDate: '2026-10-12',
      status: 'Open',
      assignee: 'Sarah Lin',
      businessContext: 'Marketing docs',
      remediationAdvice: 'Add Strict-Transport-Security header',
      exploitAvailable: false
    }
  ];

  const criticalOnly = filterFindings(findings, '', 'critical');
  assert.equal(criticalOnly.length, 1);
  assert.equal(criticalOnly[0].id, 'F-101');

  const textMatch = filterFindings(findings, 'CVE-2026', 'all');
  assert.equal(textMatch.length, 1);
  assert.equal(textMatch[0].id, 'F-101');

  const emptySearch = filterFindings(findings, 'NonexistentString', 'all');
  assert.equal(emptySearch.length, 0);
});

test('calculatePlatformConsolidationMetrics computes deterministic ROI and MTTR reduction', () => {
  const baseline = calculatePlatformConsolidationMetrics({
    disconnectedToolsCount: 8,
    cloudAccountsCount: 6,
    monthlyAlertsThousands: 40,
  });

  const expanded = calculatePlatformConsolidationMetrics({
    disconnectedToolsCount: 16,
    cloudAccountsCount: 14,
    monthlyAlertsThousands: 120,
  });

  assert.ok(baseline.estimatedMttrHours < baseline.previousMttrHours, 'Consolidated MTTR must be lower than fragmented MTTR');
  assert.ok(expanded.annualAnalystHoursSaved > baseline.annualAnalystHoursSaved, 'More tools and alerts consolidated yields higher analyst hours saved');
  assert.ok(baseline.noiseReductionPercent >= 68 && baseline.noiseReductionPercent <= 94);
});

