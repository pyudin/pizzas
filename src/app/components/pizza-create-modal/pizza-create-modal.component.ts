import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable, of } from 'rxjs';
import { NgbDateCustomParserFormatter } from 'src/app/utils/ngb-date-formater';
import { FilterValue } from 'src/app/interfaces/pizzas.interface';

@Component({
  selector: 'app-pizza-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
  templateUrl: './pizza-create-modal.component.html',
  styleUrls: ['./pizza-create-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCreateModalComponent implements OnInit {
  @Input() pizzaTypes$: Observable<FilterValue[]> = of();
  @Input() pizzaComponents$: Observable<FilterValue[]> = of();

  public activeModal = inject(NgbActiveModal);
  public fb = inject(FormBuilder);
  private calendar = inject(NgbCalendar);

  public pizzaFormGroup: FormGroup;
  public minDate: NgbDateStruct = this.calendar.getToday();
  public isSubmitted = false;

  constructor() {
    this.pizzaFormGroup = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      components: [[], Validators.required],
      types: [],
      availableFrom: [null, Validators.required],
      currency: 'UAH',
    });
  }

  ngOnInit(): void {}

  public onClose(): void {
    this.activeModal.dismiss();
  }

  public onCreate(): void {
    this.isSubmitted = true;
    if (this.pizzaFormGroup.invalid) return;
    this.activeModal.close(this.pizzaFormGroup.value);
  }
}
