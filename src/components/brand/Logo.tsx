import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'full' | 'symbol' | 'white';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  variant = 'full'
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }[size];

  const isWhite = variant === 'white';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      {/* Official HypenSec App Icon Logo */}
      <div className={`${iconDimensions} shrink-0 flex items-center justify-center`}>
        <img
          src="/assets/aistudio/hypensec-icon-dark_bb1d633d.png"
          alt="HypenSec Technologies"
          className={`w-full h-full object-contain ${isWhite ? 'brightness-0 invert' : ''}`}
          loading="eager"
        />
      </div>

      {variant !== 'symbol' && (
        <div className="flex flex-col leading-none">
          <div className={`font-display font-bold tracking-tight ${textSize} flex items-center`}>
            <span className={isWhite ? 'text-white' : 'text-slate-900'}>Hypen</span>
            <span className={isWhite ? 'text-cyan-400' : 'text-blue-600'}>Sec</span>
          </div>
          {showSubtitle && (
            <span className={`text-[10px] font-mono uppercase tracking-[0.18em] mt-0.5 ${isWhite ? 'text-slate-400' : 'text-slate-500'}`}>
              Technologies
            </span>
          )}
        </div>
      )}
    </div>
  );
};
