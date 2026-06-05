'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  FileQuestion,
  GraduationCap,
  FileSearch,
  Map,
  GitBranch,
  Grid3X3,
  Hash,
  Target,
  ScrollText,
  ClipboardCheck,
  Bug,
  Menu,
  X,
  Calendar,
  Layers,
  Crosshair,
  FileCheck,
  Ruler,
  Trophy,
  Printer,
  Link2,
  Swords,
  Calculator,
  Brain,
} from 'lucide-react';

interface NavItem {
  href: string;
  labelHe: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'מועד ג — חובה לפני המבחן',
    items: [
      { href: '/', labelHe: 'לוח בקרה', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/battle-plan', labelHe: '⚔️ תוכנית קרב', icon: <Swords className="w-5 h-5" />, highlight: true },
      { href: '/weekly-schedule', labelHe: '📅 לוז שבועי (סמסטר ב\')', icon: <Calendar className="w-5 h-5" />, highlight: true },
      { href: '/top-theorems', labelHe: '🏆 Top 10 משפטים + הוכחות', icon: <Trophy className="w-5 h-5" />, highlight: true },
      { href: '/top-homework', labelHe: '📝 Top 10 תרגילים', icon: <GraduationCap className="w-5 h-5" />, highlight: true },
      { href: '/moed-b-prediction', labelHe: '🎯 חיזוי המבחן', icon: <Crosshair className="w-5 h-5" />, highlight: true },
      { href: '/deductions', labelHe: '💡 קיצורי הסקה', icon: <Target className="w-5 h-5" />, highlight: true },
      { href: '/insights', labelHe: '🧠 תובנות מ-HW + מבחנים', icon: <Target className="w-5 h-5" />, highlight: true },
      { href: '/mock-exams', labelHe: '📝 מבחני הדמיה (3)', icon: <FileCheck className="w-5 h-5" />, highlight: true },
      { href: '/hw-summaries', labelHe: '📓 HW9+10+12 — אינטואיציה', icon: <BookOpen className="w-5 h-5" />, highlight: true },
      { href: '/study-game', labelHe: '🎮 משחק הגדרות', icon: <Brain className="w-5 h-5" />, highlight: true },
    ],
  },
  {
    label: 'חומר הלימוד',
    items: [
      { href: '/weeks', labelHe: 'לימוד שבועי', icon: <Layers className="w-5 h-5" /> },
      { href: '/knowledge', labelHe: 'בסיס ידע מלא', icon: <BookOpen className="w-5 h-5" /> },
      { href: '/summary', labelHe: 'סיכום מלא', icon: <ScrollText className="w-5 h-5" /> },
      { href: '/likelihood', labelHe: 'סבירות לפי נושא', icon: <TrendingUp className="w-5 h-5" /> },
      { href: '/golden-rules', labelHe: 'כללי זהב', icon: <Target className="w-5 h-5" /> },
    ],
  },
  {
    label: 'נושאים מרכזיים',
    items: [
      { href: '/matrices', labelHe: 'מטריצות', icon: <Grid3X3 className="w-5 h-5" /> },
      { href: '/determinants', labelHe: 'דטרמיננטות', icon: <Hash className="w-5 h-5" /> },
      { href: '/dimensions', labelHe: 'ממדים', icon: <Ruler className="w-5 h-5" /> },
      { href: '/steinitz', labelHe: 'שטייניץ + מימדים', icon: <Link2 className="w-5 h-5" /> },
      { href: '/learning-map', labelHe: '🗺️ מפת למידה (שבועות)', icon: <Map className="w-5 h-5" />, highlight: true },
      { href: '/det-flow', labelHe: 'עץ דטרמיננטות', icon: <GitBranch className="w-5 h-5" /> },
      { href: '/flow', labelHe: 'מפת מושגים', icon: <GitBranch className="w-5 h-5" /> },
    ],
  },
  {
    label: 'מבחני עבר',
    items: [
      { href: '/exams', labelHe: 'כל המבחנים', icon: <FileSearch className="w-5 h-5" /> },
      { href: '/exam2025a', labelHe: 'מועד א 2025', icon: <FileCheck className="w-5 h-5" /> },
      { href: '/simulation', labelHe: 'סימולציה 2026', icon: <FileCheck className="w-5 h-5" /> },
      { href: '/exam2024b', labelHe: 'מועד ב 2024', icon: <FileCheck className="w-5 h-5" /> },
      { href: '/exam2023b', labelHe: 'מועד ב 2023', icon: <FileCheck className="w-5 h-5" /> },
      { href: '/exam2022b', labelHe: 'מועד ב 2022', icon: <FileCheck className="w-5 h-5" /> } as NavItem,
    ],
  },
  {
    label: 'תרגול וחזרה',
    items: [
      { href: '/practice', labelHe: 'תרגול', icon: <GraduationCap className="w-5 h-5" /> },
      { href: '/homework', labelHe: 'שיעורי בית', icon: <FileQuestion className="w-5 h-5" /> },
      { href: '/homework-focus', labelHe: 'מיקוד שאלות ממטלות', icon: <BookOpen className="w-5 h-5" />, highlight: true },
      { href: '/quizzes', labelHe: 'הגדרות בחנים', icon: <ClipboardCheck className="w-5 h-5" /> },
      { href: '/review', labelHe: 'חזרה למבחן', icon: <Crosshair className="w-5 h-5" /> },
      { href: '/calendar', labelHe: 'לוח למבחן', icon: <Calendar className="w-5 h-5" /> },
      { href: '/roadmap', labelHe: 'מפת לימוד', icon: <Map className="w-5 h-5" /> },
    ],
  },
  {
    label: 'הדפסה',
    items: [
      { href: '/print-dimensions', labelHe: 'ממדים להדפסה', icon: <Printer className="w-5 h-5" /> },
      { href: '/print-determinants', labelHe: 'דטרמיננטות להדפסה', icon: <Printer className="w-5 h-5" /> },
    ],
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoPopupOpen, setLogoPopupOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-900">LINER</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 z-40 h-full w-72 bg-white border-l border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <button onClick={() => setLogoPopupOpen(true)} className="w-full flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="font-extrabold text-gray-900">LINER</div>
                <div className="text-xs text-gray-500">אלגברה לינארית · מועד ב</div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {group.label}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                          transition-colors duration-150
                          ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700'
                              : item.highlight
                                ? 'text-gray-800 hover:bg-violet-50 hover:text-violet-800'
                                : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className={isActive ? 'text-indigo-600' : item.highlight ? 'text-violet-500' : 'text-gray-400'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.labelHe}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200">
            <div className="text-[11px] text-gray-500 text-center leading-relaxed">
              מבוסס על החומרים שלך
              <br />
              מועד ג — 15.6.2026
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:mr-72 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <div className="p-4 md:p-6 lg:p-8 flex-1">{children}</div>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-200 bg-white">
          <div className="text-center text-sm text-gray-500">
            Built by{' '}
            <a
              href="https://liamesika.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Lia Mesika
            </a>
            . All rights reserved.
          </div>
        </footer>
      </main>

      {/* Logo Popup */}
      {logoPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setLogoPopupOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLogoPopupOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src="/logo.png"
              alt="L.M Logo"
              width={400}
              height={200}
              className="max-w-[90vw] max-h-[80vh] object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
