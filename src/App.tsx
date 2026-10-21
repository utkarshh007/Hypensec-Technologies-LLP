import { useState } from 'react';
import { Navbar, ProductSuiteId, SolutionCategoryId, ServiceCategoryId } from './components/website/Navbar';
import { Footer } from './components/website/Footer';
import { HomeView } from './components/website/HomeView';
import { ServicesView } from './components/website/ServicesView';
import { SolutionsView } from './components/website/SolutionsView';
import { PlatformView } from './components/website/PlatformView';
import { ResourcesView } from './components/website/ResourcesView';
import { AboutView } from './components/website/AboutView';
import { ContactModal } from './components/website/ContactModal';

export default function App() {
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

  return (
    <div className="min-h-screen theme-aura-canvas text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Top 3-Zone Executive Header */}
      <Navbar
        currentTab={websiteTab}
        onSelectTab={handleSelectTab}
        onOpenConsultation={(interest) => handleOpenConsultation(interest)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {websiteTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onOpenConsultation={(interest) => handleOpenConsultation(interest)}
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
            onOpenConsultation={(topic) => handleOpenConsultation(topic || 'Product Suite Architecture')}
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
