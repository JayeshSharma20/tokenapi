import { withFormik } from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("This field is required."),
    LastName: Yup.string().required("This field is required."),
    UserName:  Yup.string().required("This field is required."),
    Email: Yup.string()
    .required("This field is required."),
    Phone: Yup.string()
    .required("This field is required.")
    .matches(/^[0-9]+$/, "Please enter numbers only."),
    CountryId:  Yup.string().required("This field is required."),
    TestingOfficeId: Yup.string().required("This field is required."),
    UserGroupName: Yup.string().required("This field is required."),
    Password:Yup.string().required("This field is required."),
    UserRolesNameId: Yup.string().required("This field is required."),
})
  
const UserEnhancer = withFormik({
    mapPropsToValues:()=>({
        FirstName: "",
        LastName: "",
        UserName: "",
        Email: null,
        Phone: "",
        CountryId: "",
        TestingOfficeId: "",
        UserGroupName: "",
        Password: "Test@123",
        UserRolesNameId: "",
    }),
    validationSchema,
    validateOnMount:true,
    handleSubmit:(values, {resetForm})=>{},
})

export default UserEnhancer
