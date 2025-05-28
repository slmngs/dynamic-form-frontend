import { FormField } from './form-field';

export interface FormDefinition {
    formName: string;
    fields: FormField[];
    isSubmitted?: boolean;
    formData?: { [key: string]: string };
}

export { FormField };
