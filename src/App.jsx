import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

// Part A: Public B2B Website components (16-Bit Pixel Art - Thắng)
import Hero from './components/public/Hero';
import Highlights from './components/public/Highlights';
import Problems from './components/public/Problems';
import Solutions from './components/public/Solutions';
import HowItWorks from './components/public/HowItWorks';
import Pricing from './components/public/Pricing';
import Roadmap from './components/public/Roadmap';
import CommitmentsAndFaq from './components/public/CommitmentsAndFaq';
import ConsultationForm from './components/public/ConsultationForm';
import ConsultationModal from './components/public/ConsultationModal';
import B2BInquiriesModal from './components/public/B2BInquiriesModal';
import Footer from './components/public/Footer';

// Part B: Buyer Portal Demo (5-Step Customer Journey - Đại)
import BuyerDemo from './components/buyer/BuyerDemo';

// Part C: Dealer SaaS CRM & Operations Platform (Đại)
import SaasLayout from './components/saas/SaasLayout';
import DashboardOverview from './components/saas/DashboardOverview';
import LeadManagement from './components/saas/LeadManagement';
import LeadQualification from './components/saas/LeadQualification';
import AppointmentManagement from './components/saas/AppointmentManagement';
import CampaignManagement from './components/saas/CampaignManagement';
import AiAssistant from './components/saas/AiAssistant';
import AnalyticsReporting from './components/saas/AnalyticsReporting';
import B2BInquiriesViewer from './components/saas/B2BInquiriesViewer';
import DealershipSettings from './components/saas/DealershipSettings';
import DealerLogin from './components/saas/DealerLogin';

import { api } from './services/api';
import { storageService } from './services/storage';
import { ArrowLeft, Sparkles, ShieldCheck, Database, LayoutDashboard } from 'lucide-react';

