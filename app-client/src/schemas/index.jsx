import * as Yup from "yup"

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
})

export const registerSchema = Yup.object({
  name: Yup.string().min(3).required("Please enter your name"),
  phone: Yup.string().min(10).required("Please enter your phone number"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  campus: Yup.string().required("Please select your campus"),
  department: Yup.string().required("Please select your department"),
  isAmbassadorReq: Yup.boolean(),
})

export const fundReqSchema = Yup.object({
  goal_amount: Yup.number().required("Please enter the goal amount"),
  disease: Yup.string().required("Please enter the disease"),
  description: Yup.string(),
  valid_until: Yup.date().required("Valid until date is required").min(new Date(), "Date must be in the future"),
  medical_records: Yup.mixed().required("Please upload medical records"),
})

export const donationSchema = Yup.object({
  amount: Yup.number().required("Please enter the amount"),
  annonymous: Yup.boolean(),
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
})

export const commentSchema = Yup.object({
  comment: Yup.string().required("Please enter your comment"),
})
