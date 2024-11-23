export type FormType = {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  gender: string;
  hobby: string;
};

export interface FormContextType {
  form: FormType | null;
  setFormReview: React.Dispatch<React.SetStateAction<FormType | null>>;
}
