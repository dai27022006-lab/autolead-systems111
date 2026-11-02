import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-autolead.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes('placeholder') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

/**
 * Submit B2B Showroom Consultation Lead (Domain A)
 * Primary: Supabase table 'showroom_leads'
 * Secondary: Express server '/api/dealer/b2b-inquiries'
 * Tertiary: LocalStorage cache 'autolead_demo_leads'
 */
export async function submitShowroomLead(leadData) {
  const payload = {
    contact_name: (leadData.contact_name || '').trim(),
    showroom_name: (leadData.showroom_name || '').trim(),
    phone: (leadData.phone || '').trim(),
    email: (leadData.email || '').trim() || null,
    showroom_type: leadData.showroom_type || 'luxury',
    consultation_need: (leadData.consultation_need || '').trim() || null,
    showroom_location: (leadData.showroom_location || '').trim() || 'Toàn quốc',
    monthly_lead_volume: leadData.monthly_lead_volume || '50-150',
    consent: Boolean(leadData.consent),
    created_at: new Date().toISOString()
  };

  // 1. Try Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('showroom_leads')
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        // Also save a copy to local cache
        saveToLocalCache(data);
        return {
          success: true,
          source: 'supabase',
          message: 'Yêu cầu tư vấn đã được lưu thành công vào Supabase!',
          data
        };
      }
      console.warn('[Supabase Warning] Direct insert failed, attempting backend fallback:', error);
    } catch (sbErr) {
      console.warn('[Supabase Exception] Falling back to backend API:', sbErr);
    }
  }

  // 2. Fallback to Express backend /api/dealer/b2b-inquiries
  try {
    const res = await fetch('/api/dealer/b2b-inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) {
        saveToLocalCache(json.data);
        return {
          success: true,
          source: 'express_server',
          message: 'Yêu cầu tư vấn đã được lưu thành công vào máy chủ AutoLead!',
          data: json.data
        };
      }
    }
  } catch (apiErr) {
    console.warn('[Backend Warning] Express API unreachable, falling back to local storage:', apiErr);
  }

  // 3. Fallback to LocalStorage
  const localRecord = {
    id: `local-b2b-${Date.now()}`,
    ...payload
  };
  saveToLocalCache(localRecord);

  return {
    success: true,
    source: 'local_storage',
    message: 'Yêu cầu tư vấn đã được ghi nhận vào bộ nhớ trình duyệt (chế độ Demo)!',
    data: localRecord
  };
}

/**
 * Fetch B2B Showroom Leads for manager viewer
 */
export async function getShowroomLeads() {
  // 1. Try Supabase
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('showroom_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return { success: true, source: 'supabase', data };
      }
    } catch (sbErr) {
      console.warn('[Supabase fetch error]:', sbErr);
    }
  }

  // 2. Try Express backend
  try {
    const res = await fetch('/api/dealer/b2b-inquiries');
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data)) {
        return { success: true, source: 'express_server', data: json.data };
      }
    }
  } catch (apiErr) {
    console.warn('[Backend fetch error]:', apiErr);
  }

  // 3. Try LocalStorage
  try {
    const cached = JSON.parse(localStorage.getItem('autolead_demo_leads') || '[]');
    return { success: true, source: 'local_storage', data: cached };
  } catch {
    return { success: true, source: 'empty', data: [] };
  }
}

function saveToLocalCache(item) {
  try {
    const existing = JSON.parse(localStorage.getItem('autolead_demo_leads') || '[]');
    const filtered = existing.filter((x) => x.id !== item.id && x.phone !== item.phone);
    filtered.unshift(item);
    localStorage.setItem('autolead_demo_leads', JSON.stringify(filtered.slice(0, 50)));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}
