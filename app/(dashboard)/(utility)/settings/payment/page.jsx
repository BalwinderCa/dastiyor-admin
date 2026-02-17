"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/context/LanguageContext";
import { toast } from "react-toastify";

const defaultPayment = {
  currencyCode: "USD",
  currencySymbol: "$",
  commission: "10",
  stripeActive: true,
  stripePublicKey: "",
  stripeSecretKey: "",
  paypalActive: false,
  paypalClientId: "",
  paypalSecretKey: "",
  paypalMode: "sandbox",
  bankActive: false,
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  routingNumber: "",
  swift: "",
  bankAddress: "",
};

const PaymentSettings = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultPayment);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/settings/payment", { credentials: "include" });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) setData({ ...defaultPayment, ...json });
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
      const res = await fetch("/api/settings/payment", {
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
      <Card title={t("settings.payment.general")}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput label={t("settings.payment.currencyCode")} type="text" placeholder="USD" value={data.currencyCode} onChange={(e) => setData({ ...data, currencyCode: e.target.value })} />
          <Textinput label={t("settings.payment.currencySymbol")} type="text" placeholder="$" value={data.currencySymbol} onChange={(e) => setData({ ...data, currencySymbol: e.target.value })} />
          <Textinput label={t("settings.payment.commission")} type="number" placeholder="10" value={data.commission} onChange={(e) => setData({ ...data, commission: e.target.value })} />
        </div>
      </Card>

      <Card title={t("settings.payment.stripe")}>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <label className="form-label font-medium">{t("settings.payment.enableStripe")}</label>
            <Switch value={data.stripeActive} onChange={() => setData({ ...data, stripeActive: !data.stripeActive })} />
          </div>
          {data.stripeActive && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Textinput label={t("settings.payment.stripePublicKey")} type="text" placeholder="pk_test_..." value={data.stripePublicKey} onChange={(e) => setData({ ...data, stripePublicKey: e.target.value })} />
              <Textinput label={t("settings.payment.stripeSecretKey")} type="password" placeholder="sk_test_..." value={data.stripeSecretKey} onChange={(e) => setData({ ...data, stripeSecretKey: e.target.value })} />
            </div>
          )}
        </div>
      </Card>

      <Card title={t("settings.payment.paypal")}>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <label className="form-label font-medium">{t("settings.payment.enablePaypal")}</label>
            <Switch value={data.paypalActive} onChange={() => setData({ ...data, paypalActive: !data.paypalActive })} />
          </div>
          {data.paypalActive && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Textinput label={t("settings.payment.paypalClientId")} type="text" placeholder="Client ID" value={data.paypalClientId} onChange={(e) => setData({ ...data, paypalClientId: e.target.value })} />
              <Textinput label={t("settings.payment.paypalSecretKey")} type="password" placeholder="Secret Key" value={data.paypalSecretKey} onChange={(e) => setData({ ...data, paypalSecretKey: e.target.value })} />
              <div className="lg:col-span-2">
                <label className="form-label block mb-2">{t("settings.payment.mode")}</label>
                <select className="form-control py-2" value={data.paypalMode} onChange={(e) => setData({ ...data, paypalMode: e.target.value })}>
                  <option value="sandbox">{t("settings.payment.sandbox")}</option>
                  <option value="live">{t("settings.payment.live")}</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card title={t("settings.payment.bank")}>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <label className="form-label font-medium">{t("settings.payment.enableBank")}</label>
            <Switch value={data.bankActive} onChange={() => setData({ ...data, bankActive: !data.bankActive })} />
          </div>
          {data.bankActive && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Textinput label={t("settings.payment.bankName")} type="text" placeholder={t("settings.payment.bankName")} value={data.bankName} onChange={(e) => setData({ ...data, bankName: e.target.value })} />
              <Textinput label={t("settings.payment.accountHolder")} type="text" placeholder={t("settings.payment.accountHolder")} value={data.accountHolder} onChange={(e) => setData({ ...data, accountHolder: e.target.value })} />
              <Textinput label={t("settings.payment.accountNumber")} type="text" placeholder={t("settings.payment.accountNumber")} value={data.accountNumber} onChange={(e) => setData({ ...data, accountNumber: e.target.value })} />
              <Textinput label={t("settings.payment.routingNumber")} type="text" placeholder={t("settings.payment.routingNumber")} value={data.routingNumber} onChange={(e) => setData({ ...data, routingNumber: e.target.value })} />
              <Textinput label={t("settings.payment.swift")} type="text" placeholder={t("settings.payment.swift")} value={data.swift} onChange={(e) => setData({ ...data, swift: e.target.value })} />
              <div className="lg:col-span-2">
                <Textinput label={t("settings.payment.bankAddress")} type="text" placeholder={t("settings.payment.bankAddress")} value={data.bankAddress} onChange={(e) => setData({ ...data, bankAddress: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="text-right">
        <Button text={t("settings.saveChanges")} className="btn-dark w-full sm:w-auto" onClick={handleSave} disabled={saving} />
      </div>
    </div>
  );
};

export default PaymentSettings;
