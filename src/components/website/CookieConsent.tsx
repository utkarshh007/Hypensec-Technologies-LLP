import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean; // Always true
  performance: boolean;
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'hypensec_cookie_consent_v1';

export const CookieConsent: React.FC<{
  forceOpen?: boolean;
  onCloseForce?: () => void;
}> = ({ forceOpen = false, onCloseForce }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: true,
    analytics: false,
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
        if (!forceOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, [forceOpen]);

  const handleSavePreferences = (customPrefs: CookiePreferences) => {
    const dataToSave = {
      ...customPrefs,
      essential: true,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Storage resilience
    }
    setPreferences(dataToSave);
    setIsVisible(false);
    if (onCloseForce) onCloseForce();
  };

  const handleAcceptAll = () => {
    handleSavePreferences({
      essential: true,
      performance: true,
      analytics: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleEssentialOnly = () => {
    handleSavePreferences({
      essential: true,
      performance: false,
      analytics: false,
      timestamp: new Date().toISOString()
    });
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 animate-in slide-in-from-bottom-6 fade-in duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-slate-100 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                Privacy & Data Security
              </span>
              <h3 id="cookie-consent-title" className="text-sm font-bold text-white leading-tight">
                Cookie & Telemetry Preferences
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Close cookie consent banner with essential cookies only"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p id="cookie-consent-desc" className="text-xs text-slate-300 leading-relaxed">
          HypenSec Technologies uses essential cookies for secure session routing and platform operation. Optional performance telemetry helps us optimize risk calculations and platform responsiveness under strict mutual non-disclosure.
        </p>

        {/* Customization Category Accordion */}
        {showCustomize && (
          <div className="pt-2 border-t border-slate-800 space-y-3 animate-in fade-in duration-200">
            {/* Essential Category */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="space-y-0.5 pr-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Strictly Necessary</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">Always Active</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Required for security token verification, session persistence, and CSRF protection.
                </p>
              </div>
            </div>

            {/* Performance Telemetry */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-semibold text-white">Security & Performance Telemetry</div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Measures platform calculation latency, API response health, and feature load times.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.performance}
                  onChange={(e) => setPreferences((p) => ({ ...p, performance: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Analytics Category */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-semibold text-white">Aggregated Analytics</div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Anonymized navigation trends to improve security advisory publications and UX workflows.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setShowCustomize(!showCustomize)}
            className="text-slate-400 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 py-1"
          >
            <span>{showCustomize ? 'Hide Preferences' : 'Customize Preferences'}</span>
            {showCustomize ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2">
            {showCustomize ? (
              <button
                type="button"
                onClick={() => handleSavePreferences(preferences)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Selection</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-colors border border-slate-700"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition-colors shadow-xs font-semibold"
                >
                  Accept All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
