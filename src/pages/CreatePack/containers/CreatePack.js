// import CreatePack from "../components/CreatePack";
// import { withFormik } from "formik";
// import React from "react";
//
// export default withFormik ({
//     enableReinitialize: true,
//     mapPropsToValues: () => ({
//             name: this.props.name,
//             cost: this.props.cost
//     }),
//     validate: values => {
//         const errors = {};
//         if(values.name.isEmpty || values.name.length < 5) {
//             errors.name = "Обязательно для заполнения";
//         }
//
//         if(values.cost > 25 || values.cost < 20) {
//             errors.cost = "Должно быть меньше 25, но не 0"
//         }
//
//         return errors;
//     },
//     handleSubmit: (values, { setSubmitting, props }) => {
//         setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//         }, 400);
//     },
//     displayName: "CreatePack"
// })(CreatePack);