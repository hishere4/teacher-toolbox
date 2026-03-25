"use client";

import { Suspense } from "react";
import ToolsPageContent from "./ToolsPageContent";

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">載入中...</div>}>
      <ToolsPageContent />
    </Suspense>
  );
}
