"use client";

import { useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcons";

interface ErrorPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoCloseMs?: number;
}

export default function ErrorPopup({ 
  message, 
  isVisible, 
  onClose, 
  autoCloseMs = 5000 
}: ErrorPopupProps) {
  
  // Function to format error message with highlighted key phrases
  const formatErrorMessage = (text: string) => {
    const keyPhrases = [
      { phrase: 'Invalid Credentials', importance: 'high' },
      { phrase: 'Authentication Failed', importance: 'high' },
      { phrase: 'Failed', importance: 'medium' },
      { phrase: 'Error', importance: 'medium' },
      { phrase: 'Denied', importance: 'medium' },
      { phrase: 'Unauthorized', importance: 'medium' }
    ];
    
    // Split text into sentences
    const sentences = text.split('.').filter(s => s.trim());
    
    return { __html: sentences.map((sentence, index) => {
      let formattedSentence = sentence.trim();
      let hasHighImportance = false;
      
      // Check for high importance phrases first
      keyPhrases.forEach(({ phrase, importance }) => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        if (formattedSentence.match(regex)) {
          if (importance === 'high') {
            hasHighImportance = true;
            formattedSentence = formattedSentence.replace(regex, 
              `<span class="font-extrabold text-red-800 bg-red-200/70 px-2 py-1 rounded-lg shadow-sm">${phrase}</span>`
            );
          } else {
            formattedSentence = formattedSentence.replace(regex, 
              `<span class="font-semibold text-red-700">${phrase}</span>`
            );
          }
        }
      });
      
      // Apply different styling based on importance
      if (hasHighImportance) {
        return `<div class="text-base font-medium text-gray-800 mb-2">${formattedSentence}</div>`;
      } else {
        return `<div class="text-sm text-gray-600">${formattedSentence}</div>`;
      }
    }).join('') };
  };
  
  useEffect(() => {
    if (isVisible && autoCloseMs > 0) {
      const timer = setTimeout(onClose, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseMs, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modern Blur Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-white/10 transition-all duration-500 ease-out"
        onClick={onClose}
      />
      
      {/* Modern Glass Modal */}
      <div 
        className="relative backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-500 ease-out"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Subtle Gradient Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400/30 via-orange-500/30 to-red-400/30 rounded-3xl opacity-80 blur-sm"></div>
        
        <div className="relative bg-white/95 rounded-3xl overflow-hidden">
          {/* Header with Custom Rounded Triangle Warning */}
          <div className="flex items-center justify-center pt-8 pb-6">
            <div className="relative">
              {/* Custom Rounded Triangle SVG */}
              <svg 
                width="76" 
                height="68" 
                viewBox="0 0 76 68" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg hover:scale-110 transition-transform duration-300"
              >
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#FEE2E2', stopOpacity: 1}} />
                    <stop offset="30%" style={{stopColor: '#FECACA', stopOpacity: 1}} />
                    <stop offset="70%" style={{stopColor: '#F87171', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#DC2626', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#B91C1C', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="triangleShadow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                    <feOffset dx="0" dy="3" result="offset"/>
                    <feFlood floodColor="rgba(239, 68, 68, 0.3)"/>
                    <feComposite in2="offset" operator="in"/>
                    <feMerge> 
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Main Triangle with Rounded Corners */}
                <path 
                  d="M38 6 
                     C39.5 6 40.8 6.8 41.5 8.2 
                     L67.8 50.2 
                     C69.2 52.8 67.4 56 64.3 56 
                     L11.7 56 
                     C8.6 56 6.8 52.8 8.2 50.2 
                     L34.5 8.2 
                     C35.2 6.8 36.5 6 38 6 Z" 
                  fill="url(#triangleGradient)"
                  stroke="url(#strokeGradient)"
                  strokeWidth="2"
                  filter="url(#triangleShadow)"
                />
                
                {/* Exclamation Mark - Line */}
                <rect 
                  x="35" 
                  y="20" 
                  width="6" 
                  height="22" 
                  rx="3" 
                  fill="white" 
                  opacity="0.95"
                />
                
                {/* Exclamation Mark - Dot */}
                <circle 
                  cx="38" 
                  cy="48" 
                  r="3.5" 
                  fill="white" 
                  opacity="0.95"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-6">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4 tracking-tight">
              Authentication Failed
            </h3>
            <div 
              className="text-center leading-relaxed space-y-1"
              dangerouslySetInnerHTML={formatErrorMessage(message)}
            />
          </div>

          {/* Modern Action Button */}
          <div className="px-8 pb-8">
            <button
              onClick={onClose}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)'
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <MaterialIcon name="refresh" className="text-lg" />
                <span>Try Again</span>
              </span>
            </button>
          </div>

          {/* Auto-close Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all ease-linear"
              style={{
                animation: isVisible ? `shrink ${autoCloseMs}ms linear` : 'none'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}