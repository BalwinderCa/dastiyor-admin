import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import { useTranslation } from "@/context/LanguageContext";

const LoginForm = () => {
  const { t } = useTranslation();
  const schema = yup
    .object({
      email: yup.string().email(t("login.invalidEmail")).required(t("login.emailRequired")),
      password: yup.string().required(t("login.passwordRequired")),
    })
    .required();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = (data) => {
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (user) {
      dispatch(handleLogin(true));
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } else {
      toast.error(t("login.invalidCredentials"), {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label={t("login.email")}
        defaultValue="admin@dastiyor.com"
        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label={t("login.password")}
        type="password"
        defaultValue="dastiyor"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label={t("login.rememberMe")}
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          {t("login.forgotPassword")}{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">{t("login.signIn")}</button>
    </form>
  );
};

export default LoginForm;
