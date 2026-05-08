'use client';

import { ReactNode } from 'react';

interface MathExprProps {
  children: ReactNode;
  block?: boolean;
  className?: string;
}

/**
 * MathExpr — wraps math content so it always renders LTR with a serif math font,
 * regardless of surrounding RTL Hebrew. Use `block` for display equations.
 */
export default function MathExpr({ children, block = false, className = '' }: MathExprProps) {
  if (block) {
    return (
      <div
        dir="ltr"
        className={`math-block ${className}`}
      >
        {children}
      </div>
    );
  }
  return (
    <span dir="ltr" className={`math-inline ${className}`}>
      {children}
    </span>
  );
}
