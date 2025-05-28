import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { FormDefinition, FormField } from '../../models/form-definition';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    formDefinition!: FormDefinition;
    dynamicForm!: FormGroup;
    formLoaded = false;
    formName = '';

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const formNameParam = params.get('formName');
            if (formNameParam) {
                this.formName = formNameParam;
                this.loadForm();
            }
        });
    }

    loadForm(): void {
        this.formService.getForm(this.formName).subscribe({
            next: (formDef) => {
                if (!formDef || !formDef.fields || formDef.fields.length === 0) {
                    console.error('Form tanımı eksik veya boş!', formDef);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Uyarı',
                        text: 'Bu formun alanları tanımlı değil. Lütfen başka bir form deneyin!'
                    }).then(() => {
                        this.router.navigate(['/forms']);
                    });
                    return;
                }

                this.formDefinition = formDef;
                this.createForm();
                this.formLoaded = true;
            },
            error: (err: any) => {
                console.error('Form yüklenemedi:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Form yüklenemedi!'
                }).then(() => {
                    this.router.navigate(['/forms']);
                });
            }
        });
    }

    createForm(): void {
        const group: any = {};

        this.formDefinition.fields.forEach((field) => {
            const validators = this.getValidators(field);
            validators.unshift(Validators.required);

            const initialValue = this.formDefinition.formData?.[field.name] || '';
            group[field.name] = [initialValue, validators];
        });

        this.dynamicForm = this.fb.group(group);
    }


    getValidators(field: FormField): any[] {
        const validators: any[] = [];

        field.validations.forEach((rule) => {
            switch (rule.name) {
                case 'MinLength':
                    validators.push(Validators.minLength(Number(rule.value)));
                    break;
                case 'MaxLength':
                    validators.push(Validators.maxLength(Number(rule.value)));
                    break;
                case 'Regex':
                    validators.push(Validators.pattern(rule.value));
                    break;
                case 'MinValue':
                    validators.push(Validators.min(Number(rule.value)));
                    break;
                case 'MaxValue':
                    validators.push(Validators.max(Number(rule.value)));
                    break;
            }
        });

        return validators;
    }

    onSubmit(): void {
        Object.keys(this.dynamicForm.controls).forEach(field => {
            const control = this.dynamicForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });

        if (this.dynamicForm.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Formda hatalı alanlar var!',
                confirmButtonText: 'Tamam'
            });
            return;
        }

        this.formService.submitForm(this.formName, this.dynamicForm.value).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: 'Form başarıyla gönderildi!',
                    confirmButtonText: 'Tamam'
                }).then(() => {
                    this.router.navigate(['/forms']);
                });
            },
            error: (err: any) => {
                console.error('Form gönderilemedi:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Form gönderilemedi!',
                    confirmButtonText: 'Tamam'
                });
            }
        });
    }
}
