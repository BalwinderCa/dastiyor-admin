"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useTranslation } from "@/context/LanguageContext";

const ProfileSettings = () => {
    const [avatar, setAvatar] = useState("/assets/images/users/user-1.jpg");
    const { t } = useTranslation();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    return (
        <div className="grid grid-cols-1 gap-5">
            <Card title={t("settings.profile.personalInfo")}>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-none">
                        <div className="md:h-[150px] md:w-[150px] h-[100px] w-[100px] rounded-full ring-4 ring-slate-100 relative mx-auto md:mx-0">
                            <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover rounded-full" />
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                            <Textinput label={t("settings.profile.fullName")} type="text" placeholder="John Doe" />
                            <Textinput label={t("settings.profile.email")} type="email" placeholder="john.doe@example.com" />
                            <Textinput label={t("settings.profile.phone")} type="text" placeholder="+1 234 567 890" />
                            <Textinput label={t("settings.profile.jobTitle")} type="text" placeholder="Software Engineer" />
                        </div>
                        <Textarea label={t("settings.profile.bio")} placeholder={t("settings.profile.bio")} />
                    </div>
                </div>
            </Card>

            <Card title={t("settings.profile.address")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label={t("settings.profile.addressLine1")} type="text" placeholder="123 Main St" />
                    <Textinput label={t("settings.profile.addressLine2")} type="text" placeholder="Apt 4B" />
                    <Textinput label={t("settings.profile.city")} type="text" placeholder="New York" />
                    <Textinput label={t("settings.profile.state")} type="text" placeholder="NY" />
                    <Textinput label={t("settings.profile.zip")} type="text" placeholder="10001" />
                    <Textinput label={t("settings.profile.country")} type="text" placeholder="USA" />
                </div>
            </Card>

            <Card title={t("settings.profile.social")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label={t("settings.company.facebook")} type="url" placeholder="https://facebook.com/..." />
                    <Textinput label={t("settings.company.twitter")} type="url" placeholder="https://twitter.com/..." />
                    <Textinput label={t("settings.company.linkedin")} type="url" placeholder="https://linkedin.com/..." />
                    <Textinput label={t("settings.profile.website")} type="url" placeholder="https://example.com" />
                </div>
            </Card>

            <Card title={t("settings.profile.security")}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div className="lg:col-span-2">
                        <Textinput label={t("settings.profile.currentPassword")} type="password" placeholder={t("settings.profile.currentPassword")} />
                    </div>
                    <Textinput label={t("settings.profile.newPassword")} type="password" placeholder={t("settings.profile.newPassword")} />
                    <Textinput label={t("settings.profile.confirmPassword")} type="password" placeholder={t("settings.profile.confirmPassword")} />
                </div>
            </Card>

            <div className="text-right">
                <button className="btn btn-dark w-full sm:w-auto">{t("settings.profile.updateProfile")}</button>
            </div>
        </div>
    );
};

export default ProfileSettings;
