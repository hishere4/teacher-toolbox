"use client";

import Link from "next/link";
import { Wrench, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "關於我們", href: "/about" },
    { label: "聯絡我們", href: "/contact" },
    { label: "私隱政策", href: "/privacy" },
    { label: "使用條款", href: "/terms" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Wrench className="h-5 w-5 text-primary" />
              <span>教師工具箱</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              為教育工作者而設的工具分享平台
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">連結</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="font-semibold mb-3">聯絡我們</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@teachertoolbox.hk"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © {currentYear} 教師工具箱. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
