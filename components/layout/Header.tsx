"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Hardcoded translations for Phase 2
const t = (key: string) => {
  const translations: Record<string, string> = {
    "nav.tools": "工具市場",
    "nav.requests": "請求板",
    "nav.deploy": "部署教學",
    "nav.login": "登入",
    "nav.register": "註冊",
    "nav.logout": "登出",
    "nav.profile": "個人檔案",
    "nav.myTools": "我的工具",
    "nav.myRequests": "我的請求",
    "nav.upload": "上載工具",
    "hero.title": "教師工具箱",
  };
  return translations[key] || key;
};

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = session?.user;

  const navLinks = [
    { href: "/tools", label: t("nav.tools") },
    { href: "/requests", label: t("nav.requests") },
    { href: "/deploy", label: t("nav.deploy") },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Wrench className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">{t("hero.title")}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(link.href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/upload">
                <Button size="sm">{t("nav.upload")}</Button>
              </Link>
              <div className="relative group">
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user.image ? (
                    <img src={user.image} alt={user.name || ""} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-2 py-1.5 text-sm font-medium border-b">
                    {user.name}
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted">
                    <User className="h-4 w-4" />
                    {t("nav.profile")}
                  </Link>
                  <Link href="/my-tools" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted">
                    <Wrench className="h-4 w-4" />
                    {t("nav.myTools")}
                  </Link>
                  <Link href="/my-requests" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted">
                    {t("nav.myRequests")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">{t("nav.login")}</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t("nav.register")}</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  isActive(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/upload" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.upload")}
                </Link>
                <Link href="/profile" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.profile")}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-destructive"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.login")}
                </Link>
                <Link href="/register" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.register")}</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
