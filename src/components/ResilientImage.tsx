import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Sahyadri Mountain Landscape',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#183C32] text-[#F5F0E7] p-6 text-center ${className}`}
      >
        <Mountain className="w-8 h-8 text-[#D68A45] mb-3" strokeWidth={1.5} />
        <p className="font-editorial text-lg font-normal tracking-tight">{fallbackTitle}</p>
        <p className="text-xs text-[#C9B99D] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
