"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(i18n.language || "zh");
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    // Save preference
    localStorage.setItem("i18nextLng", newLang);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-1">
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">中/En</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-1">
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{currentLang === "zh" ? "中文" : "English"}</span>
      <span className="sm:hidden">{currentLang === "zh" ? "中" : "En"}</span>
    </Button>
  );
}
