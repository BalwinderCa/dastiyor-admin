"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useTranslation } from "@/context/LanguageContext";

const CompanySettings = () => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 gap-5">
            <Card title={t("settings.company.generalInfo")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label={t("settings.company.name")} type="text" placeholder="e.g. Dastiyor" />
                    <Textinput label={t("settings.company.email")} type="email" placeholder="e.g. info@dastiyor.com" />
                    <Textinput label={t("settings.company.phone")} type="text" placeholder="e.g. +1 234 567 890" />
                    <Textinput label={t("settings.company.supportEmail")} type="email" placeholder="e.g. support@dastiyor.com" />
                    <div className="lg:col-span-2">
                        <Textarea label={t("settings.company.address")} placeholder={t("settings.company.address")} />
                    </div>
                </div>
            </Card>

            <Card title={t("settings.company.siteIdentity")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label className="block capitalize form-label mb-2">{t("settings.company.logo")}</label>
                        <input type="file" className="form-control py-2" />
                        <span className="text-xs text-slate-500 block mt-1">Recommended size: 150x50px</span>
                    </div>
                    <div>
                        <label className="block capitalize form-label mb-2">{t("settings.company.favicon")}</label>
                        <input type="file" className="form-control py-2" />
                        <span className="text-xs text-slate-500 block mt-1">Recommended size: 32x32px</span>
                    </div>
                    <div className="lg:col-span-2">
                        <Textinput label={t("settings.company.footerText")} type="text" placeholder="e.g. © 2024 Dastiyor. All rights reserved." />
                    </div>
                </div>
            </Card>

            <Card title={t("settings.company.seo")}>
                <div className="space-y-4">
                    <Textinput label={t("settings.company.metaTitle")} type="text" placeholder={t("settings.company.metaTitle")} />
                    <Textarea label={t("settings.company.metaDescription")} placeholder={t("settings.company.metaDescription")} />
                    <Textinput label={t("settings.company.metaKeywords")} type="text" placeholder={t("settings.company.metaKeywords")} />
                </div>
            </Card>

            <Card title={t("settings.company.socialMedia")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label={t("settings.company.facebook")} type="url" placeholder="https://facebook.com/..." />
                    <Textinput label={t("settings.company.twitter")} type="url" placeholder="https://twitter.com/..." />
                    <Textinput label={t("settings.company.instagram")} type="url" placeholder="https://instagram.com/..." />
                    <Textinput label={t("settings.company.linkedin")} type="url" placeholder="https://linkedin.com/..." />
                </div>
            </Card>

            <div className="text-right">
                <button className="btn btn-dark w-full sm:w-auto">{t("settings.saveChanges")}</button>
            </div>
        </div>
    );
};

export default CompanySettings;
