import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export const passwordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const password = control.value;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    const isValid = hasLower && hasUpper && hasNumber;
    if (!isValid) {
        return {
            lower: !hasLower,
            upper: !hasUpper,
            number: !hasNumber
        }
    }
    return null;
};