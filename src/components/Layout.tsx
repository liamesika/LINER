'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  GraduationCap,
  Brain,
  TrendingUp,
  FileQuestion,
  Dumbbell,
  Map,
  Bug,
  Menu,
  X,
  ChevronLeft,
  Library
} from 'lucide-react'

interface NavItem {
  href: string
  labelHe: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: '/', labelHe: 'דף הבית', icon: <Home size={20} /> },
  { href: '/syllabus', labelHe: 'לימוד שבועי', icon: <BookOpen size={20} /> },
  { href: '/knowledge', labelHe: 'בסיס ידע', icon: <Library size={20} /> },
  { href: '/exams', labelHe: 'ניתוח מבחנים', icon: <GraduationCap size={20} /> },
  { href: '/likelihood', labelHe: 'סיכויי הופעה', icon: <TrendingUp size={20} /> },
  { href: '/homework', labelHe: 'שיעורי בית', icon: <FileQuestion size={20} /> },
  { href: '/practice', labelHe: 'תרגול', icon: <Dumbbell size={20} /> },
  { href: '/roadmap', labelHe: 'תוכנית לימודים', icon: <Map size={20} /> },
  { href: '/debug', labelHe: 'אבחון מערכת', icon: <Bug size={20} /> },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]" dir="rtl">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-[var(--card)] border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="text-[var(--primary)]" size={28} />
            <span className="font-bold text-lg">LINER</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
            aria-label="תפריט"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - RTL positioned on right */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-64 bg-[var(--card)] border-l border-[var(--border)]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="hidden lg:flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <Brain className="text-[var(--primary)]" size={32} />
          <div>
            <h1 className="font-bold text-xl">LINER</h1>
            <p className="text-xs text-[var(--muted)]">אלגברה לינארית 1</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 mt-14 lg:mt-0 overflow-y-auto h-[calc(100%-70px)]">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${isActive(item.href)
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--foreground)] hover:bg-[var(--border)]'
                    }
                  `}
                >
                  <span className={isActive(item.href) ? 'text-white' : 'text-[var(--muted)]'}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.labelHe}</span>
                  <ChevronLeft size={16} className={isActive(item.href) ? 'text-white/70' : 'text-[var(--muted)]'} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 right-0 left-0 z-40 bg-[var(--card)] border-t border-[var(--border)]">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg
                ${isActive(item.href) ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}
              `}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.labelHe.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content - margin on right for RTL sidebar */}
      <main className="lg:mr-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
