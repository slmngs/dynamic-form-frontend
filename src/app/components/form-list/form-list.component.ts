import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { FormDefinition } from '../../models/form-definition';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit, OnDestroy {
  formList: FormDefinition[] = [];
  intervalId: any;

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.loadFormList();

    this.intervalId = setInterval(() => {
      this.loadFormList();
    }, 5000);
  }

  loadFormList(): void {
    this.formService.getFormList().subscribe({
      next: (data) => {
        this.formList = data;
      },
      error: (err) => {
        console.error('Form listesi yüklenemedi:', err);
      }
    });
  }

  openForm(formName: string): void {
    this.router.navigate(['/forms', formName]);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
