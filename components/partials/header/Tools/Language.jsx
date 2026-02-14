"use client";

import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "@/context/LanguageContext";

const languages = [
  { code: "ru", name: "Русский", label: "RU" },
  { code: "tg", name: "Тоҷикӣ", label: "TG" },
];

const Language = () => {
  const { locale, setLocale } = useTranslation();
  const [selected, setSelected] = useState(
    languages.find((l) => l.code === locale) || languages[0]
  );

  useEffect(() => {
    setSelected(languages.find((l) => l.code === locale) || languages[0]);
  }, [locale]);

  const handleChange = (item) => {
    setSelected(item);
    setLocale(item.code);
  };

  return (
    <div>
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative z-[22]">
          <Listbox.Button className="relative w-full flex items-center cursor-pointer space-x-[6px] rtl:space-x-reverse">
            <span className="text-sm md:block hidden font-medium text-slate-600 dark:text-slate-300">
              {selected.label}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute min-w-[120px] ltr:right-0 rtl:left-0 md:top-[50px] top-[38px] w-auto max-h-60 overflow-auto border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 mt-1">
              {languages.map((item) => (
                <Listbox.Option key={item.code} value={item} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={`w-full border-b border-b-gray-500 border-opacity-10 px-2 py-2 last:border-none last:mb-0 cursor-pointer first:rounded-t last:rounded-b ${
                        active
                          ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 bg-opacity-50 dark:text-white"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="flex-1 text-sm">{item.name}</span>
                      </div>
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Language;
