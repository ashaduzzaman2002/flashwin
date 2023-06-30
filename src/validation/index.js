import * as Yup from 'yup';

export const loginValidation = Yup.object({
  number: Yup.number().required("Please enter your phone number!"),

  password: Yup.string().required('Please enter your password!'),
});

export const signupValidation = Yup.object({
  number: Yup.number().required('Please enter your phone number!'),
  otp: Yup.number().required('Please enter otp!'),
  password: Yup.string()
    .min(6, 'Password should be greater than 6 charactors')
    .required('Please enter your password!'),
});
