"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Wrench, Upload, Sparkles } from "lucide-react";
import { categories, tools } from "@/lib/data";

export default function HomePage() {
  const featuredTools = tools.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Beta 版本現已推出</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            教師工具箱
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            發現、分享、創造教學工具
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            一個專為教育工作者設計的平台。瀏覽由全球教師和開發者創建的教學工具，或分享你自己的創作。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/tools">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                瀏覽工具
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline" className="gap-2">
                <Upload className="h-5 w-5" />
                上載工具
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <Link href="/tools">
              <div className="relative cursor-pointer">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <div className="w-full pl-12 pr-4 py-4 rounded-full border bg-background text-muted-foreground">
                  搜尋工具...
                </div>
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
                  搜尋
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          按類別瀏覽
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/tools?category=${cat.slug}`}
              className="p-6 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📁</div>
              <div className="font-medium">{cat.nameZh}</div>
              <div className="text-sm text-muted-foreground mt-1">{cat._count?.tools || 0} 個工具</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">熱門工具</h2>
            <Link href="/tools" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="bg-background rounded-xl border p-5 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{tool.category.nameZh}</div>
                <h3 className="font-semibold text-lg mb-2">{tool.titleZh}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{tool.author.name}</span>
                  <span>{tool.viewCount} 瀏覽</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deploy Hub CTA */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <Wrench className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            想分享自己的工具？
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            我們提供詳細的部署教學，幫助你將自己的教學工具發布到網上，與全球教師分享。
          </p>
          <Link href="/deploy">
            <Button size="lg">開始學習部署</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
