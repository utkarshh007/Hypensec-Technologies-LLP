import React, { useState } from 'react';
import { Navbar, ProductSuiteId, SolutionCategoryId, ServiceCategoryId } from './components/website/Navbar';
import { Footer } from './components/website/Footer';
import { HomeView } from './components/website/HomeView';
import { ServicesView } from './components/website/ServicesView';
import { SolutionsView } from './components/website/SolutionsView';
import { PlatformView } from './components/website/PlatformView';
import { ResourcesView } from './components/website/ResourcesView';
import { AboutView } from './components/website/AboutView';
import { ContactModal } from './components/website/ContactModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

export default function App() {
  const [viewMode, setViewMode] = useState<'website' | 'dashboard'>('website');
  const [websiteTab, setWebsiteTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<ProductSuiteId>('trever-ttx');
  const [selectedSolutionCategoryId, setSelectedSolutionCategoryId] = useState<SolutionCategoryId>('security-management');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategoryId>('vapt');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationInterest, setConsultationInterest] = useState<string>('Vulnerability Assessment and Penetration Testing');

  const handleOpenConsultation = (interest?: string) => {
    if (interest) setConsultationInterest(interest);
    setIsConsultationOpen(true);
  };

  const handleLaunchPlatform = () => {
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitToWebsite = () => {
    setViewMode('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (
    tab: string,
    productId?: ProductSuiteId,
    solutionCategoryId?: SolutionCategoryId,
    serviceId?: ServiceCategoryId
  ) => {
    const resolvedTab = tab === 'customers' ? 'services' : tab;
    setWebsiteTab(resolvedTab);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (solutionCategoryId) {
      setSelectedSolutionCategoryId(solutionCategoryId);
    }
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing the SaaS Product Prototype:
  if (viewMode === 'dashboard') {
    return (
      <DashboardLayout
        onExitToWebsite={handleExitToWebsite}
        onOpenConsultation={() => handleOpenConsultation('SaaS Platform Enterprise Deployment')}
      />
    );
  }

  // Website View:
  return (
    <div className="min-h-screen theme-aura-canvas text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Top 3-Zone Executive Header */}
      <Navbar
        currentTab={websiteTab}
        onSelectTab={handleSelectTab}
        onOpenConsultation={(interest) => handleOpenConsultation(interest)}
        onLaunchPlatform={handleLaunchPlatform}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {websiteTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onOpenConsultation={(interest) => handleOpenConsultation(interest)}
            onLaunchPlatform={handleLaunchPlatform}
          />
        )}

        {websiteTab === 'services' && (
          <ServicesView
            selectedServiceId={selectedServiceId}
            onSelectService={setSelectedServiceId}
            onOpenConsultation={(title) => handleOpenConsultation(title)}
          />
        )}

        {websiteTab === 'solutions' && (
          <SolutionsView
            selectedCategoryId={selectedSolutionCategoryId}
            onSelectCategory={setSelectedSolutionCategoryId}
            onOpenConsultation={(title) => handleOpenConsultation(title)}
          />
        )}

        {(websiteTab === 'platform' || websiteTab === 'product') && (
          <PlatformView
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            onLaunchPlatform={handleLaunchPlatform}
            onOpenConsultation={(topic) => handleOpenConsultation(topic || 'Platform Demo Scoping')}
          />
        )}

        {websiteTab === 'resources' && (
          <ResourcesView
            onOpenConsultation={() => handleOpenConsultation('Technical Advisory Discussion')}
          />
        )}

        {(websiteTab === 'about' || websiteTab === 'company') && (
          <AboutView
            onOpenConsultation={() => handleOpenConsultation('General Corporate Engagement')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenConsultation={() => handleOpenConsultation()}
        onLaunchPlatform={handleLaunchPlatform}
      />

      {/* Contact & Consultation Dialog */}
      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialInterest={consultationInterest}
      />
    </div>
  );
}