export default function App() {
  // Determine initial view from URL hash or query params
  const getInitialView = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');

    if (hash === '#demo' || viewParam === 'buyer' || viewParam === 'demo') {
      return 'buyer';
    }
    if (hash === '#crm' || viewParam === 'saas' || viewParam === 'crm') {
      return 'saas';
    }
    return 'public'; // Default entry experience: Public B2B Sales Page
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [activeSaasTab, setActiveSaasTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(() => api.getCurrentUser());

  // Modal dialog states for Public B2B Sale Page
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLeadViewerOpen, setIsLeadViewerOpen] = useState(false);

  // Live CRM State (Domain B: Buyer Leads & Appointments)
  const [crmLeads, setCrmLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [b2bInquiries, setB2bInquiries] = useState([]);

  // Listen to browser hash changes for seamless navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#demo') {
        setCurrentView('buyer');
      } else if (hash === '#crm') {
        setCurrentView('saas');
      } else if (hash === '#hero' || hash === '' || hash.startsWith('#problems') || hash.startsWith('#pricing')) {
        // Stay on public or switch to public
        if (currentView !== 'public' && !hash.includes('demo') && !hash.includes('crm')) {
          setCurrentView('public');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Load data on mount & view change
  useEffect(() => {
    loadData();
  }, [currentView]);

  const loadData = async () => {
    const leads = await api.getDealerLeads();
    const apts = await api.getDealerAppointments();
    const inqs = await api.getB2BInquiries();
    const camps = storageService.getCampaigns();

    setCrmLeads(leads || []);
    setAppointments(apts || []);
    setB2bInquiries(inqs || []);
    setCampaigns(camps || []);
  };

  // Switch View Helpers with Hash Updates
  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    if (viewName === 'buyer') {
      window.location.hash = '#demo';
    } else if (viewName === 'saas') {
      window.location.hash = '#crm';
    } else {
      window.location.hash = '#hero';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for CRM operations
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    await api.updateLeadStatus(leadId, newStatus);
    const leads = await api.getDealerLeads();
    setCrmLeads(leads);
  };

  const handleAddLead = async (leadData) => {
    await api.createBuyerLead(leadData);
    const leads = await api.getDealerLeads();
    setCrmLeads(leads);
  };

  const handleUpdateLead = async (updatedLead) => {
    storageService.updateCRMLead(updatedLead);
    const leads = await api.getDealerLeads();
    setCrmLeads(leads);
  };

  const handleAddAppointment = async (aptData) => {
    await api.bookAppointment(aptData);
    const apts = await api.getDealerAppointments();
    const leads = await api.getDealerLeads();
    setAppointments(apts);
    setCrmLeads(leads);
  };

  const handleUpdateAppointmentStatus = async (aptId, newStatus) => {
    await api.updateAppointmentStatus(aptId, newStatus);
    const apts = await api.getDealerAppointments();
    setAppointments(apts);
  };

  const handleAddCampaign = (campaignData) => {
    storageService.addCampaign(campaignData);
    setCampaigns(storageService.getCampaigns());
  };

  const handleResetData = async () => {
    await api.resetDatabase();
    await loadData();
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#142A43] flex flex-col font-sans">
      {/* =========================================================================
          EXPERIENCE A: PUBLIC B2B SALES WEBSITE (THẮNG - 16-BIT PIXEL ART)
      ========================================================================= */}
      {currentView === 'public' && (
        <div className="flex-1 flex flex-col">
          {/* Public Navbar */}
          <Navbar
            currentView={currentView}
            onOpenContact={() => setIsContactModalOpen(true)}
            onOpenMvpDemo={() => navigateToView('buyer')}
            onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            onOpenSaas={() => navigateToView('saas')}
          />

          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenMvpDemo={() => navigateToView('buyer')}
              onOpenSaas={() => navigateToView('saas')}
            />

            {/* 2. Operational Highlights */}
            <Highlights />

            {/* 3. Problems Faced by Showrooms */}
            <Problems />

            {/* 4. 6 Core Solutions */}
            <Solutions />

            {/* 5. 5-Step Operational Workflow (Racetrack) */}
            <HowItWorks />

            {/* 6. Pricing & Dynamic ROI Calculator */}
            <Pricing onOpenContact={() => setIsContactModalOpen(true)} />

            {/* 7. 30-Day Implementation Roadmap */}
            <Roadmap />

            {/* 8. Service Commitments & FAQ */}
            <CommitmentsAndFaq />

            {/* 9. In-Page Consultation Registration Section */}
            <ConsultationForm />
          </main>

          {/* 10. Pixel Art Footer */}
          <Footer
            onOpenMvpDemo={() => navigateToView('buyer')}
            onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            onOpenSaas={() => navigateToView('saas')}
          />

          {/* Pop-up Consultation Modal */}
          <ConsultationModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />

          {/* Pop-up B2B Inquiries Manager Modal */}
          <B2BInquiriesModal
            isOpen={isLeadViewerOpen}
            onClose={() => setIsLeadViewerOpen(false)}
          />
        </div>
      )}

      {/* =========================================================================
          EXPERIENCE B: BUYER PORTAL DEMO (ĐẠI - 5-STEP TEST DRIVE JOURNEY)
      ========================================================================= */}
      {currentView === 'buyer' && (
        <div className="flex-1 flex flex-col bg-[#0b1019] text-[#F7F7F5]">
          {/* Seamless Experience Switcher Top Banner */}
          <header className="sticky top-0 z-40 bg-[#142A43] border-b border-white/10 px-4 py-3 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigateToView('public')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#F47721]" />
                  <span>← Về Trang B2B Sales (Pixel World)</span>
                </button>
                <span className="hidden sm:inline text-xs text-slate-400 font-mono">|</span>
                <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                  Cổng Mô Phỏng Khách Mua Xe (Buyer Portal)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateToView('saas')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Xem Kết Quả Trên CRM →</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <BuyerDemo
              onNavigateToCRM={() => {
                navigateToView('saas');
                loadData();
              }}
            />
          </main>
        </div>
      )}

      {/* =========================================================================
          EXPERIENCE C: DEALER SAAS CRM & OPERATIONS PLATFORM (ĐẠI)
      ========================================================================= */}
      {currentView === 'saas' && (
        <div className="flex-1 flex flex-col bg-[#0b1019] text-[#F7F7F5]">
          {/* Seamless Experience Switcher Top Banner */}
          <header className="sticky top-0 z-40 bg-[#07182D] border-b border-white/10 px-4 py-2.5 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigateToView('public')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#F47721]" />
                  <span>← Về Trang B2B Sales (Pixel World)</span>
                </button>
                <span className="hidden sm:inline text-xs text-slate-400 font-mono">|</span>
                <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                  Hệ Thống CRM Điều Hành Showroom Ô Tô
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateToView('buyer')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
                  <span>Chạy Thử Buyer Demo</span>
                </button>

                {currentUser && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1">
            {!currentUser ? (
              <DealerLogin
                onLoginSuccess={(user) => {
                  setCurrentUser(user);
                  loadData();
                }}
                onBackToBuyer={() => navigateToView('public')}
              />
            ) : (
              <SaasLayout
                activeTab={activeSaasTab}
                setActiveTab={setActiveSaasTab}
                onBackToPublic={() => navigateToView('public')}
                onResetData={handleResetData}
                leadsCount={crmLeads.length}
                b2bCount={b2bInquiries.length}
              >
                {activeSaasTab === 'overview' && (
                  <DashboardOverview
                    leads={crmLeads}
                    appointments={appointments}
                    campaigns={campaigns}
                    onNavigateToTab={(tabId) => setActiveSaasTab(tabId)}
                  />
                )}

                {activeSaasTab === 'leads' && (
                  <LeadManagement
                    leads={crmLeads}
                    onUpdateLeadStatus={handleUpdateLeadStatus}
                    onAddLead={handleAddLead}
                    onUpdateLead={handleUpdateLead}
                  />
                )}

                {activeSaasTab === 'qualification' && (
                  <LeadQualification
                    leads={crmLeads}
                    onUpdateLead={handleUpdateLead}
                    onOpenCreateAppointment={() => {
                      setActiveSaasTab('appointments');
                    }}
                  />
                )}

                {activeSaasTab === 'appointments' && (
                  <AppointmentManagement
                    appointments={appointments}
                    leads={crmLeads}
                    onAddAppointment={handleAddAppointment}
                    onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                  />
                )}

                {activeSaasTab === 'campaigns' && (
                  <CampaignManagement
                    campaigns={campaigns}
                    onAddCampaign={handleAddCampaign}
                  />
                )}

                {activeSaasTab === 'ai-assistant' && (
                  <AiAssistant leads={crmLeads} />
                )}

                {activeSaasTab === 'analytics' && (
                  <AnalyticsReporting
                    leads={crmLeads}
                    appointments={appointments}
                    campaigns={campaigns}
                  />
                )}

                {activeSaasTab === 'b2b-leads' && (
                  <B2BInquiriesViewer inquiries={b2bInquiries} />
                )}

                {activeSaasTab === 'settings' && (
                  <DealershipSettings onResetData={handleResetData} />
                )}
              </SaasLayout>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
