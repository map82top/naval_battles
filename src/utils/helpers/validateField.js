export default (touched, errors, key) => {
    if (touched && touched[key]) {
        if (errors && errors[key]) {
            return "error";
        } else {
            return "success";
        }
    } else {
        return "";
    }
}