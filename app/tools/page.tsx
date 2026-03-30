"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { tools } from "@/lib/data";

export default function ToolsPage() {
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.titleZh.toLowerCase().includes(search.toLowerCase()) ||
    tool.descZh.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">搵工具</h1>
        <p className="text-muted-foreground mb-8">一撳即用嘅教學工具</p>

        <Input
          placeholder="搵工具..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-muted-foreground mb-1">{tool.category.nameZh}</div>
              <h3 className="font-semibold text-lg mb-2">{tool.titleZh}</h3>
              <p className="text-sm text-muted-foreground">{tool.descZh}</p>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            搵唔到工具，試下其他關鍵字
          </div>
        )}
      </div>
    </div>
  );
}
