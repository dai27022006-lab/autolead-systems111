import React, { useState, useEffect, useMemo } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

// Public Shared Components
import Navbar from './components/Navbar';
import Footer from './components/public/Footer';
import ConsultationModal from './components/public/ConsultationModal';
import B2BInquiriesModal from './components/public/B2BInquiriesModal';
import ScrollToTop from './components/ScrollToTop';

// Dedicated Subpages (Multi-page Architecture)
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import WorkflowPage from './pages/WorkflowPage';
import PricingPage from './pages/PricingPage';
import RoadmapPage from './pages/RoadmapPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import AllInOnePage from './pages/AllInOnePage';

// Buyer Portal Demo (Đại)
import BuyerDemo from './components/buyer/BuyerDemo';

// Dealer SaaS CRM & Operations Platform (Đại)
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
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

function PublicLayout({ children, onOpenContact, onOpenLeadViewer }) {
  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#142A43] flex flex-col font-sans">
      <Navbar
        onOpenContact={onOpenContact}
        onOpenLeadViewer={onOpenLeadViewer}
      />
      <main className="flex-1">{children}</main>
      <Footer onOpenLeadViewer={onOpenLeadViewer} />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // SaaS Tab & User authentication
  const [activeSaasTab, setActiveSaasTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(() => api.getCurrentUser());

  // Modal dialog states
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLeadViewerOpen, setIsLeadViewerOpen] = useState(false);

  // Live CRM State (Buyer Leads & Appointments)
  const [crmLeads, setCrmLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [b2bInquiries, setB2bInquiries] = useState([]);

  // Multi-tenant CRM Vehicle and Showroom Filters
  const [selectedVehicle, setSelectedVehicle] = useState('ALL');
  const [selectedShowroom, setSelectedShowroom] = useState('ALL');

  // Available vehicles list dynamically derived from mock data and leads
  const availableVehicles = useMemo(() => {
    const defaultList = [
      'Mercedes-Benz GLC 300 4MATIC 2024',
      'Mercedes-Benz E200 Exclusive 2024',
      'Mercedes-Benz C200 Avantgarde 2024',
      'Porsche Macan GTS 2023 (Lướt)',
      'BMW X5 xDrive40i M Sport',
      'Lexus RX 350 Premium 2023',
      'Audi Q5 Sportback 45 TFSI'
    ];
    const fromLeads = (crmLeads || []).map(l => l.interestedVehicle).filter(Boolean);
    return Array.from(new Set([...defaultList, ...fromLeads]));
  }, [crmLeads]);

  // Filtered CRM Leads
  const filteredCrmLeads = useMemo(() => {
    return (crmLeads || []).filter(lead => {
      if (!lead) return false;

      // Filter by vehicle
      if (selectedVehicle !== 'ALL') {
        const v = String(lead.interestedVehicle || '').toLowerCase();
        const target = selectedVehicle.toLowerCase();
        // Match either full vehicle string or primary model code (e.g. GLC 300, E200, Macan, X5)
        const parts = target.split(' ').filter(p => p.length > 2);
        const matchKeyword = parts.some(p => v.includes(p.toLowerCase()));
        if (!v.includes(target) && !target.includes(v) && !matchKeyword) {
          return false;
        }
      }

      // Filter by showroom/dealership
      if (selectedShowroom !== 'ALL') {
        const v = String(lead.interestedVehicle || '').toLowerCase();
        if (selectedShowroom.includes('Haxaco') || selectedShowroom.includes('Mercedes')) {
          if (!v.includes('mercedes') && !v.includes('c200') && !v.includes('e200') && !v.includes('glc') && !v.includes('c300')) return false;
        } else if (selectedShowroom.includes('Porsche')) {
          if (!v.includes('porsche') && !v.includes('macan') && !v.includes('cayenne')) return false;
        } else if (selectedShowroom.includes('568')) {
          if (!v.includes('bmw') && !v.includes('lexus') && !v.includes('audi') && !v.includes('lướt') && !v.includes('x5') && !v.includes('rx 350') && !v.includes('q5')) return false;
        }
      }

      return true;
    });
  }, [crmLeads, selectedVehicle, selectedShowroom]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return (appointments || []).filter(apt => {
      if (!apt) return false;

      if (selectedVehicle !== 'ALL') {
        const v = String(apt.vehicleModel || '').toLowerCase();
        const target = selectedVehicle.toLowerCase();
        const parts = target.split(' ').filter(p => p.length > 2);
        const matchKeyword = parts.some(p => v.includes(p.toLowerCase()));
        if (!v.includes(target) && !target.includes(v) && !matchKeyword) {
          return false;
        }
      }

      if (selectedShowroom !== 'ALL') {
        const v = String(apt.vehicleModel || '').toLowerCase();
        if (selectedShowroom.includes('Haxaco') || selectedShowroom.includes('Mercedes')) {
          if (!v.includes('mercedes') && !v.includes('c200') && !v.includes('e200') && !v.includes('glc') && !v.includes('c300')) return false;
        } else if (selectedShowroom.includes('Porsche')) {
          if (!v.includes('porsche') && !v.includes('macan') && !v.includes('cayenne')) return false;
        } else if (selectedShowroom.includes('568')) {
          if (!v.includes('bmw') && !v.includes('lexus') && !v.includes('audi') && !v.includes('lướt') && !v.includes('x5') && !v.includes('rx 350') && !v.includes('q5')) return false;
        }
      }

      return true;
    });
  }, [appointments, selectedVehicle, selectedShowroom]);

  // Filtered Campaigns
  const filteredCampaigns = useMemo(() => {
    return (campaigns || []).filter(camp => {
      if (!camp) return false;
      if (selectedVehicle !== 'ALL') {
        const c = String(camp.name || '').toLowerCase();
        const target = selectedVehicle.toLowerCase();
        const parts = target.split(' ').filter(w => w.length > 2);
        const hasMatch = parts.some(kw => c.includes(kw.toLowerCase()));
        if (!hasMatch && !c.includes(target)) return false;
      }
      return true;
    });
  }, [campaigns, selectedVehicle]);

  // Check legacy query params or hash on initial load for backwards compatibility
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'buyer' || viewParam === 'demo') {
      navigate('/demo');
    } else if (viewParam === 'saas' || viewParam === 'crm') {
      navigate('/crm');
    }
  }, []);

  // Load data on mount & route change
  useEffect(() => {
    loadData();
  }, [location.pathname]);

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

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  return (
    <>
      <Routes>
        {/* Dedicated Public Subpages (Mỗi mục là một trang riêng) */}
        <Route
          path="/"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <HomePage onOpenContact={() => setIsContactModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/solutions"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <SolutionsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/workflow"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <WorkflowPage />
            </PublicLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <PricingPage onOpenContact={() => setIsContactModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/roadmap"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <RoadmapPage />
            </PublicLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <FaqPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/all"
          element={
            <PublicLayout
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLeadViewer={() => setIsLeadViewerOpen(true)}
            >
              <AllInOnePage onOpenContact={() => setIsContactModalOpen(true)} />
            </PublicLayout>
          }
        />

        {/* Experience B: Buyer Portal Demo (Đại) */}
        <Route
          path="/demo"
          element={
            <div className="flex-1 flex flex-col bg-[#F8F9F5] text-[#142A43] min-h-screen">
              <header className="sticky top-0 z-40 bg-[#142A43] border-b border-white/10 px-2.5 sm:px-4 py-2 sm:py-3 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Link
                      to="/"
                      onClick={handleScrollTop}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F47721]" />
                      <span className="sm:hidden">← Về B2B</span>
                      <span className="hidden sm:inline">← Về Trang B2B Sales (Pixel World)</span>
                    </Link>
                    <span className="hidden md:inline text-xs text-slate-400 font-mono">|</span>
                    <span className="hidden md:inline text-xs font-semibold text-slate-300 truncate">
                      Cổng Mô Phỏng Khách Mua Xe (Buyer Portal)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to="/crm"
                      onClick={handleScrollTop}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="sm:hidden">Xem CRM →</span>
                      <span className="hidden sm:inline">Xem Kết Quả Trên CRM →</span>
                    </Link>
                  </div>
                </div>
              </header>

              <main className="flex-1">
                <BuyerDemo
                  onNavigateToCRM={() => {
                    navigate('/crm');
                    handleScrollTop();
                    loadData();
                  }}
                />
              </main>
            </div>
          }
        />
        <Route path="/buyer" element={<Navigate to="/demo" replace />} />

        {/* Experience C: Dealer SaaS CRM & Operations Platform (Đại) */}
        <Route
          path="/crm"
          element={
            <div className="flex-1 flex flex-col bg-[#F8F9F5] text-[#142A43] min-h-screen">
              <header className="sticky top-0 z-40 bg-[#142A43] border-b border-white/10 px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Link
                      to="/"
                      onClick={handleScrollTop}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F47721]" />
                      <span className="sm:hidden">← Về B2B</span>
                      <span className="hidden sm:inline">← Về Trang B2B Sales (Pixel World)</span>
                    </Link>
                    <span className="hidden md:inline text-xs text-slate-400 font-mono">|</span>
                    <span className="hidden md:inline text-xs font-semibold text-slate-300 truncate">
                      Hệ Thống CRM Điều Hành Showroom Ô Tô
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to="/demo"
                      onClick={handleScrollTop}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="sm:hidden">Buyer Demo</span>
                      <span className="hidden sm:inline">Chạy Thử Buyer Demo</span>
                    </Link>

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
                    onBackToBuyer={() => navigate('/')}
                  />
                ) : (
                  <SaasLayout
                    activeTab={activeSaasTab}
                    setActiveTab={setActiveSaasTab}
                    onBackToPublic={() => navigate('/')}
                    onResetData={handleResetData}
                    leadsCount={filteredCrmLeads.length}
                    totalLeadsCount={crmLeads.length}
                    b2bCount={b2bInquiries.length}
                    selectedVehicle={selectedVehicle}
                    setSelectedVehicle={setSelectedVehicle}
                    selectedShowroom={selectedShowroom}
                    setSelectedShowroom={setSelectedShowroom}
                    availableVehicles={availableVehicles}
                    filteredLeadsCount={filteredCrmLeads.length}
                    filteredAptsCount={filteredAppointments.length}
                  >
                    {activeSaasTab === 'overview' && (
                      <DashboardOverview
                        leads={filteredCrmLeads}
                        appointments={filteredAppointments}
                        campaigns={filteredCampaigns}
                        onNavigateToTab={(tabId) => setActiveSaasTab(tabId)}
                      />
                    )}

                    {activeSaasTab === 'leads' && (
                      <LeadManagement
                        leads={filteredCrmLeads}
                        onUpdateLeadStatus={handleUpdateLeadStatus}
                        onAddLead={handleAddLead}
                        onUpdateLead={handleUpdateLead}
                      />
                    )}

                    {activeSaasTab === 'qualification' && (
                      <LeadQualification
                        leads={filteredCrmLeads}
                        onUpdateLead={handleUpdateLead}
                        onOpenCreateAppointment={() => {
                          setActiveSaasTab('appointments');
                        }}
                      />
                    )}

                    {activeSaasTab === 'appointments' && (
                      <AppointmentManagement
                        appointments={filteredAppointments}
                        leads={filteredCrmLeads}
                        onAddAppointment={handleAddAppointment}
                        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                      />
                    )}

                    {activeSaasTab === 'campaigns' && (
                      <CampaignManagement
                        campaigns={filteredCampaigns}
                        onAddCampaign={handleAddCampaign}
                      />
                    )}

                    {activeSaasTab === 'ai-assistant' && (
                      <AiAssistant leads={filteredCrmLeads} />
                    )}

                    {activeSaasTab === 'analytics' && (
                      <AnalyticsReporting
                        leads={filteredCrmLeads}
                        appointments={filteredAppointments}
                        campaigns={filteredCampaigns}
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
          }
        />
        <Route path="/dealer" element={<Navigate to="/crm" replace />} />
        <Route path="/saas" element={<Navigate to="/crm" replace />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
}
