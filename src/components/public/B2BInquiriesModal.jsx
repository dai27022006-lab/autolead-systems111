import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Building2, User, Phone, Mail, MapPin, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getShowroomLeads } from '../../services/supabase';
import { EASINGS } from '../../utils/motion';

export default function B2BInquiriesModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('local');
  const shouldReduceMotion = useReducedMotion();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getShowroomLeads();
      if (res && res.success && Array.isArray(res.data)) {
        setLeads(res.data);
        setSource(res.source || 'local');
      }
    } catch (err) {
      console.warn('Failed to fetch showroom leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: EASINGS.gentleOut }}
            className="relative w-full max-w-4xl bg-[#0E2034] text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-[#07182D] border-b border-white/10 flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#F47721] flex items-center justify-center text-white shadow-md shrink-0 mt-0.5 sm:mt-0">
                  <Database className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-lg leading-snug">Danh Sách Đăng Ký Tư Vấn B2B</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#159B68]/20 border border-[#159B68]/40 text-[#75A94C] text-[10px] font-mono font-bold shrink-0">
                      Domain A ({leads.length} bản ghi)
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                    Lưu trữ: {source === 'supabase' ? 'Supabase Table "showroom_leads"' : source === 'express_server' ? 'Express API' : 'LocalStorage'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={fetchLeads}
                  disabled={loading}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Làm mới dữ liệu"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Table / List */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {leads.length === 0 ? (
                <div className="p-12 text-center space-y-3 rounded-2xl bg-white/5 border border-white/10">
                  <Building2 className="w-12 h-12 text-slate-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">Chưa có yêu cầu tư vấn nào được ghi nhận</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Hãy thử điền vào form "Đăng ký tư vấn 30 phút" trên trang chủ để xem luồng lưu trữ hoạt động.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((lead, idx) => (
                    <div
                      key={lead.id || idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F47721]/50 transition-all space-y-3 text-left"
                    >
                      <div className="flex items-start justify-between pb-2 border-b border-white/10">
                        <div>
                          <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-[#F47721]" />
                            <span>{lead.showroom_name || 'Showroom Ô Tô'}</span>
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            {lead.showroom_type === 'luxury'
                              ? 'Đại lý xe sang mới'
                              : lead.showroom_type === 'preowned'
                              ? 'Showroom xe lướt'
                              : 'Đa phân khúc'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {lead.monthly_lead_volume || '50-150'} leads/tháng
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.contact_name || 'Chưa có tên'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#75A94C]" />
                          <span className="font-mono text-white font-semibold">{lead.phone}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.showroom_location || 'Toàn quốc'}</span>
                        </div>
                      </div>

                      {lead.consultation_need && (
                        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-300">Nhu cầu: </span>
                          <span>{lead.consultation_need}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#07182D] flex items-center justify-between text-xs text-slate-400">
              <span>Đồng bộ từ Domain A • Showroom Leads</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
