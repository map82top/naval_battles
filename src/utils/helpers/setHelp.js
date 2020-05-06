export default (touched, errors, key) => {
    if(touched && touched[key]) {
        let fieldErrors = errors[key];
        if(fieldErrors && fieldErrors.length > 0) {
            if(typeof fieldErrors === "object") {
                return fieldErrors[0];
            } else {
                return fieldErrors;
            }

        } else {
            return "";
        }

    } else {
        return "";
    }
}