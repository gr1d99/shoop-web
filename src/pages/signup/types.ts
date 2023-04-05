import { type FormikHelpers } from 'formik';

export interface FormValues {
  'first-name': string;
  'last-name': string;
  phone: string;
  email: string;
  password: string;
  'confirm-password': string;
}
export interface SignupFormProps {
  handleSubmit: (
    values: FormValues,
    setSubmitting: FormikHelpers<FormValues>['setSubmitting']
  ) => void;
}

export type SignupValues = Omit<FormValues, 'confirm-password' | 'first-name' | 'last-name'> & {
  first_name: string;
  last_name: string;
};

export type SignupResponse = Omit<FormValues, 'password' | 'confirmPassword'>;
