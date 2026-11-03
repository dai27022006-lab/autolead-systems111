import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AutoLead Systems Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07182D] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0E2034] border border-orange-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center mx-auto text-[#F47721]">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black text-white">Đã xảy ra lỗi hiển thị</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống vừa khôi phục sau một lỗi giao diện tạm thời. Bạn có thể nhấn tải lại hoặc quay về trang chủ để tiếp tục trải nghiệm.
            </p>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono text-slate-400 text-left overflow-x-auto max-h-24">
                {String(this.state.error.message || this.state.error)}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#F47721] hover:bg-[#E76513] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tải lại trang</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-white/20 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
