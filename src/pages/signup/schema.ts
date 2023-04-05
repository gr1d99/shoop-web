import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  'first-name': Yup.string().required('First name is required'),
  'last-name': Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().required('Password is required'),
  'confirm-password': Yup.string().test(
    'password-match',
    'Passwords must match',
    (value, context) => {
      return context.parent.password === value;
    }
  )
});

export { signupSchema };
