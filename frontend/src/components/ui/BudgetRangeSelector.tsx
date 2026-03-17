"use client"

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface BudgetRangeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const presets = [
  { label: "$5K", value: 5000 },
  { label: "$25K", value: 25000 },
  { label: "$100K", value: 100000 },
  { label: "$250K+", value: 250000 },
];

export function BudgetRangeSelector({
  value,
  onChange,
  min = 2500,
  max = 500000,
  className,
}: BudgetRangeSelectorProps) {
  const [inputValue, setInputValue] = useState(value);
  const sliderRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Formatting logic for K/Lakh
  const formatValue = (val: number) => {
    if (val >= 100000) {
      return `$${(val / 100000).toFixed(1)}L${val >= max ? "+" : ""}`;
    }
    return `$${val.toLocaleString()}`;
  };

  // Sync internal state with prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // GSAP animation for thumb interaction
  const handleThumbAnimate = (isHover: boolean) => {
    if (!thumbRef.current) return;
    gsap.to(thumbRef.current, {
      scale: isHover ? 1.2 : 1,
      boxShadow: isHover 
        ? "0 0 20px rgba(59, 130, 246, 0.5)" 
        : "0 4px 10px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power3.out"
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setInputValue(newVal);
    onChange(newVal);

    // Elastic effect on track update
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        scaleY: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  // Calculate percentage for gradient track
  const percentage = ((inputValue - min) / (max - min)) * 100;

  // Dynamic gradient based on budget level
  const getGradient = () => {
    if (inputValue < 50000) return "from-blue-500 to-blue-600";
    if (inputValue < 250000) return "from-blue-600 to-purple-600";
    return "from-purple-600 to-amber-500";
  };

  return (
    <div className={cn("space-y-6 select-none", className)}>
      <div className="flex items-end justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-tight text-black transition-all duration-300">
            {formatValue(inputValue)}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Project Investment Range
          </span>
        </div>
        
        <input 
          type="number"
          value={inputValue}
          onChange={(e) => {
            const val = Math.min(max, Math.max(min, parseInt(e.target.value) || min));
            setInputValue(val);
            onChange(val);
          }}
          className="w-24 text-right bg-transparent border-none text-sm font-medium text-slate-400 focus:outline-none focus:text-black transition-colors"
          min={min}
          max={max}
        />
      </div>

      <div className="relative h-12 flex items-center group">
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            ref={trackRef}
            className={cn("h-full bg-gradient-to-r transition-all duration-300", getGradient())}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real Input Range (hidden but functional) */}
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={1000}
          value={inputValue}
          onChange={handleSliderChange}
          onMouseEnter={() => handleThumbAnimate(true)}
          onMouseLeave={() => handleThumbAnimate(false)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual Thumb */}
        <div 
          ref={thumbRef}
          className="absolute w-6 h-6 bg-white border-[3px] border-black rounded-full shadow-lg z-10 pointer-events-none transition-transform duration-100"
          style={{ 
            left: `calc(${percentage}% - 12px)`,
            borderColor: inputValue > 250000 ? '#f59e0b' : (inputValue > 50000 ? '#7c3aed' : '#000')
          }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {formatValue(inputValue)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setInputValue(preset.value);
              onChange(preset.value);
              // Small animation on click
              if (thumbRef.current) {
                gsap.fromTo(thumbRef.current, 
                  { scale: 0.8 }, 
                  { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
                );
              }
            }}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border",
              inputValue === preset.value
                ? "bg-black text-white border-black shadow-md scale-105"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-black"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}


