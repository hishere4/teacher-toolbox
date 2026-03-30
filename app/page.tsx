import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Upload, Sparkles } from "lucide-react";
import { tools, categories } from "@/lib/data";

export default function HomePage() {
  const featuredTools = tools.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero - 極簡 */}
      <section className="py-20 lg:py-32 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-8">
            <Sparkles className="h-4 w-4" />
            <span>老師分享嘅教學工具</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            教師工具箱
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            發現同行用 AI 整嘅教學工具，一撳即用
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                搵工具
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline" className="gap-2">
                <Upload className="h-5 w-5" />
                上載工具
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 熱門工具 - 只顯示前 4 個 */}
      <section className="pb-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">熱門工具</h2>
          <Link href="/tools" className="text-primary hover:underline">
            睇全部 →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="bg-muted rounded-xl p-6 hover:bg-muted/80 transition-colors"
            >
              <div className="text-sm text-muted-foreground mb-2">{tool.category.nameZh}</div>
              <h3 className="font-semibold text-lg mb-2">{tool.titleZh}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{tool.descZh}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
