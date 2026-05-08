'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
}

export default function PageHeader({
  icon,
  title,
  subtitle,
  gradient,
  backHref,
  backLabel,
  children,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className={`relative overflow-hidden bg-gradient-to-l ${gradient} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        {backHref && (
          <button
            onClick={() => router.push(backHref)}
            className="flex items-center gap-1 text-white/80 hover:text-white mb-3 text-sm transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            {backLabel || 'חזרה'}
          </button>
        )}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
        </div>
        <p className="text-white/80 text-sm leading-relaxed max-w-2xl">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
