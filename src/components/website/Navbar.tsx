import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Layers,
  ShieldAlert,
  Radar,
  CloudCog,
  ShieldCheck,
  Users,
  Building2,
  FileCheck2,
  BookOpen,
  Calculator,
  Compass,
  Award,
  Lock,
  Mail,
  Terminal,
  Bot,
  Cpu,
  ScanSearch,
  DatabaseZap
} from 'lucide-react';

export type ProductSuiteId = 'trever-ttx' | 'webby' | 'axr' | 'zproxi' | 'moana-dpdp';
export type SolutionCategoryId =
  | 'security-management'
  | 'dlp-content'
  | 'edr-xdr'
  | 'vuln-pentest'
  | 'appsec';
export type ServiceCategoryId =
  | 'vapt'
  | 'cloud-appsec'
  | 'threat-intel-easm'
  | 'secops-incident-readiness'
  | 'grc-compliance'
  | 'advisory-consulting';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (
    tab: string,
    productId?: ProductSuiteId,
    solutionCategoryId?: SolutionCategoryId,
    serviceId?: ServiceCategoryId
  ) => void;
  onOpenConsultation: (interest?: string) => void;
  onLaunchPlatform: () => void;
}

interface DropdownSubItem {
  label: string;
  description: string;
  tab: string;
  productId?: ProductSuiteId;
  solutionCategoryId?: SolutionCategoryId;
  serviceId?: ServiceCategoryId;
  icon: React.FC<{ className?: string }>;
  action?: 'launch-platform' | 'open-consultation';
  consultationTopic?: string;
}

