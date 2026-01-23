'use client';

import React, { useEffect, useState } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'classic' | 'dots' | 'pulse' | 'ring' | 'dual-ring';
  color?: string;
  className?: string;
  label?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const borderSizeClasses = {
  sm: 'border-2',
  md: 'border-2',
  lg: 'border-3',
  xl: 'border-4',
};

const speedClasses = {
  slow: 'duration-1000',
  normal: 'duration-700',
  fast: 'duration-400',
};

const defaultColor = '#771440';

export default function Spinner({
  size = 'md',
  variant = 'classic',
  color = defaultColor,
  className = '',
  label = 'Loading...',
  speed = 'normal',
}: SpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderSpinner = () => {
    const speedClass = speedClasses[speed];
    const sizeClass = sizeClasses[size];
    const borderClass = borderSizeClasses[size];

    switch (variant) {
      case 'dots':
        return (
          <div 
            className={`relative ${sizeClass} ${className}`}
            role="status"
            aria-label={label}
          >
            <div className="absolute inset-0 flex items-center justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-1/4 h-1/4 rounded-full animate-bounce`}
                  style={{
                    backgroundColor: color,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>
            <span className="sr-only">{label}</span>
          </div>
        );

      case 'pulse':
        return (
          <div 
            className={`relative ${sizeClass} ${className}`}
            role="status"
            aria-label={label}
          >
            <div 
              className={`absolute inset-0 rounded-full animate-ping ${speedClass}`}
              style={{ backgroundColor: `${color}40` }}
            />
            <div 
              className={`absolute inset-0 rounded-full ${borderClass}`}
              style={{ 
                borderColor: color,
                borderTopColor: 'transparent',
              }}
            />
            <span className="sr-only">{label}</span>
          </div>
        );

      case 'ring':
        return (
          <div 
            className={`relative ${sizeClass} ${className}`}
            role="status"
            aria-label={label}
          >
            <div className="absolute inset-0">
              <div 
                className={`w-full h-full rounded-full ${borderClass} animate-spin ${speedClass}`}
                style={{ 
                  borderColor: `${color}30`,
                  borderTopColor: color,
                  borderRightColor: color,
                  borderLeftColor: `${color}80`,
                }}
              />
            </div>
            <div 
              className={`absolute inset-1/4 rounded-full ${borderClass}`}
              style={{ 
                borderColor: `${color}60`,
                borderTopColor: `${color}20`,
                animation: `spin ${speedClass.replace('duration-', '')}ms linear infinite reverse`,
              }}
            />
            <span className="sr-only">{label}</span>
          </div>
        );

      case 'dual-ring':
        return (
          <div 
            className={`relative ${sizeClass} ${className}`}
            role="status"
            aria-label={label}
          >
            <div 
              className={`w-full h-full rounded-full ${borderClass} animate-spin ${speedClass}`}
              style={{ 
                borderColor: `${color}20`,
                borderTopColor: color,
                borderRightColor: `${color}60`,
              }}
            />
            <div 
              className={`absolute inset-1/4 rounded-full border ${borderClass} animate-spin ${speedClass}`}
              style={{ 
                borderColor: `${color}40`,
                borderBottomColor: color,
                borderLeftColor: `${color}80`,
                animationDirection: 'reverse',
              }}
            />
            <span className="sr-only">{label}</span>
          </div>
        );

      case 'classic':
      default:
        return (
          <div 
            className={`inline-block rounded-full ${borderClass} animate-spin ${speedClass} ${className}`}
            style={{ 
              width: sizeClasses[size],
              height: sizeClasses[size],
              borderColor: `${color}20`,
              borderTopColor: color,
            }}
            role="status"
            aria-label={label}
          >
            <span className="sr-only">{label}</span>
          </div>
        );
    }
  };

  if (!mounted) {
    return (
      <div 
        className={`inline-block rounded-full ${borderSizeClasses[size]} ${className}`}
        style={{ 
          width: sizeClasses[size],
          height: sizeClasses[size],
          borderColor: `${color}20`,
          borderTopColor: color,
        }}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return renderSpinner();
}

// Enhanced Full page spinner with gradient overlay
export function LoadingSpinner({ 
  text = 'Loading...', 
  size = 'lg',
  variant = 'dual-ring',
  className = '',
  background = 'gradient',
}: { 
  text?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: SpinnerProps['variant'];
  className?: string;
  background?: 'none' | 'blur' | 'gradient';
}) {
  const backgroundClasses = {
    none: '',
    blur: 'backdrop-blur-sm bg-white/5',
    gradient: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
  };

  return (
    <div className={`relative min-h-[400px] ${backgroundClasses[background]}`}>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${className}`}>
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute -inset-4 rounded-full blur-lg opacity-30 animate-pulse"
            style={{ backgroundColor: defaultColor }}
          />
          
          <Spinner 
            size={size} 
            variant={variant}
            speed="normal"
          />
        </div>
        
        {text && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-700 font-medium text-lg relative"
          >
            {text}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#771440]/30 to-transparent" />
          </motion.p>
        )}
      </div>
    </div>
  );
}

// Enhanced Inline spinner for buttons
export function ButtonSpinner({ 
  className = '',
  variant = 'classic',
}: { 
  className?: string;
  variant?: SpinnerProps['variant'];
}) {
  return (
    <Spinner 
      size="sm" 
      variant={variant}
      color="#ffffff"
      speed="fast"
      className={`mr-2 ${className}`} 
    />
  );
}

// Progress spinner with percentage
export function ProgressSpinner({
  progress = 0,
  size = 'lg',
  className = '',
  showPercentage = true,
}: {
  progress: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showPercentage?: boolean;
}) {
  const circumference = 2 * Math.PI * 45; // Assuming radius of 45 for the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={defaultColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <span 
          className="absolute text-lg font-bold"
          style={{ color: defaultColor }}
        >
          {progress}%
        </span>
      )}
    </div>
  );
}

// Floating spinner for modals/dialogs
export function FloatingSpinner({
  className = '',
  backdrop = true,
}: {
  className?: string;
  backdrop?: boolean;
}) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backdrop ? 'backdrop-blur-sm bg-black/10' : ''} ${className}`}>
      <div className="relative">
        {/* Pulsing ring effect */}
        <div 
          className="absolute -inset-4 rounded-full animate-ping"
          style={{ backgroundColor: `${defaultColor}20` }}
        />
        
        <Spinner 
          size="xl" 
          variant="ring"
          speed="normal"
        />
      </div>
    </div>
  );
}

// Add missing motion import
const motion = {
  p: ({ children, className, initial, animate, transition }: any) => (
    <p className={className}>{children}</p>
  )
};