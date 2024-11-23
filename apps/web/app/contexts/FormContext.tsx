"use client";

import React from "react";
import { FormContextType, FormType } from "./type";

export const FormContext = React.createContext<FormContextType>({
  form: null,
  setFormReview: () => {},
});

interface IFormProviderProps {
  children: React.ReactNode;
}

const FormProvider: React.FunctionComponent<IFormProviderProps> = ({
  children,
}) => {
  const [form, setFormReview] = React.useState<FormType | null>(null);

  return (
    <FormContext.Provider value={{ form, setFormReview }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
