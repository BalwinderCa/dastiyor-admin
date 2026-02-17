"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/context/LanguageContext";
import { toast } from "react-toastify";

const defaultCompany = {
  name: "",
  email: "",
  phone: "",
  supportEmail: "",
  address: "",
  footerText: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
};

const CompanySettings = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultCompany);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/settings/company", { credentials: "include" });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) setData({ ...defaultCompany, ...json });
        }
      } catch {
        // keep defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success(t("settings.saveChanges") || "Saved");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-slate-500">Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-5">
      <Card title={t("settings.company.generalInfo")}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <Textinput label={t("settings.company.name")} type="text" placeholder="e.g. Dastiyor" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <Textinput label={t("settings.company.email")} type="email" placeholder="e.g. info@dastiyor.com" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <Textinput label={t("settings.company.phone")} type="text" placeholder="e.g. +1 234 567 890" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          <Textinput label={t("settings.company.supportEmail")} type="email" placeholder="e.g. support@dastiyor.com" value={data.supportEmail} onChange={(e) => setData({ ...data, supportEmail: e.target.value })} />
          <div className="lg:col-span-2">
            <Textarea label={t("settings.company.address")} placeholder={t("settings.company.address")} value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
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
            <Textinput label={t("settings.company.footerText")} type="text" placeholder="e.g. © 2024 Dastiyor. All rights reserved." value={data.footerText} onChange={(e) => setData({ ...data, footerText: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card title={t("settings.company.seo")}>
        <div className="space-y-4">
          <Textinput label={t("settings.company.metaTitle")} type="text" placeholder={t("settings.company.metaTitle")} value={data.metaTitle} onChange={(e) => setData({ ...data, metaTitle: e.target.value })} />
          <Textarea label={t("settings.company.metaDescription")} placeholder={t("settings.company.metaDescription")} value={data.metaDescription} onChange={(e) => setData({ ...data, metaDescription: e.target.value })} />
          <Textinput label={t("settings.company.metaKeywords")} type="text" placeholder={t("settings.company.metaKeywords")} value={data.metaKeywords} onChange={(e) => setData({ ...data, metaKeywords: e.target.value })} />
        </div>
      </Card>

      <Card title={t("settings.company.socialMedia")}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <Textinput label={t("settings.company.facebook")} type="url" placeholder="https://facebook.com/..." value={data.facebook} onChange={(e) => setData({ ...data, facebook: e.target.value })} />
          <Textinput label={t("settings.company.twitter")} type="url" placeholder="https://twitter.com/..." value={data.twitter} onChange={(e) => setData({ ...data, twitter: e.target.value })} />
          <Textinput label={t("settings.company.instagram")} type="url" placeholder="https://instagram.com/..." value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} />
          <Textinput label={t("settings.company.linkedin")} type="url" placeholder="https://linkedin.com/..." value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} />
        </div>
      </Card>

      <div className="text-right">
        <Button text={t("settings.saveChanges")} className="btn-dark w-full sm:w-auto" onClick={handleSave} disabled={saving} />
      </div>
    </div>
  );
};

export default CompanySettings;
