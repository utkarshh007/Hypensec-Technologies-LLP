export interface CustomerLogoItem {
  id: string;
  name: string;
  logoUrl: string;
  sector: string;
  region: string;
  engagementFocus: string;
  summary: string;
  imgScaleClass?: string;
}

export const CUSTOMER_LOGOS: CustomerLogoItem[] = [
  {
    id: 'trever',
    name: 'Trever',
    logoUrl: '/assets/aistudio/trever.si_87e8ba1f.jpg',
    sector: 'Digital Asset Infrastructure · FinTech',
    region: 'Europe',
    engagementFocus: 'Application Security & Tabletop Simulation',
    summary:
      'Institutional digital asset infrastructure operating across regulated European banking environments with high-assurance API and operational resilience controls.',
    imgScaleClass: 'h-14 w-14 object-contain'
  },
  {
    id: 'lnj-bhilwara',
    name: 'LNJ Bhilwara Group',
    logoUrl: '/assets/aistudio/lnj_bdde07a4.jpg',
    sector: 'Diversified Enterprise Conglomerate',
    region: 'India & Global',
    engagementFocus: 'Enterprise Risk Governance & Perimeter Hardening',
    summary:
      'Multi-sector industrial conglomerate spanning power generation, textiles, graphite electrodes, and IT services with distributed enterprise attack surfaces.',
    imgScaleClass: 'h-16 w-16 object-contain'
  },
  {
    id: 'pnb-gilts',
    name: 'PNB Gilts',
    logoUrl: '/assets/aistudio/pnb_glits_eb7b4ffe.png',
    sector: 'Primary Dealer · Regulated Financial Services',
    region: 'India',
    engagementFocus: 'VAPT, DLP & Regulatory Compliance Assurance',
    summary:
      'Leading primary dealer in the government securities market requiring strict financial regulatory alignment, vulnerability management, and endpoint resilience.',
    imgScaleClass: 'h-16 w-16 object-contain scale-125'
  },
  {
    id: 'aumyaa',
    name: 'Aumyaa',
    logoUrl: '/assets/aistudio/aumyaa_78baba31.jpg',
    sector: 'Enterprise Advisory & Digital Assurance',
    region: 'India & Middle East',
    engagementFocus: 'Security Management Lifecycle & Audit Readiness',
    summary:
      'Strategic governance and risk transformation partner leveraging automated audit lifecycle tracking and continuous security posture validation.',
    imgScaleClass: 'h-20 w-36 object-contain scale-125'
  },
  {
    id: 'factura-ai',
    name: 'Factura.ai',
    logoUrl: '/assets/aistudio/factura_48db2f49.png',
    sector: 'AI-Native Document Automation · SaaS',
    region: 'North America & Global',
    engagementFocus: 'Agentic AI QA Testing & Cloud API Pen Testing',
    summary:
      'High-velocity AI document intelligence platform securing multi-tenant cloud pipelines, API gateways, and automated data extraction workflows.',
    imgScaleClass: 'h-20 w-36 object-contain scale-125'
  },
  {
    id: 'maral-overseas',
    name: 'Maral Overseas',
    logoUrl: '/assets/aistudio/maral_75238b88.png',
    sector: 'Global Manufacturing & Export Enterprise',
    region: 'India & International',
    engagementFocus: 'External Attack Surface & Infrastructure Security',
    summary:
      'Vertically integrated manufacturing and global export enterprise protecting plant-to-cloud infrastructure, ERP perimeters, and supply chain portals.',
    imgScaleClass: 'h-16 w-28 object-contain scale-110'
  },
  {
    id: 'openssl',
    name: 'OpenSSL',
    logoUrl: '/assets/aistudio/openssl_a1080bf6.jpg',
    sector: 'Cryptographic & TLS Security Library',
    region: 'Global',
    engagementFocus: 'Cryptographic Posture & Protocol Security',
    summary:
      'Foundational open-source cryptographic and TLS toolkit securing enterprise transport layers and certificate infrastructures.',
    imgScaleClass: 'h-14 w-36 object-contain scale-105'
  },
  {
    id: 'owasp',
    name: 'OWASP',
    logoUrl: '/assets/aistudio/owasp_beb8577a.jpg',
    sector: 'Application Security Standards Foundation',
    region: 'Global',
    engagementFocus: 'OWASP Top 10 & ASVS Benchmark Validation',
    summary:
      'Global application security standards alignment across web, API, and agentic AI testing methodologies.',
    imgScaleClass: 'h-20 w-40 object-contain scale-125'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    logoUrl: '/assets/aistudio/kubernetes_3fa9f4df.png',
    sector: 'Cloud-Native Container Orchestration',
    region: 'Global',
    engagementFocus: 'Cluster Hardening, Ingress & Runtime Security',
    summary:
      'Production container orchestration environments hardened against lateral movement, RBAC drift, and pod privilege escalation.',
    imgScaleClass: 'h-20 w-40 object-contain scale-125'
  },
  {
    id: 'digitalearn',
    name: 'Digitalearn',
    logoUrl: '/assets/aistudio/digileran_0b9f4e96.jpg',
    sector: 'Digital Learning & Enterprise Enablement',
    region: 'India & Global',
    engagementFocus: 'Application Security & Platform Resilience',
    summary:
      'Enterprise learning and digital transformation organization securing web portals and cloud training infrastructure.',
    imgScaleClass: 'h-20 w-40 object-contain scale-125'
  },
  {
    id: 'ibm',
    name: 'IBM',
    logoUrl: '/assets/aistudio/IBM_b8fe1880.png',
    sector: 'Enterprise Cloud & Security Technology',
    region: 'Global',
    engagementFocus: 'Enterprise Security Architecture & Hybrid Cloud',
    summary:
      'Global enterprise technology and security ecosystem integration across hybrid cloud and mission-critical workloads.',
    imgScaleClass: 'h-16 w-36 object-contain scale-115'
  }
];

/**
 * Returns the next index in a circular carousel given current index, step delta, and total items.
 */
export function getNextCarouselIndex(currentIndex: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((currentIndex + delta) % total + total) % total;
}

/**
 * Builds a duplicated track array for seamless infinite marquee scrolling.
 */
export function buildMarqueeTrack<T>(items: readonly T[], copies = 2): T[] {
  if (copies <= 1) return [...items];
  const result: T[] = [];
  for (let i = 0; i < copies; i++) {
    result.push(...items);
  }
  return result;
}
