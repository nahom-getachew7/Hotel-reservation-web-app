import * as yup from "yup";
 export const basicSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Required"),
    password: yup
    .string()
    .min(8)
    .matches()
    .required("Required"),
 });