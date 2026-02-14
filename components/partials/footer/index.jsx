"use client";

import React from "react";
import useFooterType from "@/hooks/useFooterType";
import { useTranslation } from "@/context/LanguageContext";

const Footer = ({ className = "custom-class" }) => {
  const [footerType] = useFooterType();
  const { t } = useTranslation();
  const footerclassName = () => {
    switch (footerType) {
      case "sticky":
        return "sticky bottom-0 z-[999]";
      case "static":
        return "static";
      case "hidden":
        return "hidden";
    }
  };
  return (
    <footer className={className + " " + footerclassName()}>
      <div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
          <div className="text-center ltr:md:text-start rtl:md:text-right text-sm">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </div>
          <div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
            {t("footer.marketplace")}{" "}
            <a
              href="https://github.com/BalwinderCa/dastiyor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 font-semibold"
            >
              {t("appName")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