interface NavCategory {
  id: string;
  label: string;
  defaultTab: string;
  activeTabs: string[];
  columns: {
    heading: string;
    items: DropdownSubItem[];
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenConsultation,
  onLaunchPlatform
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories: NavCategory[] = [
    {
      id: 'product',
      label: 'Product',
      defaultTab: 'platform',
      activeTabs: ['platform', 'product'],
      columns: [
        {
          heading: 'HypenSec Product Suite',
          items: [
            {
              label: 'Trever TTX (NextGen Table Top Simulator)',
              description: 'Interactive cyber crisis simulation, ransomware drills, and executive decision readiness',
              tab: 'platform',
              productId: 'trever-ttx',
              icon: Terminal
            },
            {
              label: 'Webby (Agentic Ai QA Testing)',
              description: 'Autonomous AI testing agents for continuous web QA, workflow validation, and edge-case discovery',
              tab: 'platform',
              productId: 'webby',
              icon: Bot
            },
            {
              label: 'AXR (Autonomous Existential Resilience)',
              description: 'Self-healing infrastructure defense, blast-radius containment, and autonomous recovery',
              tab: 'platform',
              productId: 'axr',
              icon: Cpu
            },
            {
              label: 'Zproxi (Agentic Ai Security Scanner)',
              description: 'Agentic offensive scanner for deep DAST, API exploitation validation, and zero-noise triage',
              tab: 'platform',
              productId: 'zproxi',
              icon: ScanSearch
            },
            {
              label: 'Moana DPDP Scanner',
              description: 'Automated Digital Personal Data Protection (DPDP) PII discovery, consent mapping, and compliance auditing',
              tab: 'platform',
              productId: 'moana-dpdp',
              icon: DatabaseZap
            }
          ]
        }
      ]
    },
    {
      id: 'solutions',
      label: 'Solutions',
      defaultTab: 'solutions',
      activeTabs: ['solutions'],
      columns: [
        {
          heading: '1. Security Management & Audit Lifecycle',
          items: [
            {
              label: 'HyTree',
              description: 'Unified security posture governance, control mapping, and continuous audit lifecycle management',
              tab: 'solutions',
              solutionCategoryId: 'security-management',
              icon: FileCheck2
            }
          ]
        },
        {
          heading: '2. Data Loss Prevention & Content Security',
          items: [
            {
              label: 'Digital Guardian DLP',
              description: 'Endpoint, network, and cloud data loss prevention for sensitive IP and regulated data',
              tab: 'solutions',
              solutionCategoryId: 'dlp-content',
              icon: Lock
            },
            {
              label: 'Forcepoint DLP',
              description: 'Risk-adaptive data loss prevention and unified content security across enterprise channels',
              tab: 'solutions',
              solutionCategoryId: 'dlp-content',
              icon: ShieldCheck
            }
          ]
        },
        {
          heading: '3. Endpoint Detection & Response',
          items: [
            {
              label: 'Cortex XDR',
              description: 'Extended detection and response across endpoints, network, cloud, and identity telemetry',
              tab: 'solutions',
              solutionCategoryId: 'edr-xdr',
              icon: Radar
            },
            {
              label: 'SentinelOne Singularity XDR',
              description: 'Autonomous AI-powered endpoint protection, behavioral EDR, and threat hunting',
              tab: 'solutions',
              solutionCategoryId: 'edr-xdr',
              icon: Cpu
            }
          ]
        },
        {
          heading: '4. Vulnerability Management & Penetration Testing',
          items: [
            {
              label: 'Tenable Security Center',
              description: 'On-premises vulnerability management, risk analytics, and compliance visibility',
              tab: 'solutions',
              solutionCategoryId: 'vuln-pentest',
              icon: Layers
            },
            {
              label: 'Tenable Vulnerability Management',
              description: 'Cloud-delivered continuous exposure and vulnerability management',
              tab: 'solutions',
              solutionCategoryId: 'vuln-pentest',
              icon: CloudCog
            },
            {
              label: 'Cobalt Strike',
              description: 'Adversary simulation and red team operations',
              tab: 'solutions',
              solutionCategoryId: 'vuln-pentest',
              icon: Terminal
            },
            {
              label: 'Core Impact',
              description: 'Penetration testing and multi-vector exploit validation',
              tab: 'solutions',
              solutionCategoryId: 'vuln-pentest',
              icon: ShieldAlert
            }
          ]
        },
        {
          heading: '5. Application Security',
          items: [
            {
              label: 'HCL AppScan',
              description: 'Enterprise DAST, SAST, and IAST application security testing suite',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: ScanSearch
            },
            {
              label: 'Micro Focus WebInspect',
              description: 'Dynamic application security testing (DAST) for complex web apps and APIs',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: Radar
            },
            {
              label: 'Checkmarx',
              description: 'Static application security testing (SAST), SCA, and supply chain security',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: ShieldCheck
            },
            {
              label: 'Invicti (formerly Netsparker)',
              description: 'Proof-based automated web application and API vulnerability scanning',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: ScanSearch
            },
            {
              label: 'Burp Suite by PortSwigger',
              description: 'Practitioner-grade web vulnerability testing and intercepting proxy suite',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: Terminal
            },
            {
              label: 'Acunetix',
              description: 'Automated web application security scanner for SQLi, XSS, and OWASP Top 10 risks',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: ShieldAlert
            },
            {
              label: 'OpenText Fortify (formerly Micro Focus Fortify)',
              description: 'Comprehensive SAST, DAST, and software security assurance lifecycle',
              tab: 'solutions',
              solutionCategoryId: 'appsec',
              icon: Lock
            }
          ]
        }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      defaultTab: 'services',
      activeTabs: ['services'],
      columns: [
        {
          heading: 'Specialized Security Services',
          items: [
            {
              label: 'Vulnerability Assessment & Penetration Testing',
              description: 'Manual PoC-validated penetration testing across web apps, APIs, and networks',
              tab: 'services',
              serviceId: 'vapt',
              icon: ShieldAlert
            },
            {
              label: 'Cloud & Application Security Engineering',
              description: 'Multi-cloud IAM hardening, Kubernetes security, and CI/CD guardrails',
              tab: 'services',
              serviceId: 'cloud-appsec',
              icon: CloudCog
            },
            {
              label: 'External Attack Surface & Threat Monitoring',
              description: 'Continuous reconnaissance for shadow IT, exposed endpoints, and leaked credentials',
              tab: 'services',
              serviceId: 'threat-intel-easm',
              icon: Radar
            },
            {
              label: 'Security Operations & Incident Readiness',
              description: 'Tabletop breach simulations, SIEM detection engineering, and IR playbooks',
              tab: 'services',
              serviceId: 'secops-incident-readiness',
              icon: Terminal
            },
            {
              label: 'Governance, Risk & Compliance (GRC) Support',
              description: 'Practical alignment and readiness for SOC 2, ISO 27001, NIST CSF, and DPDP',
              tab: 'services',
              serviceId: 'grc-compliance',
              icon: FileCheck2
            },
            {
              label: 'Security Consulting & Virtual CISO Advisory',
              description: 'Executive risk roadmaps, board reporting, and architecture advisory',
              tab: 'services',
              serviceId: 'advisory-consulting',
              icon: Users
            }
          ]
        }
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      defaultTab: 'resources',
      activeTabs: ['resources'],
      columns: [
        {
          heading: 'Knowledge Center & Publications',
          items: [
            {
              label: 'Security Guides & Advisories',
              description: 'Technical briefs on contextual risk scoring, IAM drift, and EASM',
              tab: 'resources',
              icon: BookOpen
            },
            {
              label: 'Methodology & Frameworks',
              description: 'Execution aligned with OWASP, PTES, NIST CSF 2.0, and CIS Benchmarks',
              tab: 'resources',
              icon: Award
            }
          ]
        }
      ]
    },
    {
      id: 'company',
      label: 'Company',
      defaultTab: 'about',
      activeTabs: ['about', 'company'],
      columns: [
        {
          heading: 'HypenSec Technologies',
          items: [
            {
              label: 'About HypenSec',
              description: 'Our mission, practitioner-first philosophy, and company overview',
              tab: 'about',
              icon: Compass
            },
            {
              label: 'Core Working Principles',
              description: 'Signal over noise, actionable remediation, and transparent verification',
              tab: 'about',
              icon: ShieldCheck
            },
            {
              label: 'Confidentiality & Mutual NDA',
              description: 'Strict data handling boundaries and engagement governance',
              tab: 'about',
              icon: Lock
            },
            {
              label: 'Contact & Security Consultation',
              description: 'Connect directly with our security architects to scope your needs',
              tab: 'about',
              action: 'open-consultation',
              icon: Mail
            }
          ]
        }
      ]
    }
  ];

  const handleNavClick = (tab: string) => {
    onSelectTab(tab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleSubItemClick = (item: DropdownSubItem) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (item.action === 'launch-platform') {
      onLaunchPlatform();
      return;
    }
    if (item.action === 'open-consultation') {
      onOpenConsultation(item.consultationTopic);
      return;
    }
    onSelectTab(item.tab, item.productId, item.solutionCategoryId, item.serviceId);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-tri-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded shrink-0"
            aria-label="HypenSec Technologies Home"
          >
            <Logo size="md" showSubtitle={true} />
          </button>

          {/* Desktop Navigation with Mega-Menu Flyouts (Product, Solutions, Customers, Resources, Company) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {navCategories.map((category) => {
              const isActive = category.activeTabs.includes(currentTab);
              const isOpen = openDropdown === category.id;

              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(category.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(category.defaultTab)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                      isActive
                        ? 'text-blue-600 font-semibold border-blue-600'
                        : 'text-slate-700 hover:text-slate-900 border-transparent hover:border-slate-300'
                    }`}
                  >
                    <span>{category.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Mega-Menu Dropdown Panel */}
                  {isOpen && (
                    <div
                      className={`absolute ${
                        category.id === 'company' || category.id === 'resources'
                          ? 'right-0 w-[410px]'
                          : category.id === 'solutions'
                          ? '-left-32 w-[780px]'
                          : 'left-0 w-[410px]'
                      } top-full pt-2 z-50`}
                    >
                      {category.id === 'solutions' ? (
                        <div className="bg-white/98 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-tri-lg p-5">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Left Column: Categories 1 to 4 */}
                            <div className="space-y-3.5">
                              {category.columns.slice(0, 4).map((col, colIndex) => (
                                <div
                                  key={col.heading}
                                  className={colIndex > 0 ? 'pt-2.5 border-t border-slate-100' : ''}
                                >
                                  <div className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold mb-1.5 px-2">
                                    {col.heading}
                                  </div>
                                  <div className="space-y-0.5">
                                    {col.items.map((item) => {
                                      const IconComponent = item.icon;
                                      return (
                                        <button
                                          key={item.label}
                                          type="button"
                                          onClick={() => handleSubItemClick(item)}
                                          className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-blue-50/60 transition-colors flex items-start gap-2.5 group"
                                        >
                                          <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                            <IconComponent className="w-3.5 h-3.5" />
                                          </div>
                                          <div>
                                            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                              {item.label}
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-snug">
                                              {item.description}
                                            </p>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Right Column: Category 5 (Application Security) + Services Link */}
                            <div className="flex flex-col justify-between border-l border-slate-100 pl-6">
                              <div>
                                {category.columns.slice(4).map((col) => (
                                  <div key={col.heading}>
                                    <div className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold mb-1.5 px-2">
                                      {col.heading}
                                    </div>
                                    <div className="space-y-0.5">
                                      {col.items.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                          <button
                                            key={item.label}
                                            type="button"
                                            onClick={() => handleSubItemClick(item)}
                                            className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-blue-50/60 transition-colors flex items-start gap-2.5 group"
                                          >
                                            <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                              <IconComponent className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {item.label}
                                              </div>
                                              <p className="text-[11px] text-slate-500 leading-snug">
                                                {item.description}
                                              </p>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                                <button
                                  type="button"
                                  onClick={() => handleNavClick('solutions')}
                                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  <span>Explore All Solutions</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleNavClick('services')}
                                  className="text-xs font-mono text-slate-600 hover:text-blue-600"
                                >
                                  Security Services →
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/98 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-tri-lg p-4 space-y-4">
                          {category.columns.map((col, colIndex) => (
                            <div
                              key={col.heading}
                              className={colIndex > 0 ? 'pt-3 border-t border-slate-100' : ''}
                            >
                              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2 px-2">
                                {col.heading}
                              </div>
                              <div className="space-y-1">
                                {col.items.map((item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <button
                                      key={item.label}
                                      type="button"
                                      onClick={() => handleSubItemClick(item)}
                                      className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors flex items-start gap-3 group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                                          <span>{item.label}</span>
                                          {item.action === 'launch-platform' && (
                                            <ArrowUpRight className="w-3 h-3 text-blue-600" />
                                          )}
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Primary Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onLaunchPlatform}
              className="px-3.5 py-2 text-xs font-mono font-medium text-slate-700 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-slate-300 hover:border-blue-300 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-2xs"
              title="Open interactive Risk Platform Prototype"
            >
              <span>Explore Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              onClick={() => onOpenConsultation()}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-tri-sm whitespace-nowrap shrink-0"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onLaunchPlatform}
              className="px-2.5 py-1.5 text-xs font-mono text-blue-600 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <span>Platform</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[82vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'home'
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home Overview
            </button>

            {navCategories.map((category) => {
              const isExpanded = mobileExpandedCategory === category.id;
              const isActive = category.activeTabs.includes(currentTab);

              return (
                <div key={category.id} className="border-b border-slate-100 last:border-b-0 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleNavClick(category.defaultTab)}
                      className={`flex-1 text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {category.label}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpandedCategory(isExpanded ? null : category.id)
                      }
                      aria-label={`Toggle ${category.label} submenu`}
                      className="p-2.5 text-slate-500 hover:text-slate-900"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pl-4 pr-2 pb-2 space-y-2">
                      {category.columns.map((col) => (
                        <div key={col.heading} className="space-y-1">
                          {col.items.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => handleSubItemClick(item)}
                              className="w-full text-left px-2 py-1.5 rounded-md text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 block"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchPlatform();
              }}
              className="w-full text-center py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-mono flex items-center justify-center gap-1.5"
            >
              <span>Launch Platform Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
            >
              Book Security Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
