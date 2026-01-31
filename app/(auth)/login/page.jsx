"use client";

import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import useDarkMode from "@/hooks/useDarkMode";
import { useTranslation } from "@/context/LanguageContext";

const Login = () => {
  const [isDark] = useDarkMode();
  const { t } = useTranslation();
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="left-column relative z-[1]">
          <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
            <Link href="/">
              <img
                src={
                  isDark
                    ? "/assets/images/logo/logo-white.svg"
                    : "/assets/images/logo/logo.svg"
                }
                alt={t("appName")}
                className="mb-10"
              />
            </Link>
            <h4>
              {t("login.heroTitle")}{" "}
              <span className="text-slate-800 dark:text-slate-400 font-bold">
                {t("login.heroSubtitle")}
              </span>
            </h4>
          </div>
          <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
            <img
              src="/assets/images/auth/ils1.svg"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <img
                    src={
                      isDark
                        ? "/assets/images/logo/logo-white.svg"
                        : "/assets/images/logo/logo.svg"
                    }
                    alt={t("appName")}
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-medium">{t("login.title")}</h4>
                <div className="text-slate-500 text-base">
                  {t("login.subtitle")}
                </div>
              </div>
              <LoginForm />
              <div className="auth-footer text-center mt-8">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
