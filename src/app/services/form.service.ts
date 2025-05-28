import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormDefinition } from '../models/form-definition';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private apiUrl = 'http://localhost:5185/api/forms';

    constructor(private http: HttpClient) { }

    getForm(formName: string): Observable<FormDefinition> {
        return this.http.get<FormDefinition>(`${this.apiUrl}/${formName}`);
    }

    getFormList(): Observable<FormDefinition[]> {
        return this.http.get<FormDefinition[]>(`${this.apiUrl}`);
    }
    
    submitForm(formName: string, formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${formName}/submit`, formData);
    }
}
