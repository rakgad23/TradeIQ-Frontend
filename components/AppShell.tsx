// AppShell.tsx
import React from "react";
import { LeftSidebar } from "./LeftSidebar";

export default function AppShell({
  children,
  rightRail,
}: {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <LeftSidebar activeSection="dashboard" setActiveSection={() => {}} onUpgrade={() => {}} />

      {/* Reserve the sidebar width on lg+; allow 0 on small (drawer later) */}
      <div className="h-full lg:pl-[var(--sidebar-w)]">
        {/* 2-col grid: main + optional right rail */}
        <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-6">
          {/* MAIN is the primary scroller */}
          <main className="h-full overflow-y-auto">
            {children}
          </main>

          {/* RIGHT RAIL: its own scroller */}
          {rightRail ? (
            <aside className="hidden lg:block h-full overflow-y-auto">
              <div className="pr-4">{rightRail}</div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
