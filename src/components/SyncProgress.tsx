/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Check, RefreshCw, ExternalLink } from 'lucide-react';

interface SyncProgressProps {
  onComplete: () => void;
  format: string;
  quality: string;
  packType: string;
}

export const SyncProgress: React.FC<SyncProgressProps> = ({
  onComplete,
  format,
  quality,
  packType
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress interval (takes around 1.2 seconds to complete)
    const totalDuration = 1200;
    const updateInterval = 40;
    const totalSteps = totalDuration / updateInterval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Determine each step's status
  // 'pending' | 'active' | 'completed'
  const getStepStatus = (stepId: number) => {
    if (stepId === 1) {
      if (progress >= 33) return 'completed';
      return 'active';
    }
    if (stepId === 2) {
      if (progress >= 66) return 'completed';
      if (progress >= 33) return 'active';
      return 'pending';
    }
    if (stepId === 3) {
      if (progress >= 100) return 'completed';
      if (progress >= 66) return 'active';
      return 'pending';
    }
    return 'pending';
  };

  const renderStepIcon = (stepId: number) => {
    const status = getStepStatus(stepId);
    if (status === 'completed') {
      return (
        <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center flex-shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[3.5]" />
        </div>
      );
    }
    if (status === 'active') {
      return (
        <div className="w-6 h-6 rounded-full border border-pink-500 bg-pink-500/10 text-pink-500 flex items-center justify-center flex-shrink-0 font-extrabold text-[11px] animate-pulse">
          {stepId}
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full border border-slate-800 bg-slate-950 text-slate-500 flex items-center justify-center flex-shrink-0 font-extrabold text-[11px]">
        {stepId}
      </div>
    );
  };

  const getStepClass = (stepId: number) => {
    const status = getStepStatus(stepId);
    if (status === 'completed') {
      return 'text-white font-extrabold';
    }
    if (status === 'active') {
      return 'text-pink-500 font-extrabold';
    }
    return 'text-slate-600 font-bold';
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Large Circular Spinning Loader */}
      <div className="flex justify-center my-6">
        <div className="w-22 h-22 rounded-full border-4 border-pink-500 flex items-center justify-center relative shadow-[0_0_20px_rgba(236,72,153,0.3)]">
          <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" style={{ animationDuration: '2.5s' }} />
        </div>
      </div>

      {/* 2. Heading "SYNCING FILES..." */}
      <h2 className="text-xl font-black tracking-[0.2em] text-white uppercase mt-4 mb-8 font-mono">
        SYNCING FILES...
      </h2>

      {/* 3. Steps Progress list */}
      <div className="w-full bg-[#0a0d18] border border-slate-900/60 rounded-2xl p-6.5 mb-8 text-left space-y-5">
        
        {/* Step 1 */}
        <div className="flex items-center gap-4">
          {renderStepIcon(1)}
          <span className={`text-[11.5px] uppercase tracking-wider leading-relaxed ${getStepClass(1)}`}>
            ESTABLISHING SECURE TLS MIRROR ALLOCATION...
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-4">
          {renderStepIcon(2)}
          <span className={`text-[11.5px] uppercase tracking-wider leading-relaxed ${getStepClass(2)}`}>
            CACHING MEDIA PACKAGES AND SPECIALS...
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-4">
          {renderStepIcon(3)}
          <span className={`text-[11.5px] uppercase tracking-wider leading-relaxed ${getStepClass(3)}`}>
            GENERATING SECURE ROUTING TUNNEL...
          </span>
        </div>

      </div>

      {/* 4. Progress bar */}
      <div className="w-full h-2.5 bg-[#111625] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 5. Status line inline below progress bar */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-500 mb-8 animate-pulse">
        <RefreshCw className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '2s' }} />
        <span>REDIRECTING TO DOWNLOAD MIRROR NODE SECURELY...</span>
      </div>

      {/* 6. Failover Redirect Button */}
      <button
        onClick={() => onComplete()}
        className="flex items-center justify-center gap-2 text-[11px] font-bold text-pink-500 uppercase tracking-wider hover:text-pink-400 active:scale-95 transition-all outline-none"
      >
        <span>CLICK HERE IF YOU ARE NOT AUTOMATICALLY REDIRECTED</span>
        <ExternalLink className="w-4 h-4 text-pink-500" />
      </button>
    </div>
  );
};
