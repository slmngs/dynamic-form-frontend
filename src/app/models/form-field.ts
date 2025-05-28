export interface ValidationRule {
    name: string;
    value: string;
}
export interface FormField {
    name: string;
    type: string;
    validations: ValidationRule[];
}
