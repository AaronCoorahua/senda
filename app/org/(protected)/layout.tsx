"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import OrgShell from "@/components/org/OrgShell";

export default function OrgProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="organization">
      <OrgShell>
        {children}
      </OrgShell>
    </ProtectedRoute>
  );
}
