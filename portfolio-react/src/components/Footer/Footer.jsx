import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-[10px] tracking-[2px] opacity-50 text-[var(--text)] gap-8">
      
      <div>
        ALGORITHMIC LUXURY OS<br/>
        V2.0.0 — KERNEL ACTIVE
      </div>

      <div className="flex gap-8">
        <a href="#boot-sequence" className="hover:text-[var(--accent)] transition-colors">INICIO</a>
        <a href="#process" className="hover:text-[var(--accent)] transition-colors">PROCESO</a>
        <a href="#arsenal" className="hover:text-[var(--accent)] transition-colors">ARSENAL</a>
      </div>

      <div className="text-left md:text-right">
        © {new Date().getFullYear()} INMORTAL_OS.<br/>
        ALL RIGHTS RESERVED.
      </div>
      
    </footer>
  );
}
