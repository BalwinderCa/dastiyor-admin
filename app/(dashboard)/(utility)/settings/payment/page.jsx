"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Switch from "@/components/ui/Switch";
import { useTranslation } from "@/context/LanguageContext";

const PaymentSettings = () => {
    const [stripeActive, setStripeActive] = useState(true);
    const [paypalActive, setPaypalActive] = useState(false);
    const [bankActive, setBankActive] = useState(true);
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 gap-5">
            <Card title={t("settings.payment.general")}>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label={t("settings.payment.currencyCode")} type="text" placeholder="USD" defaultValue="USD" />
                    <Textinput label={t("settings.payment.currencySymbol")} type="text" placeholder="$" defaultValue="$" />
                    <Textinput label={t("settings.payment.commission")} type="number" placeholder="10" defaultValue="10" />
                </div>
            </Card>

            <Card title={t("settings.payment.stripe")}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <label className="form-label font-medium">{t("settings.payment.enableStripe")}</label>
                        <Switch value={stripeActive} onChange={() => setStripeActive(!stripeActive)} />
                    </div>
                    {stripeActive && (
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                            <Textinput label={t("settings.payment.stripePublicKey")} type="text" placeholder="pk_test_..." />
                            <Textinput label={t("settings.payment.stripeSecretKey")} type="password" placeholder="sk_test_..." />
                        </div>
                    )}
                </div>
            </Card>

            <Card title={t("settings.payment.paypal")}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <label className="form-label font-medium">{t("settings.payment.enablePaypal")}</label>
                        <Switch value={paypalActive} onChange={() => setPaypalActive(!paypalActive)} />
                    </div>
                    {paypalActive && (
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                            <Textinput label={t("settings.payment.paypalClientId")} type="text" placeholder="Client ID" />
                            <Textinput label={t("settings.payment.paypalSecretKey")} type="password" placeholder="Secret Key" />
                            <div className="lg:col-span-2">
                                <label className="form-label block mb-2">{t("settings.payment.mode")}</label>
                                <select className="form-control py-2">
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
                        <Switch value={bankActive} onChange={() => setBankActive(!bankActive)} />
                    </div>
                    {bankActive && (
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                            <Textinput label={t("settings.payment.bankName")} type="text" placeholder={t("settings.payment.bankName")} />
                            <Textinput label={t("settings.payment.accountHolder")} type="text" placeholder={t("settings.payment.accountHolder")} />
                            <Textinput label={t("settings.payment.accountNumber")} type="text" placeholder={t("settings.payment.accountNumber")} />
                            <Textinput label={t("settings.payment.routingNumber")} type="text" placeholder={t("settings.payment.routingNumber")} />
                            <Textinput label={t("settings.payment.swift")} type="text" placeholder={t("settings.payment.swift")} />
                            <div className="lg:col-span-2">
                                <Textinput label={t("settings.payment.bankAddress")} type="text" placeholder={t("settings.payment.bankAddress")} />
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <div className="text-right">
                <button className="btn btn-dark w-full sm:w-auto">{t("settings.saveChanges")}</button>
            </div>
        </div>
    );
};

export default PaymentSettings;
