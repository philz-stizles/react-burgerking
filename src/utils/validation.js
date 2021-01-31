export const checkValidity = (value, validations) => {
    let isValid = true

    if(!validations) {
        return isValid
    }

    if(validations.required) {
        isValid = (value.trim() !== '') && isValid
    }

    if(validations.minLength) {
        isValid = (value.trim().length >= validations.minLength) && isValid
    }

    if(validations.maxLength) {
        isValid = (value.trim().length <= validations.maxLength) && isValid
    }

    if(validations.isEmail) {
        const pattern = /^[a-z0-9!#$%&'*+/=?^_'{|}~-]+(?:\.[a-z0-9])$/
        isValid = pattern.test(value.trim()) && isValid
    }

    if(validations.isNumeric) {
        const pattern = /^\d+$/
        isValid = pattern.test(value.trim()) && isValid
    }

    return isValid
}
