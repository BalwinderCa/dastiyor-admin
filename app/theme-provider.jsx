"use client";
import store from "../store";
import { Provider } from "react-redux";
import { LanguageProvider } from "@/context/LanguageContext";

const ThemeProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <LanguageProvider>{children}</LanguageProvider>
    </Provider>
  );
};

export default ThemeProvider;