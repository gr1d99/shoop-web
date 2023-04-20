import { type FormikHelpers } from 'formik';

export interface FormValues {
  email: string;
  password: string;
}
export interface LoginFormProps {
  handleSubmit: (
    values: FormValues,
    setSubmitting: FormikHelpers<FormValues>['setSubmitting']
  ) => void;
}

export interface LoginResponse {
  token: string;
}
