/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, MessageSquare, Flame } from 'lucide-react';
const bannerImage = 'https://i.postimg.cc/rpgLSwks/MV5BYj-U2Zm-Fj-ODUt-Mzkw-NC00Yjk5LWJi-NTAt-Yzc1MWRi-Yj-A2Nj-Nl-Xk-Ey-Xk-Fqc-Gde-QXRy-YW5z-Y29k-ZS13b.jpg';

interface StreamPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUBTITLES = [
  { time: 1, text: "[🎵 EMOTIONAL CINEMATIC MUSIC PLAYING]" },
  { time: 4, text: "Narrator: \"They thought London would be a fresh start...\"" },
  { time: 8, text: "Noah: \"We can't keep doing this, Nick. It's too dangerous.\"" },
  { time: 13, text: "Nick: \"I don't care about the rules or what they say anymore.\"" },
  { time: 16, text: "[⚡ CAR TYRES SCREECHING]" },
  { time: 20, text: "Noah: \"If they catch us here, we lose everything!\"" },
  { time: 25, text: "[🌧️ RAIN PATTERING ON LONDON STREETS]" },
  { time: 29, text: "Nick: \"You know you're the only one I want.\"" },
  { time: 34, text: "[🔥 DRAMATIC ROMANTIC BEAT DROP]" }
];

export const StreamPlayerModal: React.FC<StreamPlayerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('1080p HD');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 40) {
            setIsPlaying(false);
            return 0; // loop or stop
          }
          return prev + 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Update subtitle based on current time
  useEffect(() => {
    if (!showSubtitles) {
      setCurrentSubtitle('');
      return;
    }
    const matchingSub = [...SUBTITLES]
      .reverse()
      .find((sub) => currentTime >= sub.time);
    setCurrentSubtitle(matchingSub ? matchingSub.text : '');
  }, [currentTime, showSubtitles]);

  if (!isOpen) return null;

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value, 10));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#0d111d] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-white uppercase">
              Your Fault London 2 Exclusive Preview Player
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 px-3.5 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white hover:border-pink-500 rounded-full transition-all"
          >
            Close
          </button>
        </div>

        {/* MOCK VIDEO CONTAINER */}
        <div className="relative aspect-video bg-black flex flex-col items-center justify-center group overflow-hidden border-b border-slate-850">
          
          {/* Unsplash Background / Simulation Frame */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 select-none"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${bannerImage})`,
              filter: isPlaying ? 'brightness(1.05) contrast(1.02)' : 'brightness(0.6)'
            }}
          />

          {/* Subtitles Overlay */}
          {currentSubtitle && (
            <div className="absolute bottom-18 left-4 right-4 text-center z-10 pointer-events-none">
              <span className="bg-black/85 text-yellow-300 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold border border-slate-800 tracking-wide font-sans shadow-lg">
                {currentSubtitle}
              </span>
            </div>
          )}

          {/* Center Play overlay */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="z-20 w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_24px_rgba(255,0,127,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all text-white"
            >
              <Play className="w-6 h-6 fill-current ml-1" />
            </button>
          )}

          {/* Dynamic Waves Simulation when playing */}
          {isPlaying && (
            <div className="absolute top-4 right-4 flex gap-1 bg-slate-950/80 border border-slate-800 px-2 py-1 rounded-md text-[8.5px] font-black tracking-widest text-[#00e676] items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-ping mr-1" />
              STREAM LIVE FEED
            </div>
          )}

          {/* WATERMARK */}
          <div className="absolute bottom-4 left-4 text-[9px] font-extrabold text-white/50 tracking-widest uppercase flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded">
            YOUR FAULT LONDON 2 PREVIEW
          </div>
        </div>

        {/* PLAY CONTROLLER BAR */}
        <div className="p-4 bg-slate-950 space-y-3.5">
          {/* Progress Seek range */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-medium text-slate-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="40"
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
            />
            <span className="text-[10px] font-mono font-medium text-slate-400">{formatTime(40)}</span>
          </div>

          {/* Control actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:border-pink-500/60 text-white transition-colors cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={() => setCurrentTime(0)}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Rewind"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Quality & Subtitles toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`px-2.5 py-1 border rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                  showSubtitles 
                    ? 'bg-pink-900/40 border-pink-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                CC Subtitles
              </button>

              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-[9px] font-extrabold text-white rounded-lg p-1 px-2 uppercase focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                <option value="1080p HD">1080p Ultra HD</option>
                <option value="720p HD">720p HD</option>
                <option value="480p SD">480p Stream</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  window.location.href = 'https://saveapp.store/cl/i/5nlp41';
                }}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM TIP */}
        <div className="p-4 bg-slate-900/60 text-left border-t border-slate-850 flex gap-2">
          <MessageSquare className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-slate-400">
            <span className="font-bold text-white uppercase">Pre-load instructions:</span> This preview uses standard high-efficiency web streams. To play full resolution movie offline with surround sound mixes, complete download below.
          </p>
        </div>
      </div>
    </div>
  );
};
