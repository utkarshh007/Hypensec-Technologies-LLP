/**
 * Pure risk scoring, priority sorting, SLA calculations, and filtering logic
 * for HypenSec Technologies.
 */

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'informational';

export interface SecurityFinding {
  id: string;
  title: string;
  cveId?: string;
  severity: SeverityLevel;
  cvssScore: number;
  assetId: string;
  assetName: string;
  environment: 'AWS' | 'Azure' | 'GCP' | 'Cloudflare' | 'On-Prem' | 'SaaS';
  discoveredDate: string; // ISO date string
  status: 'Open' | 'In Progress' | 'Review' | 'Remediated' | 'Accepted Risk';
  assignee: string;
  businessContext: string;
  remediationAdvice: string;
  exploitAvailable: boolean;
}

export interface SecurityAsset {
  id: string;
  name: string;
  type: 'API Endpoint' | 'Web App' | 'Cloud Storage' | 'Compute Instance' | 'DNS Zone' | 'Identity Gateway';
  environment: 'AWS' | 'Azure' | 'GCP' | 'Cloudflare' | 'On-Prem' | 'SaaS';
  exposure: 'Public Internet' | 'Internal VPC' | 'Partner Extranet';
  criticality: 'Tier 1 - Mission Critical' | 'Tier 2 - Business Operational' | 'Tier 3 - Internal Support';
  owner: string;
  openFindingsCount: number;
  lastScanned: string;
}

/**
 * Calculates a normalized contextual risk score (0 - 100) combining CVSS,
 * asset exposure, criticality, and exploit availability.
 */
export function calculateContextualRiskScore(finding: {
  cvssScore: number;
  exposure: 'Public Internet' | 'Internal VPC' | 'Partner Extranet';
  criticality: 'Tier 1 - Mission Critical' | 'Tier 2 - Business Operational' | 'Tier 3 - Internal Support';
  exploitAvailable: boolean;
}): number {
  let exposureMultiplier = 1.0;
  if (finding.exposure === 'Public Internet') exposureMultiplier = 1.35;
  else if (finding.exposure === 'Partner Extranet') exposureMultiplier = 1.15;
  else exposureMultiplier = 0.9;

  let criticalityMultiplier = 1.0;
  if (finding.criticality.startsWith('Tier 1')) criticalityMultiplier = 1.3;
  else if (finding.criticality.startsWith('Tier 2')) criticalityMultiplier = 1.05;
  else criticalityMultiplier = 0.85;

  const exploitBonus = finding.exploitAvailable ? 1.5 : 0;

  // Base raw score scaled from CVSS (0-10) to 0-70 baseline
  const base = (finding.cvssScore / 10) * 65;
  const rawScore = (base + exploitBonus * 5) * exposureMultiplier * criticalityMultiplier;

  // Clamp within 1 - 100
  return Math.min(100, Math.max(1, Math.round(rawScore)));
}

/**
 * Computes remediation SLA target date in days based on severity level.
 * Critical: 2 days (48h)
 * High: 7 days
 * Medium: 30 days
 * Low: 90 days
 * Informational: 180 days
 */
export function getRemediationSlaDays(severity: SeverityLevel): number {
  switch (severity) {
    case 'critical':
      return 2;
    case 'high':
      return 7;
    case 'medium':
      return 30;
    case 'low':
      return 90;
    case 'informational':
    default:
      return 180;
  }
}

/**
 * Evaluates whether a finding is overdue based on discovery date and SLA.
 */
export function isFindingOverdue(discoveredDateIso: string, severity: SeverityLevel, currentDateIso: string): boolean {
  const discovered = new Date(discoveredDateIso).getTime();
  const current = new Date(currentDateIso).getTime();
  const slaMs = getRemediationSlaDays(severity) * 24 * 60 * 60 * 1000;
  return current - discovered > slaMs;
}

/**
 * Calculates overall organizational posture score (0 - 100, where 100 is ideal).
 * Deducts points for open findings weighted by severity.
 */
export function calculatePostureScore(findings: Pick<SecurityFinding, 'severity' | 'status'>[]): number {
  const activeFindings = findings.filter(f => f.status !== 'Remediated' && f.status !== 'Accepted Risk');
  if (activeFindings.length === 0) return 96;

  let deductions = 0;
  for (const f of activeFindings) {
    if (f.severity === 'critical') deductions += 9;
    else if (f.severity === 'high') deductions += 4;
    else if (f.severity === 'medium') deductions += 1.5;
    else if (f.severity === 'low') deductions += 0.5;
  }

  const score = Math.max(18, Math.round(100 - deductions));
  return Math.min(100, score);
}

/**
 * Filters findings by search query and optional severity filter.
 */
export function filterFindings(
  findings: SecurityFinding[],
  query: string,
  severityFilter: string
): SecurityFinding[] {
  const lowerQuery = query.trim().toLowerCase();
  return findings.filter(f => {
    const matchesSeverity = severityFilter === 'all' || f.severity === severityFilter;
    if (!matchesSeverity) return false;

    if (!lowerQuery) return true;
    return (
      f.title.toLowerCase().includes(lowerQuery) ||
      (f.cveId && f.cveId.toLowerCase().includes(lowerQuery)) ||
      f.assetName.toLowerCase().includes(lowerQuery) ||
      f.assignee.toLowerCase().includes(lowerQuery) ||
      f.environment.toLowerCase().includes(lowerQuery)
    );
  });
}

export interface PlatformConsolidationInput {
  disconnectedToolsCount: number;
  cloudAccountsCount: number;
  monthlyAlertsThousands: number;
}

export interface PlatformConsolidationResult {
  noiseReductionPercent: number;
  estimatedMttrHours: number;
  previousMttrHours: number;
  annualAnalystHoursSaved: number;
  consolidatedWorkflowsCount: number;
}

/**
 * Calculates the operational impact of consolidating fragmented point security tools
 * into the unified HypenSec Platformization architecture.
 */
export function calculatePlatformConsolidationMetrics(
  input: PlatformConsolidationInput
): PlatformConsolidationResult {
  const tools = Math.max(1, Math.min(30, input.disconnectedToolsCount));
  const clouds = Math.max(1, Math.min(50, input.cloudAccountsCount));
  const alertsK = Math.max(1, Math.min(500, input.monthlyAlertsThousands));

  const noiseReductionPercent = Math.min(94, Math.max(68, Math.round(72 + tools * 0.9 + Math.log10(alertsK) * 4)));
  const previousMttrHours = Math.round(36 + tools * 4.5 + clouds * 1.2);
  const estimatedMttrHours = Math.max(4, Math.round(previousMttrHours * (1 - noiseReductionPercent / 115)));
  const annualAnalystHoursSaved = Math.round(tools * 140 + alertsK * 18 + clouds * 35);
  const consolidatedWorkflowsCount = Math.max(2, Math.min(tools, Math.round(tools * 0.85)));

  return {
    noiseReductionPercent,
    estimatedMttrHours,
    previousMttrHours,
    annualAnalystHoursSaved,
    consolidatedWorkflowsCount,
  };
}

