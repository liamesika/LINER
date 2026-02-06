'use client'

import { useState } from 'react'
import {
  Bug,
  Database,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react'
import { debugInfo, getDataSummary, validateData } from '@/data/liner-debug'

export default function DebugPage() {
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null)

  const summary = getDataSummary()

  const runValidation = () => {
    const result = validateData()
    setValidationResult(result)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bug className="text-[var(--primary)]" size={32} />
          Debug Dashboard
        </h1>
        <p className="text-[var(--muted)] mt-1">
          System diagnostics and data integrity checks
        </p>
      </div>

      {/* Extraction Info */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="text-[var(--primary)]" size={24} />
          Data Extraction Info
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[var(--muted)] mb-1">Extraction Date</div>
            <div className="font-medium">{new Date(debugInfo.extractionDate).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1">Source Files</div>
            <div className="font-medium">{debugInfo.sourceFiles.length} files</div>
          </div>
        </div>
      </div>

      {/* Data Counts */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="text-[var(--secondary)]" size={24} />
          Embedded Data Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {summary.knowledge.definitions}
            </div>
            <div className="text-sm text-[var(--muted)]">Definitions</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {summary.knowledge.theorems}
            </div>
            <div className="text-sm text-[var(--muted)]">Theorems</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {summary.knowledge.proofs}
            </div>
            <div className="text-sm text-[var(--muted)]">Proofs</div>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {summary.syllabus.weeks}
            </div>
            <div className="text-sm text-[var(--muted)]">Weeks</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-4 bg-[var(--border)]/30 rounded-lg text-center">
            <div className="text-3xl font-bold">{summary.exams.totalExams}</div>
            <div className="text-sm text-[var(--muted)]">Past Exams</div>
          </div>
          <div className="p-4 bg-[var(--border)]/30 rounded-lg text-center">
            <div className="text-3xl font-bold">{summary.exams.totalQuestions}</div>
            <div className="text-sm text-[var(--muted)]">Exam Questions</div>
          </div>
          <div className="p-4 bg-[var(--border)]/30 rounded-lg text-center">
            <div className="text-3xl font-bold">{summary.homework.totalQuestions}</div>
            <div className="text-sm text-[var(--muted)]">HW Questions</div>
          </div>
          <div className="p-4 bg-[var(--border)]/30 rounded-lg text-center">
            <div className="text-3xl font-bold">{summary.homework.highLikelihood}</div>
            <div className="text-sm text-[var(--muted)]">High Priority HW</div>
          </div>
        </div>
      </div>

      {/* Validation */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[var(--accent)]" size={24} />
            Data Validation
          </h2>
          <button
            onClick={runValidation}
            className="btn btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Run Validation
          </button>
        </div>

        {validationResult ? (
          <div className={`p-4 rounded-lg ${
            validationResult.valid
              ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30'
              : 'bg-[var(--danger)]/10 border border-[var(--danger)]/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {validationResult.valid ? (
                <CheckCircle2 className="text-[var(--accent)]" size={20} />
              ) : (
                <XCircle className="text-[var(--danger)]" size={20} />
              )}
              <span className="font-semibold">
                {validationResult.valid ? 'All data valid' : `${validationResult.errors.length} issues found`}
              </span>
            </div>
            {validationResult.errors.length > 0 && (
              <ul className="text-sm space-y-1 mt-2">
                {validationResult.errors.map((error, idx) => (
                  <li key={idx} className="text-[var(--danger)]">• {error}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="text-[var(--muted)] text-center py-4">
            Click "Run Validation" to check data integrity
          </div>
        )}
      </div>

      {/* Source Files */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Source Files Used</h2>
        <div className="max-h-64 overflow-y-auto">
          <div className="grid gap-2">
            {debugInfo.sourceFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-[var(--border)]/20 rounded text-sm"
              >
                <FileText size={16} className="text-[var(--muted)]" />
                <span className="font-mono">{file}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Source Refs */}
      {debugInfo.missingSourceRefs.length > 0 && (
        <div className="card border-[var(--warning)]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-[var(--warning)]" size={24} />
            Missing Source References
          </h2>
          <ul className="text-sm space-y-1">
            {debugInfo.missingSourceRefs.map((ref, idx) => (
              <li key={idx} className="text-[var(--warning)]">• {ref}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Runtime Info */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Runtime Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[var(--muted)] mb-1">Environment</div>
            <div className="font-medium">
              {typeof window !== 'undefined' ? 'Browser (Client)' : 'Server'}
            </div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1">PDF Runtime Access</div>
            <div className="font-medium flex items-center gap-2">
              <XCircle size={16} className="text-[var(--accent)]" />
              Disabled (Vercel-safe)
            </div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1">Data Source</div>
            <div className="font-medium">Static TypeScript files (embedded)</div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1">Local Storage</div>
            <div className="font-medium">
              {typeof window !== 'undefined' && window.localStorage ? 'Available' : 'Not Available'}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Notes */}
      <div className="card bg-[var(--border)]/20">
        <h2 className="text-lg font-semibold mb-3">Technical Notes</h2>
        <ul className="text-sm space-y-2 text-[var(--muted)]">
          <li>• This app does NOT read PDFs at runtime. All content is pre-extracted.</li>
          <li>• Data is stored in /src/data/*.ts files and bundled at build time.</li>
          <li>• User progress (completed weeks, practice history) is stored in localStorage.</li>
          <li>• To update content, re-run the extraction script: <code className="bg-[var(--border)] px-1 rounded">npm run extract</code></li>
          <li>• Deployable to Vercel without any filesystem dependencies.</li>
        </ul>
      </div>
    </div>
  )
}
